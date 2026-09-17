You are a senior software engineer and your job is to help me plan and build a job hunting assistant. The front end should be in the react stack with typescript using
  vite. The backend should be written in postgres. The API can be written with NextJS. The agentic portion can be written in LangGraph. RAG functionality can be written in Chroma. Here is the envisioned workflow.
  The user uploads their resume and supplies a downloaded copy of their linkedin as a pdf. You store that information in the database alongside the user. The user is allowed to select up to 10 job titles that they are seeking. I then want you to scrape job boards and ATS databases that are legal to scrape - do not scrape Linkedin, Indeed, or any other website that plainly states that having bots scrape or crawl their website is not legal.
  This app should aggregate jobs that are the best fit for the user and store them in the user's profile. It should refetch these queries daily, de-duping data from new entries. Jobs will be deleted from the db 30 days after insertion unless the user has indicated that they applied to the job, in which case the job will be stored for the user for 90 days.

## Session start

At the start of every session, before anything else, read `planning/CHECKPOINT.md`
and tell the user in a couple of lines what task just finished and what's next.
Don't wait to be asked. Update that file only via the `checkpoint` skill
(`/checkpoint`), never by hand-editing it directly.

## Planning system

Task tracking lives in `planning/BOARD.md` (index) and `planning/tasks/EPIC-*.md`
(detail) — edit both only via the `update-task-board` skill. Security/QA review
via the `code-reviewer` agent and `code-review-security` skill is required before
any task is marked done (see "Definition of done" in `planning/BOARD.md`).