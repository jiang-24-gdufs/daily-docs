[toc]

# 服务端渲染 (SSR)[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#server-side-rendering-ssr)

## 总览[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#overview)

### 什么是 SSR？[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#what-is-ssr)

Vue.js 是一个用于构建**客户端 (浏览器)**应用的框架。默认情况下，Vue 组件的职责是在浏览器中生成和操作 DOM。

然而，Vue 也支持将组件**在服务端直接渲染成 HTML 字符串**，作为**服务端响应**返回给浏览器，最后在浏览器端将静态的 HTML“激活”(hydrate) 为能够交互的客户端应用。

一个由服务端渲染的 Vue.js 应用也可以被认为是“同构的”(Isomorphic) 或“通用的”(Universal)，因为应用的大部分代码同时运行在服务端**和**客户端。

### 为什么要用 SSR？[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#why-ssr)

与客户端的单页应用 (SPA) 相比，SSR 的优势主要在于：

- **更快的首屏加载**：这一点在慢网速或者运行缓慢的设备上尤为重要。服务端渲染的 HTML 无需等到所有的 JavaScript 都下载并执行完成之后才显示，所以你的用户将会更快地看到完整渲染的页面。除此之外，数据获取过程在首次访问时在服务端完成，相比于从客户端获取，可能有更快的数据库连接。这通常可以带来更高的[核心 Web 指标](https://web.dev/vitals/)评分、更好的用户体验，而对于那些“首屏加载速度与转化率直接相关”的应用来说，这点可能至关重要。

- **统一的心智模型**：你可以使用相同的语言以及相同的声明式、面向组件的心智模型来开发整个应用，而不需要在后端模板系统和前端框架之间来回切换。

- **更好的 SEO**：搜索引擎爬虫可以直接看到完全渲染的页面。

  > TIP
  >
  > 截至目前，Google 和 Bing 可以很好地对同步 JavaScript 应用进行索引。这里的“同步”是关键词。如果你的应用以一个 loading 动画开始，然后通过 Ajax 获取内容，爬虫并不会等到内容加载完成再抓取。也就是说，如果 SEO 对你的页面至关重要，而你的内容又是异步获取的，那么 SSR 可能是必需的。

使用 SSR 时还有一些权衡之处需要考量：

- 开发中的限制。**浏览器端**特定的代码只能在某些生命周期钩子中使用；一些外部库可能需要特殊处理才能在服务端渲染的应用中运行。
- 更多的**与构建配置和部署相关**的要求。服务端渲染的应用需要一个能让 Node.js 服务器运行的环境，不像完全静态的 SPA 那样可以部署在任意的静态文件服务器上。
- 更高的**服务端负载**。在 Node.js 中渲染一个完整的应用要比仅仅托管静态文件更加占用 CPU 资源，因此如果你预期有高流量，请为相应的服务器负载做好准备，并采用合理的缓存策略。

在为你的应用使用 SSR 之前，你首先应该问自己是否真的需要它。

这主要取决于**首屏加载速度对应用的重要程度**。

例如，如果你正在开发一个内部的管理面板，初始加载时的那额外几百毫秒对你来说并不重要，这种情况下使用 SSR 就没有太多必要了。

然而，在内容展示速度极其重要的场景下，SSR 可以尽可能地帮你实现最优的初始加载性能。

### SSR vs. SSG[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#ssr-vs-ssg)

**静态站点生成** (**Static-Site Generation，缩写为 SSG**)，也被称为**预渲染**，是另一种流行的构建快速网站的技术。如果用服务端**渲染一个页面所需的数据对每个用户来说都是相同的**，那么我们可以只渲染一次，提前在构建过程中完成，而不是每次请求进来都重新渲染页面。预渲染的页面生成后作为静态 HTML 文件被服务器托管。

SSG 保留了和 SSR 应用相同的性能表现：它带来了优秀的首屏加载性能。同时，它**比 SSR 应用的花销更小，也更容易部署，因为它输出的是静态 HTML 和资源文件**。

这里的关键词是**静态**：SSG 仅可以用于消费**静态数据**的页面，即数据在构建期间就是已知的，并且在多次部署期间不会改变。每当数据变化时，都需要重新部署。

如果你调研 SSR 只是为了优化为数不多的营销页面的 SEO (例如 `/`、`/about` 和 `/contact` 等)，那么你可能需要 SSG 而不是 SSR。

**SSG 也非常适合构建基于内容的网站**，比如文档站点或者博客。事实上，你现在正在阅读的这个网站就是使用 [VitePress](https://vitepress.vuejs.org/) 静态生成的，它是一个由 Vue 驱动的静态站点生成器。



## 基础教程[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#basic-tutorial)



## 更通用的解决方案[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#higher-level-solutions)

从上面的例子到一个生产就绪的 SSR 应用还需要很多工作。

我们将需要：

- 支持 Vue SFC 且满足其他构建步骤要求。事实上，我们需要为同一个应用执行两次构建过程：一次用于客户端，一次用于服务器。

  > TIP
  >
  > Vue 组件用在 SSR 时的**编译产物**不同——模板被编译为字符串拼接而不是 render 函数，以此提高渲染性能。

- 在服务器请求处理函数中，确保返回的 HTML 包含正确的客户端资源链接和最优的资源加载提示 (如 prefetch 和 preload)。我们可能还需要在 SSR 和 SSG 模式之间切换，甚至在同一个应用中混合使用这两种模式。

- 以一种通用的方式管理路由、数据获取和状态存储。

完整的实现会非常复杂，并且取决于你选择使用的构建工具链。

因此，我们强烈建议你使用一种更通用的、更集成化的解决方案，帮你抽象掉那些复杂的东西。

下面推荐几个 Vue 生态中的 SSR 解决方案。



### Nuxt[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#nuxt)

[Nuxt](https://nuxt.com/) 是一个构建于 Vue 生态系统之上的全栈框架，它为编写 Vue SSR 应用提供了丝滑的开发体验。

更棒的是，你还可以把它当作一个**静态站点生成器 (SSG)**来用！我们强烈建议你试一试。



### Quasar

[Quasar](https://quasar.dev/) 



### Vite SSR

Vite 提供了内置的 [Vue 服务端渲染支持](https://cn.vitejs.dev/guide/ssr.html)，但它在设计上是偏底层的。如果你想要直接使用 Vite，可以看看 [vite-plugin-ssr](https://vite-plugin-ssr.com/)，一个帮你抽象掉许多复杂细节的社区插件。



## 书写 SSR 友好的代码

无论你的构建配置或顶层框架的选择如何，下面的原则在所有 Vue SSR 应用中都适用

### 服务端的响应性[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#reactivity-on-the-server)

在 SSR 期间，每一个请求 URL 都会映射到我们应用中的一个期望状态。因为没有用户交互和 DOM 更新，所以响应性在服务端是不必要的。为了更好的性能，默认情况下响应性在 SSR 期间是禁用的。

### 组件生命周期钩子[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#component-lifecycle-hooks)

因为没有任何动态更新，所以像 `onMounted` 或者 `onUpdated` 这样的生命周期钩子**不会**在 SSR 期间被调用，而只会在客户端运行。

你应该避免在 `setup()` 或者 `<script setup>` 的根作用域中使用会产生副作用且需要被清理的代码。这类副作用的常见例子是使用 `setInterval` 设置定时器。我们可能会在客户端特有的代码中设置定时器，然后在 `onBeforeUnmount` 或 `onUnmounted` 中清除。然而，由于 unmount 钩子不会在 SSR 期间被调用，所以定时器会永远存在。为了避免这种情况，请将含有副作用的代码放到 `onMounted` 中。

### 访问平台特有 API[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#access-to-platform-specific-apis)

通用代码不能访问平台特有的 API，如果你的代码直接使用了浏览器特有的全局变量，比如 `window` 或 `document`，他们会在 Node.js 运行时报错，反过来也一样。

对于在服务器和客户端之间共享，但使用了不同的平台 API 的任务，建议将平台特定的实现封装在一个通用的 API 中，或者使用能为你做这件事的库。例如你可以使用 [`node-fetch`](https://github.com/node-fetch/node-fetch) 在服务端和客户端使用相同的 fetch API。

对于浏览器特有的 API，通常的方法是在仅客户端特有的生命周期钩子中惰性地访问它们，例如 `onMounted`。

请注意，如果一个第三方库编写时没有考虑到通用性，那么要将它集成到一个 SSR 应用中可能会很棘手。你*或许*可以通过模拟一些全局变量来让它工作，但这只是一种 hack 手段并且可能会影响到其他库的环境检测代码。

### 跨请求状态污染[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution)

在状态管理一章中，我们介绍了一种[使用响应式 API 的简单状态管理模式](https://cn.vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api)。而在 SSR 环境中，这种模式需要一些额外的调整。

上述模式在一个 JavaScript 模块的根作用域中声明共享的状态。这是一种**单例模式**——即在应用的整个生命周期中只有一个响应式对象的实例。这在纯客户端的 Vue 应用中是可以的，因为对于浏览器的每一个页面访问，应用模块都会重新初始化。

然而，在 SSR 环境下，应用模块通常只在服务器启动时初始化一次。同一个应用模块会在多个服务器请求之间被复用，而我们的单例状态对象也一样。如果我们用单个用户特定的数据对共享的单例状态进行修改，那么这个状态可能会意外地泄露给另一个用户的请求。我们把这种情况称为**跨请求状态污染**。

从技术上讲，我们可以在每个请求上重新初始化所有 JavaScript 模块，就像我们在浏览器中所做的那样。但是，初始化 JavaScript 模块的成本可能很高，因此这会显著影响服务器性能。

推荐的解决方案是在每个请求中为整个应用创建一个全新的实例，包括 router 和全局 store。然后，我们使用[应用层级的 provide 方法](https://cn.vuejs.org/guide/components/provide-inject.html#app-level-provide)来提供共享状态，并将其注入到需要它的组件中，而不是直接在组件中将其导入：

```js
// app.js （在服务端和客户端间共享）
import { createSSRApp } from 'vue'
import { createStore } from './store.js'

// 每次请求时调用
export function createApp() {
  const app = createSSRApp(/* ... */)
  // 对每个请求都创建新的 store 实例
  const store = createStore(/* ... */)
  // 提供应用级别的 store
  app.provide('store', store)
  // 也为激活过程暴露出 store
  return { app, store }
}
```

像 Pinia 这样的状态管理库在设计时就考虑到了这一点。请参考 [Pinia 的 SSR 指南](https://pinia.vuejs.org/zh/ssr/)以了解更多细节。

### 激活不匹配[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch)

如果预渲染的 HTML 的 DOM 结构不符合客户端应用的期望，就会出现激活不匹配。最常见的激活不匹配是以下几种原因导致的：

1. 组件模板中存在不符合规范的 HTML 结构，渲染后的 HTML 被浏览器原生的 HTML 解析行为纠正导致不匹配。举例来说，一个常见的错误是 [`` 不能被放在 `` 中](https://stackoverflow.com/questions/8397852/why-cant-the-p-tag-contain-a-div-tag-inside-it)：

   ```
   <p><div>hi</div></p>
   ```

   如果我们在服务器渲染的 HTML 中出现这样的代码，当遇到 `<div>` 时，浏览器会结束第一个 `<p>`，并解析为以下 DOM 结构：

   ```
   <p></p>
   <div>hi</div>
   <p></p>
   ```

2. 渲染所用的数据中包含随机生成的值。由于同一个应用会在服务端和客户端执行两次，每次执行生成的随机数都不能保证相同。避免随机数不匹配有两种选择：

   1. 利用 `v-if` + `onMounted` 让需要用到随机数的模板只在客户端渲染。你所用的上层框架可能也会提供简化这个用例的内置 API，比如 VitePress 的 `<ClientOnly>` 组件。
   2. 使用一个能够接受随机种子的随机数生成库，并确保服务端和客户端使用同样的随机数种子 (比如把种子包含在序列化的状态中，然后在客户端取回)。

3. 服务端和客户端的时区不一致。有时候我们可能会想要把一个时间转换为用户的当地时间，但在服务端的时区跟用户的时区可能并不一致，我们也并不能可靠的在服务端预先知道用户的时区。这种情况下，当地时间的转换也应该作为纯客户端逻辑去执行。

当 Vue 遇到激活不匹配时，它将尝试自动恢复并调整预渲染的 DOM 以匹配客户端的状态。这将导致一些渲染性能的损失，因为需要丢弃不匹配的节点并渲染新的节点，但大多数情况下，应用应该会如预期一样继续工作。尽管如此，最好还是在开发过程中发现并避免激活不匹配。

### 自定义指令[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#custom-directives)

因为大多数的自定义指令都包含了对 DOM 的直接操作，所以它们会在 SSR 时被忽略。但如果你想要自己控制一个自定义指令在 SSR 时应该如何被渲染 (即应该在渲染的元素上添加哪些 attribute)，你可以使用 `getSSRProps` 指令钩子：

```js
const myDirective = {
  mounted(el, binding) {
    // 客户端实现：
    // 直接更新 DOM
    el.id = binding.value
  },
  getSSRProps(binding) {
    // 服务端实现：
    // 返回需要渲染的 prop
    // getSSRProps 只接收一个 binding 参数
    return {
      id: binding.value
    }
  }
}
```

### Teleports[#](https://cn.vuejs.org/guide/scaling-up/ssr.html#teleports)

在 SSR 的过程中 Teleport 需要特殊处理。如果渲染的应用包含 Teleport，那么其传送的内容将不会包含在主应用渲染出的字符串中。在大多数情况下，更推荐的方案是在客户端挂载时条件式地渲染 Teleport。

如果你需要激活 Teleport 内容，它们会暴露在服务端渲染上下文对象的 `teleports` 属性下：

```js
const ctx = {}
const html = await renderToString(app, ctx)

console.log(ctx.teleports) // { '#teleported': 'teleported content' }
```

跟主应用的 HTML 一样，你需要自己将 Teleport 对应的 HTML 嵌入到最终页面上的正确位置处。

> TIP
>
> 请避免在 SSR 的同时把 Teleport 的目标设为 `body`——通常 `<body>` 会包含其他服务端渲染出来的内容，这会使得 Teleport 无法确定激活的正确起始位置。
>
> 推荐用一个独立的只包含 teleport 的内容的容器，例如 `<div id="teleported"></div>`。