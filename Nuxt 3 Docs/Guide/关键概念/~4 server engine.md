[toc]

# [Server Engine](https://nuxt.com/docs/guide/concepts/server-engine#server-engine)

Nuxt 3 is powered by a new server engine, [Nitro](https://nitro.unjs.io/).

- Cross-platform support for Node.js, Browsers, service-workers and more.
- Serverless support out-of-the-box.
- API routes support.
- Automatic code-splitting and async-loaded chunks.
- Hybrid mode for static + serverless sites.
- Development server with hot module reloading.

> - 对Node.js、浏览器、服务人员等的跨平台支持。
> - 开箱即用的无服务器支持。
> - API路由支持。
> - 自动拆分代码和异步加载块。
> - 静态+无服务器站点的混合模式。
> - 具有热模块重新加载的开发服务器。



## [API Layer](https://nuxt.com/docs/guide/concepts/server-engine#api-layer) (API 层)

Server [API endpoints](https://nuxt.com/docs/guide/directory-structure/server#api-routes) and [Middleware](https://nuxt.com/docs/guide/directory-structure/server#server-middleware) are added by Nitro that internally uses [h3](https://github.com/unjs/h3).

服务器 （终端 & 中间件）由内部使用[h3](https://github.com/unjs/h3)的Nitro添加。

Key features include:

- Handlers can directly return objects/arrays for an automatically-handled JSON response
- Handlers can return promises, which will be awaited (`res.end()` and `next()` are also supported)
- Helper functions for body parsing, cookie handling, redirects, headers and more

> - 处理程序可以直接返回自动处理的JSON响应的对象/阵列
> - 处理程序可以返回 promise，which will be awaited（也支持`res.end()`和`next()`）
> - 用于 body 解析、cookie处理、重定向、标头等的助手功能

Check out [the h3 docs](https://github.com/unjs/h3) for more information.

Learn more about the API layer in the [`server/`](https://nuxt.com/docs/guide/directory-structure/server) directory.



## [Direct API Calls](https://nuxt.com/docs/guide/concepts/server-engine#direct-api-calls)

to be added



## [Typed API Routes](https://nuxt.com/docs/guide/concepts/server-engine#typed-api-routes)

...



## [Standalone Server](https://nuxt.com/docs/guide/concepts/server-engine#standalone-server)