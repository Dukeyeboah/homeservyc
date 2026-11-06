// Run against an isolated Firestore emulator. See README.md in this directory.
import { readFileSync } from 'node:fs';
import { after, before, beforeEach, test } from 'node:test';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, Timestamp } from 'firebase/firestore';

let environment;
const bookmark = (userId) => ({ id: `${userId}_1`, userId, serviceId: 1, savedAt: Timestamp.now(), category: 'Cleaner' });
before(async () => {
  environment = await initializeTestEnvironment({
    projectId: 'demo-homeservyc-security',
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  });
});
beforeEach(async () => {
  await environment.clearFirestore();
  await environment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'savedServices/alice_1'), bookmark('alice'));
    await setDoc(doc(context.firestore(), 'savedServices/bob_1'), bookmark('bob'));
    await setDoc(doc(context.firestore(), 'recommendations/alice'), { userId: 'alice', status: 'pending' });
  });
});
after(async () => { await environment?.cleanup(); });

test('bookmark reads require ownership and owner-filtered queries', async () => {
  const db = environment.authenticatedContext('alice').firestore();
  await assertSucceeds(getDoc(doc(db, 'savedServices/alice_1')));
  await assertFails(getDoc(doc(db, 'savedServices/bob_1')));
  await assertFails(getDocs(collection(db, 'savedServices')));
  await assertSucceeds(getDocs(query(collection(db, 'savedServices'), where('userId', '==', 'alice'))));
  await assertFails(getDocs(query(collection(db, 'savedServices'), where('userId', '==', 'bob'))));
  await assertFails(getDoc(doc(environment.unauthenticatedContext().firestore(), 'savedServices/alice_1')));
});

test('bookmark writes reject contact snapshots and ownership changes', async () => {
  const db = environment.authenticatedContext('alice').firestore();
  await assertSucceeds(setDoc(doc(db, 'savedServices/alice_1'), bookmark('alice')));
  await assertFails(setDoc(doc(db, 'savedServices/alice_1'), { ...bookmark('alice'), service: { phoneNumber: 'private' } }));
  await assertFails(setDoc(doc(db, 'savedServices/bob_1'), bookmark('bob')));
  await assertFails(updateDoc(doc(db, 'savedServices/alice_1'), { userId: 'bob' }));
});

test('recommendation owners cannot self-approve or transfer ownership', async () => {
  const db = environment.authenticatedContext('alice').firestore();
  await assertFails(setDoc(doc(db, 'recommendations/new'), { userId: 'alice', status: 'approved' }));
  await assertSucceeds(setDoc(doc(db, 'recommendations/new'), { userId: 'alice', status: 'pending' }));
  await assertFails(updateDoc(doc(db, 'recommendations/alice'), { status: 'approved' }));
  await assertFails(updateDoc(doc(db, 'recommendations/alice'), { userId: 'bob' }));
  await assertSucceeds(updateDoc(doc(db, 'recommendations/alice'), { description: 'Updated' }));
  const admin = environment.authenticatedContext('moderator', { admin: true }).firestore();
  await assertSucceeds(updateDoc(doc(admin, 'recommendations/alice'), { status: 'approved' }));
  await assertFails(updateDoc(doc(admin, 'recommendations/alice'), { userId: 'bob' }));
  await assertFails(updateDoc(doc(db, 'recommendations/alice'), { description: 'Alter reviewed content' }));
});
