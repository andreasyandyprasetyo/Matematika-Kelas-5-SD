import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeAnswer, checkFillInAnswer } from './evaluator.ts';

test('normalizeAnswer strips spaces, currency, and thousand separators', () => {
  assert.equal(normalizeAnswer(' Rp 25.000 '), '25000');
  assert.equal(normalizeAnswer('100.000'), '100000');
  assert.equal(normalizeAnswer(' 45 cm '), '45');
  assert.equal(normalizeAnswer('90°'), '90');
  assert.equal(normalizeAnswer('90 derajat'), '90');
  assert.equal(normalizeAnswer(' 3 / 4 '), '3/4');
  assert.equal(normalizeAnswer('3,5'), '3.5');
});

test('checkFillInAnswer accepts various valid student responses', () => {
  // Integer test
  assert.equal(checkFillInAnswer('24', ['24', '24 cm']), true);
  assert.equal(checkFillInAnswer(' 24 cm ', ['24']), true);
  assert.equal(checkFillInAnswer('25', ['24']), false);

  // Indonesian currency / thousand format test
  assert.equal(checkFillInAnswer('75.000', ['75000', '75.000']), true);
  assert.equal(checkFillInAnswer('Rp 75000', ['75000']), true);

  // Angle test
  assert.equal(checkFillInAnswer('90 derajat', ['90', '90°']), true);
  assert.equal(checkFillInAnswer('90°', ['90']), true);

  // Fraction test
  assert.equal(checkFillInAnswer('1/2', ['1/2']), true);
  assert.equal(checkFillInAnswer(' 1 / 2 ', ['1/2']), true);

  // Empty or invalid
  assert.equal(checkFillInAnswer('', ['24']), false);
  assert.equal(checkFillInAnswer('   ', ['24']), false);
});
