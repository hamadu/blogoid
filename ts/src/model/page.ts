import * as IO from '../util/io'
import { Blog } from './blog'
import { Entry } from './entry'

const handlebars = require('handlebars')

export class Page {
  public path: string;
  public compiled: HandlebarsTemplateDelegate;

  public static generate(path: string, filePath: Path): Page {
    const page = new Page();
    page.path = path
    page.compiled = handlebars.compile(IO.readFile(filePath))
    return page
  }

  public dump(blog: Blog, target: Path): void {
    IO.writeFile(target + '/' + this.path, this.compiled({
      blog: blog,
      entries: blog.entries
    }))
  }
}
