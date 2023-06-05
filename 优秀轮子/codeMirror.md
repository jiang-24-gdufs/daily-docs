CodeMirror is a versatile text editor implemented in JavaScript for the browser. It is specialized for editing code, and comes with a number of [language modes](https://codemirror.net/mode/index.html) and [addons](https://codemirror.net/doc/manual.html#addons) that implement more advanced editing functionality.

A rich [programming API](https://codemirror.net/doc/manual.html#api) and a CSS [theming](https://codemirror.net/doc/manual.html#styling) system are available for customizing CodeMirror to fit your application, and extending it with new functionality.

## This is CodeMirror

```html
<!-- Create a simple CodeMirror instance -->
<link rel="stylesheet" href="lib/codemirror.css">
<script src="lib/codemirror.js"></script>
<script>
  var editor = CodeMirror.fromTextArea(myTextarea, {
    lineNumbers: true
  });
</script>
```

![img](./imgs/yinyang.png)

[DOWNLOAD](https://codemirror.net/codemirror.zip)

[FUND](https://marijnhaverbeke.nl/fund/)

Get the current version: [5.52.0](https://codemirror.net/codemirror.zip).
You can see the [code](https://github.com/codemirror/codemirror),
read the [release notes](https://codemirror.net/doc/releases.html),
or study the [user manual](https://codemirror.net/doc/manual.html).

Software needs maintenance,
maintainers need to subsist.
You can help [per month](https://marijnhaverbeke.nl/fund/) or [once](https://www.paypal.me/marijnhaverbeke).

## Features

- Support for [over 100 languages](https://codemirror.net/mode/index.html) out of the box
- A powerful, [composable](https://codemirror.net/mode/htmlmixed/index.html) language mode [system](https://codemirror.net/doc/manual.html#modeapi)
- [Autocompletion](https://codemirror.net/doc/manual.html#addon_show-hint) ([XML](https://codemirror.net/demo/xmlcomplete.html))
- [Code folding](https://codemirror.net/doc/manual.html#addon_foldcode)
- [Configurable](https://codemirror.net/doc/manual.html#option_extraKeys) keybindings
- [Vim](https://codemirror.net/demo/vim.html), [Emacs](https://codemirror.net/demo/emacs.html), and [Sublime Text](https://codemirror.net/demo/sublime.html) bindings
- [Search and replace](https://codemirror.net/doc/manual.html#addon_search) interface
- [Bracket](https://codemirror.net/doc/manual.html#addon_matchbrackets) and [tag](https://codemirror.net/doc/manual.html#addon_matchtags) matching
- Support for [split views](https://codemirror.net/demo/buffers.html)
- [Linter integration](https://codemirror.net/doc/manual.html#addon_lint)
- [Mixing font sizes and styles](https://codemirror.net/demo/variableheight.html)
- [Various themes](https://codemirror.net/demo/theme.html)
- Able to [resize to fit content](https://codemirror.net/demo/resize.html)
- [Inline](https://codemirror.net/doc/manual.html#mark_replacedWith) and [block](https://codemirror.net/doc/manual.html#addLineWidget) widgets
- Programmable [gutters](https://codemirror.net/demo/marker.html)
- Making ranges of text [styled, read-only, or atomic](https://codemirror.net/doc/manual.html#markText)
- [Bi-directional text](https://codemirror.net/demo/bidi.html) support
- Many other [methods](https://codemirror.net/doc/manual.html#api) and [addons](https://codemirror.net/doc/manual.html#addons)...

## Community

CodeMirror is an open-source project shared under an [MIT license](https://codemirror.net/LICENSE). It is the editor used in the dev tools for [Firefox](https://hacks.mozilla.org/2013/11/firefox-developer-tools-episode-27-edit-as-html-codemirror-more/), [Chrome](https://developers.google.com/chrome-developer-tools/), and [Safari](https://developer.apple.com/safari/tools/), in [Light Table](http://www.lighttable.com/), [Adobe Brackets](http://brackets.io/), [Bitbucket](http://blog.bitbucket.org/2013/05/14/edit-your-code-in-the-cloud-with-bitbucket/), and [many other projects](https://codemirror.net/doc/realworld.html).

Development and bug tracking happens on [github](https://github.com/codemirror/CodeMirror/) ([alternate git repository](http://marijnhaverbeke.nl/git/codemirror)). Please [read these pointers](https://codemirror.net/doc/reporting.html) before submitting a bug. Use pull requests to submit patches. All contributions must be released under the same MIT license that CodeMirror uses.

Discussion around the project is done on a [discussion forum](https://discuss.codemirror.net/). Announcements related to the project, such as new versions, are posted in the forum's ["announce"](https://discuss.codemirror.net/c/announce) category. If needed, you can contact [the maintainer](mailto:marijnh@gmail.com) directly. We aim to be an inclusive, welcoming community. To make that explicit, we have a [code of conduct](http://contributor-covenant.org/version/1/1/0/) that applies to communication around the project.

A list of CodeMirror-related software that is not part of the main distribution is maintained on [our wiki](https://github.com/codemirror/CodeMirror/wiki/CodeMirror-addons). Feel free to add your project.

## Browser support

The *desktop* versions of the following browsers, in *standards mode* (HTML5 `` recommended) are supported:

| Firefox                | version 4 and up   |
| :--------------------- | ------------------ |
| Chrome                 | any version        |
| Safari                 | version 5.2 and up |
| Internet Explorer/Edge | version 8 and up   |
| Opera                  | version 9 and up   |

Support for modern mobile browsers is experimental. Recent versions of the iOS browser and Chrome on Android should work pretty well.
