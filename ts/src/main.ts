import { Blog } from './model/blog'
import * as IO from './util/io'


const config = IO.readBlogConfig('./sample/config.json')
const blog = Blog.generate(config)
blog.dump('./sample/out')

const stat = require('node-static');
const file = new stat.Server('./sample/out');

require('http').createServer((request: any, response: any) => {
  request.addListener('end', function () {
    file.serve(request, response)
  }).resume()
}).listen(8080)

const opn = require('opn')
opn('http://localhost:8080')
