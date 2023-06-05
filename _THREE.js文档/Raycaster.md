[toc]



# 光线投射Raycaster

这个类用于进行[raycasting](https://en.wikipedia.org/wiki/Ray_casting)（光线投射）。 光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。

## 示例

```js
var raycaster = new THREE.Raycaster(); 
var mouse = new THREE.Vector2(); 
function onMouseMove( event ) { 	
	// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1) 	
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1; 
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 
} 
function render() { 	
    // 通过摄像机和鼠标位置更新射线 
    raycaster.setFromCamera( mouse, camera ); 	
    // 计算物体和射线的焦点 
    var intersects = raycaster.intersectObjects( scene.children ); 	
    for ( var i = 0; i < intersects.length; i++ ) { 		
    	intersects[ i ].object.material.color.set( 0xff0000 ); 	
    } 	
	renderer.render( scene, camera ); 
} 
window.addEventListener( 'mousemove', onMouseMove, false ); window.requestAnimationFrame(render);
```

其它示例：
[Raycasting to a Mesh](http://www.webgl3d.cn/threejs/examples/#webgl_interactive_cubes)
[Raycasting to a Mesh in using an OrthographicCamera](http://www.webgl3d.cn/threejs/examples/#webgl_interactive_cubes_ortho)
[Raycasting to a Mesh with BufferGeometry](http://www.webgl3d.cn/threejs/examples/#webgl_interactive_buffergeometry)
[Raycasting to a InstancedMesh](http://www.webgl3d.cn/threejs/examples/#webgl_instancing_raycast)
[Raycasting to a Line](http://www.webgl3d.cn/threejs/examples/#webgl_interactive_lines)
[Raycasting to Points](http://www.webgl3d.cn/threejs/examples/#webgl_interactive_raycasting_points)
[Terrain raycasting](http://www.webgl3d.cn/threejs/examples/#webgl_geometry_terrain_raycast)
[Raycasting to paint voxels](http://www.webgl3d.cn/threejs/examples/#webgl_interactive_voxelpainter)
[Raycast to a Texture](http://www.webgl3d.cn/threejs/examples/#webgl_raycast_texture)



## 构造器

### Raycaster( origin : Vector3, direction : Vector3, near : Float, far : Float ) {

origin —— 光线投射的原点向量。
direction —— 向射线提供方向的方向向量，应当被标准化。
near —— 返回的所有结果比near远。near不能为负值，其默认值为0。
far —— 返回的所有结果都比far近。far不能小于near，其默认值为Infinity（正无穷。）

这将创建一个新的raycaster对象。

## 属性

### .far : float

raycaster的远距离因数（投射远点）。这个值表明哪些对象可以基于该距离而被raycaster所丢弃。 这个值不应当为负，并且应当比near属性大。

### .linePrecision : float

raycaster与Line（线）物体相交时的精度因数。

### .near : float

raycaster的近距离因数（投射近点）。这个值表明哪些对象可以基于该距离而被raycaster所丢弃。 这个值不应当为负，并且应当比near属性小。

### .camera : Camera

The camera to use when raycasting against view-dependent objects such as billboarded objects like Sprites. This field can be set manually or is set when calling "setFromCamera". Defaults to null.

### .params : Object

具有以下属性的对象：`{ Mesh: {}, Line: {}, LOD: {}, Points: { threshold: 1 }, Sprite: {} }`

### .ray : Ray

用于进行光线投射的Ray（射线）。

## 方法

### .set ( origin : Vector3, direction : Vector3 ) : null

origin —— 光线投射的原点向量。
direction —— 为光线提供方向的标准化方向向量。

使用一个新的原点和方向来更新射线。

### .setFromCamera ( coords : Vector2, camera : Camera ) : null

coords —— 在标准化设备坐标中鼠标的二维坐标 —— X分量与Y分量应当在-1到1之间。
camera —— 射线所来源的摄像机。

使用一个新的原点和方向来更新射线。

### .intersectObject ( object : Object3D, recursive : Boolean, optionalTarget : Array ) : Array

object —— 检查与射线相交的物体。
recursive —— 若为true，则同时也会检查所有的后代。否则将只会检查对象本身。默认值为false。
optionalTarget — （可选）设置结果的目标数组。如果不设置这个值，则一个新的Array会被实例化；如果设置了这个值，则在每次调用之前必须清空这个数组（例如：array.length = 0;）。

检测所有在射线与物体之间，包括或不包括后代的相交部分。返回结果时，相交部分将按距离进行排序，最近的位于第一个。
该方法返回一个包含有交叉部分的数组:

```
[ { distance, point, face, faceIndex, object }, ... ]
```

distance —— 射线投射原点和相交部分之间的距离。
point —— 相交部分的点（世界坐标）
face —— 相交的面
faceIndex —— 相交的面的索引
object —— 相交的物体
uv —— 相交部分的点的UV坐标。
uv2 —— Second set of U,V coordinates at point of intersection
instanceId – The index number of the instance where the ray intersects the InstancedMesh

当计算这条射线是否和物体相交的时候，**Raycaster**将传入的对象委托给raycast方法。 这将可以让mesh对于光线投射的响应不同于lines和pointclouds。

**请注意**：对于网格来说，面必须朝向射线的原点，以便其能够被检测到。 用于交互的射线穿过面的背侧时，将不会被检测到。如果需要对物体中面的两侧进行光线投射， 你需要将material中的side属性设置为**THREE.DoubleSide**。

### .intersectObjects ( objects : Array, recursive : Boolean, optionalTarget : Array ) : Array

objects —— 检测和射线相交的一组物体。
recursive —— 若为true，则同时也会检测所有物体的后代。否则将只会检测对象本身的相交部分。默认值为false。
optionalTarget —— （可选）设置结果的目标数组。如果不设置这个值，则一个新的Array会被实例化；如果设置了这个值，则在每次调用之前必须清空这个数组（例如：array.length = 0;）。

检测所有在射线与这些物体之间，包括或不包括后代的相交部分。返回结果时，相交部分将按距离进行排序，最近的位于第一个），相交部分和.intersectObject所返回的格式是相同的。

## 源代码

[src/core/Raycaster.js](https://github.com/mrdoob/three.js/blob/master/src/core/Raycaster.js)
