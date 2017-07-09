# blogoid

[![CircleCI](https://circleci.com/gh/hamadu/blogoid.svg?style=svg)](https://circleci.com/gh/hamadu/blogoid)

[![Coverage Status](https://coveralls.io/repos/github/hamadu/blogoid/badge.svg?branch=master)](https://coveralls.io/github/hamadu/blogoid?branch=master)

simple blog(-ish) site generation tool

## usage

```
Usage: blogoid [options]

Options:

  -s, --scaffold       scaffold sample files and exit
  -h, --help           output usage information
  -V, --version        output the version number
  -c, --config [path]  path to the config.json
  -o, --out [path]     output path
  -p, --preview        preview after generate
```

## config.json

```
{
  "title": "Blog title",                    # site title
  "author": "Your name",                    # site author(s)
  "entries": "src/entries/**/*.md",         # path to the entries
  "static": {                               # path of the static files(it just copy&pasted)
    "styles/custom.css": "src/styles/custom.css"
  },
  "pages": {                                # page to the non-entry pages
    "index.html": "src/pages/index.html",
    "about.html": "src/pages/about.html"
  },
  "templates": {                            # name and path of templates
    "entry": "src/templates/entry.html",
    "tag": "src/templates/tag.html"
  }
}

```

## try it

```
$ npm install -g blogoid
$ blogoid -s --out sample
$ blogoid --config sample/config.json --out sample/out -p
```

This will output html/css files to `sample/out` and previewed in http://localhost:8080/ automatically. (Ctrl-c to stop)

## LICENSE

MIT
