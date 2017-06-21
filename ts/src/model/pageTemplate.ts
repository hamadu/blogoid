import * as IO from '../util/io'
import { Entry } from './entry'

const handlebars = require('handlebars')

export class PageTemplate {
  public name: string
  public path: string
  public compiled: any  // TODO: use correct function type

  public static generate(name: string, path: Path): PageTemplate {
    const template = new PageTemplate();
    template.name = name
    template.path = path
    template.compiled = handlebars.compile(IO.readFile(path))
    return template
  }

  public apply(variables: any) {
    return this.compiled(variables)
  }
}
