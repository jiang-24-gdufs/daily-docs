[TOC]

## [FAQ 常见问题的解答](https://echarts.apache.org/zh/faq.html)

## 通用问题

### 有技术问题怎么办？

1）建议您在提问前，大致阅读一下[配置项手册](https://echarts.apache.org/zh/option.html)左侧导航，了解 ECharts 有哪些配置项，并且在相关的组件下查找是否有实现您需要功能的配置项；

2）查看本页常见问题的解答；

3）建议使用[官方编辑器](https://echarts.apache.org/examples/zh/editor.html)、[CodePen](https://codepen.io/Ovilia/pen/dyYWXWM)、[CodeSandbox](https://codesandbox.io/s/echarts-basic-example-template-mpfz1s) 或 [JSFiddle](https://jsfiddle.net/plainheart/e46ozpqj/7/) 添加图表，复现你的问题，如果无法使用代码描述需求，可以尝试提供设计稿或画个草图；

4）推荐在 [stackoverflow.com](https://stackoverflow.com/)、[开源中国](https://www.oschina.net/question/tag/echarts) 或 [segmentfault.com](https://segmentfault.com/t/echarts) 等问答平台上提问，附上图表链接。

### ECharts 可以免费商用吗？

可以，ECharts 基于 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) 开源。

## 坐标轴

### 坐标轴标签显示空间不够怎么办？

可以用 [interval](https://echarts.apache.org/zh/option.html#xAxis.interval) 控制每隔多少显示标签，设为 `0` 则显示所有标签。

或者，可以设置 [axisLabel.rotate](https://echarts.apache.org/zh/option.html#yAxis.axisLabel.rotate)，将标签旋转一定角度。

### 把坐标轴设置在右侧好像没有效果？

需要将 [onZero](https://echarts.apache.org/zh/option.html#yAxis.axisLine.onZero) 设为 `false` 才行。

### 如何强制显示坐标轴第一个/最后一个标签？

ECharts 3.5.2 版本起，支持 [axisLabel.showMinLabel](https://echarts.apache.org/zh/option.html#xAxis.axisLabel.showMinLabel) 以及 [axisLabel.showMaxLabel](https://echarts.apache.org/zh/option.html#xAxis.axisLabel.showMaxLabel)，分别用来控制第一个/最后一个标签是否强制显示，设为 `true` 则强制显示。

## 图例 legend

### 图例区域太大导致遮挡住图表怎么办？

可以设置 [grid](https://echarts.apache.org/zh/option.html#grid) 控制图表区域位置。例如将 `grid.top` 设置得大一些，可以将绘图区域下移。

在未来的版本中，我们计划会将布局做得更智能，自动处理这些遮挡问题。

## 折线图

### 坐标轴刻度好像和数据不匹配？

请检查一下是否设置了 `stack`，如果不是想做堆积折线图的话，应该将其去掉。

## 柱状图

### 为什么数据值很小的时候，y 轴的刻度会消失？

ECharts 3.5.2 版本修复了该问题。

## 地图

### 图表上的省份名称重叠，如何修改名称的位置？

可以修改地图文件（JS 或 JSON）中对应省份的 `cp` 坐标，或者通过 `echarts.getMap('china')` 修改已加载的地图数据。

更详细的做法请参考：[GitHub](https://github.com/apache/echarts/issues/4379#issuecomment-257765948)

### 其他国家的地图在哪里下载？

可以在[这里](https://github.com/echarts-maps/echarts-countries-js)下载到其他国家的地图信息。

### 如何获取地图的缩放事件？

首先，需要将系列的 [roam](https://echarts.apache.org/zh/option.html#series-map.roam) 设置为 `true`，然后可以监听 `'georoam'` 事件。例：

```
myChart.on('georoam', function (params) {
   console.log(params);
});
```

### 如何制作自定义地图？

ECharts 地图在地图坐标的基础上进行过[额外的编码](https://github.com/apache/echarts/blob/8eeb7e5abe207d0536c62ce1f4ddecc6adfdf85e/src/util/mapData/rawData/encode.js)。可以使用 [mapshaper-plus](https://github.com/giscafer/mapshaper-plus) 工具，上传自定义的 geojson 文件，生成 ECharts 可以使用的地图文件。

## 百度地图

### 如何结合百度地图使用 ECharts？

1. 引入 `echarts.js`、`bmap.js` 以及 `https://api.map.baidu.com/api?v=3.0&ak=这里填在百度开发平台注册得到的 access key`；
2. 在 `option` 中设置 `bmap`，参考[这个例子](https://echarts.apache.org/examples/zh/editor.html?c=effectScatter-bmap)；
3. 如需获得百度地图实例，可以通过 `chart.getModel().getComponent('bmap').getBMap()`，然后根据[百度地图 API](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html)做进一步设置。

## 仪表盘

### 怎么设置仪表盘颜色？

可以使用 [axisLine.lineStyle.color](https://echarts.apache.org/zh/option.html#series-gauge.axisLine.lineStyle.color) 设置。

## 事件处理

### 如何获取图表点击等事件？

参考[官网教程](https://echarts.apache.org/handbook/zh/concepts/event)。ECharts 支持的事件类型请参考[相关 API](https://echarts.apache.org/zh/api.html#events)。

## 其他

### 图表为什么不显示？

你可以检查以下情况：

- `echarts.js` 是否正常被加载；
- `echarts` 变量是否存在；
- 调用 `echarts.init` 的时候，DOM 容器是否有宽高。

### ECharts 有哪些学习资料？

ECharts 相关项目及资源请参见 [awesome-echarts](https://github.com/ecomfe/awesome-echarts)。