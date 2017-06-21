import { Blog } from './blog'
import { Tag } from './tag'
import { PageTemplate } from './pageTemplate'
import * as IO from '../util/io'
const marked = require('marked')

type TagMap = { [key: string]: Tag }
type TemplateMap = { [key: string]: PageTemplate }

export class Entry {
  public meta: EntryConfig;

  public title: string;
  public path: string;
  public body: string;
  public template: PageTemplate;
  public draft: boolean;
  public tags: Tag[];
  public publishOn: Date;
  public newer: Entry;
  public older: Entry;

  public static generate(path: Path): Entry {
    const content = IO.readFile(path)

    const [head, body] = content.split('======')
    const meta: EntryConfig = JSON.parse(head)

    const entry = new Entry()

    entry.meta = meta
    entry.title = meta.title
    entry.path = meta.path
    entry.body = body
    entry.publishOn = new Date(meta.publishOn)
    entry.draft = meta.draft

    return entry;
  }

  public contents(): any {
    return {
      entry: this,
      content: marked(this.body)
    }
  }

  public dump(blog: Blog, target: Path): void {
    const value = this.contents()
    value.blog = blog
    IO.writeFile(target + '/' + this.path, this.template.apply(value))
  }
}
