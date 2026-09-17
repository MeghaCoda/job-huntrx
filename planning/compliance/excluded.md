# Excluded sources — never scrape

Per [CLAUDE.md](../../CLAUDE.md): do not scrape LinkedIn, Indeed, or any site
whose terms plainly forbid bots/crawlers. This list exists so no adapter
(EPIC-4) is ever written against these without a deliberate, separate
decision to license their official API instead.

| Source | Reason | Revisit if |
|---|---|---|
| LinkedIn | ToS explicitly prohibits scraping/automated access | Never for scraping. Could revisit only via LinkedIn's official licensed Talent/Jobs API with a signed agreement. |
| Indeed | ToS explicitly prohibits scraping/automated access | Same — only via an official licensed Indeed API/partnership. |
| Glassdoor | ToS prohibits automated data collection | Only via an official API/partnership. |
| ZipRecruiter | ToS restricts automated access | Only via an official API/partnership. |

Add a row here the moment a source is rejected in EPIC-3, so it isn't
re-evaluated later by accident.
