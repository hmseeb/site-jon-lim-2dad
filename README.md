# Visita Home Health — Las Vegas

Single-page marketing site for Visita Home Health, an in-home nursing and therapy
provider serving patients in Las Vegas, Nevada.

## Stack

Vanilla HTML, CSS and JavaScript — no build step, no dependencies.

| File | Purpose |
| --- | --- |
| `index.html` | The entire site (entry point) |
| `styles.css` | Design system and all layout |
| `script.js` | Progressive enhancement: form handling, confirmation, subtle reveals |
| `favicon.svg` | Favicon |
| `robots.txt` | Crawler policy |

## Running locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```

## Page structure

1. Sticky header with the primary action
2. Hero — headline, supporting sentence, primary action, who we visit
3. Services — featured skilled-nursing block plus numbered service rows
4. Primary action repeated
5. Pediatric home health section
6. How it works (3 steps)
7. Contact — request form, service area, "Leave us a review" link
8. Footer with the primary action and the review link
9. Mobile sticky action bar

## Contact form

The form posts to LeadrVision:

```
POST https://vision.leadrai.com/api/forms/ff3a93083739593d571636d274b510a5
```

- Works without JavaScript (plain `method="POST"` submission; the visitor returns
  with `?submitted=1` and sees the confirmation).
- With JavaScript it submits via `fetch()` to the same URL as JSON and shows the
  same confirmation inline.
- Hidden fields: `_form` (form name), `_page` (set to `window.location.href`),
  `_gotcha` (honeypot).
- No file uploads, no third-party form services, no `mailto:` actions.

## Content policy

All copy describes only what was supplied about the business. No reviews,
ratings, statistics, years in business, awards, certifications or licenses are
claimed anywhere on the page. Office phone, fax and address are intentionally
not published until the real values are provided.

The `/review` link in the footer and contact section is a relative path that is
provided by the hosting platform — this repository deliberately does not contain
a `/review` page or redirect.
