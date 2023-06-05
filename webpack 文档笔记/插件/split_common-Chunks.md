# commonChunksPlugin

`CommonsChunkPlugin` 插件，是一个可选的用于**建立一个独立文件**(又称作 chunk)的功能，这个文件包括多个入口 `chunk` 的公共模块。

> The CommonsChunkPlugin 已经从 webpack v4 legato 中移除。
>
> 想要了解在最新版本中如何处理 chunk，请查看 [SplitChunksPlugin](https://www.webpackjs.com/plugins/split-chunks-plugin/)。

通过**将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存到缓存中供后续使用**。这个带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，而不是每次访问一个新页面时，再去加载一个更大的文件。

大概就是说：webpack打包的代码都是以chunk的形式存储的。但是呢，不同chunk里可能存在相同的模块，CommonsChunkplugin呢，就是把这些不同chunk里重复的模块提取出来放到一个公共chunk里。这个公共chunk只需要下载一次，就可以让所有的chunk都使用了。而且这部分代码可以放到缓存里，这样以后就不用再下载了(另外有写关于用webpack做缓存的[文章](https://juejin.im/post/5a705f6cf265da3e36418dc5)，有兴趣可以看看)。而且这么做每个chunk的代码也少了，所以每次加载的速度也更快。

```javascript
// webpack4中不再使用
new webpack.optimize.CommonsChunkPlugin(options)

{
  name: string, // or
  names: string[],
  // 这是 common chunk 的名称。已经存在的 chunk 可以通过传入一个已存在的 chunk 名称而被选择。
  // 如果一个字符串数组被传入，这相当于插件针对每个 chunk 名被多次调用
  // 如果该选项被忽略，同时 `options.async` 或者 `options.children` 被设置，所有的 chunk 都会被使用，
  // 否则 `options.filename` 会用于作为 chunk 名。
  // When using `options.async` to create common chunks from other async chunks you must specify an entry-point
  // chunk name here instead of omitting the `option.name`.

  filename: string,
  // common chunk 的文件名模板。可以包含与 `output.filename` 相同的占位符。
  // 如果被忽略，原本的文件名不会被修改(通常是 `output.filename` 或者 `output.chunkFilename`)。
  // This option is not permitted if you're using `options.async` as well, see below for more details.

  minChunks: number|Infinity|function(module, count) -> boolean,
  // 在传入  公共chunk(commons chunk) 之前所需要包含的最少数量的 chunks 。
  // 数量必须大于等于2，或者少于等于 chunks的数量
  // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
  // 你可以传入一个 `function` ，以添加定制的逻辑（默认是 chunk 的数量）

  chunks: string[],
  // 通过 chunk name 去选择 chunks 的来源。chunk 必须是  公共chunk 的子模块。
  // 如果被忽略，所有的，所有的 入口chunk (entry chunk) 都会被选择。

  children: boolean,
  // 如果设置为 `true`，所有公共 chunk 的子模块都会被选择

  deepChildren: boolean,
  // 如果设置为 `true`，所有公共 chunk 的后代模块都会被选择

  async: boolean|string,
  // 如果设置为 `true`，一个异步的  公共chunk 会作为 `options.name` 的子模块，和 `options.chunks` 的兄弟模块被创建。
  // 它会与 `options.chunks` 并行被加载。
  // Instead of using `option.filename`, it is possible to change the name of the output file by providing
  // the desired string here instead of `true`.

  minSize: number,
  // 在 公共chunk 被创建立之前，所有 公共模块 (common module) 的最少大小。
}
```



# splitChunksPlugin

Originally, **chunks (and modules imported inside them)** were **connected** by a **parent-child relationship **in the internal webpack **graph**.The `CommonsChunkPlugin` was used to avoid **duplicated dependencies **across them, but further optimizations were not possible.

从版本4开始，删除了 `CommonsChunkPlugin`，改为使用`optimization.splitChunks`和`optimization.runtimeChunk`选项。这是新流程的工作方式。



### 配置

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```



### 默认配置

默认情况下，它仅影响按需块，因为更改初始块会影响HTML文件应包含的脚本标签以运行项目。

webpack将根据以下条件自动分割块：

- 可以共享新块，或者模块来自`node_modules`文件夹
- 新的块将大于30kb（在min + gz之前）
- **按需加载块时并行请求**的最大数量将小于或等于5
- **初始页面加载时并行请求**的最大数量将小于或等于3

当试图满足最后两个条件时，最好使用较大的块。



### 默认示例

```js
// index.js
// dynamically import a.js
import("./a");

// a.js
import "react";	// -- 来自 node_modules 的模块
// ...
```

**Result:** A separate chunk would be created containing `react`. At the import call this chunk is loaded in parallel to the original chunk containing `./a`.

**结果：**将创建一个包含的单独块`react`。在导入调用中，此块与包含的原始块并行加载`./a`。

为什么：

- 条件1：该块包含来自以下模块 `node_modules`
- 条件2：`react`大于30kb
- 条件3：导入调用中的并行请求数为2
- 条件4：在初始页面加载时不影响请求

这背后的原因是什么？`react`可能不会像您的应用程序代码那样频繁地更改。通过将其移动到单独的块中，可以将该块与应用程序代码分开进行缓存（假设您使用的是块哈希，记录，Cache-Control或其他长期缓存方法）。



```js
// entry.js
// dynamically import a.js and b.js
import("./a");
import("./b");

// a.js
import "./helpers"; // helpers is 40kb in size
// ...

// b.js
import "./helpers";
import "./more-helpers"; // more-helpers is also 40kb in size
// ...
```

**Result:** A separate chunk would be created containing `./helpers` and all dependencies of it. At the import calls this chunk is loaded in parallel to the original chunks.

**结果：**将创建一个包含`./helpers`其所有依赖项的单独块。在导入调用时，该块将并行加载到原始块。

为什么：

- 条件1：块在两个导入调用之间共享
- 条件2：`helpers`大于30kb
- 条件3：导入调用中的并行请求数为2
- 条件4：在初始页面加载时不影响请求



### Split Chunks 示例

Create a `commons` chunk, which includes all code shared between entry points.

创建一个`commons`块，其中包括入口点之间共享的所有代码。

```js
splitChunks: {
    cacheGroups: {
        commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 2
        }
    }
}
```

> 此配置可以扩大您的初始捆绑包，建议在不需要立即使用模块时使用动态导入。



Create a `vendors` chunk, which includes all code from `node_modules` in the whole application.

创建一个`vendors`块，其中包括`node_modules`整个应用程序中的所有代码。

```js
splitChunks: {
    cacheGroups: {
        commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
        }
    }
}
```

> 这可能会导致包含所有外部程序包的较大块。建议仅包括您的核心框架和实用程序，并动态加载其余依赖项。



Create a `custom vendor` chunk, which contains certain `node_modules` packages matched by `RegExp`.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        }
      }
    }
  }
};
```

> This will result in splitting `react` and `react-dom` into a separate chunk. If you're not sure what packages have been included in a chunk you may refer to [Bundle Analysis](https://webpack.js.org/guides/code-splitting/#bundle-analysis) section for details.



[蚂蚁金服数据体验技术](https://juejin.im/post/5b304f1f51882574c72f19b0)

Webpack 4 下还有一个大改动，就是废弃了 CommonsChunkPlugin，引入了 `optimization.splitChunks` 这个选项。

`optimization.splitChunks` 默认是不用设置的。如果 mode 是 production，那 Webpack 4 就会开启 Code Splitting。

> 默认 Webpack 4 只会对按需加载的代码做分割。如果我们需要配置初始加载的代码也加入到代码分割中，可以设置 `splitChunks.chunks` 为 `'all'`。

Webpack 4 的 Code Splitting 最大的特点就是配置简单（0配置起步），和__基于内置规则自动拆分__。内置的代码切分的规则是这样的：

- 新 bundle 被两个及以上模块引用，或者来自 node_modules
- 新 bundle 大于 30kb （压缩之前）
- 异步加载并发加载的 bundle 数不能大于 5 个
- 初始加载的 bundle 数不能大于 3 个

简单的说，Webpack 会把代码中的公共模块自动抽出来，变成一个包，前提是这个包大于 30kb，不然 Webpack 是不会抽出公共代码的，因为增加一次请求的成本是不能忽视的。

具体的业务场景下，具体的拆分逻辑，可以看 [SplitChunksPlugin 的文档](https://webpack.js.org/plugins/split-chunks-plugin/)以及 [webpack 4: Code Splitting, chunk graph and the splitChunks optimization](https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366) 这篇博客。这两篇文章基本罗列了所有可能出现的情况。

如果是普通的应用，Webpack 4 内置的规则就足够了。


