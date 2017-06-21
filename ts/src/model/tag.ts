import { Entry } from './entry'

type TagMap = { [key: string]: Tag }

export class Tag {
  public name: string
  public entries: Entry[]

  public static generate(name: string): Tag {
    const tag = new Tag()
    tag.name = name
    tag.entries = []
    return tag
  }

  public static applyTags(entries: Entry[]): TagMap {
    const tagMap = this.aggregate(entries)
    entries.forEach(e => {
      e.tags = e.meta.tags.map((tag) => tagMap[tag])
    })
    return tagMap
  }

  private static aggregate(entries: Entry[]): TagMap {
    const tagMap: TagMap = {}
    entries.forEach(e => {
      e.meta.tags.forEach(tagName => {
        if (!tagMap[tagName]) {
          tagMap[tagName] = Tag.generate(tagName)
        }
        tagMap[tagName].entries.push(e)
        return tagMap[tagName]
      })
    })
    return tagMap
  }

}
