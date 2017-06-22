import * as mocha from "mocha"
import * as assert from "assert"
import { Page } from "../src/model/page"

describe('constructor', () => {
  const page = new Page('target/path.html', 'ts/test/files/templates/templateOne.html')

  it('targetPath', () => {
    assert.equal(page.targetPath, 'target/path.html')
  })
})
