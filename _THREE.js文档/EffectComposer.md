[toc]

# 效果合成器（EffectComposer）

用于在three.js中实现后期处理效果。该类管理了产生最终视觉效果的后期处理过程链。 后期处理过程根据它们添加/插入的顺序来执行，最后一个过程会被自动渲染到屏幕上。



## 构造函数

EffectComposer( renderer : WebGLRenderer, renderTarget : [WebGLRenderTarget](http://www.webgl3d.cn/threejs/docs/#api/zh/renderers/WebGLRenderTarget) )

renderer -- 用于渲染场景的渲染器。
renderTarget -- （可选）一个预先配置的渲染目标，内部由 EffectComposer 使用。

## 属性

- .passes : Boolean

​	一个用于表示后期处理过程链（包含顺序）的数组。

- .readBuffer : WebGLRendererTarget

​	内部读缓冲区的引用。过程一般从该缓冲区读取先前的渲染结果。

- .renderer : WebGLRenderer

​	内部渲染器的引用。

- .renderToScreen : Boolean

  最终过程是否被渲染到屏幕（默认帧缓冲区）。

- .writeBuffer : WebGLRendererTarget

  内部写缓冲区的引用。过程常将它们的渲染结果写入该缓冲区。



## 方法

- .addPass ( pass : Pass ) : void

  ​	pass -- 将被添加到过程链的过程

  ​	将传入的过程添加到过程链。

- .insertPass ( pass : Pass, index : Integer ) : void

  ​	pass -- 将被插入到过程链的过程。
   	index -- 定义过程链中过程应插入的位置。

  ​	将传入的过程插入到过程链中所给定的索引处。

- .isLastEnabledPass ( passIndex : Integer ) : boolean

  ​	passIndex -- 被用于检查的过程

  ​	如果给定索引的过程在过程链中是最后一个启用的过程，则返回true。 由EffectComposer所使用，来决定哪一个过程应当被渲染到屏幕上。

- .render ( deltaTime : Float ) : void

  ​	deltaTime -- The delta time value.

  ​	执行所有启用的后期处理过程，来产生最终的帧，

- .reset ( renderTarget : WebGLRenderTarget ) : void

  ​	renderTarget -- （可选）一个预先配置的渲染目标，内部由 EffectComposer 使用。

  ​	重置所有EffectComposer的内部状态。

- .setPixelRatio ( pixelRatio : Float ) : void

  ​	pixelRatio -- 设备像素比

  ​	设置设备的像素比。该值通常被用于HiDPI设备，以阻止模糊的输出。 因此，该方法语义类似于WebGLRenderer.setPixelRatio()。

- .setSize ( width : Integer, height : Integer ) : void

  ​	width -- EffectComposer的宽度。
   	height -- EffectComposer的高度。

  ​	考虑设备像素比，重新设置内部渲染缓冲和过程的大小为(width, height)。 因此，该方法语义类似于WebGLRenderer.setSize()。

- .swapBuffers () : void

  交换内部的读/写缓冲。