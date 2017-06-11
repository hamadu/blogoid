import { Blog } from './model/blog'
import * as IO from './util/io'

const glob = require('glob')

const config = IO.readBlogConfig('./sample/config.json')

const blog = Blog.generate(config)
blog.dump('./sample/out')
