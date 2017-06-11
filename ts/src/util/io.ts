const fs = require('fs');
const path = require('path');
const glob = require('glob');

function mkdirp(filepath: string) {
    const dirname = path.dirname(filepath);
    if (fs.existsSync(dirname)) {
      return;
    }
    mkdirp(dirname);
    fs.mkdirSync(dirname);
}

export function readFile(path: Path): string {
  return fs.readFileSync(path, 'utf8');
}

export function writeFile(filepath: Path, content: string) {
  mkdirp(filepath)
  return fs.writeFileSync(filepath, content)
}

export function readJSON(path: Path): any {
  return JSON.parse(readFile(path));
}

export function readBlogConfig(path: Path): BlogConfig {
  return readJSON(path)
}

export function readEntryConfig(path: Path): EntryConfig {
  return readJSON(path)
}

export function g(path: string): Path[] {
  return glob.sync(path)
}
