import * as IO from '../util/io'
import { Entry } from './entry'

const handlebars = require('handlebars')

export class PageTemplate {
  public readonly name: string
  private readonly path: string
  private compiled: any  // TODO: use correct function type

  constructor(name: string, path: Path) {
    this.name = name
    this.path = path
  }

  public apply(variables: any) {
    this.compiled = this.compiled || handlebars.compile(IO.readFile(this.path))
    return this.compiled(variables)
  }
}
