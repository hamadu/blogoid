import * as IO from '../util/io'
import { Blog } from './blog'
import { Entry } from './entry'

const handlebars = require('handlebars')

export class Page {
  public blog: Blog;
  public path: string;
  public compiled: HandlebarsTemplateDelegate;

  public static generate(blog: Blog, path: string, filePath: Path): Page {
    const page = new Page();
    page.blog = blog
    page.path = path
    page.compiled = handlebars.compile(IO.readFile(filePath))
    return page
  }

  public dump(target: Path): void {
    IO.writeFile(target + '/' + this.path, this.compiled({
      blog: this.blog,
      entries: this.blog.entries
    }))
  }
}
