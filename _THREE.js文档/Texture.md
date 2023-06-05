[TOC]



texture -> 被挂载到 material 下的map属性上

needsUpdate属性同时存在于texture&material实例上

如果需要替换纹理, 替换texture和material区别在于

- texture 如果是作为共享的, 那么在改变其中一个texture后会影响到其他的
- material则不会影响到其他的



# 纹理（Texture）

创建一个纹理贴图，将其应用到一个表面，或者作为反射/折射贴图。

## 构造函数

### Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding )

## 源代码

```
// load a texture, set wrap mode to repeat var texture = new THREE.TextureLoader().load( "textures/water.jpg" ); texture.wrapS = THREE.RepeatWrapping; texture.wrapT = THREE.RepeatWrapping; texture.repeat.set( 4, 4 );
```

## 属性

### .id : Integer

只读 - 表示该纹理实例的唯一数字。

### .uuid : String

该对象实例的[UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier)。 这个值是自动分配的，因此不应当对其进行编辑。

### .name : String

该对象的名称，可选，且无需唯一。默认值是一个空字符串。

### .image : Image

一个图片对象，通常由TextureLoader.load方法创建。 该对象可以是被three.js所支持的任意图片（例如PNG、JPG、GIF、DDS）或视频（例如MP4、OGG/OGV）格式。

要使用视频来作为纹理贴图，你需要有一个正在播放的HTML5 Video元素来作为你纹理贴图的源图像， 并在视频播放时不断地更新这个纹理贴图。——VideoTexture 类会对此自动进行处理。

### .isTexture : Boolean

用于测试这个类或者派生类是否为Texture，默认为**true**。

你不应当对这个属性进行改变,因为它在内部使用，以用于优化。

### .mipmaps : array

用户所给定的mipmap数组（可选）。

### .mapping : number

图像将如何应用到物体（对象）上。默认值是THREE.UVMapping对象类型， 即UV坐标将被用于纹理映射。
请参阅texture constants（映射模式常量）来了解其他映射类型。

### .wrapS : number

这个值定义了纹理贴图在水平方向上将如何包裹，在UV映射中对应于**U**。
默认值是THREE.ClampToEdgeWrapping，即纹理边缘将被推到外部边缘的纹素。 其它的两个选项分别是THREE.RepeatWrapping和THREE.MirroredRepeatWrapping。 请参阅texture constants来了解详细信息。

### .wrapT : number

这个值定义了纹理贴图在垂直方向上将如何包裹，在UV映射中对应于**V**。
可以使用与 .wrapS : number相同的选项。

请注意：纹理中图像的平铺，仅有当图像大小（以像素为单位）为2的幂（2、4、8、16、32、64、128、256、512、1024、2048、……）时才起作用。 宽度、高度无需相等，但每个维度的长度必须都是2的幂。 这是WebGL中的限制，不是由three.js所限制的。

### .magFilter : number

当一个纹素覆盖大于一个像素时，贴图将如何采样。默认值为THREE.LinearFilter， 它将获取四个最接近的纹素，并在他们之间进行双线性插值。 另一个选项是THREE.NearestFilter，它将使用最接近的纹素的值。
请参阅texture constants页面来了解详细信息。

### .minFilter : number

当一个纹素覆盖小于一个像素时，贴图将如何采样。默认值为THREE.LinearMipmapLinearFilter， 它将使用mipmapping以及三次线性滤镜。

请参阅texture constants页面来了解所有可能的选项。

### .anisotropy : number

沿着轴，通过具有最高纹素密度的像素的样本数。 默认情况下，这个值为1。设置一个较高的值将会产生比基本的mipmap更清晰的效果，代价是需要使用更多纹理样本。 使用renderer.getMaxAnisotropy() 来查询GPU中各向异性的最大有效值；这个值通常是2的幂。

### .format : number

默认值为THREE.RGBAFormat， 但TextureLoader将会在载入JPG图片时自动将这个值设置为THREE.RGBFormat。

请参阅texture constants页面来了解其它格式。

### .type : number

这个值必须与.format相对应。默认值为THREE.UnsignedByteType， 它将会被用于绝大多数纹理格式。

请参阅texture constants来了解其它格式。

### .offset : Vector2

纹理在单次重复时，从一开始将分别在U、V方向上偏移多少。 这个值的范围通常在**0.0**之间**1.0**。 请注意：这一属性是一个非常方便的修改器，仅仅影响纹理对模型上第一组UV的应用。 如果该纹理被用于需要额外的UV集的贴图（例如一些成品材质中的aoMap或lightMap）， 这些UV必须被手动调整来实现所期望的偏移。

### .repeat : Vector2

纹理将在表面上，分别在U、V方向重复多少次。如果这个值在任意方向上设置为大于1， 则对应的Wrap参数应当也被设为THREE.RepeatWrapping或THREE.MirroredRepeatWrapping， 以实现所期望的平铺效果。 请注意：这一属性是一个非常方便的修改器，仅仅影响纹理对模型上第一组UV的应用。 如果该纹理被用于需要额外的UV集的贴图（例如一些成品材质中的aoMap或lightMap）， 这些UV必须被手动调整来实现所期望的重复。

### .rotation : number

纹理将围绕中心点旋转多少度，单位为弧度（rad）。正值为逆时针方向旋转，默认值为**0**。 (纹理图片的旋转设置这个属性)

### .center : Vector2

旋转中心点。(0.5, 0.5)对应纹理的正中心。默认值为(0,0)，即左下角。

### .matrixAutoUpdate : boolean

是否从纹理的.offset、.repeat、.rotation和.center属性更新纹理的UV变换矩阵（uv-transform .matrix）。 默认值为true。 如果你要直接指定纹理的变换矩阵，请将其设为false。

### .matrix : Matrix3

纹理的UV变换矩阵。 当纹理的.matrixAutoUpdate属性为true时， 由渲染器从纹理的.offset、.repeat、.rotation和.center属性中进行更新。 当.matrixAutoUpdate属性为false时，该矩阵可以被手动设置。 默认值为单位矩阵。

### .generateMipmaps : boolean

是否为纹理生成mipmap（如果可用）。默认为true。 如果你手动生成mipmap，请将其设为false。

### .premultiplyAlpha : boolean

If set to **true**, the alpha channel, if present, is multiplied into the color channels when the texture is uploaded to the GPU. Defaut is **false**.

Note that this property has no effect for [ImageBitmap](https://developer.mozilla.org/de/docs/Web/API/ImageBitmap). You need to configure on bitmap creation instead. See ImageBitmapLoader.

### .flipY : boolean

If set to **true**, the texture is flipped along the vertical axis when uploaded to the GPU. Default is **true**.

Note that this property has no effect for [ImageBitmap](https://developer.mozilla.org/de/docs/Web/API/ImageBitmap). You need to configure on bitmap creation instead. See ImageBitmapLoader.

### .unpackAlignment : number

默认为4。指定内存中每个像素行起点的对齐要求。 允许的值为1（字节对齐）、2（行对齐到偶数字节）、4（字对齐）和8（行从双字边界开始）。 请参阅[glPixelStorei](http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)来了解详细信息。

### .encoding : number

默认值为THREE.LinearEncoding。 请参阅texture constants来了解其他格式的详细信息。

请注意，如果在材质被使用之后，纹理贴图中这个值发生了改变， 需要触发Material.needsUpdate，来使得这个值在着色器中实现。

### .version : Integer

这个值起始值为**0**，计算 .needsUpdate : Boolean被设置为**true**的次数。

### .onUpdate : Function

一个回调函数，在纹理被更新后调用。 （例如，当needsUpdate被设为true且纹理被使用。）

### .needsUpdate : Boolean

将其设置为**true**，以便在下次使用纹理时触发一次更新。 这对于设置包裹模式尤其重要。

## 方法

### EventDispatcher方法在这个类上可以使用。

### .updateMatrix () : null

从纹理的.offset、.repeat、 .rotation和.center属性来更新纹理的UV变换矩阵（uv-transform .matrix）。

### .clone () : Texture

拷贝纹理。请注意。这不是“深拷贝”，图像是共用的。

### .toJSON ( meta : Object ) : Object

meta -- 可选，包含有元数据的对象。
将Texture对象转换为 three.js [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4)（three.js JSON 物体/场景格式）。

### .dispose () : null

使用“废置”事件类型调用EventDispatcher.dispatchEvent。

### .transformUv ( uv : Vector2 ) : Vector2

基于纹理的.offset、.repeat、 .wrapS、.wrapT和.flipY属性值来变换uv。

## 源代码

[src/textures/Texture.js](https://github.com/mrdoob/three.js/blob/master/src/textures/Texture.js)



# 常亮



