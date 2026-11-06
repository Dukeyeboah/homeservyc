# HomeServyc: directory-first increment

## Implemented locally

- Minimal, mobile-ready landing page and consistently named HomeServyc navigation.
- Search across names, roles, locations and recommendation text; intersecting category/work-arrangement filters; alphabetical sorting and reset/empty states.
- Explicit unverified/community-submission labels, no fabricated availability or ratings, no implied quality ranking.
- Accessible Radix profile dialog with focus trapping, Escape/dismiss support; restored browser zoom.
- Removed provider and reference contacts from the public catalog and removed authentication-only reveal. Contact introductions are explicitly unavailable, not simulated.
- Owner-scoped bookmark rules, metadata-only new bookmarks, and recommendation approval/ownership protections. Optional undefined submission fields are omitted.

## Verification

Use Node 24 for `node --test tests/service-search.test.mjs`. Five tests cover combined search, category/arrangement filtering, empty/reset behavior, nonmutating sorting and public catalog contact-field removal.

Run `npx tsc --noEmit` and `npm run build` with your Firebase public configuration. TypeScript errors are no longer ignored by the production build. System fonts avoid a build-time Google Fonts dependency. Rules emulator tests and migration instructions are in `tests/security/README.md`.

### Results in this workspace

- Five focused search/privacy tests passed.
- All three Firestore emulator regression groups passed with test-process exit 0. The Firebase CLI wrapper later exited 2 during its local update/config check; this was after tests and emulator shutdown, not a rules assertion failure.
- `npx tsc --noEmit` passed; production compilation and its TypeScript stage passed.
- Full production build blocked at prerender: Firebase environment configuration is absent.
- Lint blocked: the repository has an ESLint script but no ESLint dependency or configuration.
- Interactive/browser QA not completed: Chromium could not create its process socket in this sandbox.
- No real Firebase login, submission, production access or WhatsApp flow was exercised.

## Before any production release

This is a local, unpublished change. No rules deployment, contact migration or existing deployment cleanup has occurred. Public Git history, existing deployments, caches, backups and old bookmark snapshots can still contain contact details. A release owner must assess those surfaces and perform an authorized migration; deleting fields in this checkout does not revoke previously disclosed information.

The initial directory is inherited community-submitted material, not a newly vetted shortlist. Confirm each provider's permission to be listed, current service roles, geography, availability and relevant credentials. Review recommendation prose for unnecessary personal information before publishing. Existing authentication/recommendation submission need signed-in staging verification with your actual Firebase configuration. Photo uploads remain unimplemented.

## Next increment: private introductions

1. Keep contact records in a server-only store. Public provider IDs must not resolve to phone numbers through client-readable documents.
2. Record provider listing consent and separate contact-sharing consent with timestamps, scope and revocation. Record reference consent independently.
3. Authenticated customers request an introduction through a rate-limited server endpoint. Notify providers only through an approved integration and their opted-in channel. Do not expose WhatsApp deep links containing private numbers beforehand.
4. Provider accepts or declines for that customer. Reveal/send only the approved details, with access checks on every request, expiry and audit trail. Never treat customer login as provider consent.
5. Implement declined, expired, revoked and repeated-request paths before launch.

## Reviews, ranking and monetization

Collect reviews only after a real service interaction, with reporting/moderation and visible review counts. Keep imported recommendations separate. Ranking can later use service/location fit, freshness and review confidence once actual outcome data exists; do not infer trust from recommendation length or invented statistics. Support multiple roles per provider (already present in the model).

Start with a small, manually reviewed shortlist. Test paid concierge introductions or transparent provider subscriptions after successful matching is demonstrated. Keep paid placement labeled and separate from quality ranking. No payment, commission, subscription or paid ranking integration is implemented in this increment.

## Local visual redesign — November 6, 2026

- Inspected both supplied GradDrive screenshots and the prepared hero/icon/logo asset bundle before implementation.
- Replaced category dropdowns with a visible, horizontally scrollable icon filter and an inline expanded grid of all 19 categories. Keyboard activation, selected-state announcements and Escape collapse are supported.
- Reused the provided SVG icons on filters and ID-style cards, with matching role colors, initials and explicit unverified labels.
- Integrated the colorful home illustration. Logo proposal is isolated at /logo-review; layout metadata and existing icon files are byte-for-byte unchanged from the pre-redesign backup.
- Replaced custom account menu with Radix DropdownMenu; auth/recommendation overlays now use Radix Dialog for outside-click dismissal, Escape, focus trapping and return focus. Provider dialogs also restore focus.
- Browser verified at desktop 1280px and mobile 390px: category keyboard selection, combined filtering/search, reset, expanded grid/Escape collapse, provider dialogs, auth outside-click/Escape/focus trap, recommendation outside click, account menu arrows/Escape/outside click. Account menu tested in a temporary local-only harness, removed after verification. No actual authentication occurred.
- No mobile document horizontal overflow. All five existing search/privacy tests passed; TypeScript and full production build passed using the isolated local-preview configuration.
- Local preview account/database guards remain enabled. No push, deployment, production writes or security changes.
- Previous working copy preserved in ../before-redesign.tar.gz. Original source archive remains unchanged.

## Welcome and directory split — approved brand
- `/` is now the welcome page, with the existing hero, platform explanation, and CTA to `/directory`.
- `/directory` starts with category tiles and includes the search and profile directory without a hero.
- Approved wordmark applied on desktop; standalone house/check SVG on mobile, with regenerated PNG favicons and Apple touch icon. Metadata icon URLs versioned to refresh browser caches.
- Removed public profile number labels. Profile contact section now invites sign-in and opens the auth dialog; explicitly describes private introductions as coming soon (not yet implemented).
- Category tiles wrap in responsive grids instead of requiring sideways scrolling. Narrow layout verified at 320 and 390 pixels; desktop checked at 1280. Document width equalled viewport width. Nested sign-in/profile Escape dismissal restored focus; outside-click auth dismissal passed.
- TypeScript and production build passed; all 5 search/privacy tests passed. Preview guards still disable authentication, saves, submissions, and production access. No deployment or push.
- Pre-change source backup: ../before-welcome-split.tar.gz.

## Welcome polish and motion
- Bottom CTA now reads “Let’s get started”. Three new glossy vector icons extend the existing category icon treatment for discovery, profiles, and connection.
- IntersectionObserver provides one-shot upward/fade entrances for hero, category section, welcome cards, and provider cards. No animation dependency; content stays visible without JavaScript, with reduced motion respected globally. Observers clean up on route changes.
- Production build passed. Desktop icons and reveal activation verified at 1280px; welcome layout fits at 320px with no horizontal overflow.
