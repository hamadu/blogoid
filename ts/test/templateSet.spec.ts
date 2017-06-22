import * as mocha from "mocha"
import * as assert from "assert"
import { TemplateSet } from "../src/model/templateSet"

const nameAndPath = {
  'one': 'ts/test/files/templates/templateOne.html',
  'two': 'ts/test/files/templates/templateTwo.html'
}

describe('generate', () => {
  const templateSet = TemplateSet.generate(nameAndPath)

  describe('get template by name', () => {
    it('one', () => assert.equal(templateSet.getTemplate('one').name, 'one'))
    it('two', () => assert.equal(templateSet.getTemplate('two').name, 'two'))
  })
})
