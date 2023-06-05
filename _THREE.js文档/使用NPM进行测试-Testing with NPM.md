# 使用NPM进行测试（Testing with NPM）

这篇文章展示了如何将three.js置入[node.js](https://nodejs.org/en/)环境中， 这样你就可以执行自动化测试了。测试可以通过命令行或者类似[Travis](https://travis-ci.org/)的CI工具来运行。

## 一句话概括

如果你习惯使用node和npm，

`$ npm install three --save-dev`

并将

`var THREE = require('three');`

添加到你的测试中。



## 添加mocha

我们将使用[mocha](https://mochajs.org/)。

1. 安装mocha

   `$ npm install mocha --save-dev`

   你会注意到 node_modules/ 被创建了，并且你的依赖都出现在了这里面。 还有你的package.json被更新了，**--save-dev指令向其中加入并更新了devDependencies属性**。

2. 编辑package.json来使用mocha进行测试。当调用测试的时候，我们只想运行mocha并且生成一份详细的报告。 默认情况下这会运行 test/ 中的任何东西。 （如果项目中没有 test/ 目录的话，会导致npm报错。你可以通过mkdir test来创建这个目录）

   `"test": "mocha --reporter list"`

3. 重新运行测试

   `$ npm test`现在应该就能成功执行了，生成类似 0 passing (1ms) 的报告。

## 添加three.js

1. 现在添加我们的three.js依赖

   ```
   $ npm install three --save-dev
   ```

   - 如果你需要three.js的其他版本，使用

     `$ npm show three versions`

   - 来确认哪些是可用的。要让npm使用正确的版本，执行

     `$ npm install three@0.84.0 --save`

     （例子中用的是0.84.0）。 **--save 指令将此加入项目的dependency**而不是dev dependency。 更多信息请参阅[这份文档](https://www.npmjs.org/doc/json.html)。

2. Mocha会在 test/ 目录中寻找测试文件，所以我们先创建这个目录：`$ mkdir test`

3. 最后我们需要一份JS测试文件来运行。我们就添加一段简单的测试程序，这段程序会检验three.js对象是否能正常工作。 在 test/ 目录下创建verify-three.js包含以下代码：

```js
var THREE = require('three'); 
var assert = require("assert"); 
describe('The THREE object', function() {  
    it('should have a defined BasicShadowMap constant', function() {   
                assert.notEqual('undefined', THREE.BasicShadowMap);  
    }),   
    it('should be able to construct a Vector3 with default of x=0', function() {    
        var vec3 = new THREE.Vector3();    
        assert.equal(0, vec3.x);  
    }) 
})
```

4. 最后再次通过$ npm test来测试。这次应该能正确执行上面的代码，并且返回类似：

```
The THREE object should have a defined BasicShadowMap constant: 0ms 
The THREE object should be able to construct a Vector3 with default of x=0: 0ms 
2 passing (8ms)
```


## 加入你自己的代码

你需要做下面三件事：

1. 为你的代码写一段测试程序来检验期望结果，并把它放在 test/ 目录下。 [这里](https://github.com/air/encounter/blob/master/test/Physics-test.js)有一个实际项目的例子。
2. 将你的代码以nodejs承认的方式导出，即可以通过require的方式引用。 参考[这份代码](https://github.com/air/encounter/blob/master/js/Physics.js)。
3. 在测试程序中通过require引入你自己的代码，就像上面例子中我们通过require('three')来引入一样。

第2、3条会根据你组织代码的方式而改变。在上面给出的Physics.js的例子中，导出的部分在代码的最末尾。 我们将module.exports赋值为一个对象:

```js
//============================================================================= 
// 为了在nodejs中可用 //============================================================================= 
if (typeof exports !== 'undefined') {  module.exports = Physics; }
```

## 处理依赖

如果你已经在使用require.js或者browserify之类的便捷工具，就跳过这个部分。

一般来说，一个three.js项目将在浏览器中运行，浏览器会通过执行一系列script标签来加载模块。 你自己的文件不用考虑依赖的问题。然而在nodejs环境中，没有一个关联所有文件的index.html，所以你需要显式地加载。

如果你要导出的模块还依赖其他文件，你需要告诉node去加载它们。下面是一种方式：

1. 在你的模块顶部，检查是否处于nodejs环境中。
2. 如果是，那就显式地声明你的依赖。
3. 如果不是，你多半处于浏览器环境中。这时候你不需要做任何多余操作。

用Physics.js中的代码举例:

```js
//============================================================================= 
// 服务器端测试配置 //============================================================================= 
if (typeof require === 'function') {  // 检测nodejs环境
	var THREE = require('three');  var MY3 = require('./MY3.js'); 
}
```

