BPMN（Business Process Modeling Notation）是由业务流程管理倡议组织BPMI（The Business Process Management Initiative）开发的一套标准的业务流程建模符号规范。



导入bpmn文件, 以文件的形式通过import导入需要使用raw-loader解析, 需要安装



main.js 中导入bpmn-js的样式文件



```js
import BpmnModeler from 'bpmn-js/lib/Modeler';
bpmnModeler = new BpmnModeler({
	container: canvas
});
bpmnModeler.importXML(bpmnStr); // 动态导入bpmn文件字符串

```



想要使用右侧的属性栏就得安装上一个名为`bpmn-js-properties-panel`的插件, 视情况使用



查找到[bpmn.io/diagram.js/modeling](https://github.com/bpmn-io/diagram-js/blob/master/lib/features/modeling/Modeling.js)文件之后, 取的一些我项目里有用到的事件.

```js
BpmnModeler.get('elementRegistry');	// 获取注册元素
BpmnModeler.get('eventBus'); // 获取通信总线
// 事件注册在通信总线上
eventBus.on(eventType, function(e) {
	console.log(e)
})
```

需要根据e.element.type == 'bpmn:Process'屏蔽画布上的事件



输出xml/bpmn需要根据其内部的api解析, 前端通过传入函数, 内部会把解析结果传入改函数

```js
// The APIs we are wrapping all resolve a single item depending on the API.
// For instance, importXML resolves { warnings } and saveXML returns { xml }.
// That's why we can call the callback with the first item of result.
return callback(null, result[firstKey]);
```

```js
//  BaseViewer.js
BaseViewer.prototype.saveXML
BaseViewer.prototype.saveSVG
```

