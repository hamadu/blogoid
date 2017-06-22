import * as mocha from "mocha"
import * as assert from "assert"
import { Entry } from "../src/model/entry"
import { EntryLinker } from "../src/model/entryLinker"

describe('link', () => {
  const entries = [
    Entry.generate('ts/test/files/entry.md'),
    Entry.generate('ts/test/files/entry.md'),
    Entry.generate('ts/test/files/entry.md')
  ]

  EntryLinker.link(entries)

  it('newer/older link', () => {
    assert.equal(entries[0].older, entries[1])
    assert.equal(entries[1].older, entries[2])

    assert.equal(entries[2].newer, entries[1])
    assert.equal(entries[1].newer, entries[0])
  })
})
