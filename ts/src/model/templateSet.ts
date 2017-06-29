import * as IO from '../util/io'
import { PageTemplate } from './pageTemplate'
import { Entry } from './entry'

export class TemplateSet {
  private readonly nameMap: { [key: string]: PageTemplate }

  constructor(map: { [key: string]: PageTemplate }) {
    this.nameMap = map
  }

  public getTemplate(name: string): PageTemplate {
    return this.nameMap[name]
  }

  public static generate(namePathMap: { [key: string]: string}): TemplateSet {
    const templates = Object.keys(namePathMap).map(name => new PageTemplate(name, namePathMap[name]));

    const nameMap: { [key: string]: PageTemplate } = {}
    templates.forEach(template => {
      nameMap[template.name] = template
    })

    return new TemplateSet(nameMap)
  }
}
