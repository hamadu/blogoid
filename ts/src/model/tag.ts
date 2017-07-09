import { Blog } from './blog'
import { Entry } from './entry'
import IO from '../util/io'

type TagMap = { [key: string]: Tag }

export class Tag {
  public readonly name: string
  public entries: Entry[]

  constructor(name: string) {
    this.name = name
    this.entries = []
  }

  public contents(): any {
    return {
      name: this.name,
      entries: this.entries
    }
  }

  public getPagePath() {
    return '/tags/' + this.name + '.html'
  }

  public dump(blog: Blog, target: Path): void {
    const template = blog.templateSet.getTemplate('tag')
    const value = this.contents()
    value.blog = blog
    IO.writeFile(target + this.getPagePath(), template.apply(value))
  }

  public static applyTags(entries: Entry[]): TagMap {
    const tagMap = this.aggregate(entries)
    entries.forEach(e => {
      e.tags = e.meta.tags.map((tag) => tagMap[tag])
    })
    return tagMap
  }

  public static aggregate(entries: Entry[]): TagMap {
    const tagMap: TagMap = {}
    entries.forEach(e => {
      e.meta.tags.forEach(tagName => {
        if (!tagMap[tagName]) {
          tagMap[tagName] = new Tag(tagName)
        }
        tagMap[tagName].entries.push(e)
        return tagMap[tagName]
      })
    })
    return tagMap
  }

}
