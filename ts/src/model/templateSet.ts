import * as IO from '../util/io'
import { PageTemplate } from './pageTemplate'
import { Entry } from './entry'

const handlebars = require('handlebars')

export class TemplateSet {
  public nameMap: { [key: string]: PageTemplate }

  public static applyTemplates(entries: Entry[], templateSet: TemplateSet): void {
    entries.forEach(e => e.template = templateSet.nameMap[e.meta.template])
  }

  public static generate(namePathMap: { [key: string]: string}): TemplateSet {
    const templates = Object.keys(namePathMap).map(name => new PageTemplate(name, namePathMap[name]));

    const nameMap: { [key: string]: PageTemplate } = {}
    templates.forEach(template => {
      nameMap[template.name] = template
    })

    const set = new TemplateSet()
    set.nameMap = nameMap
    return set
  }
}
