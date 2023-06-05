[toc]



# Box3

在3D空间中表示一个盒子或立方体。其主要用于表示物体在世界坐标中的边界框。

## 示例

```js
// Creating the object whose bounding box we want to compute
var sphereObject = new THREE.Mesh(  new THREE.SphereGeometry(),  new THREE.MeshBasicMaterial( 0xff0000 )  ); 
// Creating the actual bounding box with Box3 
sphereObject.geometry.computeBoundingBox(); 
var box = sphereObject.geometry.boundingBox.clone(); 
// ... 
// In the animation loop, to keep the bounding box updated after move/rotate/scale operations 
sphereObject.updateMatrixWorld( true ); box.copy( sphereObject.geometry.boundingBox ).applyMatrix4( sphereObject.matrixWorld );
```

## 构造器（Constructor）

### Box3( min : Vector3, max : Vector3 )

min - (参数可选) Vector3 表示包围盒的下边界。 默认值是（ + Infinity, + Infinity, + Infinity ）。
max - (参数可选) Vector3 表示包围盒的上边界。 默认值是（ - Infinity, - Infinity, - Infinity ）。

创建一个以max和min为边界的包围盒。

## 属性（Properties）

### .isBox3 : Boolean

用于检测当前对象或者派生类对象是否是Box3。默认为 **true**。

不应该修改这个值，因为内部使用该属性做了优化的任务。

### .min : Vector3

Vector3 表示包围盒的下边界。
默认值是（ - Infinity, - Infinity, - Infinity ）。

### .max : Vector3

Vector3 包围盒的(x, y, z)上边界。
默认值是 ( - Infinity, - Infinity, - Infinity ).

## 方法（Methods）

### .applyMatrix4 ( matrix : Matrix4 ) : Box3

matrix - 要应用的 Matrix4

使用传入的矩阵变换Box3（包围盒8个顶点都会乘以这个变换矩阵）。

### .clampPoint ( point : Vector3, target : Vector3 ) : Vector3

point - 需要做clamp 的坐标 Vector3。
target — 结果将会被拷贝到这个对象中

是这个点point [Clamps](https://en.wikipedia.org/wiki/Clamping_(graphics))(处于范围内) 处于包围盒边界范围内。

### .clone () : Box3

返回一个与该包围盒子有相同下边界min 和上边界 max的新包围盒。

### .containsBox ( box : Box3 ) : Boolean

box - 需要检测是否在当前包围盒内的 Box3。

传入的 box 整体都被包含在该对象中则返回true。如果他们两个包围盒是一样的也返回true。

### .containsPoint ( point : Vector3 ) : Boolean

point - 需要检测是否在当前包围盒内的 Vector3。

当传入的值 point 在包围盒内部或者边界都会返回true。

### .copy ( box : Box3 ) : Box3

box - 需要复制的包围盒 Box3 。

将传入的值 box 中的 min 和 max 拷贝到当前对象。

### .distanceToPoint ( point : Vector3 ) : Float

point - 用来测试距离的点 Vector3。

返回这个box的任何边缘到指定点的距离。如果这个点位于这个盒子里，距离将是0。

### .equals ( box : Box3 ) : Boolean

box - 将box与当前对象做比较。

返回true如果传入的值与当前的对象 box 有相同的上下边界。

### .expandByObject ( object : Object3D ) : Box3

object - 包裹在包围盒中的3d对象 Object3D。

扩展此包围盒的边界，使得对象及其子对象在包围盒内，包括对象和子对象的世界坐标的变换。

### .expandByPoint ( point : Vector3 ) : Box3

point - 需要在包围盒中的点 Vector3。

扩展这个包围盒的边界使得该点（point）在包围盒内。

### .expandByScalar ( scalar : float ) : Box3

scalar - 扩展包围盒的比例。

按 scalar 的值展开盒子的每个维度。如果是负数，盒子的尺寸会缩小。

### .expandByVector ( vector : Vector3 ) : Box3

vector - 扩展包围盒的数值 Vector3 。

按 vector 每个纬度的值展开这个箱子。 这个盒子的宽度将由 vector 的x分量在两个方向上展开。 这个盒子的高度将由 vector 两个方向上的y分量展开。 这个盒子的深度将由 vector z分量在两个方向上展开。

### .getBoundingSphere ( target : Sphere ) : Sphere

target — 如果指定了target ，结果将会被拷贝到target。

获取一个包围球 Sphere。

### .getCenter ( target : Vector3 ) : Vector3

target — 如果指定了target ，结果将会被拷贝到target。

返回包围盒的中心点 Vector3。

### .getParameter ( point : Vector3, target : Vector3 ) : Vector3

point - Vector3.
target — 如果指定了target ，结果将会被拷贝到target。

返回一个点为这个盒子的宽度和高度的比例。

### .getSize ( target : Vector3 ) : Vector3

target — 如果指定了target ，结果将会被拷贝到target。

返回包围盒的宽度，高度，和深度。

### .intersect ( box : Box3 ) : Box3

box - 与包围盒的交集

返回此包围盒和 box 的交集，将此框的上界设置为两个框的max的较小部分， 将此包围盒的下界设置为两个包围盒的min的较大部分。

### .intersectsBox ( box : Box3 ) : Boolean

box - 用来检测是否相交的包围盒

确定当前包围盒是否与传入包围盒box 相交。

### .intersectsPlane ( plane : Plane ) : Boolean

plane - 用来检测是否相交的 Plane。

确定当前包围盒是否与平面 plane 相交。

### .intersectsSphere ( sphere : Sphere ) : Boolean

sphere - 用来检测是否相交的球体 Sphere。

确定当前包围盒是否与球体 sphere 相交。

### .intersectsTriangle ( triangle : Triangle ) : Boolean

triangle - 用来检测是否相交的三角形 Triangle。

确定当前包围盒是否与三角形 triangle 相交。

### .isEmpty () : Boolean

如果这个盒子包含0个顶点，则返回true。
注意，下界和上界相等的方框仍然包含一个点，即两个边界共享的那个点。

### .makeEmpty () : Box3

清空包围盒。

### .set ( min : Vector3, max : Vector3 ) : Box3

min - Vector3 表示下边界每个纬度（x,y,z）的值。
max - Vector3 表示上边界每个纬度（x,y,z）的值。

设置包围盒上下边界每个纬度（x,y,z)的值。

### .setFromArray ( array : Array ) : Box3 this : Box3

array -- 数组当中的所有的点都将被包围盒包裹。

设置包围盒的上下边界使得数组 **array** 中的所有点的点都被包含在内。

### .setFromBufferAttribute ( attribute : BufferAttribute ) : Box3 this : Box3

attribute - 位置的缓冲数据，包含在返回的包围盒内。

设置此包围盒的上边界和下边界，以包含 attribute 中的所有位置数据。

### .setFromCenterAndSize ( center : Vector3, size : Vector3 ) : Box3 this : Box3

center, - 包围盒所要设置的中心位置。
size - 包围盒所要设置的x、y和z尺寸（宽/高/长）。

将当前包围盒的中心点设置为 center ，并将此包围盒的宽度，高度和深度设置为大小指定 size 的值。

### .setFromObject ( object : Object3D ) : Box3

object - 用来计算包围盒的3D对象 Object3D。

计算和世界轴对齐的一个对象 Object3D （含其子对象）的包围盒，计算对象和子对象的世界坐标变换。

### .setFromPoints ( points : Array ) : Box3

points - 计算出的包围盒将包含数组中所有的点 Vector3s

设置此包围盒的上边界和下边界，以包含数组 points 中的所有点。

### .translate ( offset : Vector3 ) : Box3

offset - 偏移方向和距离。

给包围盒的上下边界添加偏移量 offset，这样可以有效的在3D空间中移动包围盒。 偏移量为 offset 大小。

### .union ( box : Box3 ) : Box3

box - 要结合在一起的包围盒。

在 box 参数的上边界和已有box对象的上边界之间取较大者，而对两者的下边界取较小者，这样获得一个新的较大的联合盒子。

## 源码（Source）

[src/math/Box3.js](https://github.com/mrdoob/three.js/blob/master/src/math/Box3.js)
