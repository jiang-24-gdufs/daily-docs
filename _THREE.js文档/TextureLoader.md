[TOC]



Loader →

# TextureLoader

加载texture的一个类。 内部使用ImageLoader来加载文件。

## 例子

```js
var texture = new THREE.TextureLoader().load('textures/land_ocean_ice_cloud_2048.jpg' ); 
// 立即使用纹理进行材质创建 
var material = new THREE.MeshBasicMaterial( { map: texture } );
```

[geometry / cube](http://www.webgl3d.cn/threejs/examples/#webgl_geometry_cube)

## Example with Callbacks

`// 初始化一个加载器 var loader = new THREE.TextureLoader(); // 加载一个资源 loader.load( // 资源URL 'textures/land_ocean_ice_cloud_2048.jpg', 	// onLoad回调 function ( texture ) { 	// in this example we create the material when the texture is loaded 	var material = new THREE.MeshBasicMaterial( { 		map: texture 	 } ); }, 	// 目前暂不支持onProgress的回调 undefined, 	// onError回调 function ( err ) { 	console.error( 'An error happened.' ); } );`请注意three.js r84遗弃了TextureLoader进度事件。对于支持进度事件的TextureLoader ， 请参考[this thread](https://github.com/mrdoob/three.js/issues/10439#issuecomment-293260145)。

## 构造函数

### TextureLoader( manager : LoadingManager )

manager — 加载器使用的loadingManager，默认值为THREE.DefaultLoadingManager.

创建一个新的TextureLoader.

## 属性

共有属性请参见其基类Loader。

## 方法

共有方法请参见其基类Loader。

### .load ( url : String, onLoad : Function, onProgress : Function, onError : Function ) : Texture

url — 文件的URL或者路径，也可以为 [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
onLoad — 加载完成时将调用。回调参数为将要加载的texture.
onProgress — 将在加载过程中进行调用。参数为XMLHttpRequest实例，实例包含total和loaded字节。
onError — 在加载错误时被调用。

从给定的URL开始加载并将完全加载的texture传递给onLoad。该方法还返回一个新的纹理对象，该纹理对象可以直接用于材质创建。 如果采用此方法，一旦相应的加载过程完成，纹理可能会在场景中出现。

## 源

[src/loaders/TextureLoader.js](https://github.com/mrdoob/three.js/blob/master/src/loaders/TextureLoader.js)
