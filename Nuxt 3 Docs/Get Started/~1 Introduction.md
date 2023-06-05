[TOC]

# Introduction

Nuxt is an open-source framework under MIT license for building modern and performant web applications that can be deployed on any platform running JavaScript.

## [What is Nuxt?](https://nuxt.com/docs/getting-started/introduction#what-is-nuxt)

要了解 Nuxt 是什么，我们需要了解创建现代应用程序需要什么：

- ### JavaScript框架

  一个带来反应性和网络组件的 JavaScript 框架，我们选择了 Vue.js。

- ### Webpack 和 Vite

  一个支持开发中模块热替换和打包生产代码的打包器，我们同时支持[webpack 5](https://webpack.js.org/)和[Vite](https://vitejs.dev/)。

- ### 最新的 JavaScript 语法

  一个在支持旧版浏览器的同时编写最新 JavaScript 语法的转译器，我们为此使用[esbuild](https://esbuild.github.io/)。

- ### 服务器端

  一个为开发中的应用程序提供服务的服务器，同时也支持[服务器端渲染](https://vuejs.org/api/ssr.html#server-side-rendering-api)或 API 路由，Nuxt 使用[h3](https://github.com/unjs/h3)实现部署的多功能性，例如无服务器、workers、Node.js 和无与伦比的性能。

- ### 路由库

  处理客户端导航的路由库，我们选择了[vue-router](https://router.vuejs.org/)。

这只是冰山一角，想象一下必须为您的项目设置所有这些，让它工作，然后随着时间的推移维护它。自 2016 年 10 月以来，我们一直在这样做，调整所有配置以为任何 Vue 应用程序提供最佳优化和性能。

Nuxt 负责这一点并提供前端和后端功能，因此您可以专注于重要的事情：**创建您的 Web 应用程序**。



### [View engine](https://nuxt.com/docs/getting-started/introduction#view-engine)

Nuxt 使用 Vue.js 作为视图引擎。

Nuxt 中提供了所有 Vue 3 功能。

您可以在[关键概念部分](https://nuxt.com/docs/guide/concepts/vuejs-development)阅读有关 Vue 与 Nuxt 集成的详细信息。



### [Automation and conventions](https://nuxt.com/docs/getting-started/introduction#automation-and-conventions)

Nuxt uses **conventions and an opinionated directory structure** to automate repetitive tasks and allow developers to focus on what matters. 

(使用约定和固执己见的目录结构来自动执行重复性任务) 

The configuration file can still customize and override its default behaviors.

- Auto-imports
- File-system routing and API layer
- Data-fetching utilities
- Zero-config TypeScript support
- Configured build tools

> Discover more in the [Key concepts section](https://nuxt.com/docs/guide/concepts/auto-imports).

### [Rendering modes](https://nuxt.com/docs/getting-started/introduction#rendering-modes)

Nuxt offers different rendering modes to accommodate various use-cases:

- Universal rendering (Server-side rendering and hydration)
- Client-side only rendering
- Full Static site generation
- Hybrid rendering (per-routes caching strategy)

> - 通用渲染（服务器端渲染和水化(or 水合作用)）
> - 仅客户端渲染
> - 全静态网站生成
> - 混合渲染（每路由缓存策略）

> Read more about [Nuxt rendering modes](https://nuxt.com/docs/guide/concepts/rendering).

## [Server engine](https://nuxt.com/docs/getting-started/introduction#server-engine)

Nuxt服务器引擎Nitro开启了新的全栈功能。

在开发过程中，它使用Rollup和Node.js工作者来处理你的服务器代码和上下文隔离。它还通过读取`server/api/`中的文件和`server/middleware/`中的服务器中间件生成你的服务器API。

In production, Nitro builds your app and server into one universal `.output` directory. 

This output is light: minified and removed from any Node.js modules (except polyfills). 

You can deploy this output on any system supporting JavaScript, from Node.js, Serverless, Workers, Edge-side rendering or purely static.

在生产中，Nitro将你的应用程序和服务器构建到一个通用的.output目录中。

这个输出是轻量级的：压缩过，并从任何Node.js模块中删除（除了polyfills）。

你可以在任何支持JavaScript的系统上部署这个输出，从Node.js、Serverless、Workers、Edge-side渲染或纯粹的静态。

> Read more about [Nuxt server engine](https://nuxt.com/docs/guide/concepts/server-engine).



### [Production-ready](https://nuxt.com/docs/getting-started/introduction#production-ready)

A Nuxt application can be deployed on a Node or Deno server, pre-rendered to be hosted in static environments, or deployed to serverless and edge providers.

Nuxt 应用程序可以部署在 Node 或 Deno 服务器上，预渲染以托管在静态环境中，或部署到无服务器和边缘提供商。



## [Modular](https://nuxt.com/docs/getting-started/introduction#modular)



## [Architecture](https://nuxt.com/docs/getting-started/introduction#architecture)

Nuxt 由不同的[核心包](https://github.com/nuxt/framework/tree/main/packages)组成：

- 核心引擎：[nuxt](https://github.com/nuxt/framework/tree/main/packages/nuxt)
- 打包器：[@nuxt/vite-builder](https://github.com/nuxt/framework/tree/main/packages/vite)和[@nuxt/webpack-builder](https://github.com/nuxt/framework/tree/main/packages/webpack)
- 命令行界面：[nuxi](https://github.com/nuxt/framework/tree/main/packages/nuxi)
- 服务器引擎：[nitro](https://github.com/unjs/nitro)
- 开发包：[@nuxt/kit](https://github.com/nuxt/framework/tree/main/packages/kit)
- Nuxt 2 Bridge：[@nuxt/bridge](https://github.com/nuxt/bridge)

我们建议阅读每个概念，以全面了解 Nuxt 的功能和每个包的范围。