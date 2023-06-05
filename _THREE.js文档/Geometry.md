[toc]



# Geometry

Geometry 是一个便于用户使用的 BufferGeometry 的替代品。Geometry 利用 Vector3 或 Color 存储了几何体的相关 attributes（如顶点位置，面信息，颜色等）比起 BufferGeometry 更容易读写，但是运行效率不如有类型的队列。

对于大型工程或正式工程，推荐采用 BufferGeometry。

## 示例

[WebGL / geometry / minecraft](http://www.webgl3d.cn/threejs/examples/#webgl_geometry_minecraft)

[WebGL / geometry / minecraft / ao](http://www.webgl3d.cn/threejs/examples/#webgl_geometry_minecraft_ao)

[WebGL / geometry / nurbs](http://www.webgl3d.cn/threejs/examples/#webgl_geometry_nurbs)

[WebGL / geometry / spline / editor](http://www.webgl3d.cn/threejs/examples/#webgl_geometry_spline_editor)

[WebGL / interactive / cubes / gpu](http://www.webgl3d.cn/threejs/examples/#webgl_interactive_cubes_gpu)

[WebGL / interactive / lines](http://www.webgl3d.cn/threejs/examples/#webgl_interactive_lines)

[WebGL / interactive / raycasting / points](http://www.webgl3d.cn/threejs/examples/#webgl_interactive_raycasting_points)

[WebGL / interactive / voxelpainter](http://www.webgl3d.cn/threejs/examples/#webgl_interactive_voxelpainter)

[WebGL / morphNormals](http://www.webgl3d.cn/threejs/examples/#webgl_morphnormals)

```
var geometry = new THREE.Geometry(); geometry.vertices.push( new THREE.Vector3( -10,  10, 0 ), new THREE.Vector3( -10, -10, 0 ), new THREE.Vector3(  10, -10, 0 ) ); geometry.faces.push( new THREE.Face3( 0, 1, 2 ) ); geometry.computeBoundingSphere();
```

## 构造函数

### Geometry()

构造函数没有任何参数。

## 属性

### .boundingBox : Box3

Geometry 的外边界矩形，可以通过 .computeBoundingBox() 进行计算，默认值是 **null**。

### .boundingSphere : Sphere

Geometry 的外边界球形，可以通过 .computeBoundingSphere() 进行计算，默认值是 **null**。

### .colors : Array

顶点 colors 队列，与顶点数量和顺序保持一致。

该属性用于 Points 、 Line 或派生自 LineSegments 的类。 对于 Meshes，请使用 Face3.vertexColors 函数。

如果要标记队列中的数据已经更新，Geometry.colorsNeedUpdate 值需要被设置为 true。

### .faces : Array

faces 队列。
描述每个顶点之间如何组成模型面的面队列。同时该队列保存面和顶点的法向量和颜色信息。

如果要标记队列中的数据已经更新，Geometry.elementsNeedUpdate 值需要被设置为 true。

### .faceVertexUvs : Array

面的 [UV](https://en.wikipedia.org/wiki/UV_mapping) 层的队列，该队列用于将纹理和几何信息进行映射。
每个 UV 层都是一个 UV 的队列，顺序和数量同面中的顶点相对用。

如果要标记队列中的数据已经更新，Geometry.uvsNeedUpdate 值需要被设置为 true。

### .id : Integer

当前 geometry 实例的唯一标识符的数。

### .isGeometry : Boolean

用于判断当前类或派生类属于 Geometries。默认值是 **true**。

你不应该改变该值，该值用于内部优化。

### .lineDistances : array

用于保存线型几何体中每个顶点间距离的。在正确渲染 LineDashedMaterial 时，需要用到该数据。

### .morphTargets : Array

[morph targets](https://en.wikipedia.org/wiki/Morph_target_animation) 的队列。每个 morph target 都是一个如下的 javascript 对象：`{ name: "targetName", vertices: [ new THREE.Vector3(), ... ] }`Morph 顶点和几何体原始顶点在数量和顺序上需要一一对应。

### .morphNormals : Array

一个 morph 法向量的数组。Morph 法向量和 morph target 有类似的结构，每个法向量都是一个如下的 Javascript 对象:`morphNormal = { name: "NormalName", normals: [ new THREE.Vector3(), ... ] }`示例详见 [WebGL / morphNormals](http://www.webgl3d.cn/threejs/examples/#webgl_morphnormals)。

### .name : String

当前几何的可选别名。默认值是一个空字符串。

### .skinWeights : Array

当在处理一个 SkinnedMesh 时，每个顶点最多可以有 4 个相关的 bones 来影响它。 skinWeights 属性是一个权重队列，顺序同几何体中的顶点保持一致。因而，队列中的第一个 skinWeight 就对应几何体中的第一个顶点。由于每个顶点可以被 4 个 bones 营销，因而每个顶点的 skinWeights 就采用一个 Vector4 表示。

skinWeight 矢量中每个元素的取值范围应该在 0 到 1 之间。例如，当设置为 0，骨骼对该顶点的位置没有影响。当设置为 0.5, 则对顶点的影响为 50%。 当设置为 100% 则对顶点的影响是 100%。如果矢量中只有一个骨骼与顶点相关联，则你只需要关注矢量中的第一个元素， 剩余的元素可以忽略，他们的值可以都设置为 0。

### .skinIndices : Array

就如同 skinWeights 属性一样。skinWeights 的值也是与几何体的顶点相对应。每个顶点可以最多有 4 个骨骼与之相关联。 因而第一个 skinIndex 就与几何体的第一个顶点相关联，skinIndex 的值就指明了影响该顶点的骨骼是哪个。例如，第一个顶点的值是 **( 10.05, 30.10, 12.12 )**，第一个 skinIndex 的值是**( 10, 2, 0, 0 )**，第一个 skinWeight 的值是 **( 0.8, 0.2, 0, 0 )**。上述值表明第一个顶点受到**mesh.bones[10]**骨骼的影响有 80%， 受到 **skeleton.bones[2]** 的影响是 20%，由于另外两个 skinWeight 的值是 0，因而他们对顶点没有任何影响。

下面以代码的形式展示示例：`// 例如 geometry.skinIndices[15] = new THREE.Vector4(   0,   5,   9, 10 ); geometry.skinWeights[15] = new THREE.Vector4( 0.2, 0.5, 0.3,  0 ); // 与该顶点相关 geometry.vertices[15]; // 相应骨骼可以这样被调用: skeleton.bones[0]; // weight of 0.2 skeleton.bones[5]; // weight of 0.5 skeleton.bones[9]; // weight of 0.3 skeleton.bones[10]; // weight of 0`

### .uuid : String

当前对象实例的 [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier)。 该值会被自动分配，请不要修改它。

### .vertices : Array

vertices 的队列。
顶点的队列，保存了模型中每个顶点的位置信息。
如果要标记队列中的数据已经更新，.verticesNeedUpdate 值需要被设置为 true。

### .verticesNeedUpdate : Boolean

如果顶点队列中的数据被修改，该值需要被设置为 **true**。

### .elementsNeedUpdate : Boolean

如果面队列中的数据被修改，该值需要被设置为 **true**。

### .uvsNeedUpdate : Boolean

如果 UV 队列中的数据被修改，该值需要被设置为 **true**。

### .normalsNeedUpdate : Boolean

如果法向量队列中的数据被修改，该值需要被设置为 **true**。

### .colorsNeedUpdate : Boolean

如果颜色队列或 face3 的颜色数据被修改，该值需要被设置为 **true**。

### .groupsNeedUpdate : Boolean

如果 face3 的 materialIndex 被修改，该值需要被设置为 **true**。

### .lineDistancesNeedUpdate : Boolean

如果 linedistances 队列中的数据被修改，该值需要被设置为 **true**。

## 方法

### EventDispatcher 该类中可用的函数。

### .applyMatrix ( matrix : Matrix4 ) : null

将矩阵信息直接应用于几何体顶点坐标。

### .center () : Geometry

基于外边界矩形将几何体居中。

### .clone () : Geometry

克隆当前几何体。

该方法除几何体的顶点、面信息和 UV 外不会复制其他属性。

### .computeBoundingBox () : null

计算当前几何体的外边界矩形。该方法会更新 Geometry.boundingBox 属性值。

### .computeBoundingSphere () : null

计算当前几何体的外边界球。该方法会更新 Geometry.boundingSphere 属性值。

计算外边界矩形或外边界球并不是默认会自动调用的方法，这两个函数需要被显示的调用才能天得到相应属性值，否则对应属性值保持默认值 **null**。

### .computeFaceNormals () : null

计算 face normals 值。

### .computeFlatVertexNormals () : null

计算 flat vertex normals 值。 该方法会将顶点法向量的值赋值为相应面的法向量值。

### .computeMorphNormals () : null

计算 .morphNormals 值。

### .computeVertexNormals ( areaWeighted : Boolean ) : null

areaWeighted - 如果该值设置为 true，则每个面的法向量对顶点法向量的影响按照面的面积大小来计算。默认值为 true.

通过周围面的法向量计算顶点的法向量。

### .copy ( geometry : Geometry ) : Geometry

将参数代表的几何体的顶点、面和 UV 复制到当前几何体。该方法不会复制除此以外的别的属性值。

### .dispose () : null

将对象从内存中删除。
在你删除一个几何体时，不要忘记调用该方法，否则会造成内存泄漏。

### .fromBufferGeometry ( geometry : BufferGeometry ) : Geometry

将一个 BufferGeometry 对象，转换成一个 Geometry 对象。

### .lookAt ( vector : Vector3 ) : Geometry

vector - 当前几何体朝向的世界坐标。

该方法将几何体进行旋转，是的几何体朝向参数指定的世界坐标。该方法一般在一次处理中完成，但不在渲染过程中执行。
一般使用 Object3D.lookAt 方法进行实时更改。

### .merge ( geometry : Geometry, matrix : Matrix4, materialIndexOffset : Integer ) : null

将两个几何体，或一个几何体和一个从对象中通过变换获得的几何体进行合并。

### .mergeMesh ( mesh : Mesh ) : null

将参数指定的面片信息与当前几何体进行合并。同样会使用到参数 mesh 的变换。

### .mergeVertices () : null

通过 hashmap 检查重复的顶点。
重复的顶点将会被移除，面的顶点信息会被更新。

### .normalize () : null

将当前几何体归一化。
将当前几何体居中，并且使得该几何体的外边界球半径为 **1.0**。

### .rotateX ( radians : Float ) : Geometry

将几何体绕 X 轴旋转参数指定度数。该操作通常在一次处理中完成，但不会在渲染过程中处理。
使用 Object3D.rotation 对模型面片进行实时旋转处理。

### .rotateY ( radians : Float ) : Geometry

将几何体绕 Y 轴旋转参数指定度数。该操作通常在一次处理中完成，但不会在渲染过程中处理。
使用 Object3D.rotation 对模型面片进行实时旋转处理。

### .rotateZ ( radians : Float ) : Geometry

将几何体绕 Z 轴旋转参数指定度数。该操作通常在一次处理中完成，但不会在渲染过程中处理。
使用 Object3D.rotation 对模型面片进行实时旋转处理。

### .setFromPoints ( points : Array ) : Geometry

通过点队列设置一个 Geometry 中的顶点。

### .sortFacesByMaterialIndex ( ) : null

通过材质索引对面队列进行排序。对于复杂且有多个材质的几何体，该操作可以有效减少 draw call 从而提升性能。

### .scale ( x : Float, y : Float, z : Float ) : Geometry

缩放几何体大小。该操作通常在一次处理中完成，但不会在渲染过程中处理。
使用 Object3D.scale 对模型面片进行实时缩放处理。

### .toJSON ( ) : JSON

将 Geometry 对象转为 JSON 格式。
将几何体转换为 three.js [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4)（three.js JSON 物体/场景格式）。

### .translate ( x : Float, y : Float, z : Float ) : Geometry

移动当前几何体。该操作通常在一次处理中完成，但不会在渲染过程中处理。
使用 Object3D.position 对模型面片进行实时移动处理。

## 源代码

[src/core/Geometry.js](https://github.com/mrdoob/three.js/blob/master/src/core/Geometry.js)

