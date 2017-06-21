import * as mocha from "mocha"
import * as assert from "assert"
import { Entry } from "../src/model/entry"

describe('generator', () => {
  const entry = Entry.generate('ts/test/files/entry.md')

  it('title', () => {
    assert.equal(entry.title, 'My First Entry')
  })

  it('path', () => {
    assert.equal(entry.path, '/dir1/first-entry.html')
  })

  it('body', () => {
    assert.notEqual(entry.body.indexOf("Yay! It's my first entry!"), -1)
  })

  it('draft flag', () => {
    assert.equal(entry.draft, false)
  })
})
