[TOC]



# BufferGeometry

是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。使用 **BufferGeometry 可以有效减少向 GPU 传输上述数据所需的开销**。

读取或编辑 BufferGeometry 中的数据，见 BufferAttribute 文档。

几何体的更多使用示例，详见 Geometry。



`BufferGeometry`对原生WebGL中的顶点位置、顶点纹理坐标UV、顶点颜色、顶点法向量、顶点索引等顶点数据进行了封装，



### 渲染过程

在执行WebGL渲染器`WebGLRenderer`渲染方法`.render()`的时候，渲染器会对场景和相机进行解析渲染，解析场景Scene自然会解析场景中模型对应的几何体对象Geometry。关于渲染器是如何解析渲染场景和相机对象的，在《Three.js进阶视频教程》中进行了介绍和讲解，有兴趣可以详细了解，这里不再展开详述，这里只说和几何体相关的内容。

Three.js渲染器在解析几何体对象的时候，如果几何体对象是普通几何体对象`Geometry`，Three.js的WebGL渲染器会把普通几何体对象`Geometry`转化为缓冲类型几何体对象`BufferGeometry`，然后再提取 `BufferGeometry`包含的顶点信息，这里可以看出来直接使用`BufferGeometry`解析的时候相对`Geometry`少了一步，自然性能更高一些。不过从开发者使用的角度来看，`Geometry`可能对程序员更友好一些。



## 示例

```js
var geometry = new THREE.BufferGeometry(); 
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。 
// 因为在两个三角面片里，这两个顶点都需要被用到。 
var vertices = new Float32Array( [ 
	-1.0, -1.0,  1.0, 
    1.0, -1.0,  1.0,  
    1.0,  1.0,  1.0, 	 
    1.0,  1.0,  1.0, 
    -1.0,  1.0,  1.0,
    -1.0, -1.0,  1.0 
] ); 
// itemSize = 3 因为每个顶点都是一个三元组。 
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3 )); 
var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
var mesh = new THREE.Mesh( geometry, material );
```

```js
geometry.attributes = {

normal: Float32BufferAttribute {
    name: "", 
    array: Float32Array(390), 
    itemSize: 3, count: 130, normalized: false, …}
position: Float32BufferAttribute {
    name: "", 
    array: Float32Array(390), 
    itemSize: 3, count: 130, normalized: false, …}
uv: Float32BufferAttribute {
    name: "", 
    array: Float32Array(260), 
    itemSize: 2, count: 130, normalized: false, …}
}

```





[Mesh with non-indexed faces](http://www.webgl3d.cn/threejs/examples/#webgl_buffergeometry)
[Mesh with indexed faces](http://www.webgl3d.cn/threejs/examples/#webgl_buffergeometry_indexed)
[Lines](http://www.webgl3d.cn/threejs/examples/#webgl_buffergeometry_lines)
[Indexed Lines](http://www.webgl3d.cn/threejs/examples/#webgl_buffergeometry_lines_indexed)
[Particles](http://www.webgl3d.cn/threejs/examples/#webgl_buffergeometry_custom_attributes_particles)
[Raw Shaders](http://www.webgl3d.cn/threejs/examples/#webgl_buffergeometry_rawshader)

## 构造函数

### BufferGeometry()

创建一个新的 BufferGeometry. 同时将预置属性设置为默认值.

## 属性

### .attributes : Object

通过 hashmap 存储该几何体相关的属性，hashmap 的 id 是当前 attribute 的名称，值是相应的 buffer。 你可以通过 .setAttribute 和 .getAttribute 添加和访问与当前几何体有关的 attribute。

### .boundingBox : Box3

当前 bufferGeometry 的外边界矩形。可以通过 .computeBoundingBox() 计算。默认值是 **null**。

### .boundingSphere : Sphere

当前 bufferGeometry 的外边界球形。可以通过 .computeBoundingSphere() 计算。默认值是 **null**。

### .drawRange : Object

用于判断几何体的哪个部分需要被渲染。该值不应该直接被设置，而需要通过 .setDrawRange 进行设置。
默认值为`{ start: 0, count: Infinity }`

### .groups : Array

将当前几何体分割成组进行渲染，每个部分都会在单独的 WebGL 的 draw call 中进行绘制。该方法可以让当前的 bufferGeometry 可以使用一个材质队列进行描述。

分割后的每个部分都是一个如下的表单：`{ start: Integer, count: Integer, materialIndex: Integer }`start 表明当前 draw call 中的没有索引的几何体的几何体的第一个顶点；或者第一个三角面片的索引。 count 指明当前分割包含多少顶点（或 indices）。 materialIndex 指出当前用到的材质队列的索引。

通过 .addGroup 来增加组，而不是直接更改当前队列。

### .id : Integer

当前 bufferGeometry 的唯一编号。

### .index : BufferAttribute

允许顶点在多个三角面片间可以重用。这样的顶点被称为"已索引的三角面片（indexed triangles）"并且使用时和Geometry中一致： 每个三角面片都和三个顶点的索引相关。该 attribute 因此所存储的是每个三角面片的三个顶点的索引。 如果该 attribute 没有设置过，则 renderer 假设每三个连续的位置代表一个三角面片。 默认值是 **null**。

### .isBufferGeometry : Boolean

用于检查当前类或派生类的类型是 BufferGeometries。默认值是 **true**。

该值用于内部优化，你不应该手动修改该值。

### .morphAttributes : Object

存储 BufferAttribute 的 Hashmap，存储了几何体 morphTargets 的细节信息。

### .name : String

当前 bufferGeometry 实例的可选别名。默认值是空字符串。

### .userData : Object

存储 BufferGeometry 的自定义数据的对象。为保持对象在克隆时完整，该对象不应该包括任何函数的引用。

### .uuid : String

当前对象实例的 [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier)，该值会自动被分配，且不应被修改。

## 方法

### EventDispatcher 在该类上可用的所有方法。

### .setAttribute ( name : String, attribute : BufferAttribute ) : BufferGeometry

为当前几何体设置一个 attribute 属性。在类的内部，有一个存储 .attributes 的 hashmap， 通过该 hashmap，遍历 attributes 的速度会更快。而使用该方法，可以向 hashmap 内部增加 attribute。 所以，你需要使用该方法来添加 attributes。

### .addGroup ( start : Integer, count : Integer, materialIndex : Integer ) : null

为当前几何体增加一个 group，详见 groups 属性。

### .applyMatrix ( matrix : Matrix4 ) : null

用给定矩阵转换几何体的顶点坐标。

### .center () : BufferGeometry

根据边界矩形将几何体居中。

### .clone () : BufferGeometry

克隆当前的 BufferGeometry。

### .copy ( bufferGeometry : BufferGeometry ) : BufferGeometry

将参数指定的 BufferGeometry 的值拷贝到当前 BufferGeometry 中。

### .clearGroups ( ) : null

清空所有的 groups。

### .computeBoundingBox () : null

计算当前几何体的的边界矩形，该操作会更新已有 [param:.boundingBox]。
边界矩形不会默认计算，需要调用该接口指定计算边界矩形，否则保持默认值 **null**。

### .computeBoundingSphere () : null

计算当前几何体的的边界球形，该操作会更新已有 [param:.boundingSphere]。
边界球形不会默认计算，需要调用该接口指定计算边界球形，否则保持默认值 **null**。

### .computeVertexNormals () : null

通过面片法向量的平均值计算每个顶点的法向量。

### .dispose () : null

从内存中销毁对象。
如果在运行是需要从内存中删除 BufferGeometry，则需要调用该函数。

### .fromDirectGeometry ( Geometry : Geometry ) : BufferGeometry

通过 DirectGeometry 所包含的面数据生成一个 BufferGeometry 对象。对于线型几何体未实现该方法。

注意: DirectGeometry 主要用于内部 Geometry 和 BufferGeometry 的类型转换。

### .fromGeometry ( Geometry : Geometry ) : BufferGeometry

通过 Geometry 所包含的面信息生成一个 BufferGeometry 对象。对于线型几何体未实现该方法。

### .getAttribute ( name : String ) : BufferAttribute

返回指定名称的 attribute。

### .getIndex () : BufferAttribute

返回缓存相关的 .index。

### .lookAt ( vector : Vector3 ) : BufferGeometry

vector - 几何体所朝向的世界坐标。

旋转几何体朝向控件中的一点。该过程通常在一次处理中完成，不会循环处理。典型的用法是过通过调用 Object3D.lookAt 实时改变 mesh 朝向。

### .merge ( bufferGeometry : BufferGeometry, offset : Integer ) : null

同参数指定的 BufferGeometry 进行合并。可以通过可选参数指定，从哪个偏移位置开始进行 merge。

### .normalizeNormals () : null

几何体中的每个法向量长度将会为 1。这样操作会更正光线在表面的效果。

### .deleteAttribute ( name : String ) : BufferAttribute

删除具有指定名称的 attribute。

### .rotateX ( radians : Float ) : BufferGeometry

在 X 轴上旋转几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.rotation 实时旋转几何体。

### .rotateY ( radians : Float ) : BufferGeometry

在 Y 轴上旋转几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.rotation 实时旋转几何体。

### .rotateZ ( radians : Float ) : BufferGeometry

在 Z 轴上旋转几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.rotation 实时旋转几何体。

### .scale ( x : Float, y : Float, z : Float ) : BufferGeometry

缩放几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.scale 实时旋转几何体。

### .setIndex ( index : BufferAttribute ) : null

设置缓存的 .index。

### .setDrawRange ( start : Integer, count : Integer ) : null

设置缓存的 .drawRange。详见相关属性说明。

### .setFromObject ( object : Object3D ) : BufferGeometry

通过 Object3D 设置该 BufferGeometry 的 attribute。

### .setFromPoints ( points : Array ) : BufferGeometry

通过点队列设置该 BufferGeometry 的 attribute。

### .toJSON () : Object

返回代表该 BufferGeometry 的 JSON 对象。

### .toNonIndexed () : BufferGeometry

返回已索引的 BufferGeometry 的非索引版本。

### .translate ( x : Float, y : Float, z : Float ) : BufferGeometry

移动几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.rotation 实时旋转几何体。

### .updateFromObject ( object : Object3D ) : BufferGeometry

通过 Object3D 更新 BufferGeometry 的 attribute。





### ---------------

# BufferGeometry

缓冲区类型几何体`BufferGeometry`是Three.js的核心类之一，立方体`BoxBufferGeometry`、圆柱体`CylinderBufferGeometry`、球体`SphereBufferGeometry`等几何体类的基类都是`BufferGeometry`。

`BufferGeometry`对原生WebGL中的顶点位置、顶点纹理坐标UV、顶点颜色、顶点法向量、顶点索引等顶点数据进行了封装，如果你有原生WebGL基础，你看下文档，阅读下Three.js源码其实很容易理解，如果没有原生WebGL基础建立学习下本站的WebGL视频教程，关于`BufferGeometry`的内容可以本站发布的Three.js视频教程第二章。

### `BufferGeometry`自定义一个几何体

立方体`BoxBufferGeometry`、圆柱体`CylinderBufferGeometry`、球体`SphereBufferGeometry`等几何体类都包含了特定的生成该几何体形状所有顶点数据的算法，有兴趣可以去阅读相关的源码，这里简单展示下如果通过基类`BufferGeometry`自定义一个几何体。

```JavaScript
//创建一个缓冲类型的几何体对象
var geo = new THREE.BufferGeometry();
//类型数组创建顶点数据  数组中包含6个顶点的xyz坐标数据
var verArr = new Float32Array([
  1, 2, 3,
  49, 2, 4,
  -1, 99, -1,
  1, 1, 9,
  6, 5, 108,
  48, 1, 3,
]);
//三个为一组，表示一个顶点坐标
var BufferAttribute = new THREE.BufferAttribute(verArr, 3);
// 设置几何体的顶点位置数据
geo.attributes.position = BufferAttribute;
```

上面同样一个几何体，如果你创建不同的模型，可以渲染出来不同的效果，这里之所以说着一点，也是为了让你理解顶点指的是什么。

网格模型：三角形渲染模式，没有顶点索引数据复用顶点的情况下，每个三角形包含三个顶点，上面6个顶点可以渲染两个三角形。

```JavaScript
// 三角面(网格)渲染模式
var material = new THREE.MeshPhongMaterial({
  color: 0x1111ff, //三角面颜色
  side: THREE.DoubleSide //两面可见
});
var mesh = new THREE.Mesh(geometry, material);
```

线模型：线渲染模式，两点确定一条直线

```JavaScript
// 线条渲染模式
var material=new THREE.LineBasicMaterial({color:0xff0000});
//线条模型对象
var line=new THREE.Line(geo,material);
```

点模型：点渲染模式，6个顶点渲染出来6个方形点

```JavaScript
var material = new THREE.PointsMaterial({
  color: 0xff1133,
  size: 6.0 //点对象像素尺寸
});
 //点模型对象
var points = new THREE.Points(geo, material);
```

### `.attributes`属性

three.js提供的`BufferAttribute`类用于创建一个表示一组同类顶点数据的对象，可以用`BufferAttribute`。

几何体的`.attributes`属性是除了顶点索引数据以外所有顶点数据的集合，比如`.attributes.position` 表示顶点位置坐标数据，`.attributes.uv`表示顶点纹理坐标UV数据，`.attributes.normal`表示顶点法向量数据，所有的类型的顶点数据都是一一对应的。`.attributes.position`、`.attributes.uv`、`.attributes.normal`的属性值都是`BufferAttribute`对象。

### `.index`属性

`.index`属性的值是顶点索引数据构成的`BufferAttribute`对象，如果你有一定的原生WebGL基础，应该知道顶点索引的功能是复用顶点数据，比如一定矩形有一个顶点，如果不设置顶点索引，需要至少6个顶点才能绘制两个三角形组合出来一个矩形，如果定义顶点索引数据，重合的两个顶点可以复用顶点数据，只需要顶点4个顶点坐标即可。

6个顶点定义一个矩形

```JavaScript
//类型数组创建顶点位置position数据
var vertices = new Float32Array([
  10, 10, 10,   //顶点1位置
  90, 10, 10,  //顶点2位置
  90, 90, 10, //顶点3位置

  10, 10, 10,   //顶点4位置   和顶点1位置相同
  90, 90, 10, //顶点5位置  和顶点3位置相同
  10, 90, 10,  //顶点6位置
]);
var attribue = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribue
```

4个顶点定义一个矩形

```JavaScript
var geometry = new THREE.BufferGeometry();
var vertices = new Float32Array([
  10, 10, 10, //顶点1位置
  90, 10, 10, //顶点2位置
  90, 90, 10, //顶点3位置
  10, 90, 10, //顶点4位置
]);
var attribue = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribue

// Uint16Array类型数组创建顶点索引数据,如果顶点数量更多可以使用Uint32Array来创建顶点索引数据的类型数组对象
var indexes = new Uint16Array([
  0, 1, 2, 0, 2, 3,
])
// 索引数据赋值给几何体的index属性
geometry.index = new THREE.BufferAttribute(indexes, 1);
```

### `.addAttribute()`方法

`.addAttribute()`方法执行的时候，本质上是改变的`.attributes`属性，`.attributes`属性可以直接设置`.attributes.position`、`.attributes.uv`等属性，也可以通过`.addAttribute()`方法设置。

直接设置`.attributes.position`

```JavaScript
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3)
```

通过`.addAttribute()`方法设置`.attributes.position`等顶点属性值

```JavaScript
geometry.addAttribute('position',new THREE.BufferAttribute(vertices,3));
geometry.addAttribute('normal',new THREE.BufferAttribute(normals,3));
geometry.addAttribute('uv',new THREE.BufferAttribute(uvs,2));
```

### 方法`.fromGeometry()`

通过`.fromGeometry()`方法可以把一个几何体`Geometry`转化为一个缓冲类型几何体`BufferGeometry`。

```JavaScript
var box = new THREE.BoxGeometry()
var BufferBox = new THREE.BufferGeometry()
BufferBox.fromGeometry(box)
```

### Three.js渲染器解析`BufferGeometry`

Three.js渲染器在渲染场景的时候，会从缓冲类型几何体对象`BufferGeometry`中提取顶点位置、法向量、颜色、索引等数据，然后调用WebGL相关原生API创建顶点缓冲区，这样GUP可以读取顶点数据在顶点着色器中进行逐顶点计算处理。关于WebGL渲染器`WebGLRenderer`如何解析`BufferGeometry`对象的，可以查看/src/renderers/webgl目录下的`WebGLAttributes.js`、`WebGLGeometries.js`等文件。