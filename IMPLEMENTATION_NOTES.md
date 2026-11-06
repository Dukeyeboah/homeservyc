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

## Compact directory and Google-first authentication
- Categories now use one horizontal strip with previous/next controls, native touch scrolling, and left/right keyboard navigation. Removed View results, directory intro copy, and Find home help from the navigation; the action is now Add.
- Reduced spacing above search while preserving the MEET YOUR NEXT HELPING HAND label.
- Log in modal presents a blue Google button with the multicolor G first. Email and phone forms start collapsed and toggle independently (one open at a time).
- Email password has a visibility toggle. Account creation adds confirmation and rejects mismatches before calling authentication; existing-account login retains one password field.
- Verified 320px and 1280px layouts, strip scrolling, keyboard focus, visibility toggles, mismatch rejection, matching-field validity, phone collapse, Escape and outside dismissal. Build, TypeScript, and 5 search/privacy tests passed. Real authentication remains disabled in local preview.

## Add-personnel form refinement (local only)
- Inspected all three supplied Library screenshots, materialized under ../references-form/reference-{0,1,2}.png.
- Native radio group replaces large recommender/service-personnel buttons; role still controls the recommender phone field.
- Circular photo preview sits beside labeled name/location fields, with keyboard-accessible chooser and remove control. JPG/PNG/WebP type and 10 MB size checks added. Existing photo preview remains local only; persistent photo upload is not implemented.
- Service categories are compact native checkbox chips in a bordered fieldset with selection count; multi-select behavior preserved.
- Verified actual desktop (1280px) and mobile (320px and natural 390px) rendering, photo selection/removal, radio arrow keys, category Space toggle, and Escape focus return. At 320px the document width was 320px and dialog client/scroll width both 288px.
- TypeScript, production build and 5 search/privacy tests passed. No submission, push, deployment or production changes.

## Form alignment, calling codes and category limit (local only)
- Photo and Full name label tops align exactly; Location input bottom aligns with circular photo holder. Browser geometry differences were 0px at 1280px and 320px. At 320px document width was 320px; dialog client and scroll widths both 288px.
- Both contact sections have explicit country/calling-code selectors with no country preselected. Help distinguishes country calling codes from local area codes. libphonenumber-js/max validates numbering metadata, preserves country-specific significant zeroes, rejects mismatches and extensions, and normalizes submitted numbers to E.164. Optional recommender number remains optional unless marked WhatsApp or partially filled.
- Category selection limited to 8; visible count and accessible limit feedback; selected items can always be removed, and replacements enabled afterward. Form submit also guards category count and phone validity.
- Verified browser cap/deselection/replacement, normalizing a Ghana national number, mismatched international-number feedback, phone layout, native controls, and Escape focus return. Production build and TypeScript passed; 9 automated tests passed (5 existing search/privacy and 4 new validation tests).
- These checks validate syntax/numbering plans, not number ownership, reachability or WhatsApp registration. Backend validation and consent verification remain required before production contact workflows. No actual submission, push, deployment, API messages or production changes.

### Suggested additional fields (not implemented)
Essential for a useful submission: provider consent to a listing/contact request, service area (town/neighborhood rather than street address), one to eight services, work arrangement, reliable contact channel, and an accurate distinction between self-submission and recommendation. Before publishing, confirm phone ownership and review provider permission; make provider visibility choices explicit.
Optional: languages, years of relevant experience, availability date/days and last-confirmed timestamp, live-in/live-out or travel radius, short service description, fee range with currency and basis, qualifications relevant to the chosen role, and photo with consent. For recommenders, ask how/when they worked with the provider rather than assuming a verified review.
Sensitive: do not request government ID numbers/images, exact home address, birth date, health information, banking details, or third-party reference contacts in the general form. If a later verification process needs evidence, collect it privately with clear purpose, access and retention controls; never put it in public profiles. Provider contact numbers should remain private until authorized sharing.

## Compact mobile directory controls (local only)
- Moved the helping-hand heading below search/filters, directly above results metadata. Search uses placeholder text with an accessible name and no visible label.
- Mobile category prompt stays on one line; desktop arrows become interactive, scroll-synchronized dots on mobile.
- Mobile filter icon toggles work arrangement and sort side by side beneath search, with an active-filter indicator. Desktop controls remain visible.
- TypeScript and all 5 existing search/privacy tests passed. Browser checks at 320px and 390px showed no page overflow; dot navigation, arrangement filtering (41 part-time profiles), reset (105 profiles), and filter expansion passed. No publication or production changes.

## Desktop directory controls
- Category scrolling uses clickable, scroll-synchronized page dots at every viewport size; desktop arrow controls removed. Reduced-motion preference and keyboard category navigation preserved.
- Filters toggle reveals Work arrangement and Sort by on desktop and mobile, preserving selections while collapsed and showing an active-filter indicator.
- Search includes a decorative magnifying glass and role/location/name placeholder; result count uses 12px italic type.
- Verified desktop dot navigation, filter visibility and retained selections, combined search/filtering, and mobile layout at 320px without document overflow. Production build (including TypeScript) and all 9 search/privacy/phone/category tests passed.
- This commit also includes the previously reviewed local personnel-form refinements and compact mobile controls described above. No deployment or live contact workflow was performed.
