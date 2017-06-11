import { Entry } from './entry'
import { EntrySet } from './entrySet'
import { Page } from './page'
import { PageTemplate } from './pageTemplate'
import { Tag } from './tag'

import * as IO from '../util/io'

export class Blog {
  public title: string;
  public entries: Entry[];
  public entrySets: EntrySet[];
  public pages: Page[];
  public templateMap: { [key: string]: PageTemplate }
  public tagMap: { [key: string]: Tag }

  public static generate(config: BlogConfig): Blog {
    const blog = new Blog();

    blog.title = config.title;
    blog.entries = IO.g(config.entries).map(path => Entry.generate(path, config));
    blog.entrySets = [];
    blog.pages = Object.keys(config.pages).map(path => Page.generate(path, config.pages[path]));

    // sort entry by publish

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

    return blog;
  }

  public dump(out: Path) {
    this.entries.filter((e) => !e.draft).forEach(entry => entry.dump(out))
    this.pages.forEach(page => page.dump(out))
  }
}
