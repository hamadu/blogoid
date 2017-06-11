import { Entry } from './entry'

export class Tag {
  public name: string
  public entries: Entry[]

  public static generate(name: string): Tag {
    const tag = new Tag()
    tag.name = name
    tag.entries = []
    return tag
  }
}
