[TOC]



Material →

# 着色器材质(ShaderMaterial)

使用自定义shader渲染的材质。 shader是一个用[GLSL](https://www.khronos.org/files/opengles_shading_language.pdf)编写的小程序 ，在GPU上运行。 您可能需要使用自定义shader，如果你要：

- 要实现内置 materials 之外的效果。
- 将许多对象组合成单个Geometry或BufferGeometry以提高性能。

使用**ShaderMaterial**时需要注意以下注意事项：

- **ShaderMaterial** 只有使用 WebGLRenderer 才可以绘制正常， 因为 [vertexShader](https://en.wikipedia.org/wiki/Shader#Vertex_shaders) 和 [fragmentShader](https://en.wikipedia.org/wiki/Shader#Pixel_shaders) 属性中GLSL代码必须使用WebGL来编译并运行在GPU中。

- 从 THREE r72开始，不再支持在ShaderMaterial中直接分配属性。 必须使用 BufferGeometry实例 (而不是 Geometry 实例)，使用BufferAttribute实例来定义自定义属性。

- 从 THREE r77开始，WebGLRenderTarget 或 WebGLRenderTargetCube 实例不再被用作uniforms。 必须使用它们的texture 属性。

- 内置attributes和uniforms与代码一起传递到shaders。 如果您不希望WebGLProgram向shader代码添加任何内容，则可以使用RawShaderMaterial而不是此类。

- 您可以使用指令#pragma unroll_loop，以便通过shader预处理器在GLSL中展开for循环。 该指令必须放在循环的正上方。循环格式必须与定义的标准相对应。

  - 循环必须标准化[normalized](https://en.wikipedia.org/wiki/Normalized_loop)。
  - 循环变量必须是**i**。
  - 循环必须使用某种空格格式。

  ```
  #pragma unroll_loop
  for ( int i = 0; i < 10; i ++ ) {
  
  	// ...
  
  }
  ```



## 例子(Examples)

[webgl / animation / cloth](http://www.webgl3d.cn/threejs/examples/#webgl_animation_cloth)
[webgl / buffergeometry / custom / attributes / particles](http://www.webgl3d.cn/threejs/examples/#webgl_buffergeometry_custom_attributes_particles)
[webgl / buffergeometry / selective / draw](http://www.webgl3d.cn/threejs/examples/#webgl_buffergeometry_selective_draw)
[webgl / custom / attributes](http://www.webgl3d.cn/threejs/examples/#webgl_custom_attributes)
[webgl / custom / attributes / lines](http://www.webgl3d.cn/threejs/examples/#webgl_custom_attributes_lines)
[webgl / custom / attributes / points](http://www.webgl3d.cn/threejs/examples/#webgl_custom_attributes_points)
[webgl / custom / attributes / points2](http://www.webgl3d.cn/threejs/examples/#webgl_custom_attributes_points2)
[webgl / custom / attributes / points3](http://www.webgl3d.cn/threejs/examples/#webgl_custom_attributes_points3)
[webgl / depth / texture](http://www.webgl3d.cn/threejs/examples/#webgl_depth_texture)
[webgl / gpgpu / birds](http://www.webgl3d.cn/threejs/examples/#webgl_gpgpu_birds)
[webgl / gpgpu / protoplanet](http://www.webgl3d.cn/threejs/examples/#webgl_gpgpu_protoplanet)
[webgl / gpgpu / water](http://www.webgl3d.cn/threejs/examples/#webgl_gpgpu_water)
[webgl / hdr](http://www.webgl3d.cn/threejs/examples/#webgl_hdr)
[webgl / interactive / points](http://www.webgl3d.cn/threejs/examples/#webgl_interactive_points)
[webgl / kinect](http://www.webgl3d.cn/threejs/examples/#webgl_kinect)
[webgl / lights / hemisphere](http://www.webgl3d.cn/threejs/examples/#webgl_lights_hemisphere)
[webgl / marchingcubes](http://www.webgl3d.cn/threejs/examples/#webgl_marchingcubes)
[webgl / materials / bumpmap / skin](http://www.webgl3d.cn/threejs/examples/#webgl_materials_bumpmap_skin)
[webgl / materials / envmaps](http://www.webgl3d.cn/threejs/examples/#webgl_materials_envmaps)
[webgl / materials / lightmap](http://www.webgl3d.cn/threejs/examples/#webgl_materials_lightmap)
[webgl / materials / parallaxmap](http://www.webgl3d.cn/threejs/examples/#webgl_materials_parallaxmap)
[webgl / materials / shaders / fresnel](http://www.webgl3d.cn/threejs/examples/#webgl_materials_shaders_fresnel)
[webgl / materials / skin](http://www.webgl3d.cn/threejs/examples/#webgl_materials_skin)
[webgl / materials / texture / hdr](http://www.webgl3d.cn/threejs/examples/#webgl_materials_texture_hdr)
[webgl / materials / wireframe](http://www.webgl3d.cn/threejs/examples/#webgl_materials_wireframe)
[webgl / modifier / tessellation](http://www.webgl3d.cn/threejs/examples/#webgl_modifier_tessellation)
[webgl / nearestneighbour](http://www.webgl3d.cn/threejs/examples/#webgl_nearestneighbour)
[webgl / postprocessing / dof2](http://www.webgl3d.cn/threejs/examples/#webgl_postprocessing_dof2)
[webgl / postprocessing / godrays](http://www.webgl3d.cn/threejs/examples/#webgl_postprocessing_godrays)



[渐变色材质](https://qa.1r1g.com/sf/ask/3683006001/?tdsourcetag=s_pctim_aiomsg)

```
var material = new THREE.ShaderMaterial( { 	uniforms: { 		time: { value: 1.0 }, 	resolution: { value: new THREE.Vector2() } 	}, 	vertexShader: document.getElementById( 'vertexShader' ).textContent, 	fragmentShader: document.getElementById( 'fragmentShader' ).textContent } );
```

## 顶点着色器和片元着色器(Vertex shaders and fragment shaders)

您可以为每种材质指定两种不同类型的shaders：:

- 顶点着色器首先运行; 它接收**attributes**， 计算/操纵每个单独顶点的位置，并将其他数据（**varying**s）传递给片元着色器。
- 片元（或像素）着色器后运行; 它设置渲染到屏幕的每个单独的“片元”（像素）的颜色。

shader中有三种类型的变量: uniforms, attributes, 和 varyings:

- **Uniforms**是所有顶点都具有相同的值的变量。 比如灯光，雾，和阴影贴图就是被储存在uniforms中的数据。 uniforms可以通过顶点着色器和片元着色器来访问。
- **Attributes** 与每个顶点关联的变量。例如，顶点位置，法线和顶点颜色都是存储在attributes中的数据。attributes *只* 可以在顶点着色器中访问。
- **Varyings** 是从顶点着色器传递到片元着色器的变量。对于每一个片元，每一个varying的值将是相邻顶点值的平滑插值。

注意：在shader *内部*，uniforms和attributes就像常量；你只能使用JavaScript代码通过缓冲区来修改它们的值。

## 内置attributes 和 uniforms(Built-in attributes and uniforms)

WebGLRenderer默认情况下为shader提供了许多attributes和uniforms； 这些变量定义在shader程序编译时被自动添加到*片元着色器*和*顶点着色器*代码的前面，你不需要自己声明它们。 这些变量的描述请参见WebGLProgram。

这些uniforms或attributes（例如，那些和照明，雾等相关的）要求属性设置在材质上， 以便 WebGLRenderer来拷贝合适的值到GPU中。 如果你想在自己的shader中使用这些功能，请确保设置这些标志。

如果你不希望WebGLProgram 向你的shader代码中添加任何东西， 你可以使用RawShaderMaterial 而不是这个类。

## 自定义 attributes 和 uniforms(Custom attributes and uniforms)

自定义attributes和uniforms必须在GLSL着色器代码中声明（在 **vertexShader** 和/或 **fragmentShader** 中)。 自定义uniforms必须定义为 **ShaderMaterial** 的 **uniforms** 属性， 而任何自定义attribtes必须通过BufferAttribute实例来定义。 注意 **varying**s 只需要在shader代码中声明（而不必在材质中）。

要声明一个自定义属性，更多细节请参考BufferGeometry页面， 以及 BufferAttribute 页面关于**BufferAttribute** 接口。

当创建attributes时，您创建的用来保存属性数据的每个类型化数组（typed array）必须是您的数据类型大小的倍数。 比如，如果你的属性是一个THREE.Vector3类型，并且在你的缓存几何模型BufferGeometry中有3000个顶点， 那么你的类型化数组的长度必须是3000 * 3，或者9000（一个顶点一个值）。每个数据类型的尺寸如下表所示：

| GLSL 类型 | JavaScript 类型 | 尺寸 |
| :-------- | :-------------- | :--- |
| float     | Number          | 1    |
| vec2      | THREE.Vector2   | 2    |
| vec3      | THREE.Vector3   | 3    |
| vec3      | THREE.Color     | 3    |
| vec4      | THREE.Vector4   | 4    |

请注意，属性缓冲区 *不会* 在其值更改时自动刷新。要更新自定义属性， 需要在模型的BufferAttribute中设置**needsUpdate**为true。 （查看BufferGeometry了解细节）。

要声明一个自定义的Uniform，使用**uniforms**属性：`uniforms: { 	time: { value: 1.0 }, 	resolution: { value: new THREE.Vector2() } }`

在Object3D.onBeforeRender中，建议根据object和camera来更新自定义Uniform的值。 因为 Material 可以被meshes，Scene的matrixWorld以及Camera共享， 会在WebGLRenderer.render中更新，并会对拥有私有cameras的scene的渲染造成影响。

## 构造函数(Constructor)

### ShaderMaterial( parameters : Object )

parameters - (可选)用于定义材质外观的对象，具有一个或多个属性。 材质的任何属性都可以从此处传入(包括从Material继承的任何属性)。

## 属性(Properties)

共有属性请参见其基类Material。

### .clipping : Boolean

定义此材质是否支持剪裁; 如果渲染器传递clippingPlanes uniform，则为true。默认值为false。

### .defaultAttributeValues : Object

当渲染的几何体不包含这些属性但材质包含这些属性时，这些默认值将传递给shaders。这可以避免在缓冲区数据丢失时出错。`this.defaultAttributeValues = { 'color': [ 1, 1, 1 ], 'uv': [ 0, 0 ], 'uv2': [ 0, 0 ] };`

### .defines : Object

使用 #define 指令在GLSL代码为顶点着色器和片段着色器定义自定义常量；每个键/值对产生一行定义语句：`defines: { FOO: 15, BAR: true }`这将在GLSL代码中产生如下定义语句：`#define FOO 15 #define BAR true`

### .extensions : Object

一个有如下属性的对象：`this.extensions = { derivatives: false, // set to use derivatives fragDepth: false, // set to use fragment depth values drawBuffers: false, // set to use draw buffers shaderTextureLOD: false // set to use shader texture LOD };`

### .fog : Boolean

定义材质颜色是否受全局雾设置的影响; 如果将fog uniforms传递给shader，则为true。默认值为false。

### .fragmentShader : String

片元着色器的GLSL代码。这是shader程序的实际代码。在上面的例子中， **vertexShader** 和 **fragmentShader** 代码是从DOM（HTML文档）中获取的； 它也可以作为一个字符串直接传递或者通过AJAX加载。

### .index0AttributeName : String

如果设置，则调用[gl.bindAttribLocation](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindAttribLocation) 将通用顶点索引绑定到属性变量。默认值未定义。

### .isShaderMaterial : Boolean

用于检查此类或派生类是否为着色器材质。默认值为 **true**。

因为其通常用在内部优化，所以不应该更改该属性值。

### .lights : Boolean

材质是否受到光照的影响。默认值为 **false**。如果传递与光照相关的uniform数据到这个材质，则为true。默认是false。

### .linewidth : Float

控制线框宽度。默认值为1。

由于[OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)与大多数平台上WebGL渲染器的限制，无论如何设置该值，线宽始终为1。

### .morphTargets : Boolean

When set to true, morph target attributes are available in the vertex shader. Default is **false**.

### .morphNormals : boolean

When set to true, morph normal attributes are available in the vertex shader. Default is **false**.

### .program : WebGLProgram

与此材质相关联的编译后的shader程序，由WebGLRenderer生成。您应该不需要访问此属性。

### .flatShading : Boolean

定义材质是否使用平面着色进行渲染。默认值为false。

### .skinning : Boolean

定义材质是否使用蒙皮; 如果将蒙皮属性传递给shader，则为true。默认值为false。

### .uniforms : Object

如下形式的对象：`{ "uniform1": { value: 1.0 }, "uniform2": { value: 2 } }`指定要传递给shader代码的uniforms；键为uniform的名称，值(value)是如下形式：`{ value: 1.0 }`这里 **value** 是uniform的值。名称必须匹配 uniform 的name，和GLSL代码中的定义一样。 注意，uniforms逐帧被刷新，所以更新uniform值将立即更新GLSL代码中的相应值。

### .vertexColors : Number

通过定义**colors**属性的生成方式来定义顶点是如何着色的。 可选值为THREE.NoColors, THREE.FaceColors 和 THREE.VertexColors。 缺省为 THREE.NoColors。

### .vertexShader : String

顶点着色器的GLSL代码。这是shader程序的实际代码。 在上面的例子中，**vertexShader** 和 **fragmentShader** 代码是从DOM（HTML文档）中获取的； 它也可以作为一个字符串直接传递或者通过AJAX加载。

### .wireframe : Boolean

将几何体渲染为线框(通过GL_LINES而不是GL_TRIANGLES)。默认值为**false**（即渲染为平面多边形）。

### .wireframeLinewidth : Float

控制线框宽度。默认值为1。

由于[OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)与大多数平台上WebGL渲染器的限制，无论如何设置该值，线宽始终为1。

## 方法(Methods)

共有方法请参见其基类Material。

### .clone () : ShaderMaterial this : ShaderMaterial

创建该材质的一个浅拷贝。需要注意的是，vertexShader和fragmentShader使用*引用拷贝*； **attributes**的定义也是如此; 这意味着，克隆的材质将共享相同的编译WebGLProgram； 但是，**uniforms** 是 *值拷贝*，这样对不同的材质我们可以有不同的uniforms变量。

## 源码(Source)

[src/materials/ShaderMaterial.js](https://github.com/mrdoob/three.js/blob/master/src/materials/ShaderMaterial.js)

![img](http://www.webgl3d.cn/threejs/files/ic_mode_edit_black_24dp.svg)