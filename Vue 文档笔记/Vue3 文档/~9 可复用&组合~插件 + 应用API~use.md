[toc]

# [#](https://v3.cn.vuejs.org/guide/plugins.html#插件)插件

插件是自包含的代码，通常**向 Vue 添加全局级功能**。

它可以是公开 `install()` 方法的 `object`，也可以是 `function`

插件的功能范围没有严格的限制——一般有下面几种：

1. 添加全局方法或者 property。如：[vue-custom-element](https://github.com/karol-f/vue-custom-element)
2. 添加全局资源：指令/过渡等。如：[vue-touch](https://github.com/vuejs/vue-touch)）
3. 通过全局 mixin 来添加一些组件选项。(如[vue-router](https://github.com/vuejs/vue-router))
4. 添加全局实例方法，通过把它们添加到 `config.globalProperties` 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 [vue-router](https://github.com/vuejs/vue-router)

## [#](https://v3.cn.vuejs.org/guide/plugins.html#编写插件)编写插件





# [`use`](https://v3.cn.vuejs.org/api/application-api.html#use)

- **参数：**

  - `{Object | Function} plugin`
  - `...options (可选)`

- **返回值：**

  - 应用实例

- **用法：**

  安装 Vue.js 插件。

  - 如果插件是一个对象，则它必须暴露一个 `install` 方法。
  - 如果插件本身是一个函数，则它将被视为 `install` 方法。

  该 `install` 方法将**以应用实例作为第一个参数**被调用。传给 `use` 的**其他 `options` 参数**将作为后续参数**传入该install方法**。

  当在同一个插件上多次调用此方法时，该插件将仅安装一次。

- **示例：**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'
  
  const app = createApp({})
  
  app.use(MyPlugin)
  app.mount('#app')
  ```