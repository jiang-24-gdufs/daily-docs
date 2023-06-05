[TOC]



Curve → CurvePath →

# 形状路径（ShapePath）

该类用于转换一系列的形状为一个Path数组，例如转换SVG中的Path为three.js中的Path（请参阅下方的example）。 在内部它由Font所使用，用于将JSON字体转换为一系列路径。

## 示例

[geometry / extrude / shapes2](http://www.webgl3d.cn/threejs/examples/#webgl_geometry_extrude_shapes2)

## 构造函数

### ShapePath( )

创建一个新的ShapePath。和Path不同，因为ShapePath被设计为在创建之后生成，所以没有点被传入到构造函数中。

## 属性

### .subPaths : array

Path数组。

### .currentPath : array

当前将要被生成的路径。

## 方法

### .moveTo ( x : Float, y : Float ) : this

创建一个新的Path，并在Path上调用Path.moveTo( x, y )。

### .lineTo ( x : Float, y : Float ) : this

这一方法从currentPath（当前路径）的偏移量创建一条到X和Y的线，并将偏移量更新为X和Y。

### .quadraticCurveTo ( cpX : Float, cpY : Float, x : Float, y : Float ) : this

这一方法从currentPath（当前路径）创建一条到X和Y的二次曲线，cpX和cpY作为控制点， 并将currentPath的偏移量更新为x和y。

### .bezierCurveTo ( cp1X : Float, cp1Y : Float, cp2X : Float, cp2Y : Float, x : Float, y : Float ) : this

这一方法从currentPath（当前路径）的偏移量创建一条到X和Y的贝塞尔曲线， cp1X、cp1Y和cp1X、cp1Y为控制点，并将currentPath的偏移量更新为x和y。

### .splineThru ( points : Array ) : this

points - 一个Vector2数组。

连接一个新的SplineCurve（样条曲线）到currentPath（当前路径）。

### .toShapes ( isCCW : Boolean, noHoles : Boolean ) : Array

isCCW -- 更改实体形状和孔洞的生成方式。
noHoles -- 是否创建孔洞。

将subPaths数组转换为到Shapes数组。默认情况下，实体形状按照顺时针（CW）来定义，孔洞按照逆时针（CCW）来定义。 如果isCCW被设置为true，则孔洞和实体形状的定义将被反转。如果noHoles参数设置为true，则所有路径将被设置为实体形状，isCCW将被忽略。

## 源代码

[src/extras/core/Path.js](https://github.com/mrdoob/three.js/blob/master/src/extras/core/Path.js)
