import test from 'node:test'
import assert from 'node:assert/strict'
import { createSlots } from '../src/utils/gallery.js'

test('an empty gallery has no slots', () => {
  assert.deepEqual(createSlots([]), [])
})

test('a small gallery contains each photo once', () => {
  const photos = [{ orient: 'landscape' }, { orient: 'portrait' }, { orient: 'landscape' }]
  const slots = createSlots(photos)
  assert.equal(slots.length, photos.length)
  assert.equal(new Set(slots).size, photos.length)
  assert.ok(slots.every((photo) => photos.includes(photo)))
})

test('a large gallery is limited to eight unique slots', () => {
  const photos = Array.from({ length: 12 }, (_, i) => ({ orient: i % 2 ? 'portrait' : 'landscape' }))
  const slots = createSlots(photos)
  assert.equal(slots.length, 8)
  assert.equal(new Set(slots).size, 8)
})
