import * as IO from '../util/io'
import { Entry } from './entry'
import { DateHelper } from '../helper/dateHelper'

const ejs = require('ejs')

export class PageTemplate {
  public readonly name: string
  private readonly path: string
  private compiled: any  // TODO: use correct function type

  constructor(name: string, path: Path) {
    this.name = name
    this.path = path
  }

  public apply(variables: any) {
    this.compiled = this.compiled || ejs.compile(IO.readFile(this.path), { filename: this.path })
    variables.DateHelper = DateHelper;
    return this.compiled(variables)
  }
}
