[toc]

# 首先说说sourceMap

说起sourceMap大家肯定都不陌生，随着前端工程化的演进，我们打包出来的代码都是混淆压缩过的，当源代码经过转换后，调试就成了一个问题。在浏览器中调试时，如何判断原始代码的位置？


为了解决这个问题，google 提出了sourceMap 的想法，并在chorme上最先支持sourceMap的使用。sourceMap 由于包含许多信息，前期也经过多版的编码算法优化，最后在2011年探索出了Source Map Revision 3.0 ，这个版本也就是我们现在一直在使用的sourceMap版本。这一版本的mapping信息使用Base64 VLQ 编码，大大缩小了.map文件的体积。

sourceMap可以帮我们直接定位到编译前代码的特定位置，接下来我们直接拿个sourceMap文件来看看它包含了一些什么信息：

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODmQgsO5rK6WopFy2cBR0r0Ovuibty4BwZsicqAw8zcTjyjETLlG83rUYg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

上面可以看到，sourceMap其实就是就是一段维护了前后代码映射关系的json描述文件，包含了以下一些信息：

- version：sourcemap版本（现在都是v3）
- file：转换后的文件名。
- sourceRoot：转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空。
- sources：转换前的文件。该项是一个数组，表示可能存在多个文件合并。
- names：转换前的所有变量名和属性名。
- mappings：记录位置信息的字符串。
  mappings 信息是关键，它使用Base64 VLQ 编码，包含了源代码与生成代码的位置映射信息。mappings的编码原理详解可见：http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html，这里就不再详述。



# webpack中的sourceMap配置

 webpack 给出了多种sourceMap配置方式，相信很多人第一眼看到的时候和我一样，疑惑这些都有啥区别

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODU21ZG3kUdfdTxfbTicWdka5ia3Xx4tKgrg9C30OP5v0MGPN49mFy0qIg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



其实不难发现这么多配置，这些就是source-map和eval、inline、cheap、module 的自由组合。所以我们来拆开看下每项配置。

为了方便演示，这里的源代码只包含了一行代码

```
console.log( hello world );
```

先给大家展示，最原始的只设置’source-map’配置，可以看到输出了两个文件，其中包含一个map文件

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODRrYwwMrLoOeLF7vSEZkQ5PE2SM1o8kLVn0yarcbTMgq93HwkEKecKw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)


main.js文件内容如下，map文件上面展示过了，就不再展示内容了

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODjdwetaRJ1TdnvpaGOCl1BgI4Me4vVR62MYEEc5clSfs1rlqRtkwwOg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## eval

每个模块用eval()包裹执行。

1)`devtool: eval`
我们先看看单独的eval配置，这个配置相对于其他会特殊一点 。因为配置里没有sourceMap，实际上它也会生出map，只是它映射的是转换后的代码，而不是映射到原始代码。

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODl7cxiaQiaUpWcQu6u1PEHCgqu0IVt648LxNmJicfLp5C24cNYW0AxCoCA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

2)`devtool: eval-source-map`
所以eval-source-map就会带上源码的sourceMap,打包结果如下：



![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODR6Y3j7xyicVa2F3E9xTicTNcPibMibKMVpicdJbNrTiaqyTc2lBpFt2lju4Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

值得注意的是***加了eval的配置生成的sourceMap会作为DataURI嵌入，不单独生成.map文件**。*

对于eval的构建模式，我们可以看看官方的描述

> devtool: “eval-source-map” is really as good as devtool: “source-map”, but can cache SourceMaps for modules. It’s much faster for rebuilds.

可以看出官方是比较推荐开发场景下使用的，因为它能cache sourceMap，从而rebuild的速度会比较快。



## inline

inline配置想必大家肯定已经能猜到了，就是将map作为DataURI嵌入，不单独生成.map文件。
`devtool: inline-source-map`构建出来的文件如下, 这个比较好理解，就不多说了

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODBYlK6ib9bCIfTJkQE1o0lXnQTKib4k4XjZ9AHx7QZ1wFoZiaibfeHGddkg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



## cheap

这是 “cheap(低开销)” 的 source map，因为它没有生成列映射(column mapping)，只是映射行数 。
为了方便演示，我们在代码加一行错误抛出：

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODMxSDqNaxCkbr0nM6miaMCEsUGS7qPwydicOSFb7SAvrlj1bhicZyz5w5w/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到错误信息只有行映射，但实际上开发时我们有行映射也基本足够了，所以开发场景下完全可以使用cheap 模式 ，来节省sourceMap的开销

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODURudjKQZpTm79bWaRwwC9lskaEf5mYI4nOtJiaicYwgakY9Xicnics5MYg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



## module

Webpack会利用loader将所有非js模块转化为webpack可处理的js模块，而增加上面的cheap配置后也不会有loader模块之间对应的sourceMap。

什么是模块之间的sourceMap呢？比如jsx文件会经历loader处理成js文件再混淆压缩， 如果没有loader之间的sourceMap，那么在debug的时候定义到上图中的压缩前的js处，而不能追踪到jsx中。

所以为了映射到loader处理前的代码，我们一般也会加上`module`配置



# 总结

**1、开发环境**
综上所述，考虑到我们在开发环境对sourceMap的要求是：快（eval），信息全（module），且由于此时代码未压缩，我们并不那么在意代码列信息（cheap）,所以开发环境比较推荐配置：`devtool: cheap-module-eval-source-map`

**2、生产环境**
一般情况下，我们并不希望任何人都可以在浏览器直接看到我们未编译的源码，所以我们不应该直接提供sourceMap给浏览器。但我们又需要sourceMap来定位我们的错误信息， 这时我们可以设置`hidden-source-map`：
一方面webpack会生成sourcemap文件以提供给错误收集工具比如`sentry`，另一方面又不会为 bundle 添加引用注释，以避免浏览器使用。
当然如果没有这一类的错误处理工具，可以看看webpack推荐的其他配置：
https://www.webpackjs.com/configuration/devtool/



## CSS sourceMap

说起sourceMap我们第一反应通常是JavaScript的sourceMap,实际上现在css也可以使用sourceMap。因为sourceMap本质只是一个json，里面包含了源码的映射信息。所以其实只要了解sourcemap的编码规范，我们可以对任何我们想要的资源生成sourceMap，当然sourceMap 的支持也还是要取决于浏览器的支持。

现在，对于css我们也有同样诉求，比如我现在打开调试器看到的样式配置没有任何源信息。如果想像js一样，知道这个css样式是在哪个文件需要怎么弄呢？

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODA7ZZ9XLmZWgtPYwmOhWS8NOibGxSz3oepCRkPyAKfauxk5hDO4UicsdQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

上面讲解的配置其实都是针对js的sourceMap，配置后webpack会自动帮我们生成各类js sourceMap。因为本质上webpack只处理js，对于webpack来说，css是否有sourceMap依赖于对css处理的loader是否有sourceMap输出，所以loader需要开启并传递sourceMap,这样最后生成的css才会带上sourceMap 。

目前使用的css-loader,sass-loader都已经提供了生成sourceMap的能力，只需要我们加上配置即可。

> 需要注意的是，这里如果要拿到sass编译前的源码信息，那么sourceMap一定要从sass-loader一直传递到css-loader，中间如有其他loader处理，也要透传sourceMap



![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaOD2UB9M6a9JUMYIXWPDt7hx4iaBvrF5B1bJZc5JeO5Mj3znia3VoM7t5sQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们可以看到，加了sourceMap 配置后，sourceMap会被内联在css代码里（这一层是css-loader处理的，与你是否使用min-extract-css-plugin抽出css无关）

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODWmzWgnNRTicaJqRBy4T3Xoic3UZ4FpTrxCRb50mykicgiasmY4SODOnYlg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

加了css sourceMap后,我们可以很轻松的定位到sass编译前的源码路径了。

![img](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

通过debug，打印出生成的css sourceMap，和js sourceMap对比并无他样：

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODugyRM3ShoFldYOZWH2K1wtFyV9p3Sn5CdBv5diavrXSBxIBpW3OicLPA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



## 利用css sourceMap 解决css url resolve的问题

如果大家用了sass的话，很可能会遇到一个css url resolve的问题，在之前的一篇讲webpack 配置的文章里我也提到过：

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODHgSXuXHoHUfTSY4nC5icEAAe9OM6mUfcJoJFlAhbs1AvibzTLxOEYZfw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

实际上，利用css sourceMap这个问题便可以在不改变源码的情况下就可以完美解决。
这里会增加一个loader去处理，loader处理流程主要分为二步：
1、根据sourceMap的sourcesContent和url内容进行匹配，然后从sources定位到原有的css资源路径
2、将传递给下个loader的url内容替换成绝对路径
代码如下：

```js
module.exports = function (content, map) {
    const res = content.replace(/url((?: |")?((./|../)+([^ ")]*))( |")?)/g, (str, img, p2, imgPath) => {
        let index = -1;
        const {sourcesContent = [], sources = [], sourceRoot = []} = map || {};
        sourcesContent.some((item, i)=> {
            if (item.indexOf(img) !== -1) {
                index = i;
                return true;
            }
        });
        if (index !== -1) {
            const dir = path.dirname(sources[index]); // 获取文件所在目录
            str = str.replace(img, `~${path.join(dir, img)}`);
        }
        return str;
    });
    this.callback(null, res, map);
    return;
}
```

因为依赖sass-loader 处理之后的sourceMap, 所以@tencent/im-resolve-url-loader应配置在sass-loader 前面，配置如下：

![img](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCtRBRLgsicqltEkLhgZzBiaODFdTic137BL4Da8CicV6VMm9BNFZApHJU5KDomu0F1vdtfIswCwG56tNg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)