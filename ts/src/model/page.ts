import * as IO from '../util/io'
import { Blog } from './blog'
import { Entry } from './entry'

const ejs = require('ejs')

export class Page {
  public readonly targetPath: string;
  private readonly compiled: any;

  constructor(targetPath: Path, sourceFilePath: Path) {
    this.targetPath = targetPath
    this.compiled = ejs.compile(IO.readFile(sourceFilePath), { filename: sourceFilePath })
  }

  public dump(blog: Blog, target: Path): void {
    IO.writeFile(target + '/' + this.targetPath, this.compiled({
      blog: blog,
      entries: blog.entries,
      format: require('date-fns/format')
    }))
  }
}
