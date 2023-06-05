[TOC]



Object3D →

# 网格（Mesh）

表示基于以三角形为[polygon mesh](https://en.wikipedia.org/wiki/Polygon_mesh)（**多边形网格**）的物体的类。 

同时也作为其他类的基类，例如SkinnedMesh。

## 示例

```
var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 ); 
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
var mesh = new THREE.Mesh( geometry, material ); scene.add( mesh );
```

## 构造器

### Mesh( geometry : Geometry, material : Material )

geometry —— （可选）Geometry或者BufferGeometry的实例，默认值是一个新的BufferGeometry。
material —— （可选）一个Material，或是一个包含有Material的数组，默认是一个新的MeshBasicMaterial。

## 属性

共有属性请参见其基类Object3D。

### .drawMode : Integer

决定了网格中的三角形将如何从顶点来构造。 请参阅draw mode constants（绘图模式常量）来查看其所有可能的值。 其默认值是TrianglesDrawMode。

A sensible usage of this property is only possible when Mesh.geometry is of type BufferGeometry since the engine always assumes **THREE.TrianglesDrawMode** for Geometry.

### .isMesh : Boolean

用于检查这个类或者其派生类是否为网格，默认值为**true**。

你不应当对这个属性进行改变，因为它在内部使用，以用于优化。

### .geometry : Geometry

Geometry 或 BufferGeometry 的实例或者派生类，定义了物体的结构。

如有可能，推荐总是使用BufferGeometry来获得最好的表现。

### .material : Material

由Material基类或者一个包含材质的数组派生而来的材质实例，定义了物体的外观。默认值是一个具有随机颜色的MeshBasicMaterial。

### .morphTargetInfluences : Array

一个包含有权重（值一般在0-1范围内）的数组，指定应用了多少变形。 默认情况下是未定义的，但是会被updateMorphTargets重置为一个空数组。

### .morphTargetDictionary : Object

基于morphTarget.name属性的morphTargets字典。 默认情况下是未定义的，但是会被updateMorphTargets重建。

## 方法

共有方法请参见其基类Object3D。

### .setDrawMode ( value : Integer ) : null

设置drawMode的值。

### .clone () : Mesh

返回这个Mesh对象及其子级的克隆。

### .raycast ( raycaster : Raycaster, intersects : Array ) : null

在一条投射出去的Ray（射线）和这个网格之间产生交互。 Raycaster.intersectObject将会调用这个方法。

### .updateMorphTargets () : null

更新morphTargets，使其不对对象产生影响，重置morphTargetInfluences and morphTargetDictionary属性。

## 源代码

[src/objects/Mesh.js](https://github.com/mrdoob/three.js/blob/master/src/objects/Mesh.js)

