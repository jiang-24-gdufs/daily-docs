[TOC]

# [Middleware Directory](https://nuxt.com/docs/guide/directory-structure/middleware#middleware-directory)

Nuxt provides a customizable **route middleware** framework you can use throughout your application, ideal for extracting code that you want to run before navigating to a particular route.

Nuxt 提供了一个可自定义的**路由中间件**框架，您可以在整个应用程序中使用它，非常适合在导航到特定路由之前提取要运行的代码。

> Route middleware run within the Vue part of your Nuxt app. Despite the similar name, they are completely different from server middleware, which are run in the Nitro server part of your app.
>
> 路由中间件在 Nuxt 应用程序的 Vue 部分中运行。尽管名称相似，但它们与服务器中间件完全不同，服务器中间件在应用程序的 Nitro 服务器部分运行。



There are three kinds of route middleware:

1. Anonymous (or inline) route middleware, which are **defined** directly in the **pages** where they are used.

   匿名（或内联）路由中间件，直接在使用它们的页面中定义

2. Named route middleware, which are placed in the `middleware/` directory and will be automatically loaded via asynchronous import when used on a page. 

   具名路由中间件，放在`middleware/`目录下，页面使用时会异步导入自动加载。

   (**Note**: The route middleware name is normalized to kebab-case (名称被规范化为 kebab-case) , so `someMiddleware` becomes `some-middleware`.)

3. **Global** route middleware, which are placed in the `middleware/` directory (with a `.global` suffix) and will be automatically run on every route change.

   全局路由中间件，放在`middleware/`目录下（带`.global`后缀），每次路由变化都会自动运行。

The first two kinds of route middleware can be [defined in `definePageMeta`](https://nuxt.com/docs/guide/directory-structure/pages).



## [Format](https://nuxt.com/docs/guide/directory-structure/middleware#format)

路由中间件是接收当前路由和下一个路由作为参数的导航守卫。

```JS
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.params.id === '1') {
    return abortNavigation()
  }
  return navigateTo('/')
})
```

Nuxt 提供了两个全局可用的 helper function，可以直接从中间件返回：

1. `navigateTo (to: RouteLocationRaw | undefined | null, options?: { replace: boolean, redirectCode: number, external: boolean )`- 重定向到给定的路由，在插件或中间件内。也可以直接调用它来进行页面导航。
2. `abortNavigation (err?: string | Error)`- 中止导航，带有可选的错误消息。



## [动态添加中间件](https://nuxt.com/docs/guide/directory-structure/middleware#adding-middleware-dynamically)

可以使用`addRouteMiddleware()`辅助函数手动添加全局或命名路由中间件，例如从插件中。