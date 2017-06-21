import { Entry } from './entry'
import { EntrySet } from './entrySet'
import { Page } from './page'
import { PageTemplate } from './pageTemplate'
import { StaticFile } from './staticFile'
import { Tag } from './tag'

import { EntryLinker } from './entryLinker'
import { TemplateSet } from './templateSet'

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
    blog.entries = IO.g(config.entries).map(path => Entry.generate(path));

    // pages
    blog.pages = Object.keys(config.pages).map(path =>
      Page.generate(path, config.pages[path])
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
    EntryLinker.link(blog.entries)

    // tags
    blog.tagMap = Tag.applyTags(blog.entries)

    // templates
    const templateSet = TemplateSet.generate(config.templates)
    TemplateSet.applyTemplates(blog.entries, templateSet)

    // recent entries
    blog.recentEntries = blog.entries.slice(0, 5)

    return blog;
  }

  public dump(out: Path) {
    this.entries.filter((e) => !e.draft).forEach(entry => entry.dump(this, out))
    this.pages.forEach(page => page.dump(this, out))
    this.staticFiles.forEach(file => file.dump(out))
  }
}
