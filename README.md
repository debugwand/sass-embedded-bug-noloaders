# PoC of import behaviour with sass / sass-embedded without any extra loaders

A follow-up from https://github.com/debugwand/sass-embedded-bug / https://github.com/webpack-contrib/sass-loader/issues/1203 - this shows that sass alone does not resolve nested `node_modules` folders, whereas it does when working with webpack and others. Therefore, the issue possibly lies in a combination of what is returned from `prev` in the `sass-embedded` importer being different to what is coming back from `sass`, and what is added in via webpack (see https://github.com/webpack-contrib/sass-loader/issues/1203#issuecomment-2148135806 onwards)

When using sass-loader and webpack, in certain conditions, a package is not resolved successfully using the `sass-embedded` implementation where it works in the `sass` implementation:

* a package has been installed as a dependency of a package instead of at the root `node_modules` folder
* a not necessarily related package's sass file has been imported twice
* this nested package's scss file is imported after the repeated import mentioned above

The webpack & loaders version of this PoC is at https://github.com/debugwand/sass-embedded-bug

While I discovered this issue using packages that had been installed from npm, in order to get a working demo without a lot of other distracting code, I've replaced these (large, noisy) dependency packages with minimal dependencies that have been mocked up in the `@somenamespace` folder. This will build either in situ or by moving it inside `node_modules`.

## Running the PoC

Clone this repo, cd into the directory and run the following:
* `npm install`
* `npm run build`

Regardless of whether you use sass or sass-embedded, you should see an error like:
```
"Error: Error: Can't find stylesheet to import.\n" +
        '  ╷\n' +
        "3 │ @import '@somenamespace/depz/main';\n" +
        '  │         ^^^^^^^^^^^^^^^^^^^^^^^^^^\n' +
```

## Isolating the issue

### build.js
If you add `'@somenamespace/mainSass/node_modules/'` to `includePaths` the CSS will successfully build. However, if you were dealing with a typical number of packages in a typical project, it wouldn't be practical to generate this list, including if you created it dynamically using `glob` which would have to recurse through a lot of subfolders

## Packages in use
* sass 1.77.4
* sass-embedded 1.77.2
