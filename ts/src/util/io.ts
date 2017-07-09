const fs = require('fs');
const path = require('path');
const glob = require('glob');

export default class IO {
  static baseReadPath: Path = './'
  static baseWritePath: Path = './'

  static mkdirp(filepath: string) {
    const dirname = path.dirname(filepath)
    if (fs.existsSync(dirname)) {
      return;
    }
    IO.mkdirp(dirname)
    fs.mkdirSync(dirname)
  }

  static readFile(path: Path): string {
    return fs.readFileSync(this.baseReadPath + path, 'utf8');
  }

  static writeFile(filepath: Path, content: string) {
    this.mkdirp(this.baseWritePath + filepath)
    return fs.writeFileSync(filepath, content)
  }

  static readJSON(path: Path): any {
    return JSON.parse(this.readFile(path));
  }

  static readBlogConfig(path: Path): BlogConfig {
    return this.readJSON(path)
  }

  static readEntryConfig(path: Path): EntryConfig {
    return this.readJSON(path)
  }

  static g(globPath: string): Path[] {
    return glob.sync(IO.baseReadPath + globPath).map((filePath: Path) => path.relative(IO.baseReadPath, filePath))
  }
}
