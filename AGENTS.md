<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project-specific notes

### Code philosophy
- Keep changes as simple as possible — straight to the point, with comments added to explain non-obvious logic.
- Do not over-engineer what can be done easily. Prefer the simplest solution that fully solves the problem.
- Never act proactively — only do what was explicitly asked. Do not add extra features, refactors, or "improvements" that weren't requested.
- Use the libraries and tools already present in the project. Do not rebuild functionality from scratch when an existing dependency already covers it.
- Implementation must be carried out step-by-step — break the task into stages and verify each one before moving to the next.

### Codebase integrity
- Always consider the codebase as a whole before making a change.
- Make sure any new feature or fix does not break existing functionality elsewhere in the project.

### Quality bar
- The site must be fully responsive across all screen sizes, with special attention to mobile devices.
- Performance score must be at least 80.
- SEO and GEO scores must be at least 80.