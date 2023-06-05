[TOC]



# 三维矩阵（Matrix3）

一个表示3X3矩阵[matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics)).的类。

## 示例（Example）

```
var m = new Matrix3();
```

## 注意行优先列优先的顺序。

set()方法参数采用行优先[row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)， 而它们在内部是用列优先[column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order)顺序存储在数组当中。

这意味着

```js
m.set(  11, 12, 13,
        21, 22, 23,
        31, 32, 33 );
```

元素数组elements将存储为:

```js
m.elements = [  11, 21, 31, 
				12, 22, 32,              
				13, 23, 33 ];
```
在内部，所有的计算都是使用**列优先顺序**进行的。然而，由于实际的排序在数学上没有什么不同， 而且*大多数人习惯于以行优先顺序考虑矩阵*，所以three.js文档以行为主的顺序显示矩阵。 请记住，如果您正在阅读源代码，您必须对这里列出的任何矩阵进行转置[transpose-转置](https://en.wikipedia.org/wiki/Transpose)，以理解计算。

## Constructor

### Matrix3()

创建并初始化一个3X3的单位矩阵[identity matrix-单位矩阵](https://en.wikipedia.org/wiki/Identity_matrix).

## 属性（Properties）

### .elements : Array

矩阵列优先[column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order)列表。

### .isMatrix3 : Boolean

用于判定此对象或者此类的派生对象是否是三维矩阵。默认值为 **true**。

不应该改变该值，因为它在内部用于优化。

## 方法（Methods）

### .applyToBufferAttribute ( attribute : BufferAttribute ) : Array

attribute - 表示三维向量缓存属性。

用这个矩阵乘以缓存属性attribute里的所有3d向量。

### .clone () : Matrix3

创建一个新的矩阵，元素 elements 与该矩阵相同。

### .copy ( m : Matrix3 ) : this

将矩阵m的元素复制到当前矩阵中。

### .determinant () : Float

计算并返回矩阵的行列式[determinant](https://en.wikipedia.org/wiki/Determinant) 。

### .equals ( m : Matrix3 ) : Boolean

如果矩阵m 与当前矩阵所有对应元素相同则返回true。

### .fromArray ( array : Array, offset : Integer ) : this

array - 用来存储设置元素数据的数组
offset - (可选参数) 数组的偏移量，默认值为 0。

使用基于列优先格式[column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)的数组来设置该矩阵。

### .getInverse ( m : Matrix3, throwOnDegenerate : Boolean ) : this

m - 取逆的矩阵。
throwOnDegenerate - (optional) 如果设置为true，如果矩阵是退化的（如果不可逆的话），则会抛出一个错误。

使用逆矩阵计算方法[analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution)， 将当前矩阵设置为给定矩阵的逆矩阵[inverse](https://en.wikipedia.org/wiki/Invertible_matrix)，如果throwOnDegenerate 参数没有设置且给定矩阵不可逆，那么将当前矩阵设置为3X3单位矩阵。

### .getNormalMatrix ( m : Matrix4 ) : this

m - Matrix4

将这个矩阵设置为给定矩阵的正规矩阵[normal matrix](https://en.wikipedia.org/wiki/Normal_matrix)（左上角的3x3）。 正规矩阵是矩阵m的逆矩阵[inverse](https://en.wikipedia.org/wiki/Invertible_matrix) 的转置[transpose](https://en.wikipedia.org/wiki/Transpose)。

### .identity () : this

将此矩阵重置为3x3单位矩阵:`1, 0, 0 0, 1, 0 0, 0, 1`

### .multiply ( m : Matrix3 ) : this

将当前矩阵乘以矩阵m。

### .multiplyMatrices ( a : Matrix3, b : Matrix3 ) : this

设置当前矩阵为矩阵a x 矩阵b。

### .multiplyScalar ( s : Float ) : this

当前矩阵所有的元素乘以该缩放值**s**

### .set ( n11 : Float, n12 : Float, n13 : Float, n21 : Float, n22 : Float, n23 : Float, n31 : Float, n32 : Float, n33 : Float ) : this

n11 - 设置第一行第一列的值。
n12 - 设置第一行第二列的值。
...
...
n32 - 设置第三行第二列的值。
n33 - 设置第三行第三列的值。

Sets the 3x3 matrix values to the given [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order) sequence of values.

### .premultiply ( m : Matrix3 ) : this

将矩阵m乘以当前矩阵。

### .setFromMatrix4 ( m : Matrix4 ) : this

将当前矩阵设置为4X4矩阵m左上3X3

### .setUvTransform ( tx : Float, ty : Float, sx : Float, sy : Float, rotation : Float, cx : Float, cy : Float ) : this

tx - x偏移量
ty - y偏移量
sx - x方向的重复比例
sy - y方向的重复比例
rotation - 旋转（弧度）
cx - 旋转中心x
cy - 旋转中心y

使用偏移，重复，旋转和中心点位置设置UV变换矩阵。

### .toArray ( array : Array, offset : Integer ) : Array

array - (可选参数) 存储矩阵元素的数组，如果未指定会创建一个新的数组。
offset - (可选参数) 存放矩阵元素数组的偏移量。

使用列优先[column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)格式将此矩阵的元素写入数组中。

### .transpose () : this

将该矩阵转置[Transposes](https://en.wikipedia.org/wiki/Transpose)。

### .transposeIntoArray ( array : Array ) : this

array - 用于存储当前矩阵转置结果的数组。

将当前矩阵的转置[Transposes](https://en.wikipedia.org/wiki/Transpose)存入给定的数组array : Array但不改变当前矩阵， 并返回当前矩阵。

## 源码（Source）

[src/math/Matrix3.js](https://github.com/mrdoob/three.js/blob/master/src/math/Matrix3.js)





# 四维矩阵（Matrix4）

在3D计算机图形学中，4x4矩阵最常用的用法是作为一个变换矩阵[Transformation Matrix](https://en.wikipedia.org/wiki/Transformation_matrix)。 

有关WebGL中使用的变换矩阵的介绍，请参阅本教程[this tutorial](http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices)。

这使得表示三维空间中的一个点的向量Vector3通过乘以矩阵来进行转换，如平移、旋转、剪切、缩放、反射、正交或透视投影等。这就是把矩阵*应用*到向量上。


**任何3D物体Object3D都有三个关联的矩阵**：

- Object3D.**matrix**: 存储**物体的本地变换**。 这是对象**相对于其父对象**的变换。
- Object3D.**matrixWorld**: 对象的**全局或世界变换**。如果对象没有父对象，那么这与存储在矩阵matrix中的本地变换相同。
- Object3D.**modelViewMatrix**: 表示对象相坐标**相对于摄像机空间**坐标转换， 一个对象的 modelViewMatrix 是物体世界变换矩阵乘以摄像机相对于世界空间变换矩阵的逆矩阵。

摄像机**Cameras 有两个额外的四维矩阵**:

- Camera.**matrixWorldInverse**: 视矩阵 - 摄像机**世界坐标变换的逆矩阵**。
- Camera.**projectionMatrix**: 表示将场景中的信息**投影**到裁剪空间。

注意：物体的正规矩阵 Object3D.normalMatrix 并不是一个4维矩阵，而是一个三维矩阵Matrix3。

## 注意行优先列优先的顺序。

设置set()方法参数采用**行优先**[row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)， 而它们在**内部**是用**列优先**[column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order)顺序存储在数组当中。

这意味着

```
var m = new THREE.Matrix4(); 
m.set(  11, 12, 13, 14,      
		21, 22, 23, 24,       
		31, 32, 33, 34,       
		41, 42, 43, 44 );
```
元素数组elements将存储为:
```
m.elements = [ 
	11, 21, 31, 41,               
	12, 22, 32, 42,               
	13, 23, 33, 43,              
    14, 24, 34, 44 ];
```
在内部，**所有的计算都是使用列优先顺序进行的**。

然而，由于**实际的排序在数学上没有什么不同**， 而且大多数人习惯于以行优先顺序考虑矩阵，所以three.js文档以行为主的顺序显示矩阵。 

请记住，如果您正在阅读源代码，您必须对这里列出的任何矩阵进行转置[transpose](https://en.wikipedia.org/wiki/Transpose)，以理解计算。



## 构造器（Constructor）

### Matrix4()

创建并初始化一个4X4的单位矩阵[identity matrix](https://en.wikipedia.org/wiki/Identity_matrix).

## 属性（Properties）

### .elements : Array

矩阵列优先[column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order)列表。

### .isMatrix4 : Boolean

用于判定此对象或者此类的派生对象是否是三维矩阵。默认值为 **true**。

不应该改变该值，因为它在内部用于优化。

## 方法（Methods）

### .applyToBufferAttribute ( attribute : BufferAttribute ) : Array

attribute - 表示三维向量缓存属性。

用这个矩阵乘以缓存属性attribute里的所有3d向量。

### .clone () : Matrix4

创建一个新的矩阵，元素elements与该矩阵相同。

### .compose ( position : Vector3, quaternion : Quaternion, scale : Vector3 ) : this

设置将该对象由位置position，四元数quaternion 和 缩放scale 组合变换的矩阵。内部先调用makeRotationFromQuaternion( quaternion ) 再调用缩放scale( scale )最后是平移setPosition( position )。

### .copy ( m : Matrix4 ) : this

将矩阵m的元素elements复制到当前矩阵中。

### .copyPosition ( m : Matrix4 ) : this

将给定矩阵m : Matrix4 的平移分量拷贝到当前矩阵中。

### .decompose ( position : Vector3, quaternion : Quaternion, scale : Vector3 ) : null

将矩阵分解到给定的平移position ,旋转 quaternion，缩放scale分量中。

### .determinant () : Float

计算并返回矩阵的行列式[determinant](https://en.wikipedia.org/wiki/Determinant) 。

基于这个的方法概述[here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm)。

### .equals ( m : Matrix4 ) : Boolean

如果矩阵m 与当前矩阵所有对应元素相同则返回true。

### .extractBasis ( xAxis : Vector3, yAxis : Vector3, zAxis : Vector3 ) : this

将矩阵的基向量[basis](https://en.wikipedia.org/wiki/Basis_(linear_algebra))提取到指定的3个轴向量中。 如果矩阵如下：`a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p`然后x轴y轴z轴被设为：`xAxis = (a, e, i) yAxis = (b, f, j) zAxis = (c, g, k)`

### .extractRotation ( m : Matrix4 ) : this

将给定矩阵m的旋转分量提取到该矩阵的旋转分量中。

### .fromArray ( array : Array, offset : Integer ) : this

array - 用来存储设置元素数据的数组
offset - (可选参数) 数组的偏移量，默认值为 0。

使用基于列优先格式[column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)的数组来设置该矩阵。

### .getInverse ( m : Matrix4, throwOnDegenerate : Boolean ) : this

m - 取逆的矩阵。
throwOnDegenerate - (optional) 如果设置为true，如果矩阵是退化的（如果不可逆的话），则会抛出一个错误。

使用逆矩阵计算方法[analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution)， 将当前矩阵设置为给定矩阵的逆矩阵[inverse](https://en.wikipedia.org/wiki/Invertible_matrix)，如果throwOnDegenerate 参数没有设置且给定矩阵不可逆，那么将当前矩阵设置为3X3单位矩阵。

### .getMaxScaleOnAxis () : Float

获取3个轴方向的最大缩放值。

### .identity () : this

将当前矩阵重置为单位矩阵[identity matrix](https://en.wikipedia.org/wiki/Identity_matrix)。

### .lookAt ( eye : Vector3, center : Vector3, up : Vector3, ) : this

构造一个旋转矩阵，从eye 指向 center，由向量 up : Vector3 定向。

### .makeRotationAxis ( axis : Vector3, theta : Float ) : this

axis — 旋转轴，需要被归一化。
theta — 旋转量（弧度）。

设置当前矩阵为围绕轴 axis 旋转量为 theta弧度。
这是一种有点争议但在数学上可以替代通过四元数Quaternions旋转的办法。 请参阅此处[here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199)的讨论。

### .makeBasis ( xAxis : Vector3, yAxis : Vector3, zAxis : Vector3 ) : this

通过给定的三个向量设置该矩阵为基矩阵[basis](https://en.wikipedia.org/wiki/Basis_(linear_algebra))：

```
xAxis.x, yAxis.x, zAxis.x, 0, 
xAxis.y, yAxis.y, zAxis.y, 0, 
xAxis.z, yAxis.z, zAxis.z, 0, 
0,       0,       0,       1
```

### .makePerspective ( left : Float, right : Float, top : Float, bottom : Float, near : Float, far : Float ) : this

创建一个透视投影矩阵[perspective projection](https://en.wikipedia.org/wiki/3D_projection#Perspective_projection)。 在引擎内部由PerspectiveCamera.updateProjectionMatrix()使用。

### .makeOrthographic ( left : Float, right : Float, top : Float, bottom : Float, near : Float, far : Float ) : this

创建一个正交投影矩阵[orthographic projection](https://en.wikipedia.org/wiki/Orthographic_projection)。 在引擎内部由OrthographicCamera.updateProjectionMatrix()使用。

### .makeRotationFromEuler ( euler : Euler ) : this

将传入的欧拉角转换为该矩阵的旋转分量(左上角的3x3矩阵)。 矩阵的其余部分被设为单位矩阵。根据欧拉角euler的旋转顺序order，总共有六种可能的结果。 详细信息，请参阅本页[this page](https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix)。

### .makeRotationFromQuaternion ( q : Quaternion ) : this

将这个矩阵的旋转分量设置为四元数q指定的旋转，如下链接所诉[here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)。 矩阵的其余部分被设为单位矩阵。因此，给定四元数q = w + xi + yj + zk，得到的矩阵为:
```
1-2y²-2z²    2xy-2zw    2xz+2yw    0 
2xy+2zw      1-2x²-2z²  2yz-2xw    0 
2xz-2yw      2yz+2xw    1-2x²-2y²  0 
0            0          0          1
```

### .makeRotationX ( theta : Float ) : this

theta — Rotation angle in radians.

把该矩阵设置为绕x轴旋转弧度theta (θ)大小的矩阵。 结果如下：
```
1 0      0        0 
0 cos(θ) -sin(θ)  0 
0 sin(θ) cos(θ)   0 
0 0      0        1
```

### .makeRotationY ( theta : Float ) : this

theta — Rotation angle in radians.

把该矩阵设置为绕Y轴旋转弧度theta (θ)大小的矩阵。 结果如下：
```
cos(θ)  0 sin(θ) 0 0       1 0      0 -sin(θ) 0 cos(θ) 0 0       0 0      1
```

### .makeRotationZ ( theta : Float ) : this

theta — Rotation angle in radians.

把该矩阵设置为绕z轴旋转弧度theta (θ)大小的矩阵。 结果如下：
```
cos(θ) -sin(θ) 0 0 
sin(θ) cos(θ)  0 0 
0      0       1 0 
0      0       0 1
```

### .makeScale ( x : Float, y : Float, z : Float ) : this

x - 在X轴方向的缩放比。
y - 在Y轴方向的缩放比。
z - 在Z轴方向的缩放比。

将这个矩阵设置为缩放变换:
```
x, 0, 0, 0, 
0, y, 0, 0, 
0, 0, z, 0, 
0, 0, 0, 1
```

### .makeShear ( x : Float, y : Float, z : Float ) : this

x - 在X轴上剪切的量。
y - 在Y轴上剪切的量。
z - 在Z轴上剪切的量。

将此矩阵设置为剪切变换:
```
1, y, z, 0, 
x, 1, z, 0, 
x, y, 1, 0, 
0, 0, 0, 1
```

### .makeTranslation ( x : Float, y : Float, z : Float ) : this

x - 在X轴上的平移量。
y - 在Y轴上的平移量。
z - 在Z轴上的平移量。

设置该矩阵为平移变换：
```
1, 0, 0, x, 
0, 1, 0, y, 
0, 0, 1, z, 
0, 0, 0, 1
```

### .multiply ( m : Matrix4 ) : this

将当前矩阵乘以矩阵m。

### .multiplyMatrices ( a : Matrix4, b : Matrix4 ) : this

设置当前矩阵为矩阵a x 矩阵b。

### .multiplyScalar ( s : Float ) : this

当前矩阵所有的元素乘以该缩放值**s**

### .premultiply ( m : Matrix4 ) : this

将矩阵m乘以当前矩阵。

### .scale ( v : Vector3 ) : this

将该矩阵的列向量乘以对应向量v的分量。

### .set ( n11 : Float, n12 : Float, n13 : Float, n14 : Float, n21 : Float, n22 : Float, n23 : Float, n24 : Float, n31 : Float, n32 : Float, n33 : Float, n34 : Float, n41 : Float, n42 : Float, n43 : Float, n44 : Float ) : this

以行优先的格式将传入的数值设置给该矩阵中的元素elements。

### .setPosition ( v : Vector3 ) : this

### .setPosition ( x : Float, y : Float, z : Float ) : this // optional API

取传入参数v : Vector3中值设置该矩阵的位置分量，不影响该矩阵的其余部分——即，如果该矩阵当前为:
```
a, b, c, d, 
e, f, g, h, 
i, j, k, l, 
m, n, o, p
```
变成:
```
a, b, c, v.x, 
e, f, g, v.y, 
i, j, k, v.z, 
m, n, o, p
```

### .toArray ( array : Array, offset : Integer ) : Array

array - (可选参数) 存储矩阵元素的数组，如果未指定会创建一个新的数组。
offset - (可选参数) 存放矩阵元素数组的偏移量。

使用列优先[column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)格式将此矩阵的元素写入数组中。

### .transpose () : this

将该矩阵转置[Transposes](https://en.wikipedia.org/wiki/Transpose)。

## 源码（Source）

[src/math/Matrix4.js](https://github.com/mrdoob/three.js/blob/master/src/math/Matrix4.js)