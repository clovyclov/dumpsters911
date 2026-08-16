const ALLOWED_ORIGINS = ['https://dumpsters911.com', 'https://www.dumpsters911.com'];

function corsHeaders(origin) {
  if (!ALLOWED_ORIGINS.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (!ALLOWED_ORIGINS.includes(origin)) {
      return json({ error: 'Origin not allowed' }, 403, origin);
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, origin);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, origin);
    }

    const turnstileToken = payload.cf_turnstile_response || '';
    if (!turnstileToken) {
      return json({ error: 'Missing verification token' }, 400, origin);
    }

    const verifyResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
        remoteip: request.headers.get('CF-Connecting-IP') || '',
      }),
    });
    const verifyResult = await verifyResp.json();

    if (!verifyResult.success) {
      return json({ error: 'Verification failed' }, 403, origin);
    }

    const { cf_turnstile_response, ...leadData } = payload;

    const lcResp = await fetch(env.LEADCONNECTOR_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });

    return json({ ok: lcResp.ok }, lcResp.ok ? 200 : 502, origin);
  },
};
