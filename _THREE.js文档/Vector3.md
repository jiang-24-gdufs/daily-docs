[TOC]



# 三维向量（Vector3）

该类表示的是一个三维向量（3D [vector](https://en.wikipedia.org/wiki/Vector_space)）。 一个三维向量表示的是一个有顺序的、三个为一组的数字组合（标记为x、y和z）， 可被用来表示很多事物，例如：

- 一个位于三维空间中的点。
- 一个在三维空间中的方向与长度的定义。在three.js中，长度总是从(0, 0, 0)到(x, y, z)的 [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)（欧几里德距离，即直线距离）， 方向也是从(0, 0, 0)到(x, y, z)的方向。
- 任意的、有顺序的、三个为一组的数字组合。

其他的一些事物也可以使用二维向量进行表示，比如说动量矢量等等； 但以上这些是它在three.js中的常用用途。

## 示例

```js
var a = new THREE.Vector3( 0, 1, 0 ); 
//no arguments; will be initialised to (0, 0, 0) 
var b = new THREE.Vector3( ); 
var d = a.distanceTo( b );
```

## 构造函数

### Vector3( x : Float, y : Float, z : Float )

x - 向量的x值，默认为**0**。
y - 向量的y值，默认为**0**。
z - 向量的z值，默认为**0**。

创建一个新的Vector3。

## 属性

### .isVector3 : Boolean

用于测试这个类或者派生类是否为Vector3，默认为**true**。

你不应当对这个属性进行改变,因为它在内部使用，以用于优化。

### .x : Float

### .y : Float

### .z : Float

## 方法

### .add ( v : Vector3 ) : this

将传入的向量v和这个向量相加。

### .addScalar ( s : Float ) : this

Scalar: 标量

将传入的标量s和这个向量的x值、y值以及z值相加。

### .addScaledVector ( v : Vector3, s : Float ) : this

将所传入的v与s相乘所得的乘积和这个向量相加。

### .addVectors ( a : Vector3, b : Vector3 ) : this

将该向量设置为a + b。

### .applyAxisAngle ( axis : Vector3, angle : Float ) : this

axis - 一个被归一化的Vector3。
angle - 以弧度表示的角度。

将轴和角度所指定的旋转应用到该向量上。

### .applyEuler ( euler : Euler ) : this

通过将Euler（欧拉）对象转换为Quaternion（四元数）并应用， 将欧拉变换应用到这一向量上。

### .applyMatrix3 ( m : Matrix3 ) : this

将该向量乘以三阶矩阵m。

### .applyMatrix4 ( m : Matrix4 ) : this

将该向量乘以四阶矩阵m（第四个维度隐式地为1），and divides by perspective.

### .applyQuaternion ( quaternion : Quaternion ) : this

将Quaternion变换应用到该向量。

### .angleTo ( v : Vector3 ) : Float

以弧度返回该向量与向量v之间的角度。 Neither this vector nor v can be the zero vector.

### .ceil () : this

将该向量x分量、 y分量以及z分量向上取整为最接近的整数。

### .clamp ( min : Vector3, max : Vector3 ) : this

min - 在限制范围内，x值、y值和z的最小值。
max - 在限制范围内，x值、y值和z的最大值。

如果该向量的x值、y值或z值大于限制范围内最大x值、y值或z值，则该值将会被所对应的值取代。

如果该向量的x值、y值或z值小于限制范围内最小x值、y值或z值，则该值将会被所对应的值取代。

### .clampLength ( min : Float, max : Float ) : this

min - 长度将被限制为的最小值
max - 长度将被限制为的最大值

如果向量长度大于最大值，则它将会被最大值所取代。

如果向量长度小于最小值，则它将会被最小值所取代。

### .clampScalar ( min : Float, max : Float ) : this

min - 分量将被限制为的最小值
max - 分量将被限制为的最大值

如果该向量的x值、y值或z值大于最大值，则它们将被最大值所取代。

如果该向量的x值、y值或z值小于最小值，则它们将被最小值所取代。

### .clone () : Vector3

返回一个新的Vector3，其具有和当前这个向量相同的x、y和z。

### .copy ( v : Vector3 ) : this

将所传入Vector3的x、y和z属性复制给这一Vector3。

### .cross ( v : Vector3 ) : this

将该向量设置为它本身与传入的v的叉积（[cross product](https://en.wikipedia.org/wiki/Cross_product)）。

### .crossVectors ( a : Vector3, b : Vector3 ) : this

将该向量设置为传入的a与b的叉积（[cross product](https://en.wikipedia.org/wiki/Cross_product)）。

### .distanceTo ( v : Vector3 ) : Float

计算该向量到所传入的v间的距离。

### .manhattanDistanceTo ( v : Vector3 ) : Float

计算该向量到所传入的v之间的曼哈顿距离（[Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry)）。

### .distanceToSquared ( v : Vector3 ) : Float

计算该向量到传入的v的平方距离。 如果你只是将该距离和另一个距离进行比较，则应当比较的是距离的平方， 因为它的计算效率会更高一些。

### .divide ( v : Vector3 ) : this

将该向量除以向量v。

### .divideScalar ( s : Float ) : this

将该向量除以标量s。
如果传入的s = 0，则向量将被设置为**( 0, 0, 0 )**。

### .dot ( v : Vector3 ) : Float

计算该vector和所传入v的点积（[dot product](https://en.wikipedia.org/wiki/Dot_product)）。

### .equals ( v : Vector3 ) : Boolean

检查该向量和v的严格相等性。

### .floor () : this

向量的分量向下取整为最接近的整数值。

### .fromArray ( array : Array, offset : Integer ) : this

array - 来源矩阵。
offset - （可选）在数组中的元素偏移量，默认值为0。

设置向量中的x值为array[ offset + 0 ]，y值为array[ offset + 1 ]， z值为array[ offset + 2 ]。

### .fromBufferAttribute ( attribute : BufferAttribute, index : Integer ) : this

attribute - 来源的attribute。
index - 在attribute中的索引。

从attribute中设置向量的x值、y值和z值。

### .getComponent ( index : Integer ) : Float

index - 0, 1 or 2.

如果index值为0返回x值。
如果index值为1返回y值。
如果index值为2返回z值。

### .length () : Float

计算从(0, 0, 0) 到 (x, y, z)的欧几里得长度 （[Euclidean length](https://en.wikipedia.org/wiki/Euclidean_distance)，即直线长度）

### .manhattanLength () : Float

计算该向量的曼哈顿长度（[Manhattan length](http://en.wikipedia.org/wiki/Taxicab_geometry)）。

### .lengthSq () : Float

计算从(0, 0, 0)到(x, y, z)的欧几里得长度 （[Euclidean length](https://en.wikipedia.org/wiki/Euclidean_distance)，即直线长度）的平方。 如果你正在比较向量的长度，应当比较的是长度的平方，因为它的计算效率更高一些。

### .lerp ( v : Vector3, alpha : Float ) : this

v - 朝着进行插值的Vector3。
alpha - 插值因数，其范围通常在[0, 1]闭区间。

在该向量与传入的向量v之间的线性插值，alpha是沿着线的长度的百分比 —— alpha = 0 时表示的是当前向量，alpha = 1 时表示的是所传入的向量v。

### .lerpVectors ( v1 : Vector3, v2 : Vector3, alpha : Float ) : this

v1 - 起始的Vector3。
v2 - 朝着进行插值的Vector3。
alpha - 插值因数，其范围通常在[0, 1]闭区间。

将此向量设置为在v1和v2之间进行线性插值的向量， 其中alpha为两个向量之间连线的长度的百分比 —— alpha = 0 时表示的是v1，alpha = 1 时表示的是v2。

### .max ( v : Vector3 ) : this

如果该向量的x值、y值或z值小于所传入v的x值、y值或z值， 则将该值替换为对应的最大值。

### .min ( v : Vector3 ) : this

如果该向量的x值、y值或z值大于所传入v的x值、y值或z值， 则将该值替换为对应的最小值。

### .multiply ( v : Vector3 ) : this

将该向量与所传入的向量v进行相乘。

### .multiplyScalar ( s : Float ) : this

将该向量与所传入的标量s进行相乘。

### .multiplyVectors ( a : Vector3, b : Vector3 ) : this

按照分量顺序，将该向量设置为和a * b相等。

### .negate () : this

向量取反，即： x = -x, y = -y , z = -z。

### .normalize () : this

将该向量转换为单位向量（[unit vector](https://en.wikipedia.org/wiki/Unit_vector)）， 也就是说，将该向量的方向设置为和原向量相同，但是其长度（length）为1。

### .project ( camera : Camera ) : this

camera — 在投影中使用的摄像机。

使用所传入的摄像机来投影（[projects](https://en.wikipedia.org/wiki/Vector_projection)）该向量。

### .projectOnPlane ( planeNormal : Vector3 ) : this

planeNormal - A vector representing a plane normal.

[Projects](https://en.wikipedia.org/wiki/Vector_projection) this vector onto a plane by subtracting this vector projected onto the plane's normal from this vector.

### .projectOnVector ( Vector3 : Vector3 ) : this

投影（[Projects](https://en.wikipedia.org/wiki/Vector_projection)）该向量到向量v上。v不能是零向量。

### .reflect ( normal : Vector3 ) : this

normal - the normal to the reflecting plane

Reflect the vector off of plane orthogonal to normal. Normal is assumed to have unit length.

### .round () : this

向量中的分量四舍五入取整为最接近的整数值。

### .roundToZero () : this

向量中的分量朝向0取整数（若分量为负数则向上取整，若为正数则向下取整）。

### .set ( x : Float, y : Float, z : Float ) : this

设置该向量的x、y 和 z 分量。

### .setComponent ( index : Integer, value : Float ) : null

index - 0、1 或 2。
value - Float

若index为 0 则设置 x 值为 value。
若index为 1 则设置 y 值为 value。
若index为 2 则设置 z 值为 value。

### .setFromCylindrical ( c : Cylindrical ) : this

从圆柱坐标c中设置该向量。

### .setFromCylindricalCoords ( radius : Float, theta : Float, y : Float ) : this

从圆柱坐标中的radius、theta和y设置该向量。

### .setFromMatrixColumn ( matrix : Matrix4, index : Integer ) : this

从传入的四阶矩阵matrix由index指定的列中， 设置该向量的x值、y值和z值。

### .setFromMatrixPosition ( m : Matrix4 ) : this

从变换矩阵（[transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)）m中， 设置该向量为其中与位置相关的元素。

### .setFromMatrixScale ( m : Matrix4 ) : this

从变换矩阵（[transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)）m中， 设置该向量为其中与缩放相关的元素。

### .setFromSpherical ( s : Spherical ) : this

从球坐标s中设置该向量。

### .setFromSphericalCoords ( radius : Float, phi : Float, theta : Float ) : this

从球坐标中的radius、phi和theta设置该向量。

### .setLength ( l : Float ) : this

将该向量的方向设置为和原向量相同，但是长度（length）为l。

### .setScalar ( scalar : Float ) : this

将该向量的x、y和z值同时设置为等于传入的scalar。

### .setX ( x : Float ) : this

将向量中的x值替换为x。

### .setY ( y : Float ) : this

将向量中的y值替换为y。

### .setZ ( z : Float ) : this

将向量中的z值替换为z。

### .sub ( v : Vector3 ) : this

从该向量减去向量v。

### .subScalar ( s : Float ) : this

从该向量的x、y和z中减去标量s。

### .subVectors ( a : Vector3, b : Vector3 ) : this

将该向量设置为a - b。

### .toArray ( array : Array, offset : Integer ) : Array

array - （可选）被用于存储向量的数组。如果这个值没有传入，则将创建一个新的数组。
offset - （可选） 数组中元素的偏移量。

返回一个数组[x, y ,z]，或者将x、y和z复制到所传入的array中。

### .transformDirection ( m : Matrix4 ) : this

通过传入的矩阵（m的左上角3 x 3子矩阵）变换向量的方向， 并将结果进行normalizes（归一化）。

### .unproject ( camera : Camera ) : this

camera — 在投影中使用的摄像机。

[Unprojects](https://en.wikipedia.org/wiki/Vector_projection) the vector with the camera's projection matrix.

## 源代码

[src/math/Vector3.js](https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js)
