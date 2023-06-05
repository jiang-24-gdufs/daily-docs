# [Server Directory](https://nuxt.com/docs/guide/directory-structure/server#server-directory)

Nuxt automatically scans files inside the `~/server/api`, `~/server/routes`, and `~/server/middleware` directories to register API and server handlers with HMR support (以注册支持HMR的API和服务器处理程序).

Each file should export a default function defined with `defineEventHandler()`.

The handler can directly return JSON data, a `Promise` or use `event.node.res.end()` to send response.

## [Example](https://nuxt.com/docs/guide/directory-structure/server#example)

Create a new file in `server/api/hello.ts`:

server/api/hello.ts

```ts
export default defineEventHandler((event) =>  
	return {    api: 'works'  }
})
```

Copy to clipboard

You can now universally call this API using `await $fetch('/api/hello')`.



## [Server Routes](https://nuxt.com/docs/guide/directory-structure/server#server-routes)

Files inside the `~/server/api` are automatically prefixed with `/api` in their route.

 For adding server routes without `/api` prefix, you can instead put them into `~/server/routes` directory.

`~/server/api`里面的文件会自动在路由中加上/api的前缀。

对于添加没有`/api`前缀的服务器路由，你可以改成把它们放到`~/server/routes`目录下。

```ts
// server/routes/hello.ts
export default defineEventHandler(() => 'Hello World!')
```

`/hello`路由可以在`http://localhost:3000/hello`访问。



## [Server Middleware](https://nuxt.com/docs/guide/directory-structure/server#server-middleware)

Nuxt will automatically read in any file in the `~/server/middleware` to **create server middleware** for your project.

中间件处理程序将在任何其他服务器路由之前针对每个请求运行，以添加或检查标头、记录请求或扩展事件的请求对象。

> 中间件处理程序不应该返回任何东西（也不关闭或响应请求）并且只检查或扩展请求上下文或抛出错误。

Examples:

```ts
// server/middleware/log.ts
export default defineEventHandler((event) =>
  console.log('New request: ' + event.node.req.url)
})

// server/middleware/auth.ts
export default defineEventHandler((event) =>
  event.context.auth = { user: 123 }
})
```



## [Server Plugins](https://nuxt.com/docs/guide/directory-structure/server#server-plugins)

Nuxt will automatically read any files in the `~/server/plugins` directory and **register them as Nitro plugins (注册为 Nitro 插件)**. 

This allows extending Nitro's runtime behavior and hooking into lifecycle events.

这允许扩展 Nitro 的运行时行为并连接到生命周期事件中。

Example:

```ts
// server/plugins/nitroPlugin.ts
export default defineNitroPlugin((nitroApp) =>
  console.log('Nitro plugin', nitroApp)
})
```



## [Server Utilities](https://nuxt.com/docs/guide/directory-structure/server#server-utilities)

Server routes are powered by [unjs/h3](https://github.com/unjs/h3) which comes with a handy set of helpers.

> Read more in [Available H3 Request Helpers](https://www.jsdocs.io/package/h3#package-index-functions).

You can add more helpers yourself inside the `~/server/utils` directory.



## [Usage Examples](https://nuxt.com/docs/guide/directory-structure/server#usage-examples)

TO BE ADDED
