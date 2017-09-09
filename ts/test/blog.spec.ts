import * as mocha from "mocha"
import * as assert from "assert"
import { Blog } from "../src/model/blog"
import { BlogConfig } from "../src/config/blogConfig"

describe('generator', () => {
  const pseudoConfig: BlogConfig = {
    title: 'the title',
    author: 'the author',
    entries: 'ts/test/**/*.md',
    static: {},
    pages: {},
    templates: {}
  }

  const blog = Blog.generate(pseudoConfig)

  it('title', () => {
    assert.equal(blog.title, 'the title')
  })

  it('author', () => {
    assert.equal(blog.author, 'the author')
  })

  it('entries', () => {
    assert.equal(blog.entries.length, 2)
  })

  it('recent entries', () => {
    assert.equal(blog.recentEntries(1).length, 1)
  })
})
