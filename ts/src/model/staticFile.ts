import * as IO from '../util/io'

export class StaticFile {
  public source: string;
  public path: string;

  public static generate(path: Path, source: string): StaticFile {
    const file = new StaticFile()
    file.path = path
    file.source = source
    return file
  }

  public dump(target: Path): void {
    IO.writeFile(target + '/' + this.path, IO.readFile(this.source))
  }
}
