import test from 'node:test'
import assert from 'node:assert/strict'
import { isValidEmail } from './send-email-utils.mjs'

test('accepts common valid email formats', () => {
  assert.equal(isValidEmail('user+tag@example.com'), true)
  assert.equal(isValidEmail("o'hara@example.com"), true)
  assert.equal(isValidEmail('person@bücher.de'), true)
})

test('rejects malformed email formats', () => {
  assert.equal(isValidEmail('user@localhost'), false)
  assert.equal(isValidEmail('user@-example.com'), false)
  assert.equal(isValidEmail('first last@example.com'), false)
  assert.equal(isValidEmail('double..dot@example.com'), false)
})
