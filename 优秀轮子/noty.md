[toc]

## Hi

**NOTY** is a notification library that makes it easy to create **alert** - **success** - **error** - **warning** - **information** - **confirmation** messages as an alternative the standard alert dialog.

The notifications can be positioned at the;
**top** - **topLeft** - **topCenter** - **topRight** - **center** - **centerLeft** - **centerRight** - **bottom** - **bottomLeft** - **bottomCenter** - **bottomRight**

There are lots of other options in the API to customise the text, animation, buttons and much more.

It also has various callbacks for the buttons, opening closing the notifications and queue control.

### Features

- [x] Dependency-free
- [x] Web Push Notifications with Service Worker support
- [x] UMD
- [x] Named queue system
- [x] Has 11 layouts, 5 notification styles, 5+ themes
- [x] Custom container (inline notifications)
- [x] Confirm notifications
- [x] TTL
- [x] Progress bar indicator for timed notifications
- [x] Supports css animations, [animate.css](https://github.com/daneden/animate.css), [mojs](https://github.com/legomushroom/mojs), [bounce.js](https://github.com/tictail/bounce.js), [velocity](https://github.com/julianshapiro/velocity) and other animation libraries
- [x] 2 close options: click, button
- [x] API & Callbacks
- [x] Custom templating
- [x] Document visibility control (blur, focus)

### Documentation

Documentation and examples are here: <http://ned.im/noty>

---

##### Basic Usage

```js
import Noty from "noty";

new Noty({
  text: "Notification text"
}).show();

// or

const Noty = require("noty");

new Noty({
  text: "Notification text"
}).show();
```

##### Development

```
$ npm run dev
$ npm test
$ npm run build
$ npm run browserstack
$ npm run serve-docs
```

##### Development environment

- [x] Standard
- [x] Prettier
- [x] ES6 & Babel & Webpack
- [x] Sass
- [x] Autoprefixer
- [x] QUnit
- [x] BrowserStack
- [x] Pre-commit tests
- [x] Travis CI
