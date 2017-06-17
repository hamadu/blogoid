import { Entry } from './entry'
import { EntrySet } from './entrySet'
import { Page } from './page'
import { PageTemplate } from './pageTemplate'
import { StaticFile } from './staticFile'
import { Tag } from './tag'

const handlebars = require('handlebars')

import * as IO from '../util/io'

export class Blog {
  public title: string;
  public author: string;
  public entries: Entry[];
  public entrySets: EntrySet[];
  public pages: Page[];
  public staticFiles: StaticFile[];
  public templateMap: { [key: string]: PageTemplate }
  public tagMap: { [key: string]: Tag }

  public recentEntries: Entry[];

  public static generate(config: BlogConfig): Blog {
    const blog = new Blog();

    blog.title = config.title;
    blog.author = config.author;
    blog.entries = IO.g(config.entries).map(path => Entry.generate(path, blog));
    blog.entrySets = [];

    // pages
    blog.pages = Object.keys(config.pages).map(path =>
      Page.generate(blog, path, config.pages[path])
    );

    // static files
    blog.staticFiles = Object.keys(config.static).map(name =>
      StaticFile.generate(name, config.static[name])
    )

    // register partials
    Object.keys(config.partials).map(name => handlebars.registerPartial(name, IO.readFile(config.partials[name])))

    // sort entry order by publish time
    blog.entries.sort((a, b) => b.publishOn.getTime() - a.publishOn.getTime())

    // link
    blog.entries.forEach((e, idx) => {
      if (idx-1 >= 0) {
        e.newer = blog.entries[idx-1]
      }
      if (idx+1 < blog.entries.length) {
        e.older = blog.entries[idx+1]
      }
    })

    // prepare templates
    blog.templateMap = {}
    const templates = Object.keys(config.templates).map(name => PageTemplate.generate(name, config.templates[name]));
    templates.forEach(template => {
      blog.templateMap[template.name] = template
    })

    // prepare tags
    blog.tagMap = {}
    blog.entries.forEach(e => {
      e.meta.tags.forEach(tagName => {
        if (!blog.tagMap[tagName]) {
          blog.tagMap[tagName] = Tag.generate(tagName)
        }
        blog.tagMap[tagName].entries.push(e)
        return blog.tagMap[tagName]
      })
    })

    // apply template and tag
    blog.entries.forEach(e => e.applyTemplate(blog.templateMap))
    blog.entries.forEach(e => e.applyTags(blog.tagMap))

    blog.recentEntries = blog.entries.slice(0, 5)

    return blog;
  }

  public dump(out: Path) {
    console.log(this.staticFiles)
    
    // process pages
    this.entries.filter((e) => !e.draft).forEach(entry => entry.dump(out))
    this.pages.forEach(page => page.dump(out))
    this.staticFiles.forEach(file => file.dump(out))
  }
}
