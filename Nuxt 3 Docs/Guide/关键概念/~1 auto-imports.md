[toc]

# 自动导入

Nuxt auto-imports helper functions, composables and Vue APIs to use across your application without explicitly importing them. Based on the directory structure, every Nuxt application can also use auto-imports for its own components, composables and plugins. Components, composables or plugins can use these functions.

Contrary to a classic global declaration, Nuxt preserves typings and IDEs completions and hints, and only includes what is actually used in your production code.

> In the documentation, every function that is not explicitly imported is auto-imported by Nuxt and can be used as-is in your code. You can find a reference for auto-imported [composables](https://nuxt.com/docs/api/composables/use-async-data) and [utilities](https://nuxt.com/docs/api/utils/dollarfetch) in the API section.

> Auto imports don't currently work within the [server directory](https://nuxt.com/docs/guide/directory-structure/server).

## [Nuxt Auto-imports](https://nuxt.com/docs/guide/concepts/auto-imports#nuxt-auto-imports)

Nuxt auto-imports functions and composables to perform [data fetching](https://nuxt.com/docs/getting-started/data-fetching), get access to the [app context](https://nuxt.com/docs/api/composables/use-nuxt-app)and [runtime config](https://nuxt.com/docs/guide/going-further/runtime-config), manage [state](https://nuxt.com/docs/getting-started/state-management) or define components and plugins.



## [Vue Auto-imports](https://nuxt.com/docs/guide/concepts/auto-imports#vue-auto-imports)

Vue 3 exposes **Reactivity APIs** like `ref` or `computed`, as well as **lifecycle hooks** and **helpers** that are auto-imported by Nuxt.



## [Directory-based Auto-imports](https://nuxt.com/docs/guide/concepts/auto-imports#directory-based-auto-imports)

Nuxt directly auto-imports files created in defined directories:

- `components/` for [Vue components](https://nuxt.com/docs/guide/directory-structure/components).
- `composables/` for [Vue composables](https://nuxt.com/docs/guide/directory-structure/composables).
- `utils/` for helper functions and other utilities.



## [Explicit Imports](https://nuxt.com/docs/guide/concepts/auto-imports#explicit-imports)

Nuxt exposes every auto-import with the `#imports` alias that can be used to make the import explicit if needed:

明确的导入

Nuxt用#imports的别名公开了每个自动导入的内容，如果需要的话，可以用它来明确导入。

```vue
<script setup>  
  import { ref, computed } from '#imports'  
  const count = ref(1)  
  const double = computed(() => count.value * 2)
</script>
```

