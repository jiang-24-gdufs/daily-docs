# [Assets](https://nuxt.com/docs/getting-started/assets#assets)

Nuxt uses two directories to handle assets like stylesheets, fonts or images.

- The [`public/` directory](https://nuxt.com/docs/guide/directory-structure/public) content is served at the server root as-is (内容按原样在服务器根目录中提供).
- The [`assets/` directory](https://nuxt.com/docs/guide/directory-structure/assets) contains by convention every asset that you want the build tool (Vite or webpack) to process.  (按照惯例，该[`assets/` directory](https://nuxt.com/docs/guide/directory-structure/assets)目录包含您希望**构建工具**（Vite 或 webpack）处理的所有资产)



## [`public/` Directory](https://nuxt.com/docs/getting-started/assets#public-directory)

The [`public/` directory](https://nuxt.com/docs/guide/directory-structure/public) is used as a public server for static assets (用作静态资产的公共服务器) publicly available at a defined URL of your application (可在应用程序定义的 URL 上公开访问).

You can get a file in the `public/` directory from your application's code or **from a browser** by the root URL `/`.

### [Example](https://nuxt.com/docs/getting-started/assets#example)

For example, referencing an image file in the `public/img/` directory, available at the static URL `/img/nuxt.png`:

```vue
// app.vue
<template>  
	<img src="/img/nuxt.png" alt="Discover Nuxt 3" />
</template>
```



## [`assets/` Directory](https://nuxt.com/docs/getting-started/assets#assets-directory)

Nuxt uses [Vite](https://vitejs.dev/guide/assets.html) or [webpack](https://webpack.js.org/guides/asset-management/) to build and bundle your application. 

The main function of these build tools is to process JavaScript files, but they can be extended through [plugins](https://vitejs.dev/plugins/) (for Vite) or [loaders](https://webpack.js.org/loaders/) (for webpack) to process other kind of assets, like stylesheets, fonts or SVG. 

This step transforms the original file mainly for performance or caching purposes (such as stylesheets minification or browser cache invalidation).

Nuxt使用Vite或webpack来构建和捆绑你的应用程序。

这些构建工具的主要功能是处理JavaScript文件，但它们可以通过插件（对于Vite）或加载器（对于webpack）扩展到处理其他类型的资产，如样式表、字体或SVG。

这一步主要是为了性能或缓存的目的（如样式表的最小化或浏览器缓存的无效化）而对原始文件进行转换。

By convention, Nuxt uses the `assets/` directory to store these files but there is no auto-scan functionality for this directory, and you can use any other name for it.

按照惯例，Nuxt使用assets/目录来存储这些文件，但这个目录没有自动扫描功能，你可以使用任何其他名称。

In your application's code, you can reference a file located in the `assets/` directory by using the `~/assets/` path.

在你的应用程序的代码中，你可以通过使用`~/assets/`路径来引用位于`assets/`目录下的文件。



### [Example](https://nuxt.com/docs/getting-started/assets#example-1)

For example, referencing an image file that will be processed if a build tool is configured to handle this file extension:

```vue
// app.vue
<template>  
	<img src="~/assets/img/nuxt.png" alt="Discover Nuxt 3" /></template>
```

> Nuxt 不会`assets/`以静态 URL 提供目录中的文件，例如`/assets/my-file.png`. 如果您需要静态 URL，请使用[`public/`](https://nuxt.com/docs/getting-started/assets#public-directory)目录



### [Global Styles Imports](https://nuxt.com/docs/getting-started/assets#global-styles-imports)

To globally insert statements in your Nuxt components styles, you can use the [`Vite`](https://nuxt.com/docs/api/configuration/nuxt-config#vite) option at your [`nuxt.config`](https://nuxt.com/docs/api/configuration/nuxt-config) file.