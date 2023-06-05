# 渐进式网络应用程序

渐进式网络应用程序(Progressive Web Application - PWA)，是一种可以提供类似于原生应用程序(native app)体验的网络应用程序(web app)。PWA 可以用来做很多事。其中最重要的是，在**离线(offline)**时应用程序能够继续运行功能。这是通过使用名为 [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/) 的网络技术来实现的。

本章将重点介绍，如何为我们的应用程序添加离线体验。我们将使用名为 [Workbox](https://github.com/GoogleChrome/workbox) 的 Google 项目来实现此目的，该项目提供的工具可帮助我们更轻松地配置 web app 的离线支持。



## 添加 Workbox

添加 workbox-webpack-plugin 插件，并调整 `webpack.config.js` 文件：

```bash
npm install workbox-webpack-plugin --save-dev
```

**webpack.config.js**

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const WorkboxPlugin = require('workbox-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
+     title: 'Progressive Web Application'
+   }),
+   new WorkboxPlugin.GenerateSW({
+     // 这些选项帮助 ServiceWorkers 快速启用
+     // 不允许遗留任何“旧的” ServiceWorkers
+     clientsClaim: true,
+     skipWaiting: true
+   })
  ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

有了 Workbox，我们再看下执行 `npm run build` 时会发生什么：

```bash
clean-webpack-plugin: /mnt/c/Source/webpack-follow-along/dist has been removed.
Hash: 6588e31715d9be04be25
Version: webpack 3.10.0
Time: 782ms
                                                Asset       Size  Chunks                    Chunk Names
                                         app.bundle.js     545 kB    0, 1  [emitted]  [big]  app
                                      print.bundle.js    2.74 kB       1  [emitted]         print
                                           index.html  254 bytes          [emitted]
precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js  268 bytes          [emitted]
                                                sw.js       1 kB          [emitted]
   [0] ./src/print.js 87 bytes {0} {1} [built]
   [1] ./src/index.js 477 bytes {0} [built]
   [3] (webpack)/buildin/global.js 509 bytes {0} [built]
   [4] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
Child html-webpack-plugin for "index.html":
     1 asset
       [2] (webpack)/buildin/global.js 509 bytes {0} [built]
       [3] (webpack)/buildin/module.js 517 bytes {0} [built]
        + 2 hidden modules
```

现在你可以看到，生成了 2 个额外的文件：`sw.js` 和体积很大的 `precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js`。`sw.js` 是 Service Worker 文件，`precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js` 是 `sw.js` 引用的文件，所以它也可以运行。可能在你本地生成的文件会有所不同；但是你那里应该会有一个 `sw.js` 文件。