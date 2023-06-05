# [Plugins Directory](https://nuxt.com/docs/guide/directory-structure/plugins#plugins-directory)

Nuxt automatically reads the files in your `plugins` directory and loads them at the creation of the Vue application. 

You can use `.server` or `.client` suffix in the file name to load a plugin only on the server or client side.

> Nuxt 自动读取`plugins`目录中的文件并在创建 Vue 应用程序时加载它们。
>
> 您可以在文件名中使用`.server`或`.client`后缀来仅在服务器端或客户端加载插件。
>
> 您目录中的所有插件`plugins/`都是自动注册的，因此您不应将它们`nuxt.config`单独添加到您的目录中。



## [注册了哪些文件](https://nuxt.com/docs/guide/directory-structure/plugins#which-files-are-registered)

只有目录顶层的`plugins/`文件（或任何子目录中的索引文件）才会被注册为插件。

```ts
plugins
 | - myPlugin.ts (√)
 | - myOtherPlugin
 | --- supportingFile.ts
 | --- componentToRegister.vue
 | --- index.ts (√)
```

Only `myPlugin.ts` and `myOtherPlugin/index.ts` would be registered.



## [Creating Plugins](https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins)

The only argument passed to a plugin is [`nuxtApp`](https://nuxt.com/docs/api/composables/use-nuxt-app).

```ts
export default defineNuxtPlugin(nuxtApp =>  
	// Doing something with nuxtApp
})
```

在 nuxtApp 上拓展, 可以提供给所有文件使用.

## [Plugin Registration Order](https://nuxt.com/docs/guide/directory-structure/plugins#plugin-registration-order)

在文件名前加上数字前缀来控制插件的注册顺序。

```
plugins/
 | - 1.myPlugin.ts
 | - 2.myOtherPlugin.ts
```

在此示例中，`2.myOtherPlugin.ts`将能够访问由 注入的任何内容`1.myPlugin.ts`。

这在您有一个依赖于另一个插件的插件的情况下很有用



## [Using Composables Within Plugins](https://nuxt.com/docs/guide/directory-structure/plugins#using-composables-within-plugins)

可以在 Nuxt 插件中使用[composables](https://nuxt.com/docs/guide/directory-structure/composables) 

```ts
export default defineNuxtPlugin((NuxtApp) => {
  const foo = useFoo()
})

```

但是，请记住存在一些限制和差异：

- **如果可组合项依赖于稍后注册的另一个插件，则它可能无法工作。**

  **原因：**插件按顺序调用，并且在其他所有内容之前调用。您可能会使用依赖于另一个尚未调用的插件的可组合项。

- **如果可组合项依赖于 Vue.js 生命周期，它将无法工作。**

  **原因：**通常，Vue.js 可组合项绑定到当前组件实例，而插件仅绑定到`nuxtApp`实例。



## [Automatically Providing Helpers](https://nuxt.com/docs/guide/directory-structure/plugins#automatically-providing-helpers)

If you would like to **provide a helper** on the `NuxtApp` instance, return it from the plugin under a `provide` key. 

For example:

```ts
export default defineNuxtPlugin(() => {
  return {
    provide: {
      hello: (msg: string) => `Hello ${msg}!`
    }
  }
})

```

In another file you can use this:

```vue
<template>
  <div>
    {{ $hello('world') }}
  </div>
</template>

<script setup lang="ts">
// alternatively, you can also use it here
const { $hello } = useNuxtApp()
</script>

```





## [Typing Plugins](https://nuxt.com/docs/guide/directory-structure/plugins#typing-plugins)

TO BE ADDED

## [Vue Plugins](https://nuxt.com/docs/guide/directory-structure/plugins#vue-plugins)

如果你想使用 Vue 插件，比如[vue-gtag](https://github.com/MatteoGabriele/vue-gtag)来添加 Google Analytics 标签，你可以使用 Nuxt 插件来实现。

> 有一个 Open RFC 可以使这更容易！参见[nuxt/framework#1175](https://github.com/nuxt/framework/discussions/1175)

首先，安装你想要的插件。

```
yarn add --dev vue-gtag-next
```



然后创建一个插件文件`plugins/vue-gtag.client.js`。

```TS
import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'GA_MEASUREMENT_ID'
    }
  })
})
```

## [Vue 指令](https://nuxt.com/docs/guide/directory-structure/plugins#vue-directives)

同样，您可以在插件中注册**自定义 Vue 指令**。

> 默认情况下 nuxt-app 是不会包含 Vue 示例的

例如，在`plugins/directive.ts`：

```TS
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus', {
    mounted (el) {
      el.focus()
    },
    getSSRProps (binding, vnode) {
      // you can provide SSR-specific props here
      return {}
    }
  })
})
```

