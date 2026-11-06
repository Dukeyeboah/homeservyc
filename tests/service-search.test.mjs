import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';

async function importTypeScript(path) {
  const code = stripTypeScriptTypes(readFileSync(new URL(path, import.meta.url), 'utf8'));
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}
const { filterServices } = await importTypeScript('../lib/service-search.ts');
const { services } = await importTypeScript('../lib/services.ts');

test('search matches roles and locations, case-insensitively, ignoring extra spaces', () => {
  const result = filterServices(services, { category: null, search: '  CLEANER   ACCRA  ' });
  assert.ok(result.length > 0);
  assert.ok(result.every((s) => `${s.name} ${s.location} ${s.description} ${s.categories.join(' ')}`.toLowerCase().includes('accra')));
});
test('category and arrangement intersect, including secondary roles', () => {
  const result = filterServices(services, { category: 'Cleaner', search: '', workType: 'Part-time' });
  assert.ok(result.length > 0);
  assert.ok(result.every((s) => s.categories.includes('Cleaner') && s.workType === 'Part-time'));
});
test('empty search keeps all entries; no match returns empty', () => {
  assert.equal(filterServices(services, { category: null, search: '   ' }).length, services.length);
  assert.deepEqual(filterServices(services, { category: null, search: 'impossible-search-123' }), []);
});
test('alphabetical order does not mutate the source directory', () => {
  const original = services.map((s) => s.id);
  const sorted = filterServices(services, { category: null, search: '', sort: 'name' });
  assert.deepEqual(services.map((s) => s.id), original);
  assert.ok(sorted.every((s, i) => !i || sorted[i - 1].name.localeCompare(s.name) <= 0));
});
test('public seed contains no provider or reference contact fields', () => {
  for (const service of services) {
    assert.ok(!('phoneNumber' in service));
    assert.ok(!('reference' in service));
    assert.ok(!/\b\d{10}\b/.test(JSON.stringify(service)));
  }
});
