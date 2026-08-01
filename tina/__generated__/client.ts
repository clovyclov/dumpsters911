import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '4c06d92e568e1012046c613d31f408b94a9f6454', queries,  });
export default client;
  