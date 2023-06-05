[TOC]



# 射线（Ray）

射线由一个原点向一个确定的方向发射。它被Raycaster（光线投射）所使用， 以用于辅助[raycasting](https://en.wikipedia.org/wiki/Ray_casting)。 光线投射用于在各个物体之间进行拾取（当鼠标经过三维空间中的物体/对象时进行拾取）。

## 构造函数

### Ray( origin : Vector3, direction : Vector3 )

origin - （可选）Ray（射线）的原点，默认值是一个位于(0, 0, 0)的Vector3。
direction - Vector3 Ray（射线）的方向。该向量必须经过标准化（使用Vector3.normalize），这样才能使方法正常运行。 默认值是一个位于(0, 0, -1)的Vector3。

创建一个新的Ray。

## 属性

### .origin : Vector3

Ray（射线）的原点，默认值是一个位于(0, 0, 0)的Vector3。

### .direction : Vector3

Ray（射线）的方向。该向量必须经过标准化（使用Vector3.normalize），这样才能使方法正常运行。 默认值是一个位于(0, 0, -1)的Vector3。

## 方法

### .applyMatrix4 ( matrix4 : Matrix4 ) : Ray

matrix4 - 将被用于这个Ray的Matrix4。

使用传入的Matrix4来变换这个Ray。

### .at ( t : Float, target : Vector3 ) : Vector3

t - 使用这一传入的距离，在Ray上确定一个位置。
target — 结果将复制到这一Vector3中。

获得这一Ray上给定距离处的Vector3。

### .clone () : Ray

创建一个新的和这个Ray具有相同origin和direction的Ray。

### .closestPointToPoint ( point : Vector3, target : Vector3 ) : Vector3

point - 获得距离射线上的点最接近的点。
target — 结果将复制到这一Vector3中。

沿着Ray，获得与所传入Vector3最接近的点。

### .copy ( ray : Ray ) : Ray

复制所传入Ray的origin和direction属性到这个Ray上。

### .distanceSqToPoint ( point : Vector3 ) : Float

point - the Vector3 to compute a distance to.

获得Ray与传入的Vector3之间最近的平方距离。

### .distanceSqToSegment ( v0 : Vector3, v1 : Vector3, optionalPointOnRay : Vector3, optionalPointOnSegment : Vector3 ) : Float

v0 - 线段的起点。
v1 - 线段的终点。
optionalPointOnRay - （可选）若这个值被给定，它将接收在Ray（射线）上距离线段最近的点。
optionalPointOnSegment - （可选）若这个值被给定，它将接收在线段上距离Ray（射线）最近的点。

获取Ray（射线）与线段之间的平方距离。

### .distanceToPlane ( plane : Plane ) : Float

plane - 将要获取射线原点到该平面的距离的平面。

获取射线原点（origin）到平面（Plane）之间的距离。若射线（Ray）不与平面（Plane）相交，则将返回**null**。

### .distanceToPoint ( point : Vector3 ) : Float

point - Vector3 将被用于计算到其距离的Vector3。

获得Ray（射线）到所传入point之间最接近的距离。

### .equals ( ray : Ray ) : Boolean

ray - 用于比较的Ray。

如果所传入的ray具有和当前Ray相同的offset和direction则返回true。

### .intersectBox ( box : Box3, target : Vector3 ) : Vector3

box - 将会与之相交的Box3。
target — 结果将会被复制到这一Vector3中。

将Ray（射线）与一个Box3相交，并返回交点，倘若没有交点将返回**null**。

### .intersectPlane ( plane : Plane, target : Vector3 ) : Vector3

plane - 将会与之相交的Plane。
target — 结果将会被复制到这一Vector3中。

将Ray（射线）与一个Plane相交，并返回交点，倘若没有交点将返回**null**。

### .intersectSphere ( sphere : Sphere, target : Vector3 ) : Vector3

sphere - 将会与之相交的Sphere。
target — 结果将会被复制到这一Vector3中。

将Ray（射线）与一个Sphere（球）相交，并返回交点，倘若没有交点将返回**null**。

### .intersectTriangle ( a : Vector3, b : Vector3, c : Vector3, backfaceCulling : Boolean, target : Vector3 ) : Vector3

a, b, c - 组成三角形的三个Vector3。
backfaceCulling - 是否使用背面剔除。
target — 结果将会被复制到这一Vector3中。

将Ray（射线）与一个三角形相交，并返回交点，倘若没有交点将返回**null**。

### .intersectsBox ( box : Box3 ) : Boolean

box - 将被检查是否与之相交的Box3。

若这一射线与Box3相交，则将返回true。

### .intersectsPlane ( plane : Plane ) : Boolean

plane - 将被检查是否与之相交的Plane。

若这一射线与Plane相交，则将返回true。

### .intersectsSphere ( sphere : Sphere ) : Boolean

sphere - 将被检查是否与之相交的Sphere。

若这一射线与Sphere相交，则将返回true。

### .lookAt ( v : Vector3 ) : Ray

v - 将要“直视”的Vector3

调整光线的方向到世界坐标中该向量所指代的点。

### .recast ( t : Float ) : Ray

t - 沿着Ray进行插值的距离。

将Ray（射线）的原点沿着其方向移动给定的距离。

### .set ( origin : Vector3, direction : Vector3 ) : Ray

origin - Ray（射线）的origin（原点）。
origin - Ray（射线）的direction（方向）。 该向量必须经过标准化（使用Vector3.normalize），这样才能使方法正常运行。

将传入的参数赋值给射线的origin和direction。

## 源代码

[src/math/Ray.js](https://github.com/mrdoob/three.js/blob/master/src/math/Ray.js)