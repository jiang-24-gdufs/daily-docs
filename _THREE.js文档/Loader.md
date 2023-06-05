[TOC]

# 加载器（Loader）

用于实现加载器的基类。



## 构造函数

### Loader( manager : LoadingManager )

manager — The loadingManager for the loader to use. Default is THREE.DefaultLoadingManager.

Creates a new Loader.

## 属性

### .crossOrigin : string

The crossOrigin string to implement CORS for loading the url from a different domain that allows CORS. Default is **anonymous**.

### .manager : LoadingManager

The loadingManager the loader is using. Default is DefaultLoadingManager.

### .path : String

The base path from which the asset will be loaded. Default is the empty string.

### .resourcePath : String

The base path from which additional resources like textures will be loaded. Default is the empty string.

## 方法

### .load () : void

This method needs to be implement by all concrete loaders. It holds the logic for loading the asset from the backend.

### .parse () : void

This method needs to be implement by all concrete loaders. It holds the logic for parsing the asset into three.js entities.

### .setCrossOrigin ( crossOrigin : String ) : Loader

crossOrigin — The crossOrigin string to implement CORS for loading the url from a different domain that allows CORS.

### .setPath ( path : String ) : Loader

path — Set the base path for the asset.

### .setResourcePath ( resourcePath : String ) : Loader

resourcePath — Set the base path for dependent resources like textures.



# 子类加载器

## 	OBJLoader

用于加载.obj资源的加载程序。
OBJ文件格式是一种简单的数据格式，以人类可读的格式表示3D几何形状，即每个顶点的位置，每个纹理坐标顶点的UV位置，顶点法线以及将每个多边形定义为以下各项的面： 顶点和纹理顶点。

## 	DRACOLoader

用Draco库压缩的几何图形加载程序。
Draco是一个用于压缩和解压缩3D网格和点云的开源库。 压缩后的几何结构可能会大大缩小，但会增加客户端设备上额外的解码时间。
独立的Draco文件具有.drc扩展名，并包含顶点位置，法线，颜色和其他属性。 Draco文件不包含材质，纹理，动画或节点层次结构–要使用这些功能，请将Draco几何体嵌入glTF文件中。 可以使用glTF-Pipeline将普通的glTF文件转换为Draco压缩的glTF文件。 将Draco与glTF一起使用时，GLTFLoader将在内部使用DRACOLoader的实例。

### 浏览器兼容性

DRACOLoader依赖于**ES6 Promises**，而IE11不支持。 要在IE11中使用加载程序，您必须包括提供Promise替代品的polyfill。 DRACOLoader将基于浏览器功能自动使用**JS或WASM解码库**。

## 	GLTFLoader

用于载入*glTF 2.0*资源的加载器。
[glTF](https://www.khronos.org/gltf)（gl传输格式）是一种开放格式的规范 （[open format specification](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0)）， 用于更高效地传输、加载3D内容。该类文件以JSON（.glft）格式或二进制（.glb）格式提供， 外部文件存储贴图（.jpg、.png）和额外的二进制数据（.bin）。一个glTF组件可传输一个或多个场景， 包括网格、材质、贴图、蒙皮、骨架、变形目标、动画、灯光以及摄像机。

```js
// gltf
{
    animations: [],
    asset: {generator: "south-smart", version: "2.0"},
    cameras: []
    parser: GLTFParser,
    scene: Group
    scenes: [Group]
    userData: {}
}
```



### 扩展

GLTFLoader支持下列glTF 2.0扩展（[glTF 2.0 extensions](https://github.com/KhronosGroup/glTF/tree/master/extensions/)）：

- KHR_draco_mesh_compression
- KHR_materials_pbrSpecularGlossiness
- KHR_materials_unlit
- KHR_mesh_quantization
- KHR_lights_punctual1
- KHR_texture_transform2
- MSFT_texture_dds

*1需要[physicallyCorrectLights](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.physicallyCorrectLights)被启用。*

*2支持UV变换，但存在一些重要的限制。 Transforms applied to a texture using the first UV slot (all textures except aoMap and lightMap) must share the same transform, or no transfor at all. aoMap 和 lightMap 纹理不能被变换。每个材质最多只能使用一次变换。 每次对使用具有唯一变换的纹理都会导致一次额外的GPU纹理上传。 请参阅#[13831](https://github.com/mrdoob/three.js/pull/13831) 和 #[12788](https://github.com/mrdoob/three.js/issues/12788)。*

### 浏览器兼容性

GLTFLoader 依赖 ES6 [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)， 这一特性不支持IE11。若要在IE11中使用该加载器，你必须引入polyfill（[include a polyfill](https://github.com/stefanpenner/es6-promise)） 来提供一个Promise的替代方案。

## 纹理

纹理中包含的颜色信息（.map, .emissiveMap, 和 .specularMap）在glTF中总是使用sRGB颜色空间，而顶点颜色和材质属性（.color, .emissive, .specular） 则使用线性颜色空间。在典型的渲染工作流程中，纹理会被渲染器转换为线性颜色空间，进行光照计算，然后最终输出会被转换回 sRGB 颜色空间并显示在屏幕上。除非你需要使用线性颜色空间进行后期处理，否则请在使用glTF的时候将WebGLRenderer进行如下配置：

假设渲染器的配置如上所示，则GLTFLoader将可以正确地自动配置从.gltf或.glb文件中引用的纹理。 当从外部加载纹理（例如，使用TextureLoader）并将纹理应用到glTF模型，则必须给定对应的颜色空间与朝向：