#!/usr/bin/env node

import { Blog } from './model/blog'
import IO from './util/io'
const cmd = require('commander');
const path = require('path');

cmd.version('0.0.1')
   .option('-c, --config [path]', 'path to the config.json')
   .option('-o, --out [path]',    'output path')
   .option('-p, --preview',       'preview after generate', false)
   .parse(process.argv)

if (!cmd.config || !cmd.out) {
  cmd.help()
}

const config = IO.readBlogConfig(cmd.config)

// TRICK: change read directory temporary to resolve a source file path relative to (directory of) config.json.
IO.baseReadPath = path.dirname(cmd.config) + '/'

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
