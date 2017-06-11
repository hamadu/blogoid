import { Blog } from './blog'
import { Tag } from './tag'
import { PageTemplate } from './pageTemplate'
import * as IO from '../util/io'
const marked = require('marked')

type TagMap = { [key: string]: Tag }
type TemplateMap = { [key: string]: PageTemplate }

export class Entry {
  public meta: EntryConfig;
  public blog: Blog;

  public title: string;
  public path: string;
  public body: string;
  public template: PageTemplate;
  public draft: boolean;
  public tags: Tag[];
  public publishOn: Date;
  public newer: Entry;
  public older: Entry;

  public static generate(path: Path, blog: Blog): Entry {
    const content = IO.readFile(path)

    const [head, body] = content.split('======')
    const meta: EntryConfig = JSON.parse(head)

    const entry = new Entry()
    entry.blog = blog

    entry.meta = meta
    entry.title = meta.title
    entry.path = meta.path
    entry.body = body
    entry.publishOn = new Date(meta.publishOn)
    entry.draft = meta.draft

    return entry;
  }

  public applyTags(tags: TagMap) {
    this.tags = this.meta.tags.map((tag) => tags[tag])
  }

  public applyTemplate(templates: TemplateMap) {
    this.template = templates[this.meta.template]
  }

  public contents(): string {
    return this.template.apply({
      blog: this.blog,
      entry: this,
      content: marked(this.body)
    })
  }

  public dump(target: Path): void {
    IO.writeFile(target + '/' + this.path, this.contents())
  }
}
