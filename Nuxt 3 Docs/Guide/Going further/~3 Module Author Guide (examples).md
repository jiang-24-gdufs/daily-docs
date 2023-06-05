

[toc]

# [Examples](https://nuxt.com/docs/guide/going-further/modules/#examples) 

##  [Provide Nuxt Plugins](https://nuxt.com/docs/guide/going-further/modules/#provide-nuxt-plugins) 

Commonly, modules provide one or more run plugins to add runtime logic.

(模块提供一个或多个运行插件来增加运行时逻辑。)

```ts
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export default defineNuxtModule<ModuleOptions>({
  setup (options, nuxt) {
    // Create resolver to resolve relative paths
    const { resolve } = createResolver(import.meta.url)

    addPlugin(resolve('./runtime/plugin'))
  }
})
```

> Read more in [API > Advanced > Kit](https://nuxt.com/docs/api/advanced/kit).



##  [Add a CSS Library](https://nuxt.com/docs/guide/going-further/modules/#add-a-css-library) 

If your module will provide a CSS library, make sure to check if the user already included the library to avoid duplicates and add an option to disable the CSS library in the module.



```ts
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup (options, nuxt) {
    nuxt.options.css.push('font-awesome/css/font-awesome.css')
  }
})
```



> UnoCSS 配置：https://github.com/unocss/unocss/tree/main/packages/nuxt#configuration



## [Adding Vue Compones](https://nuxt.com/docs/guide/going-further/modules/#adding-vue-components)



## [Clean Up Modules](https://nuxt.com/docs/guide/going-further/modules/#clean-up-module)