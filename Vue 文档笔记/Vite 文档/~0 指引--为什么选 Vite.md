[toc]



# 为什么选 Vite[#](https://cn.vitejs.dev/guide/why.html#why-vite)

## 现实问题[#](https://cn.vitejs.dev/guide/why.html#the-problems)

在浏览器支持 ES 模块之前，JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发。

这也正是我们对 “打包” 这个概念熟悉的原因：使用工具抓取、处理并将我们的源码模块**串联**成可以在浏览器中运行的文件。

时过境迁，我们见证了诸如 [webpack](https://webpack.js.org/)、[Rollup](https://rollupjs.org/) 和 [Parcel](https://parceljs.org/) 等工具的变迁，它们极大地改善了前端开发者的开发体验。

然而，当我们开始构建越来越大型的应用时，需要处理的 JavaScript 代码量也呈指数级增长。包含数千个模块的大型项目相当普遍。

我们开始遇到性能瓶颈 —— 使用 JavaScript 开发的工具通常需要很长时间（甚至是几分钟！）才能启动开发服务器，即使使用 HMR，文件修改后的效果也需要几秒钟才能在浏览器中反映出来。如此循环往复，迟钝的反馈会极大地影响开发者的开发效率和幸福感。

**Vite 旨在利用生态系统中的新进展解决上述问题：浏览器开始原生支持 ES 模块，且越来越多 JavaScript 工具使用编译型语言编写。**



### 缓慢的服务器启动[#](https://cn.vitejs.dev/guide/why.html#slow-server-start)

当冷启动开发服务器时，基于打包器的方式启动必须优先抓取并**构建你的整个应用**，然后才能提供服务。

Vite 通过在一开始将应用中的模块区分为 **依赖** 和 **源码** 两类，改进了开发服务器启动时间。

- **依赖** 大多为在开发时**不会变动**的纯 JavaScript。一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS）。

  Vite 将会使用 [esbuild](https://esbuild.github.io/) [预构建依赖](https://cn.vitejs.dev/guide/dep-pre-bundling.html)。Esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。

- **源码** 通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。同时，**并不是所有的源码都需要同时被加载**（例如基于路由拆分的代码模块）。 (按需加载)

  Vite 以 [原生 ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在**浏览器请求源码时进行转换**并**按需提供源码**。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

![基于打包器的开发服务器](./imgs/bundler.37740380.png)

![基于 ESM 的开发服务器](./imgs/esm.3070012d.png)



基于打包器启动时，重建整个包的效率很低。原因显而易见：因为这样更新速度会随着应用体积增长而直线下降。

一些打包器的开发服务器**将构建内容存入内存**，这样它们只需要在文件更改时使模块图的一部分失活[[1\]](https://cn.vitejs.dev/guide/why.html#footnote-1)，但它也仍需要整个重新构建并重载页面。这样代价很高，并且重新加载页面会消除应用的当前状态，所以打包器支持了动态模块热重载（HMR）：允许一个模块 “热替换” 它自己，而不会影响页面其余部分。

这大大改进了开发体验 —— 然而，在实践中我们发现，即使采用了 HMR 模式，其热更新速度也会随着应用规模的增长而显著下降。



### vite 优化

在 Vite 中，HMR 是在原生 ESM 上执行的。

当编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活[[1\]](https://cn.vitejs.dev/guide/why.html#footnote-1)（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新。



Vite 同时利用 **HTTP 头来加速整个页面的重新加载** （再次让浏览器为我们做更多事情）：

- 源码模块的请求会根据 `304 Not Modified` 进行**协商缓存**
- 依赖模块请求则会通过 `Cache-Control: max-age=31536000,immutable` 进行**强缓存**，因此一旦被缓存它们将不需要再次请求。



## 为什么生产环境仍需打包 [#](https://cn.vitejs.dev/guide/why.html#why-bundle-for-production)

尽管原生 ESM 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP/2）。为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。

要确保开发服务器和生产环境构建之间的最优输出和行为一致并不容易。所以 Vite 附带了一套 [构建优化](https://cn.vitejs.dev/guide/features.html#build-optimizations) 的 [构建命令](https://cn.vitejs.dev/guide/build.html)，开箱即用。

### 为何不用 ESBuild 打包？[#](https://cn.vitejs.dev/guide/why.html#why-not-bundle-with-esbuild)

虽然 `esbuild` 快得惊人，并且已经是一个在构建库方面比较出色的工具，但一些针对构建 *应用* 的重要功能仍然还在持续开发中 —— 特别是代码分割和 CSS 处理方面。

就目前来说，**Rollup 在应用打包**方面更加成熟和灵活。尽管如此，当未来这些功能稳定后，我们也不排除使用 `esbuild` 作为生产构建器的可能。



## Vite 与 X 的区别是？

# 与其它非打包解决方案比较[#](https://cn.vitejs.dev/guide/comparisons.html#comparisons-with-other-no-bundler-solutions)

## Snowpack[#](https://cn.vitejs.dev/guide/comparisons.html#snowpack)

[Snowpack](https://www.snowpack.dev/) 也是一个与 Vite 十分类似的非构建式原生 ESM 开发服务器。除了不同的实现细节外，这两个项目在技术上比传统工具有很多共同优势。Vite 的依赖预构建也受到了 Snowpack v1（现在是 [`esinstall`](https://github.com/snowpackjs/snowpack/tree/main/esinstall)）的启发。这两个项目之间的一些主要区别是：

**生产构建**

Snowpack 的默认构建输出是未打包的：它将每个文件转换为单独的构建模块，然后将这些模块提供给执行实际绑定的不同“优化器”。这么做的好处是，你可以选择不同终端打包器，以适应不同需求（例如 webpack, Rollup，甚至是 ESbuild），缺点是体验有些支离破碎 —— 例如，`esbuild` 优化器仍然是不稳定的，Rollup 优化器也不是官方维护，而不同的优化器又有不同的输出和配置。

为了提供更流畅的体验，Vite 选择了与单个打包器（Rollup）进行更深入的集成。Vite 还支持一套 [通用插件 API](https://cn.vitejs.dev/guide/api-plugin.html) 扩展了 Rollup 的插件接口，开发和构建两种模式都适用。

由于构建过程的集成度更高，Vite 支持目前在 Snowpack 构建优化器中不可用的多种功能：

- [多页面应用支持](https://cn.vitejs.dev/guide/build.html#multi-page-app)
- [库模式](https://cn.vitejs.dev/guide/build.html#library-mode)
- [自动分割 CSS 代码](https://cn.vitejs.dev/guide/features.html#css-code-splitting)
- [预优化的异步 chunk 加载](https://cn.vitejs.dev/guide/features.html#async-chunk-loading-optimization)
- [对动态导入自动 polyfill](https://cn.vitejs.dev/guide/features.html#dynamic-import-polyfill)
- 官方 [兼容模式插件](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) 打包为现代/传统两种产物，并根据浏览器支持自动交付正确的版本。

**更快的依赖预构建**

Vite 使用 [esbuild](https://esbuild.github.io/) 而不是 Rollup 来进行依赖预构建。这为开发服务器冷启动和依赖项失活的重新构建方面带来了显著的性能改进。

**Monorepo 支持**

Vite 能够支持 monorepo，我们已经有用户成功地将 Vite 与基于 Yarn, Yarn 2 和 PNPM 的 monorepo 一起使用。

**CSS 预处理器支持**

Vite 为 Sass and Less 提供了更精细化的支持，包括改进 `@import` 解析（可使用别名与 npm 依赖）和 [提供 `url()` 内联引入与变基](https://cn.vitejs.dev/guide/features.html#import-inlining-and-rebasing)。

**Vue 第一优先级支持**

Vite 最初是作为 [Vue.js](https://vuejs.org/) 开发工具的未来基础而创建的。尽管 Vite 2.0 版本完全不依赖于任何框架，但官方 Vue 插件仍然对 Vue 的单文件组件格式提供了第一优先级的支持，涵盖了所有高级特性，如模板资源引用解析、``，``，自定义块等等。除此之外，Vite 还对 Vue 单文件组件提供了细粒度的 HMR。举个例子，更新一个单文件组件的 ` 或 `` 会执行不重置其状态的热更新。

## WMR[#](https://cn.vitejs.dev/guide/comparisons.html#wmr)

Preact 团队的 [WMR](https://github.com/preactjs/wmr) 提供了类似的特性集，而 Vite 2.0 对 Rollup 插件接口的支持正是受到了它的启发。

WMR 主要是为了 [Preact](https://preactjs.com/) 项目而设计，并为其提供了集成度更高的功能，比如预渲染。就使用范围而言，它更加贴合于 Preact 框架，与 Preact 本身一样强调紧凑的大小。如果你正在使用 Preact，那么 WMR 可能会提供更好的体验。

## @web/dev-server[#](https://cn.vitejs.dev/guide/comparisons.html#webdev-server)

[@web/dev-server](https://modern-web.dev/docs/dev-server/overview/)（曾经是 `es-dev-server`）是一个伟大的项目，基于 koa 的 Vite 1.0 开发服务器就是受到了它的启发。

`@web/dev-server` 适用范围不是很广。它并未提供官方的框架集成，并且需要为生产构建手动设置 Rollup 配置。

总的来说，与 `@web/dev-server` 相比，Vite 是一个更注重自身/更高层面的工具，旨在提供开箱即用的工作流。话虽如此，但 `@web` 这个项目群包含了许多其他的优秀工具，也可以使 Vite 用户受益。



#### monorepo

[Monorepo 是什么，为什么大家都在用？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/77577415)



### esbuild 为什么这么快

[esbuild - FAQ](https://esbuild.github.io/faq/)

esbuild 是新一代的 JavaScript 打包工具，以速度快著称，耗时只有 Webpack 的2%～3%。本文是该软件的作者谈它为什么这么快。

1. 是用[Go](https://golang.org/)编写的，并编译为 native code。

   Go 在线程之间共享内存，而 JavaScript 必须在线程之间序列化数据。

2. 充分使用并行提升效率

3. esbuild 中的所有内容都是从头开始编写的

4. 充分利用内存

5. 





