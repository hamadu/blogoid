import * as IO from '../util/io'

export class Page {
  public path: string;
  public content: string;

  public static generate(path: string, filePath: Path): Page {
    const page = new Page();
    page.path = path
    page.content = IO.readFile(filePath)
    return page
  }

  public dump(target: Path): void {
    IO.writeFile(target + '/' + this.path, this.content)
  }
}
