[toc]

# [Rendering Modes](https://nuxt.com/docs/guide/concepts/rendering#rendering-modes)

Both the browser and server can interpret(解释) JavaScript code to render Vue.js components into HTML elements. 

This step is called **rendering**. 

Nuxt supports both **client-side** and **universal** rendering. 

The two approaches have *pros and cons （advantage and disadvantage）* that we will cover in this section.

Nuxt支持**客户端**和**通用**渲染。这两种方法有利弊，我们将在本节中讨论。



## [Client-side Only Rendering](https://nuxt.com/docs/guide/concepts/rendering#client-side-only-rendering)

Out of the box, a traditional Vue.js application is rendered in the browser (or **client**). 

Then, Vue.js generates HTML elements after the browser downloads and parses all the JavaScript code containing the instructions to create the current interface.

然后，Vue.js 在浏览器下载并解析所有包含创建当前界面指令的JavaScript代码后，生成HTML元素。

![img](../../imgs/csr.svg)

### Pros

- **开发速度**：

- **更便宜**: 运行服务器会增加基础设施成本

- **离线**

### Cons

- **性能**：用户必须等待浏览器下载、解析和运行JavaScript文件。根据下载部分的网络以及用于解析和执行的用户设备，这可能需要一些时间并影响用户体验。

- **Search Engine Optimization**: Indexing and updating the content delivered via client-side rendering **takes more time** than with a server-rendered HTML document. 

  This is related to the performance drawback we discussed, as search engine crawlers won't wait for the interface to be fully rendered on their first try to index the page. 

  Your content will take more time to show and update in search results pages with pure client-side rendering.

> 搜索引擎优化：与服务器渲染的HTML文档相比，通过客户端渲染的内容的索引和更新需要更多时间。
>
> ​	这与我们讨论过的性能缺陷有关，因为搜索引擎爬虫在第一次尝试索引该页面时，不会等待界面完全渲染。
>
> ​	使用纯客户端渲染，你的内容在搜索结果页中的显示和更新将需要更多时间。



### [Examples](https://nuxt.com/docs/guide/concepts/rendering#examples)

Client-side rendering is a good choice for heavily interactive **web applications** that don't need indexing or whose users visit frequently. 

It can leverage(借助) browser caching to skip the download phase on subsequent visits, such as **SaaS, back-office applications, or online games**.

对于不需要索引或用户频繁访问的**重度交互式网络应用**，客户端渲染是一个不错的选择。

它可以利用浏览器缓存来跳过后续访问的下载阶段，如SaaS、后台应用或在线游戏。





## [Universal Rendering](https://nuxt.com/docs/guide/concepts/rendering#universal-rendering)

When the browser requests a URL with **universal (client-side + server-side) rendering** enabled, the server returns a fully rendered HTML page to the browser. 

Whether the page has been generated in advance and cached or is rendered on the fly, at some point, Nuxt has run the JavaScript (Vue.js) code in a server environment, producing an HTML document. 

Users immediately get the content of our application, contrary to client-side rendering. This step is similar to traditional **server-side rendering** performed by PHP or Ruby applications.



当浏览器请求一个启用了通用（客户端+服务器端）渲染的URL时，服务器会返回一个完全渲染好的HTML页面给浏览器。

不管这个页面是事先生成并缓存的，还是即时渲染的，在某个时刻，Nuxt已经在服务器环境中运行了JavaScript（Vue.js）代码，产生了一个HTML文档。

用户立即得到我们的应用程序的内容，与客户端渲染相反。这一步类似于PHP或Ruby应用程序所执行的传统服务器端渲染。



To not lose the benefits of the **client-side rendering** method, such as dynamic interfaces and pages transitions, the Client loads the javascript code that runs on the Server in the background once the HTML document has been downloaded.

 The browser interprets it again (hence **Universal rendering**) and Vue.js takes control of the document and enables interactivity.

为了不失去客户端渲染方法的好处，例如动态界面和页面转换，一旦HTML文档被下载，客户端就会**在后台加载服务器上运行的javascript代码。**

浏览器再次对其进行解释（因此是通用渲染），Vue.js对文档进行控制并启用交互性。



Making a static page interactive in the browser is called "Hydration（水合作用）." 



Universal rendering allows a Nuxt application to provide quick page load times while preserving the benefits of client-side rendering. 

Furthermore, as the content is already present in the HTML document, crawlers can index it without overhead.

1. 快速的页面加载时间
2. 保留客户端渲染的优点
3. 爬虫可以毫无开销地对其进行索引

![img](../../imgs/ssr.svg)



### Pros

- **性能**：用户可以立即访问页面的内容，因为浏览器显示静态内容的速度比JavaScript生成的内容快得多。与此同时，当水化过程发生时，Nuxt保留了Web应用程序的交互性。
- **搜索引擎优化**

### Cons

- **开发限制：**服务器和浏览器环境不提供相同的API，编写可以在两侧无缝运行的代码可能很棘手。幸运的是，Nuxt提供了指南和特定变量，以帮助您确定代码的执行位置。
- **成本：**服务器需要运行才能实时渲染页面。这与任何传统服务器一样，增加了每月成本。然而，由于浏览器接管客户端导航的通用渲染，服务器调用被大大减少。



### Examples

Universal rendering is very versatile and can fit almost any use case,  (用途广泛，几乎可以适应任何用例)

and is especially appropriate for any content-oriented websites: **blogs, marketing websites, portfolios, e-commerce sites, and marketplaces.** (**博客、营销网站、投资组合、电子商务网站和市场。**)



## [Summary](https://nuxt.com/docs/guide/concepts/rendering#summary)

Client-side and universal rendering are **different strategies to display** an interface in a browser.

By default, Nuxt uses **universal rendering** to provide better user experience and performance, and to optimize search engine indexing,  (默认情况下，Nuxt使用**通用渲染**来提供更好的用户体验和性能，并优化搜索引擎索引)

but you can switch rendering modes in [one line of configuration](https://nuxt.com/docs/api/configuration/nuxt-config#ssr).









