import { Entry } from './entry'

export class EntryLinker {
  public name: string
  public entries: Entry[]

  public static link(entries: Entry[]): void {
    entries.forEach((e, idx) => {
      if (idx-1 >= 0) {
        e.newer = entries[idx-1]
      }
      if (idx+1 < entries.length) {
        e.older = entries[idx+1]
      }
    })
  }
}
