#!/usr/bin/env node

import { Blog } from './model/blog'
import IO from './util/io'
const fs = require('fs');
const cmd = require('commander')
const path = require('path')
const process = require('process')
const glob = require('glob')

cmd.version('0.0.4')
   .option('-s, --scaffold',      'scaffold sample source files', false)
   .option('-c, --config [path]', 'path to the config.json')
   .option('-o, --out [path]',    'output path')
   .option('-p, --preview',       'preview after generate', false)
   .parse(process.argv)

if (!cmd.out) {
  cmd.help()
}

if (cmd.scaffold) {
  glob.sync(path.join(__dirname, '..', 'sample', '**', '*.*')).forEach((filePath: Path) => {
    const writeFilePath = cmd.out + path.sep + path.relative(path.join(__dirname, '..', 'sample'), filePath)
    IO.mkdirp(writeFilePath)
    fs.writeFileSync(writeFilePath, fs.readFileSync(filePath, 'utf8'))
  })
  console.log(`generated sample files to ${cmd.out}.`)
  console.log(`If you want to preview, run command below.`)
  console.log(`> blogoid -c ${cmd.out}/config.json -o ${cmd.out}/out -p`)
  process.exit(0)
}

if (!cmd.config) {
  cmd.help()
}

const config = IO.readBlogConfig(cmd.config)

// TRICK: change read directory temporary to resolve a source file path relative to (directory of) config.json.
IO.baseReadPath = path.dirname(cmd.config) + path.sep

const blog = Blog.generate(config)
blog.dump(cmd.out)

if (cmd.preview) {
  const stat = require('node-static');
  const file = new stat.Server(cmd.out);
  require('http').createServer((request: any, response: any) => {
    request.addListener('end', function () {
      file.serve(request, response)
    }).resume()
  }).listen(8080)

  const opn = require('opn')
  opn('http://localhost:8080')
}
