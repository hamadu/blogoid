# blogoid

simple blog(-ish) site generation tool

## usage

```
Usage: blogoid [options]

Options:

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
  "entries": "sample/src/entries/**/*.md",  # path to the entries
  "static": {                               # path of the static files(it just copy&pasted)
    "styles/custom.css": "sample/src/styles/custom.css"
  },
  "pages": {                                # page to the non-entry pages
    "index.html": "sample/src/pages/index.html",
    "about.html": "sample/src/pages/about.html"
  },
  "templates": {                            # name and path of templates
    "entry": "sample/src/templates/entry.html",
    "tag": "sample/src/templates/tag.html"
  },
  "partials": {                             # name and path of template partials(can be used in the templates above)
    "header": "sample/src/partials/header.html",
    "footer": "sample/src/partials/footer.html",
    "javascripts": "sample/src/partials/javascripts.html",
    "styles": "sample/src/partials/styles.html"
  }
}

```

## try it

```
$ npm install -g blogoid
$ # copy sample directories from this repository
$ blogoid --config sample/config.json --out sample/out -p
```

This will output html/css files to `sample/out` and previewed in http://localhost:8080/ automatically. (Ctrl-c to stop)

## LICENSE

MIT
