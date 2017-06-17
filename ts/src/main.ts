import { Blog } from './model/blog'
import * as IO from './util/io'
const cmd = require('commander');

cmd.version('0.0.1')
   .option('-c, --config [path]', 'path to the config.json')
   .option('-o, --out [path]',    'output path')
   .parse(process.argv)


const config = IO.readBlogConfig(cmd.config)
const blog = Blog.generate(config)
blog.dump(cmd.out)

const stat = require('node-static');
const file = new stat.Server(cmd.out);

require('http').createServer((request: any, response: any) => {
  request.addListener('end', function () {
    file.serve(request, response)
  }).resume()
}).listen(8080)

const opn = require('opn')
opn('http://localhost:8080')
