import { Entry } from './entry'
import { Page } from './page'
import { PageTemplate } from './pageTemplate'
import { StaticFile } from './staticFile'
import { Tag } from './tag'

import { EntryLinker } from './entryLinker'
import { TemplateSet } from './templateSet'

import IO from '../util/io'

export class Blog {
  public title: string;
  public author: string;
  public entries: Entry[];
  public pages: Page[];
  public staticFiles: StaticFile[];
  public templateSet: TemplateSet
  public tagMap: { [key: string]: Tag }

  public recentEntries: Entry[];

  public static generate(config: BlogConfig): Blog {
    const blog = new Blog();

    blog.title = config.title;
    blog.author = config.author;
    blog.entries = IO.g(config.entries).map(path => Entry.generate(path));

    // pages
    blog.pages = Object.keys(config.pages).map(path => new Page(path, config.pages[path]));

    // static files
    blog.staticFiles = Object.keys(config.static).map(name =>
      StaticFile.generate(name, config.static[name])
    )

    // sort entry order by publish time
    blog.entries.sort((a, b) => b.publishOn.getTime() - a.publishOn.getTime())

    // link
    EntryLinker.link(blog.entries)

    // tags
    blog.tagMap = Tag.applyTags(blog.entries)

    // templates
    blog.templateSet = TemplateSet.generate(config.templates)

    // recent entries
    blog.recentEntries = blog.entries.slice(0, 5)

    return blog;
  }

  public dump(out: Path) {
    this.entries.filter((e) => !e.draft).forEach(entry => entry.dump(this, out))
    this.pages.forEach(page => page.dump(this, out))
    this.staticFiles.forEach(file => file.dump(out))

    Object.keys(this.tagMap).forEach(name => {
      this.tagMap[name].dump(this, out)
    })
  }
}
