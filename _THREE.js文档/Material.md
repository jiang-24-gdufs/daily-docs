[TOC]

# 材质(Material)

材质的抽象基类。

材质描述了对象objects的外观。它们的定义方式与渲染器无关， 因此，如果您决定使用不同的渲染器，不必重写材质。

所有其他材质类型都继承了以下属性和方法（尽管它们可能具有不同的默认值）。

## 构造函数(Constructor)

### Material()

该方法创建一个通用材质。

## 属性(Properties)

### .alphaTest : Float

设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为**0**。

### .blendDst : Integer

混合目标。默认值为OneMinusSrcAlphaFactor。 目标因子所有可能的取值请参阅constants。 必须将材质的blending设置为CustomBlending才能生效。

### .blendDstAlpha : Integer

.blendDst的透明度。 默认值为 **null**.

### .blendEquation : Integer

使用混合时所采用的混合方程式。默认值为AddEquation。 混合方程式所有可能的取值请参阅constants。 必须将材质的blending设置为CustomBlending才能生效。

### .blendEquationAlpha : Integer

.blendEquation 的透明度. 默认值为 **null**.

### .blending : Blending

在使用此材质显示对象时要使用何种混合。
必须将其设置为CustomBlending才能使用自定义blendSrc, blendDst 或者 [page:Constant blendEquation]。 混合模式所有可能的取值请参阅constants。默认值为NormalBlending。

### .blendSrc : Integer

混合源。默认值为SrcAlphaFactor。 源因子所有可能的取值请参阅constants。
必须将材质的blending设置为CustomBlending才能生效。

### .blendSrcAlpha : Integer

.blendSrc的透明度。 默认值为 **null**.

### .clipIntersection : Boolean

更改剪裁平面的行为，以便仅剪切其交叉点，而不是它们的并集。默认值为 **false**。

### .clippingPlanes : Array

用户定义的剪裁平面，在世界空间中指定为THREE.Plane对象。这些平面适用于所有使用此材质的对象。空间中与平面的有符号距离为负的点被剪裁（未渲染）。 这需要WebGLRenderer.localClippingEnabled为**true**。 示例请参阅[WebGL / clipping /intersection](http://www.webgl3d.cn/threejs/examples/#webgl_clipping_intersection)。默认值为 **null**。

### .clipShadows : Boolean

定义是否根据此材质上指定的剪裁平面剪切阴影。默认值为 **false**。

### .colorWrite : Boolean

是否渲染材质的颜色。 这可以与网格的renderOrder属性结合使用，以创建遮挡其他对象的不可见对象。默认值为**true**。

### .defines : Object

注入shader的自定义对象。 以键值对形式的对象传递，{ MY_CUSTOM_DEFINE: '' , PI2: Math.PI * 2 }。 这些键值对在顶点和片元着色器中定义。默认值为**undefined**。

### .depthFunc : Integer

使用何种深度函数。默认为LessEqualDepth。 深度模式所有可能的取值请查阅constants。

### .depthTest : Boolean

是否在渲染此材质时启用深度测试。默认为 **true**。

### .depthWrite : Boolean

渲染此材质是否对深度缓冲区有任何影响。默认为**true**。

在绘制2D叠加时，将多个事物分层在一起而不创建z-index时，禁用深度写入会很有用。

这个属性可以用来决定这个材质是否影响 **WebGL** 的深度缓存。如果你将一个物体用作二维贴图（例如一个套子），应该将这个属性设置为 **false**。但是，通常不应该修改这个属性。

### .stencilWrite : Boolean

Whether rendering this material has any effect on the stencil buffer. Default is **false**.

### .stencilWriteMask : Integer

The bit mask to use when writing to the stencil buffer. Default is **0xFF**.

### .stencilFunc : Integer

The stencil comparison function to use. Default is AlwaysStencilFunc. See stencil function constants for all possible values.

### .stencilRef : Integer

The value to use when performing stencil comparisons or stencil operations. Default is **0**.

### .stencilFuncMask : Integer

The bit mask to use when comparing against the stencil buffer. Default is **0xFF**.

### .stencilFail : Integer

Which stencil operation to perform when the comparison function returns false. Default is KeepStencilOp. See the stencil operations constants for all possible values.

### .stencilZFail : Integer

Which stencil operation to perform when the comparison function returns true but the depth test fails. Default is KeepStencilOp. See the stencil operations constants for all possible values.

### .stencilZPass : Integer

Which stencil operation to perform when the comparison function returns true and the depth test passes. Default is KeepStencilOp. See the stencil operations constants for all possible values.

### .flatShading : Boolean

定义材质是否使用平面着色进行渲染。默认值为false。

### .fog : Boolean

材质是否受雾影响。默认为**true**。

### .id : Integer

此材质实例的唯一编号。

### .isMaterial : Boolean

用于检查此类或派生类是否为材质。默认值为 **true**。

因为其通常用在内部优化，所以不应该更改该属性值。

### .name : String

对象的可选名称（不必是唯一的）。默认值为空字符串。

### .needsUpdate : Boolean

指定需要重新编译材质。

### .opacity : Float

在0.0 - 1.0的范围内的浮点数，表明材质的透明度。值**0.0**表示完全透明，**1.0**表示完全不透明。
如果材质的transparent属性未设置为**true**，则材质将保持完全不透明，此值仅影响其颜色。 默认值为**1.0**。

### .polygonOffset : Boolean

是否使用多边形偏移。默认值为**false**。这对应于WebGL的**GL_POLYGON_OFFSET_FILL**功能。

### .polygonOffsetFactor : Integer

设置多边形偏移系数。默认值为**0**。

### .polygonOffsetUnits : Integer

设置多边形偏移单位。默认值为**0**。

### .precision : String

重写此材质渲染器的默认精度。可以是"**highp**", "**mediump**" 或 "**lowp**"。默认值为**null**。

### .premultipliedAlpha : Boolean

是否预乘alpha（透明度）值。有关差异的示例，请参阅[WebGL / Materials / Transparency](http://www.webgl3d.cn/threejs/examples/#webgl_materials_transparency)。 默认值为**false**。

### .dithering : Boolean

是否对颜色应用抖动以消除条带的外观。默认值为 **false**。

### .shadowSide : Integer

定义投影的面。设置时，可以是THREE.FrontSide, THREE.BackSide, 或Materials。默认值为 **null**。
如果为**null**， 则面投射阴影确定如下：

| Material.side    | Side casting shadows |
| :--------------- | :------------------- |
| THREE.FrontSide  | 背面                 |
| THREE.BackSide   | 前面                 |
| THREE.DoubleSide | 双面                 |



### .side : Integer

定义将要渲染哪一面 - 正面，背面或两者。 默认为THREE.FrontSide。其他选项有THREE.BackSide和THREE.DoubleSide。

### .toneMapped : Boolean

Defines whether this material is tone mapped according to the renderer's toneMapping setting. Default is **true**.

### .transparent : Boolean

定义此材质是否透明。这对渲染有影响，因为透明对象需要特殊处理，并在非透明对象之后渲染。
设置为true时，通过设置材质的opacity属性来控制材质透明的程度。
默认值为**false**。

### .type : String

值是字符串'Material'。不应该被更改，并且可以用于在场景中查找此类型的所有对象。

### .uuid : String

此材质实例的[UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier)，会自动分配，不应该被更改。

### .version : Integer

This starts at **0** and counts how many times .needsUpdate : Booleanis set to **true**.

### .vertexColors : Integer

是否使用顶点着色。默认值为THREE.NoColors。 其他选项有THREE.VertexColors 和 THREE.FaceColors。

### .vertexTangents : Boolean

Defines whether precomputed vertex tangents, which must be provided in a vec4 "tangent" attribute, are used. When disabled, tangents are derived automatically. Using precomputed tangents will give more accurate normal map details in some cases, such as with mirrored UVs. Default is false.

### .visible : Boolean

此材质是否可见。默认为**true**。

### .userData : object

一个对象，可用于存储有关Material的自定义数据。它不应该包含对函数的引用，因为这些函数不会被克隆。

## 方法(Methods)

### EventDispatcher 方法在此类中可用。

### .clone ( ) : Material

返回与此材质具有相同参数的新材质。

### .copy ( material : material ) : Material

将被传入材质中的参数复制到此材质中。

### .dispose () : null

处理材质。材质的纹理不会被处理。需要通过Texture处理。

### .onBeforeCompile ( shader : Shader, renderer : WebGLRenderer ) : null

在编译shader程序之前立即执行的可选回调。此函数使用shader源码作为参数。用于修改内置材质。

Unlike properties, the callback is not supported by .clone(), .copy() and .toJSON().

### .setValues ( values : object ) : null

values -- 具有参数的容器。 根据**values**设置属性。

### .toJSON ( meta : object ) : Object

meta -- 包含有元数据的对象，例如该对象的纹理或图片。 将material对象转换为 three.js [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4)（three.js JSON 物体/场景格式）。