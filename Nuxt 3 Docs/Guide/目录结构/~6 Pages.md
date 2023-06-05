[toc]

# [Pages Directory](https://nuxt.com/docs/guide/directory-structure/pages#pages-directory)

Nuxt provides **a file-based routing(基于文件的路由)** to create routes within your web application using [Vue Router](https://router.vuejs.org/) under the hood.

> This directory is **optional**, meaning that [`vue-router`](https://router.vuejs.org/) won't be included if you only use [app.vue](https://nuxt.com/docs/guide/directory-structure/app) (unless you set `pages: true` in `nuxt.config` or have a [`app/router.options.ts`](https://nuxt.com/docs/guide/directory-structure/pages#router-options)), reducing your application's bundle size.
>
> 这个目录是可选的，这意味着如果你只使用app.vue，vue-router就不会被包括在内

## [Usage](https://nuxt.com/docs/guide/directory-structure/pages#usage)

Pages are Vue components and can have the `.vue`, `.js`, `.jsx`, `.ts` or `.tsx` extension.

```vue
// pages/index.vue
<template>
  <h1>Index page</h1>
</template>
```

```ts
// pages/index.ts
// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  render () {
    return h('h1', 'Index page')
  }
})
```

```tsx
// pages/index.tsx
// https://v3.nuxtjs.org/examples/advanced/jsx
// https://vuejs.org/guide/extras/render-function.html#jsx-tsx
export default defineComponent({
  render () {
    return <h1>Index page</h1>
  }
})
```

The `pages/index.vue` file will be mapped to the `/` route of your application. ( index.vue 映射到 `/`路由)

**If you are using [app.vue](https://nuxt.com/docs/guide/directory-structure/app), make sure to use the `<NuxtPage/>` component to display the current page**:

```vue
// app.vue
<template>
  <div>
    <!-- Markup shared across all pages, ex: NavBar (除了 NavBar?) --> 
    <NuxtPage />
  </div>
</template>

```

Pages **must have a single root element** to allow route transitions between pages. (HTML comments are considered elements as well.)



## [Dynamic Routes](https://nuxt.com/docs/guide/directory-structure/pages#dynamic-routes)

如果您将任何内容放在方括号内，它将变成[动态路由](https://router.vuejs.org/guide/essentials/dynamic-matching.html)参数。可以在一个文件名或目录中混合和匹配多个参数，甚至是非动态文本。

如果您希望参数是*可选*的，则必须将其括在双方括号中 - 例如，`~/pages/[[slug]]/index.vue`or`~/pages/[[slug]].vue`将同时匹配`/`和`/test`。

### Examples

```
-| pages/
---| index.vue
---| users-[group]/
-----| [id].vue

```

在上面的示例中，您可以通过`$route`对象访问组件中的 group/id：

```vue
pages/users-[group]/[id].vue
<template>
  <p>{{ $route.params.group }} - {{ $route.params.id }}</p>
</template>
```

Navigating to `/users-admins/123` would render:

```
<p>admins - 123</p>
```

如果你想使用 Composition API 访问路由，有一个全局`useRoute`函数可以让你像`this.$route`在 Options API 中一样访问路由。

```vue
<script setup>
const route = useRoute()

if (route.params.group === 'admins' && !route.params.id) {
  console.log('Warning! Make sure user is authenticated!')
}
</script>
```





## [Catch-all Route](https://nuxt.com/docs/guide/directory-structure/pages#catch-all-route)

If you need a catch-all route, you create it by using a file named like `[...slug].vue`. 

This will **match *all* routes** under that path.

```vue
<template>
  <p>{{ $route.params.slug }}</p>
</template>
```



Navigating to `/hello/world` would render:

```
<p>["hello", "world"]</p>
```



## [Nested Routes](https://nuxt.com/docs/guide/directory-structure/pages#nested-routes)

It is possible to display [nested routes](https://next.router.vuejs.org/guide/essentials/nested-routes.html) with `<NuxtPage>`.

Example:

```
-| pages/
---| parent/
------| child.vue
---| parent.vue

```

This file tree will generate these routes:

```ts
[ // 两个vue文件就是两个路由, 其中一个是子路由
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]

```

To display the `child.vue` component, you have to insert the `<NuxtPage>` component inside `pages/parent.vue`:

```vue
<template>
  <div>
    <h1>I am the parent view</h1>
    <NuxtPage :foobar="123" /> // 子路由分发
  </div>
</template>
```



## [Child Route Keys](https://nuxt.com/docs/guide/directory-structure/pages#child-route-keys)

## [Page Metadata](https://nuxt.com/docs/guide/directory-structure/pages#page-metadata)

You might want to **define metadata for each route** in your app. 

You can do this using the `definePageMeta` macro, which will work both in `` and in ``:

```vue
<script setup> 
// 在 page 中定义该页面路由的metadata
definePageMeta({
  title: 'My home page'
})
</script>
```

This data can then be accessed throughout the rest of your app from the `route.meta` object.

```vue
<script setup>
const route = useRoute()
console.log(route.meta.title) // My home page
</script>
```

使用嵌套路由，所有这些路由的页面元数据将合并到一个对象中。

> 有关路由元的更多信息，请参阅[vue-router 文档](https://router.vuejs.org/guide/advanced/meta.html#route-meta-fields)。

`definePageMeta`是一个**编译器宏**。它会被编译掉，所以你不能在你的组件中引用它。

相反，传递给它的元数据将被提升到组件之外。因此，页面元对象不能引用组件（或组件上定义的值）。

但是，它可以引用导入的绑定。

```vue
<script setup>
import { someData } from '~/utils/example'
const title = ref('')
definePageMeta({
  title,  // This will create an error
  someData
})
</script>
```



### [Special Metadata](https://nuxt.com/docs/guide/directory-structure/pages#special-metadata)

definePageMeta 参数的属性

- alias

- keepalive

- key

- layout

- middleware

- name

- path

  

### [Typing Custom Metadata](https://nuxt.com/docs/guide/directory-structure/pages#typing-custom-metadata)



## [Navigation](https://nuxt.com/docs/guide/directory-structure/pages/#navigation)

要在应用的页面之间导航，您应该使用该[`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link)  组件。

```
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
```

Learn more about [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) usage.



## [Router Options](https://nuxt.com/docs/guide/directory-structure/pages#router-options)

It is possible to customize [vue-router options](https://router.vuejs.org/api/interfaces/routeroptions.html).

TO BE ADDED...



### [Programmatic Navigation](https://nuxt.com/docs/guide/directory-structure/pages#programmatic-navigation)

编程式导航

`navigateTo()`