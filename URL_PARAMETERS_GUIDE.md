# Dumpsters 911 — URL Parameters & Dynamic Campaign Guide

This reference document outlines all custom query parameters, preset tags, discount parameters, and parameter persistence logic configured across the Dumpsters 911 website (`dumpsters911.com`).

---

## 1. Dynamic Discount Offer Parameters (`?d=`)

Used for Google Ads / Bing Ads landing page promotional testing. When present, these parameters dynamically update lead form headlines, eyebrow badges, form submit buttons, and booking page headlines.

| Parameter | Accepted Values | Landing Page (`/dumpster-rental-mi/`) Behavior | Online Booking Page (`/book-online-mi/`) Behavior |
| :--- | :--- | :--- | :--- |
| `d` (or `discount`, `off`) | `10` | **Badge**: `NEW CUSTOMER SPECIAL`<br>**Headline**: *Save $10 On Your Dumpster Rental Today*<br>**Button**: *Claim Your Dumpster Rental Discount* | **Badge**: `NEW CUSTOMER SPECIAL — SAVE $10 TODAY`<br>**Headline**: *Use Code <mark>SAVE10</mark> Below For Your Discount* |
| `d` (or `discount`, `off`) | `15` | **Badge**: `NEW CUSTOMER SPECIAL`<br>**Headline**: *Save $15 On Your Dumpster Rental Today*<br>**Button**: *Claim Your Dumpster Rental Discount* | **Badge**: `NEW CUSTOMER SPECIAL — SAVE $15 TODAY`<br>**Headline**: *Use Code <mark>SAVE15</mark> Below For Your Discount* |
| `d` (or `discount`, `off`) | `25` | **Badge**: `NEW CUSTOMER SPECIAL`<br>**Headline**: *Save $25 On Your Dumpster Rental Today*<br>**Button**: *Claim Your Dumpster Rental Discount* | **Badge**: `NEW CUSTOMER SPECIAL — SAVE $25 TODAY`<br>**Headline**: *Use Code <mark>SAVE25</mark> Below For Your Discount* |

### Example Test URLs:
- **$10 Off**: `https://dumpsters911.com/dumpster-rental-mi/?d=10`
- **$15 Off**: `https://dumpsters911.com/dumpster-rental-mi/?d=15`
- **$25 Off**: `https://dumpsters911.com/dumpster-rental-mi/?d=25`

---

## 2. Dynamic Headline Replacement Parameters (`?t=`)

Used for Google Ads Keyword & Ad Group matching to dynamically match the H1 headline on `/dumpster-rental-mi/` with the exact search intent of the user.

| Parameter | Preset Value | Rendered H1 Headline |
| :--- | :--- | :--- |
| `t` (or `headline`, `h`, `title`) | `residential-1` | **Residential Driveway Dumpster Rentals In Metro Detroit** |
| `t` (or `headline`, `h`, `title`) | `roofing-1` | **Fast Roofing Shingle Dumpster Rentals In Metro Detroit** |
| `t` (or `headline`, `h`, `title`) | `commercial-1` | **Commercial Roll-Off Dumpster Services In Metro Detroit** |
| `t` (or `headline`, `h`, `title`) | `yard-1` | **Yard Waste & Landscaping Dumpster Rentals In Metro Detroit** |
| `t` (or `headline`, `h`, `title`) | `junk-1` | **Junk Removal & House Cleanout Dumpster Rentals In Metro Detroit** |

### Custom Dynamic Headline Strings:
If a value is provided that is *not* a preset key, the script automatically formats hyphens and underscores into Title Case words:
- `?t=estate-cleanout-dumpster-rentals` → **Estate Cleanout Dumpster Rentals**
- `?t=heavy-concrete-disposal-michigan` → **Heavy Concrete Disposal Michigan**

### Combination Example:
You can combine discount parameters and headline parameters together:
`https://dumpsters911.com/dumpster-rental-mi/?t=roofing-1&d=15`
- **H1 Headline**: *Fast Roofing Shingle Dumpster Rentals In Metro Detroit*
- **Form Headline**: *Save $15 On Your Dumpster Rental Today*
- **Form Button**: *Claim Your Dumpster Rental Discount*

---

## 3. Parameter Persistence & CRM Attribution

All query parameters in the URL (`?d=10`, `?t=roofing-1`, `utm_source`, `utm_medium`, `utm_campaign`, `gclid`, `msclkid`) are automatically preserved and forwarded across user actions:

1. **Internal Navigation**: Clicking any link to the online booking page (`/book-online-mi/`) carries all query parameters over to the booking page URL.
2. **Form Submissions**: When a user submits any lead form, `window.location.href` (including all parameters) is included in the webhook payload sent directly to GoHighLevel CRM.
3. **Enhanced Conversions**: First-party data is safely stored in `sessionStorage` (`d911_user_data`) and passed to Google Ads Conversion Tracking (`AW-17518379587/vHFKCKLL2KcbEMOEtaFB`).
