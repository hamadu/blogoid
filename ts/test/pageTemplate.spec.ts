import * as mocha from "mocha"
import * as assert from "assert"
import { PageTemplate } from "../src/model/pageTemplate"

const template = new PageTemplate('name', 'ts/test/files/template.html')

describe('constructor', () => {
  it('name', () => {
    assert.equal(template.name, 'name')
  })
})

describe('apply', () => {
  it('apply title and body', () => {
    const output = template.apply({ title: 'sometitle', body: 'somebody' })
    assert.notEqual(output.indexOf('sometitle'), -1)
    assert.notEqual(output.indexOf('somebody'), -1)
  })
})
