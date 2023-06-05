[TOC]

# Svelte 搭网站，React 做应用

[shawn swyx wang 🇸🇬](https://www.swyx.io/svelte-sites-react-apps/) 原作 授权 [New Frontend](https://nextfe.com/) 翻译。

2020 年，我的个人建议是，web 开发者**用 Svelte 搭网站，用 React 做应用**。我这微妙的立场可能足够同时得罪 Svelte 粉丝和 React 粉丝。

我在 [Shoptalk Show 访谈](https://shoptalkshow.com/432/)上提到了这个观点。Chris Coyier 鼓励我写篇博客。于是我写了这篇文章解释这一观点。

## 网站和应用

首先谈下 web 网站和 web 应用的区别。有些聪明人真心坚持这两者没有区别。他们希望使用同样的技术进行 web 开发。恕我直言，[他们错了](https://macwright.com/2020/08/22/clean-starts-for-the-web.html)。

**web 网站**主要是展示内容，加上少量的交互。首次加载时间很重要，因为用户可能会等不及网页加载而离开，或者浪费了很多流量、电池、算力才得到重要信息。[Alex Russel 计算了合理的基线](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)，不过，简单来说，关键路径下的网页应该小于 200 KB. 这是 web 最初的使用场景——展示信息——HTML/CSS/浏览器非常擅长此项工作。

**web 应用**则主要是为了交互。CRUD 应用，流媒体应用，游戏，以及其他。这些应用通常来说更重，很不幸这影响了它们的性能。不过，和 200 MB 的移动端应用相比，即使是 2 MB 的 JS 应用听起来也不算太糟。而且不妨假设你开发的是一个 B2B 应用，每个用户都有高性能的设备，流量也很充裕。你一般会长时间开着应用，所以初次加载速度相对来说不那么重要，何况还可以通过 service worker 缓解这个问题。考虑到 web 应用需要自带所有的 UI 组件和交互行为才能工作，而典型的原生应用通常重度依赖系统提供的组件，开发 web 应用挑战更大。web 平台仍然缺乏许多标准组件和 API，开发体验也不好，所以说编写精美的 web 应用不容易，框架则多多少少弥补了这一点。

在我看来，网站和应用是一段连续的光谱。当然，如果你的站点完全不需要任何交互，那就别用任何 JS。不过大多数网站都有一些类似应用的特性（登录，点赞，评论），而许多应用也受到类似网站的限制。

你可能注意到了，，`www.mysaas.com` 是用于营销的网站，而 `app.mysaas.com` 则是应用。这两者有可能源于同一份代码，但随着两者需求的差异，会渐渐分成不同的代码，由不同的团队负责开发。那些试图在目的截然不同的项目上都使用同一技术的人，通常都是些充满理想主义的爱好者。

## 用 React 做应用

React 开源已有 7 年。从 Apple 到 Twitter，从 Amazon 到 Airbnb，从 Facebook 到 Uber，最大的公司和站点都在生产环境下使用 React。连续 36 个月，React 都是 [Hacker News 招聘帖上提到最多的技术](https://www.hntrends.com/2020/may-big-drop-developer-job-postings.html)。React 开发者[有三百万到九百万之多](https://twitter.com/swyx/status/1190088019707154432?s=20)，而且每年[增长 50% 以上](https://twitter.com/swyx/status/1024974678337703937?s=20)。[第三方生态系统十分广阔](https://youtu.be/Qox56z4xH6o)，吸引了众多培训机构、开发者、公司，也吸引了上亿风险投资和企业投资。

仅仅这些就足以让它成为开发应用的上佳之选。但是这些可能有一定运气成分，和 React 本身的品质并没有根本性的联系。试图用这些数字说服[第一手思想者](https://www.swyx.io/first-principles-approach/)采用 React，可能是一种冒犯。所以这里我提供一些 React 非常适合开发应用的核心原因：

- React Native 看起来在 2018 年遇到了一些麻烦，但[目前的团队](https://www.reactiflux.com/transcripts/react-native-team-2)看起来执行得不错，至少像我这样的外人有这个感觉。如果 Dart 和 Google 能克服一些障碍，[Flutter 未来可能给 React Native 造成一些威胁](https://twitter.com/swyx/status/1301103950066671616?s=20)。今时今日，React Native 在技术上是**「一次编写，处处运行」的最佳跨平台（移动端 + web + 桌面端）方案**。如果你有足够的资源招到各平台的专家，可能觉得 [React Native 没什么用](https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a)。然而，如果你像大多数公司一样无力承担每个平台都配一个专业团队的成本，React Native 是你的最佳选择。

- 迄今为止，React 在抽象设计方面经验最充分。**React 引领风潮，其他框架跟进。** Vue 的 [Composition API](https://composition-api.vuejs.org/) 和 [Svelte 3 的 $: API ](https://www.youtube.com/watch?v=AdNJ3fydeao)直言深受 React 启发，Swift UI 和 Jetpack Compose 亦然。这并不意味着 React 总能做对（竞猜：React 有多少 Context API？），但是 [Concurrent Mode](https://reactjs.org/docs/concurrent-mode-intro.html) 和 [React Flight](https://twitter.com/brian_d_vaughn/status/1308438105616191496?s=20) 发布的时候，我会期望它们从世界上最大站点的生产应用中汲取了丰富的信息。Suspense for Data Fetching 目前还没有发布，但 Facebook 已经[在生产环境中使用一年多了](https://engineering.fb.com/web/facebook-redesign/)。我想强调下这有多么不同寻常——开源项目通常会先发布一个特性，希望有一家大公司能采用，并在大规模应用下得到充分测试。React 则不然，Facebook **先在大规模应用上吃自己的狗粮**，然后再发布到一般开发者社区，在公开发布之前，[许多](https://github.com/facebook/react/issues/15257)[想法](https://github.com/facebook/prepack/wiki/react-compiler)[被取消](https://cdb.reacttraining.com/react-call-return-what-and-why-7e7761f81843)，因为在吃自己狗粮的过程中发现了它们的缺陷。评估 React 的时候，不仅要看它包含哪些特性，还要看它不包含哪些特性。

- 这就涉及到 React 项目的管理。它并不完美，比如许多人都对 Facebook 很有意见。但我依然认为**React 是世上运行得最好的开源项目之一**。从[版本策略](https://reactjs.org/docs/faq-versioning.html)到[错误信息](https://reactjs.org/docs/error-decoder.html/)，从[发布通道](https://reactjs.org/blog/2019/10/22/react-release-channels.html)到[渐进升级](https://reactjs.org/blog/2020/10/20/react-v17.html#gradual-upgrades)，到了 React 这一规模，这些平凡小事都很重要。React 团队和关键的生态伙伴（比如 Gatsby、Apollo、Next.js）、浏览器（比如 Chrome）、JavaScript 语言（TC39）也有很多非正式的协作。React 团队不仅非常关注项目管理，还着力培育一个包容性的多元社区。

- 我有些犹豫要不要提这点，因为技术上它和使用量有关系，但我觉得这和 React 的品质也是分不开的：React 看上去是目前最能吸引**辅助功能和交互设计方面的思想者**的框架。Adobe 和 Devon Govett 的 [React Aria](https://react-spectrum.adobe.com/react-aria/index.html) 经过了精心的设计，进行了充分的 WAI-ARIA 测试，免去亲力亲为的麻烦。其他生态系统没有可以相媲美的。[Segun Adebayo 的 Chakra UI](https://www.smashingmagazine.com/2020/07/accessible-front-end-application-chakra-ui-nuxtjs/) 也是如此。和[移动端应用的封闭花园](https://www.smashingmagazine.com/2020/07/accessible-front-end-application-chakra-ui-nuxtjs/)相比，开放 web 呈现出让人担忧的衰退之势。听一下 [Rick Hanlon 关于触屏 Web 的讲座](https://www.youtube.com/watch?v=LhKglxQT4sU)，你会意识到 web 应用在这方面需要提升多少以逆转这一趋势。
  - 请允许我澄清一下——现在 React 社区**真的**在这些事情上做得很好吗？见鬼去吧，根本不好。社区的大部分人还在争论到底要不要学 hook 还是接着用基于类的组件。**但是** React 在这方面走得最远，因为它有最好的抽象，让最好的思想者创建我们都想用的 web 应用标准库。

- [Selective](https://github.com/facebook/react/pull/17004) 和 [Progressive Hydration](https://twitter.com/dan_abramov/status/1200111677833973760?s=20) 是 Fiber 重写中特别有趣的结果。它们和未来的「全栈」 React 一起，让开发者[能够方便地在客户端和服务端之间迁移代码和执行](https://twitter.com/dan_abramov/status/1259615888438935556?s=20)。未来很有希望能让应用更顺畅而不用在开发体验和用户体验上妥协。

你当然可以用 React 搭网站。Gatsby 和 Next.js，还有新兴的 [Remix](https://remix.run/) 是很好的静态和 serverless 渲染选项。（Gatsby 有多了不起[有些争议](https://dev.to/richharris/in-defense-of-the-modern-web-2nia)。）[Docusaurus](https://docusaurus.io/) 非常适合文档网站。如果你要搭网站但是担心 JS 太重，那么你通常可以[通过几行代码把 React 替换为 Preact](https://twitter.com/swyx/status/1316540904761520129?s=20)，因为只是搭建一个网站的话，你通常不会碰到任何[Preact 妥协的地方](https://preactjs.com/guide/v8/differences-to-react/)。

所以为什么我要鼓吹用另一个框架搭网站呢？

## 用 Svelte 搭网站

> 更准确地说，用 Svelte 搭建交互式网站

[数以百计](https://github.com/sveltejs/community/tree/master/who's-using-svelte)的公司在生产环境使用 Svelte，其中包括纽约时报（译者注：Svelte 的作者 Rich Harris 是纽约时报的图片编辑）、Square Enix（译者注：日本的游戏公司，知名作品包括《最终幻想》、《勇者斗恶龙》）、Apple、Spotify、Google Arts、阿拉斯加航空，Amazon 和 Microsoft 这样的大型开发平台也越来越多地提到 Svelte。Svelte 的社区也很活跃，包括播客、YouTube 频道、培训、会议、新闻邮件。Svelte 3 甫一推出即大获成功。

我这里给你透露个小秘密：[Svelte 和 React 没有那么不一样](https://twitter.com/buildsghost/status/1255936971265826816?s=20)。下面是 [Svelte 编译出的底层代码](https://lihautan.com/compile-svelte-in-your-head-part-1/#compile-svelte-in-your-head)：

```js
function create_fragment(ctx) {
  // 略
}

export default class App extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
```

什么鬼？`class App extends SvelteComponent`？？这很像是 React 啊？？

是的。不仅如此，很快你会意识到 [`=` 基本上会编译为 `setState`](https://lihautan.com/compile-svelte-in-your-head-part-1/#updating-data)，而且 Svelte 其实[自带运行时](https://github.com/sveltejs/svelte/tree/master/src/runtime)，也有[调度器](https://github.com/sveltejs/svelte/blob/ec0f79c5af3113bedf0a5e9ae1f5f521328fcd30/src/runtime/internal/scheduler.ts)。如前所述，React 引领风潮，其他框架跟进。React 证明组件是正道。

这也意味着，[大多数 React 开发者花上几小时就能学会 Svelte](https://www.youtube.com/watch?v=xgER1OutVvU&feature=youtu.be)，切换成本很低。

不过，其他方面两者的差别就很大了：

- **JS 大小**。你的网站也许能拿到绿色的 Lighthouse 评分，但我希望你同意这样一个观点，从用户的角度说，理想情况下网站只应该包含使用到的 JS。Svelte 站点通常只有几 K 大小。而 React + React Dom 差不多需要 120 K（未压缩）。当然，如果切换到 Preact 的话，体积可以大大精简。但是，根据评测，Svelte 的[运行时体积最小](https://twitter.com/SvelteSociety/status/1314255119555338241)。我们曾担心 Svelte 编译输出的额外开销超过了 React 组件的体积（更小的运行时 = 更多模版代码），但[最近的研究完全打消了我们的顾虑](https://twitter.com/SvelteSociety/status/1297548737091264518?s=20)。
  - 不过，在我看来，整个项目的 JS 体积不仅和框架本身有关。听说 Svelte 吸引的人看起来比 React 吸引的人更在乎性能（看看 [lukeed](https://github.com/lukeed/) 做的东西）。这一倾向可以说是自上而下的，React 开发者常常会引入很重的依赖，只要这些依赖基本符合使用场景，而 Rich Harris 是那种顽固的开发者，会在只需要部分功能时写自己的版本。不过，Svelte 也是大多数人的**第二**框架，来使用 Svelte 的时候会更注重性能。总的来说，框架选择依赖的文化也影响了整个项目的 JS 体积。
  - Svelte 社区新兴的 JAMstack 文化让我更受鼓舞。[Nick Reese](https://twitter.com/nickreese) 在 [Elder.js](https://elderguide.com/tech/elderjs/) 上实现了 [Jason Miller 提出的岛屿架构（Islands Architecture）](https://jasonformat.com/islands-architecture/)。（一言以概之，典型的[第二代静态站点生成器](https://www.youtube.com/watch?v=DD6KTAGrj3E)通过 JS 来 rehydrate 整个页面，即使页面的内容没有变动，而岛屿架构的网站只会通过 JS 来 rehydrate 页面的动态部分，剩下的部分不动。）

- **自带样式**。不用我多说了吧。Rich Harris 的理念类似这样（如果表述得不好是我的错）：「在我看来，前端框架应该提供样式的解决方案」（花边：[围观下 React 核心团队关于样式解决方案的争论](https://twitter.com/rachelnabors/status/1320474510143967235?s=20)！他们尝到了苦头。）过渡效果和动画效果同理。询问任何 React 开发者该用什么样式/动画解决方案，看看他会有多尴尬，或者他会滔滔不绝地向你介绍 5 种有着微妙不同的解决方案，就像在念一篇博士论文。不过有点反讽的是，我自己[在 Svelte 下用的是 Tailwind](http://swyx.io/why-tailwind)。

- **完整的建站工具集**。还不止样式和动画。状态管理？头标签管理？类切换？Tween/Spring 效果？（即将推出）路由？全都只需一行 import 语句。基于 Svelte 的设计，你可以根据需要使用很多或很少功能，但至少每个功能都有一个第一方的选项。
  - React 为它的[最小接口面](https://www.youtube.com/watch?v=4anAwXYqLG8)而自豪，依赖其生态系统来弥补空当。有选择是件好事，这也是 React 流行和长盛不衰的重要原因。
  - 不过，目前而言，长年保持关注并选择前端技术栈的每个部分让我感到焦虑，这真不高效。也许我水平不够，或者也许我只是需要能够贴合我的需求的更高效的技术栈。

- **Svelte 是 HTML 的超集**。Svelte 不仅是一套工具集，还是一种让 web 开发更高效的[语言](https://gist.github.com/Rich-Harris/0f910048478c2a6505d1c32185b61934)。这意味着 SVG 开箱即用，也意味着你可以操作 `class` 等，还意味着你可以[很好地搭配 web 组件（Web Components）使用](https://custom-elements-everywhere.com/)（既包括导入，也包括导出）。很多使用 React 和 JSX 时让你不爽的地方都被照顾到了。

- **Svelte 的劣势在网站开发上不那么重要**。Svelte 的生态系统和社区要小得多，但开发网站时这并不那么重要，毕竟搭网站的时候你多半需要自行设计和实现交互。这正是 Rich 在纽约时报上使用 Svelte 的方式——不依赖生态系统。潜在的招聘候选人更少也相对不那么让人担心，因为搭建网站通常不需要像维护应用那样组建一个很大的团队。

  > 顺便提一下，我们正致力于通过扩大 Svelte 社区的方式帮助构建 Svelte 生态系统——一年以前，在[微软的一个小房间](https://twitter.com/swyx/status/1179261731304022017?s=20)我们创办了 [Svelte Society](https://twitter.com/SvelteSociety)——我们在 2020 年 10 月 18 日办了 [Svelte 峰会](https://sveltesummit.com/)。

- 如果你**仍然**需要基于 React 实现某个功能，那么，如果你愿意的话，你可以在 Svelte 应用上挂载 React。反其道而行就没太大意义（因为你已经付出了库体积的代价），以 Svelte 为底才是有意义的。

> 顺便提下渲染性能和虚拟 DOM：「虚拟 DOM」的重要性是 React 和 Svelte 之争的焦点之一（关心 Twitter 上的技术内容的人可能还记得[去年的第三次评测](https://twitter.com/Rich_Harris/status/1200807516529147904?s=20)），不过老实说，你我会写的小网站和小应用不会有那样的性能需求，所以关于这一点我这里不作比较。

我以前写过一篇[《我为什么喜欢 Svelte》](https://www.swyx.io/svelte-why/)，不过上面这些个人想法可以解释我为什么选择 Svelte 而不是 React 搭建自己的交互式站点。

### 到底为什么要用框架

当然，从 web 开发的角度说，这类技术栈选择的复杂性并没有讨论完。其他人可能从相反的角度出发，提出**另一项**疑问——如果你只是搭建一个网站（交互式或非交互式），为什么要使用框架？

这是一个好问题——毕竟存在优秀、快速、久经考验的不用框架的选择方案，比如 [Hugo、Jekyll、Eleventy](https://jamstack.org/generators/) 等。默认情况下它们根本不生成 JS，如果你需要的话，可以一点一点地加上 JS。

我目前的答案更多的是从心智模型的角度出发。我想要基于组件编写代码，也想要能够比较容易地将之前不带交互的界面升级为交互式的界面。上面这些传统的站点生成器都不能让我做到这些。我不确定这一论点能否说服那些「无框架」群体，但至少能说服我自己。

## 理念图景

我想分享一个更深刻的感悟，一个乍听起来很沮丧的感悟：

[为做小东西而设计的工具和为做大东西而设计的工具应该大不一样。](https://twitter.com/swyx/status/1278665379544350720)

好，对吗？乍看起来，这不过是在复述老掉牙的回避论调「使用适合任务的工具」，我过去[曾经批判过这一论调](https://www.swyx.io/hammers/)。

并非如此，这两者之间有着微妙的不同。我想强调的是，**看上去**一样的任务，在不同的规模，实际上是**不同**的任务。不同到足以使用不同的工具。

况且，当我们忽略了这一点，尝试让工具可以做一切事情的时候，我们让工具变得对每个人来说**更难用**了——学习起来更让人困惑，需要记忆更多 API，并且经常因为做了过多妥协导致用户体验下降。

**我们急于让所有人满意的时候，没有人会很高兴。**

> 插一句：我们这么做的原因很复杂。有时候开发工具背后的公司因为觉得自己需要增长而这么做。其他时候开发者只是因为想要显示他们能做到这一点而这么做。我无意指责这些，逼近极限总是值得尝试的。

这是我从 React 和 Svelte 之争中得出的高层概括。React 团队的公开言论最为清晰地表明了这一点（**请不要找他们核实这一点，这些只不过是他们在社交媒体的个人账号上不经意的闲谈**）：

- [Dan Abramov](https://twitter.com/dan_abramov/status/1259618524751958016?s=20)：一个「看不见的框架」当然很酷，也是一个值得追求的目标。但是当框架只占你的代码总量的 5% 时，这并没有多大帮助。如果可以做到「看不见的应用」，那我洗耳恭听。

- [Seb Markbage](https://twitter.com/sebmarkbage/status/1201251406604197888?s=20)：根据我做过的内部评测调查（我们见过的所有真实的重要应用上的比例与此类似），所有执行 JS 的时间中大概有 5% 花在创建实际的 DOM 节点，这部分时间是固有的。框架代码执行的时间大概占 8%。我们可以做各种权衡来优化这 8%，最多可能节约 7% 的 JS 执行的时间……但是这掩盖了实际应用中还剩下的 87% 的 JS 执行时间。那才是我们需要重点关注的。

- [还是 Dan](https://twitter.com/dan_abramov/status/1316838048223694851?s=20)：我们更关注优化应用大小而不是库的大小，我认为，总体上讲，这个说法是对的。因为库的大小相对而言是个常量，而应用的大小会不断增长。`lazy()` 是一个例子，但我们有很多需要做的事情。

事实上……React 库的大小有 120 KB（未压缩）。React 占总 JS 代码的 5% – 13% 的应用是多大的应用。1 – 2.5 MB. 你的网站/应用有这么大吗？

基本事实：

- 毫无疑问，React 是开发应用的最佳框架，而且越来越好。
- React 团队更关注应用而不是网站。
- 尽管 React 非常在意社区，但 React 首先要满足 Facebook 的需求，也主要是为了满足 Facebook 的需求。
- 你不是 Facebook。
- 你的站点基本不会是 Facebook。
- 你大概不会使用所有 React 的特性。
- 即便使用 Preact，P/React 生态系统也不能给你足够的开箱即用的东西让你高效开发。
- 应该存在更好的搭建交互式网站的工具集。
- 现在适合这一用途的最好的语言是 Svelte.

Svelte 搭网站，React 建应用。证毕。

给勃然大怒的 Svelte 粉丝的附言：是的，你当然也可以使用 Svelte 写应用。让人们自己意识到这一点吧。应该强调能够毋庸置疑地获胜的使用场景，在这些场景下采用 Svelte 很容易，成本很低。不要在每个阵线上开战，特别是不要在那些间接证据会削弱你的主张的场景上争论。