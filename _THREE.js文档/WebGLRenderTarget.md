[TOC]

# WebGLRenderTarget

[render target](https://webglfundamentals.org/webgl/lessons/webgl-render-to-texture.html)是一个缓冲，就是在这个缓冲中，视频卡为正在后台渲染的场景绘制像素。 它用于不同的效果，例如用于在一个图像显示在屏幕上之前先做一些处理。

## 构造器

### WebGLRenderTarget(width : Number, height : Number, options : Object)

- width -renderTarget的宽度
- height - renderTarget的高度
- options - (可选)一个保存着自动生成的目标纹理的纹理参数以及表示是否使用深度缓存/模板缓存的布尔值的对象 以下是一些合法选项：

  - wrapS - 默认是ClampToEdgeWrapping.
  - wrapT - 默认是ClampToEdgeWrapping.
  - magFilter - 默认是LinearFilter.
  - minFilter - 默认是LinearFilter.
  - format - 默认是RGBAFormat.
  - type - 默认是UnsignedByteType.
  - anisotropy - 默认是**1**. 参见Texture.anistropy
  - encoding - 默认是LinearEncoding.
  - depthBuffer - 默认是**true**. 如果不需要就设为false
  - stencilBuffer - 默认是**true**. 如果不需要就设为false

创建一个新WebGLRenderTarget

## 属性

### .width : number

渲染目标宽度

### .height : number

渲染目标高度

### .scissor : Vector4

渲染目标视口内的一个矩形区域，区域之外的片元将会被丢弃

### .scissorTest : boolean

表明是否激活了剪裁测试

### .viewport : Vector4

渲染目标的视口

### .texture : Texture

纹理实例保存这渲染的像素，用作进一步处理的输入值

### .depthBuffer : boolean

渲染到深度缓冲区。默认true.

### .stencilBuffer : boolean

渲染到模板缓冲区。默认true.

### .depthTexture : DepthTexture

如果设置，那么场景的深度将会被渲染到慈纹理上。默认是null.

## 方法

### .setSize ( width : Number, height : Number ) : null

设置渲染目标的大小

### .clone () : WebGLRenderTarget

创建一个渲染目标副本

### .copy ( source : WebGLRenderTarget ) : WebGLRenderTarget

采用传入的渲染目标的设置

### .dispose () : null

发出一个处理事件

### EventDispatcher方法可从此类中获得