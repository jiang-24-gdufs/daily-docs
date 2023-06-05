[TOC]

## Vue Loader 是什么？

Vue Loader 是一个 [webpack](https://webpack.js.org/) 的 loader，它允许你以一种名为[单文件组件 (SFCs)](https://vue-loader.vuejs.org/zh/spec.html)的格式撰写 Vue 组件：

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>
```

Vue Loader 还提供了很多酷炫的特性：

- 允许为 Vue 组件的每个部分使用其它的 webpack loader，例如在 `` 的部分使用 Sass 和在 ` 的部分使用 Pug；
- 允许在一个 `.vue` 文件中使用自定义块，并对其运用自定义的 loader 链；
- 使用 webpack loader 将 `` 和 ` 中引用的资源当作模块依赖来处理；
- 为每个组件模拟出 scoped CSS；
- 在开发过程中使用热重载来保持状态。

简而言之，webpack 和 Vue Loader 的结合为你提供了一个现代、灵活且极其强大的前端工作流，来帮助撰写 Vue.js 应用。



## How It Works

> The following section is for maintainers and contributors who are interested in the internal implementation details of `vue-loader`, and is **not** required knowledge for end users.

`vue-loader` is not a simple source transform loader. It handles each language blocks inside an SFC with its own dedicated loader chain (you can think of each block as a "virtual module"), and finally assembles the blocks together into the final module. Here's a brief overview of how the whole thing works:

vue-loader不是一个简单的source转换loader，它使用自己的专用加载器链处理SFC中的每种语言块(您可以将每个块都视为“虚拟模块”), 最后将这些块组装在一起成为最终模块。 以下是整个过程的简要概述：

1. `vue-loader` parses the SFC source code into an *SFC Descriptor* using `@vue/component-compiler-utils`. It then generates an import for each language block so the actual returned module code looks like this:

   `vue-loader`使用 `@vue/component-compiler-utils` 将SFC源代码解析为 *SFC描述符* (Descriptor)。 然后，它为每种语言块生成一个导入，因此实际返回的模块代码如下所示：

   ```JS
   // code returned from the main loader for 'source.vue'
   
   // import the <template> block
   import render from 'source.vue?vue&type=template'
   // import the <script> block
   import script from 'source.vue?vue&type=script'
   export * from 'source.vue?vue&type=script'
   // import <style> blocks
   import 'source.vue?vue&type=style&index=1'
   
   script.render = render
   export default script
   ```

   Notice how the code is importing `source.vue` itself, but with different request queries for each block.

   请注意，代码本身是如何导入`source.vue`的，但是每个块都有不同的请求查询。

2. We want the content in `script` block to be treated like `.js` files (and if it's `<script lang="ts"`, we want to to be treated like `.ts` files). Same for other language blocks. **So we want *webpack* to apply any configured module rules that matches `.js` also to requests that look like `source.vue?vue&type=script`. **This is what `VueLoaderPlugin` (`src/plugins.ts`) does: for each module rule in the webpack config, it creates a modified clone that targets corresponding Vue language block requests.

   我们希望将`script`块中的内容视为.js文件（如果为`<script lang =“ ts”`>，则希望将其视为`.ts`文件）。 其他语言块也一样。 **因此，我们希望webpack将与.js匹配的所有已配置模块规则也应用于看起来像`source.vue?vue&type=script`的请求**。 这就是`VueLoaderPlugin`（`src / plugins.ts`）的作用：对于webpack配置中的每个模块规则，它都会创建一个针对相应Vue语言块请求的修改后的克隆。

   Suppose we have configured `babel-loader` for all `*.js` files. That rule will be cloned and applied to Vue SFC `<sciprt>` blocks as well. Internally to webpack, a request like

   假设我们已经为所有`* .js`文件配置了`"babel-loader"`。 该规则将被克隆并应用于Vue SFC `<sciprt>`块。 在webpack内部，一个类似的请求

   ```
   import script from 'source.vue?vue&type=script'
   ```

   Will expand to:

   将扩展为：

   ```
   import script from 'babel-loader!vue-loader!source.vue?vue&type=script'
   ```

   Notice the `vue-loader` is also matched because `vue-loader` are applied to `.vue` files.

   注意`vue-loader`也被匹配，因为`vue-loader`被应用于`.vue`文件。

   

   Similarly, if you have configured `style-loader` + `css-loader` + `sass-loader` for `*.scss` files:

   同样，如果您为`* .scss`文件配置了`style-loader` +`css-loader` +`sass-loader`：

   ```
   <style scoped lang="scss">
   ```

   Will be returned by `vue-loader` as:

   将由`vue-loader`返回的结果是：

   ```
   import 'source.vue?vue&type=style&index=1&scoped&lang=scss'
   ```

   And webpack will expand it to:

   ```
   import 'style-loader!css-loader!sass-loader!vue-loader!source.vue?vue&type=style&index=1&scoped&lang=scss'
   ```

3. When processing the expanded requests, the main `vue-loader` will get invoked again. This time though, the loader notices that the request has queries and is targeting a specific block only. So it selects (`src/select.ts`) the inner content of the target block and passes it on to the loaders matched after it.

   在处理扩展请求时，主`vue-loader`将再次被调用。 但是，这次加载程序会注意到请求具有查询并且仅针对特定块。 因此，它选择（`src/select.ts`）目标块的内部内容，并将其传递给匹配的目标加载器。

4. For the `<script>` block, this is pretty much it. For `<template>` and `<style>` blocks though, a few extra tasks need to be performed:

   对于`<script>`块，差不多就可以了。 但是，对于`<template>`和`<style>`块，需要执行一些额外的任务：

   - We need to compile[编译] the template using the `Vue template compiler` [@vue/component-compiler-utils_npm](https://npmview.now.sh/@vue/component-compiler-utils);
   - We need to post-process[后处理] the CSS in `<style scoped>` blocks, **after** `css-loader` but **before** `style-loader`.

   Technically, these are additional loaders (`src/templateLoader.ts` and `src/stylePostLoader.ts`) that need to be injected into the expanded loader chain. It would be very complicated if the end users have to configure this themselves, so `VueLoaderPlugin` also injects a global [Pitching Loader](https://webpack.js.org/api/loaders/#pitching-loader) (`src/pitcher.ts`) that intercepts Vue `<template>` and `<style>` requests and injects the necessary loaders. The final requests look like the following:

   从技术上讲，这些是需要注入到扩展的加载程序链中的其他加载程序（`src/templateLoader.ts`和`src/stylePostLoader.ts`）。 如果最终用户必须自己进行配置，那将是非常复杂的，因此VueLoaderPlugin还会注入一个全局的`Pitching Loader`（`src/pitcher.ts`），它会拦截Vue的`<template>`和`<style>`请求并注入必要的加载器。 最终请求如下所示：

   ```js
   // <template lang="pug">
   import 'vue-loader/template-loader!pug-loader!source.vue?vue&type=template'
   
   // <style scoped lang="scss">
   import 'style-loader!vue-loader/style-post-loader!css-loader!sass-loader!vue-loader!source.vue?vue&type=style&index=1&scoped&lang=scss'
   ```



