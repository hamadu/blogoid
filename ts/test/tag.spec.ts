import * as mocha from "mocha"
import * as assert from "assert"
import { Entry } from "../src/model/entry"
import { Tag } from "../src/model/tag"

describe('aggregate entry tags', () => {
  const entry = Entry.generate('ts/test/files/entry.md')       // tag: blog,test
  const entryTwo = Entry.generate('ts/test/files/entryTwo.md') // tag: blog,JavaScript

  const tagMap = Tag.aggregate([entry, entryTwo])

  it('tag names', () => {
    assert.equal(tagMap['blog'].name, 'blog')
    assert.equal(tagMap['JavaScript'].name, 'JavaScript')
  })

  it('tag entries', () => {
    assert.equal(tagMap['blog'].entries.length, 2)
    assert.equal(tagMap['test'].entries.length, 1)
  })
})
