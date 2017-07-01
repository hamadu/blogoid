import * as IO from '../util/io'
import { Blog } from './blog'
import { Entry } from './entry'
import { PageTemplate } from './pageTemplate'

export class Page {
  public readonly targetPath: string;
  private readonly template: PageTemplate;

  constructor(targetPath: Path, sourceFilePath: Path) {
    this.template = new PageTemplate('tmp', sourceFilePath);
    this.targetPath = targetPath
  }

  public dump(blog: Blog, target: Path): void {
    const value = {
      blog: blog,
      entries: blog.entries
    }
    IO.writeFile(target + '/' + this.targetPath, this.template.apply(value))
  }
}
