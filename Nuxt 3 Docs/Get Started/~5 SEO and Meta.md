# [搜索引擎优化和元](https://nuxt.com/docs/getting-started/seo-meta#seo-and-meta)

通过强大的头部配置、可组合项和组件改进您的 Nuxt 应用程序的 SEO。

## [App Head](https://nuxt.com/docs/getting-started/seo-meta#app-head)

在nuxt.config.ts中提供一个app.head属性，允许你为整个应用程序定制头部。

为了使配置更容易，提供了快捷键：字符集和视口。你也可以提供下面列出的类型中的任何其他键。

默认值

- `charset`: `utf-8`

- `viewport`: `width=device-width, initial-scale=1`

  

### [Example](https://nuxt.com/docs/getting-started/seo-meta#example)

```vue
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      title: 'My App',
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'My amazing site.' }
      ],
    }
  }
})
```



### [Composable: `useHead`](https://nuxt.com/docs/getting-started/seo-meta#composable-usehead)



### [Components](https://nuxt.com/docs/getting-started/seo-meta#components)

Nuxt 提供组件`<Title>, <Base>, <NoScript>, <Style>, <Meta>, <Link>,<Body>, <Html>和<Head>`，以便您可以直接与组件模板中的元数据进行交互。

因为这些组件名称与原生 HTML 元素相匹配，所以在模板中将它们大写非常重要。

`<Head>`and`<Body>`可以接受嵌套元标记（出于美学原因），但这对嵌套元标记在最终 HTML 中的呈现*位置没有影响*



### [Example](https://nuxt.com/docs/getting-started/seo-meta#example-2)

...