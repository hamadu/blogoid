import * as IO from '../util/io'
import { Blog } from './blog'
import { Entry } from './entry'

const handlebars = require('handlebars')

export class Page {
  public readonly targetPath: string;
  private readonly compiled: HandlebarsTemplateDelegate;

  constructor(targetPath: Path, sourceFilePath: Path) {
    this.targetPath = targetPath
    this.compiled = handlebars.compile(IO.readFile(sourceFilePath))
  }

  public dump(blog: Blog, target: Path): void {
    IO.writeFile(target + '/' + this.targetPath, this.compiled({
      blog: blog,
      entries: blog.entries
    }))
  }
}
