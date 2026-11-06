import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactNumber as phone, toggleServiceCategory as toggle } from '../lib/recommendation-validation.ts';

test('requires explicit country and handles optional blank contact', () => {
 assert.ok(phone('', '0241234567').error);
 assert.ok(phone('', '').error);
 assert.deepEqual(phone('', '', false), {});
 assert.ok(phone('GH', '', false).error);
});
test('normalizes national and international forms without duplicating calling code', () => {
 assert.equal(phone('GH', '024 123 4567').number, '+233241234567');
 assert.equal(phone('GH', '+233 24 123 4567').number, '+233241234567');
 assert.equal(phone('US', '(202) 555-0123').number, '+12025550123');
 assert.equal(phone('IT', '02 3661 8300').number, '+390236618300');
});
test('rejects country mismatches, malformed, short, long, and extension numbers', () => {
 for (const number of ['+12025550123','123','0241234567123456789','call 0241234567','0241234567 ext 2']) assert.ok(phone('GH',number).error, number);
});
test('caps selections at eight and permits deselection and replacement', () => {
 let values = [];
 for(let i=0;i<8;i++) values=toggle(values,`role-${i}`);
 assert.equal(values.length,8);
 assert.deepEqual(toggle(values,'ninth'),values);
 values=toggle(values,'role-3');
 assert.equal(values.length,7);
 values=toggle(values,'replacement');
 assert.equal(values.length,8);
 assert.ok(values.includes('replacement'));
 assert.equal(new Set(values).size,8);
});
