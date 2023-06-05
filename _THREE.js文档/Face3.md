[TOC]



# Face3

在 Geometry 中被使用到的三角面片。这些三角面片会为所有标准几何体自动创建。 然而，如果你正在构建一个自定义几何体，你需要手动创建这些三角面片。

## 示例

[svg / sandbox](http://www.webgl3d.cn/threejs/examples/#svg_sandbox)

[exporter / obj](http://www.webgl3d.cn/threejs/examples/#misc_exporter_obj)

[WebGL / shaders / vector](http://www.webgl3d.cn/threejs/examples/#webgl_shaders_vector)

```js
var material = new THREE.MeshStandardMaterial( { color : 0x00cc00 } ); 
//创建仅有一个三角面片的几何体 
var geometry = new THREE.Geometry(); 
geometry.vertices.push( new THREE.Vector3( -50, -50, 0 ) ); geometry.vertices.push( new THREE.Vector3(  50, -50, 0 ) ); geometry.vertices.push( new THREE.Vector3(  50,  50, 0 ) ); 
//利用顶点 0, 1, 2 创建一个面 
var normal = new THREE.Vector3( 0, 1, 0 ); //optional 
var color = new THREE.Color( 0xffaa00 ); //optional 
var materialIndex = 0; //optional 
var face = new THREE.Face3( 0, 1, 2, normal, color, materialIndex ); 

//将创建的面添加到几何体的面的队列 
geometry.faces.push( face ); 
//如果没有特别指明，面和顶点的法向量可以通过如下代码自动计算 geometry.computeFaceNormals(); 
geometry.computeVertexNormals(); 

scene.add( new THREE.Mesh( geometry, material ) );
```

## 构造函数

### Face3( a : Integer, b : Integer, c : Integer, normal : Vector3, color : Color, materialIndex : Integer )

a — 顶点 A 的索引。
b — 顶点 B 的索引。
c — 顶点 C 的索引。

normal — (可选) 面的法向量 (Vector3) 或顶点法向量队列。 如果参数传入单一矢量，则用该量设置面的法向量 .normal，如果传入的是包含三个矢量的队列， 则用该量设置 .vertexNormals

color — (可选) 面的颜色值 color 或顶点颜色值的队列。 如果参数传入单一矢量，则用该量设置 .color，如果传入的是包含三个矢量的队列， 则用该量设置 .vertexColors

materialIndex — (可选) 材质队列中与该面对应的材质的索引。

## 属性

### .a : Integer

顶点 A 的索引。

### .b : Integer

顶点 B 的索引。

### .c : Integer

顶点 C 的索引。

### .normal : Vector3

**面的法向量** - 矢量展示 Face3 的方向。如果该量是通过调用 Geometry.computeFaceNormals 自动计算的， 该值等于归一化的两条边的差积。默认值是 **(0, 0, 0)**。

### .color : Color

面的颜色值 - 在被用于指定材质的 vertexColors 属性时，该值必须被设置为 THREE.FaceColors。

### .vertexNormals : Array

包含三个 vertex normals 的队列。

### .vertexColors : Array

包含 3 个顶点颜色值的队列 - 在被用于指定材质的 vertexColors 属性时，该值必须被设置为 THREE.VertexColors。

### .materialIndex : Integer

材质队列中与该面相关的材质的索引。默认值为 **0**。

## 方法

### .clone () : Face3

克隆该 Face3 对象。

### .copy ( face3 : Face3 ) : Face3

将参数指定的 Face3 对象的数据拷贝到当前对象。

## 源代码

[src/core/Face3.js](https://github.com/mrdoob/three.js/blob/master/src/core/Face3.js)