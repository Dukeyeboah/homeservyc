# Firestore privacy regression checks

These tests use `node:test` and the official Firestore rules testing SDK. Install `@firebase/rules-unit-testing@5` (compatible with Firebase 12) and `firebase-tools` development dependencies, then run against an **isolated emulator**:

```
firebase emulators:exec --only firestore --project demo-homeservyc-security "node --test tests/security/firestore.rules.test.mjs"
```

An emulator configuration (Firestore port 8080) and a supported Java runtime are required. Never point these tests at production. They clear their demo project's emulator data before each test. Dependencies are not added to the application's production dependency tree by this change.

## Deployment and existing records

The rule changes have no effect until explicitly deployed. Deploying is separate from committing these files.

New bookmarks store only catalog IDs and safe bookmark metadata. The application resolves catalog entries from the current sanitized catalog, never returns old embedded snapshots, and omits saved entries whose IDs are no longer in the catalog. Verify save, saved-state checks for both missing/existing bookmarks, dashboard display, and removal in a signed-in browser.

Existing Firestore bookmark documents may still contain old `service` snapshots, including private contacts. Firestore returns entire readable documents: sanitizing the UI does **not** remove those fields from a network response to the record's owner. Before declaring existing data clean, an authorized administrator must back up and migrate `savedServices` documents to exactly `id`, `userId`, `serviceId`, `savedAt`, and `category`, retaining the document ID and owner. Check historical exports/backups and access scope separately. Do not copy contacts into the public catalog or a public collection. No production migration or rules deployment is included here.

Regression assertions cover cross-user and unfiltered bookmark reads; anonymous reads; embedded-contact writes; owner changes; recommendation self-approval; moderator approval; and edits to already moderated recommendations.
