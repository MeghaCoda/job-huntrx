# Compliance card: Remote Rocketship

- **ToS URL:** https://www.remoterocketship.com/terms
- **ToS excerpt (bot/crawler/API reuse language):** "Scraping the Platform,
  running automated browser sessions, or performing request bursts that
  mimic scraping is prohibited" (applies to the *website*, not the API).
  API access is the sanctioned path: "Every API call requires a valid
  Remote Rocketship API key tied to an active paid plan." Cached responses
  may be kept "up to 24 hours maximum, unless documentation explicitly
  permits longer retention." "Historical archiving, bulk exports, or
  resale of our dataset is prohibited." May not be used to "build competing
  job boards" or "enrich third-party datasets that will be sold."
- **robots.txt URL:** n/a — access is via the documented, authenticated API
  (`api-docs`), not by crawling the site.
- **robots.txt status:** n/a (see above).
- **Access method:** public documented API for subscribers
  (`POST /api/openclaw/jobs`), OpenAPI contract at `/openapi.json`.
- **Auth required:** API key, `Authorization: Bearer <key>` header. Key is
  personal, must not be embedded client-side or shared.
- **Rate limits:** 3,000 jobs OR 500 requests per calendar day (UTC),
  whichever hits first; max 50 jobs/request. `429` with
  `"Daily request limit reached"` on overage. Single-user use of this app
  (see CLAUDE.md/BOARD.md) makes this budget non-binding — 10 job titles
  refetched once daily is a small fraction of the daily cap.
- **Fields available:** title, description, requirements, benefits, salary
  range, employment type, seniority flags, tech stack, posted/valid-until
  dates, application url, plus nested company info (name, industry, size,
  funding, H1B sponsorship, LinkedIn URL). ~30 fields total; see
  `/api-docs/` for the full contract.
- **Attribution required:** No attribution requirement stated in the
  docs or ToS reviewed.
- **Decision:** approved — for this app's single-user, personal job-search
  use case, with the retention adjustment below.
- **Reviewer:** Claude (session review), pending the user's confirmation.
- **Decision date:** 2026-09-23
- **Notes:**
  - **Open item / residual risk:** the ToS states a 24-hour max cache
    window. This app retains job data for 48 hours after `posted_at`
    (product decision — see `planning/tasks/EPIC-4-aggregation.md`
    TASK-035), which exceeds the stated cap. Recommend getting written
    confirmation from Remote Rocketship that a 48h personal-use TTL is
    acceptable before relying on this long-term; treat as accepted risk
    until then, not resolved.
  - Applied/favorited jobs are retained for 30 days from the
    applied/favorited date, but only as a minimal snapshot (company name,
    job title, application url, date applied/favorited) — not the full
    job description — which stays well clear of the "historical
    archiving" and "bulk export/resale" prohibitions.
  - The stored `url` for a job must be verified at adapter-build time
    (TASK-032) to confirm it points to the actual external application
    destination (e.g. the employer's or LinkedIn's own posting) rather
    than a Remote Rocketship-branded redirect page.
  - Not a "competing job board": this is a single-user personal dashboard,
    not a public-facing listings product.
