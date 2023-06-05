[toc]

# 轨道控制器（OrbitControls）

Orbit controls（轨道控制器）可以使得相机围绕目标进行轨道运动。

## Constructor

### OrbitControls( object : Camera, domElement : HTMLDOMElement )

object: （必须）将要被控制的相机。该相机不允许是其他任何对象的子级，除非该对象是场景自身。

domElement: The HTML element used for event listeners.

## Properties

### .autoRotate : Boolean

将其设为true，以自动围绕目标旋转。
请注意，如果它被启用，你必须在你的动画循环里调用.update()。

### .autoRotateSpeed : Float

当 .autoRotate : Boolean为true时，围绕目标旋转的速度将有多快，默认值为2.0，相当于在60fps时每旋转一次需要30秒。
请注意，如果 .autoRotate : Boolean被启用，你必须在你的动画循环里调用.update()。

### .dampingFactor : Float

当 .enableDamping : Boolean设置为true的时候，阻尼惯性有多大。
请注意，要使得这一值生效，你必须在你的动画循环里调用.update()。

### .domElement : HTMLDOMElement

用于监听鼠标事件或触摸事件的HTMLDOMElement（DOM元素）。该值必须在构造函数中进行传入； 在此更改它将不会设置新的事件监听器

### .enabled : Boolean

控制器是否被启用。

### .enableDamping : Boolean

将其设置为true以启用阻尼（惯性），这将给控制器带来重量感。默认值为false。
请注意，如果该值被启用，你将必须在你的动画循环里调用.update()。

### .enableKeys : Boolean

启用或禁用键盘控制。

### .enablePan : Boolean

启用或禁用摄像机平移，默认为true。

### .enableRotate : Boolean

启用或禁用摄像机水平或垂直旋转。默认值为true。
请注意，可以通过将polar angle或者azimuth angle 的min和max设置为相同的值来禁用单个轴， 这将使得水平旋转或垂直旋转固定为所设置的值。

### .enableZoom : Boolean

启用或禁用摄像机的缩放。

### .keyPanSpeed : Float

当使用键盘按键的时候，相机平移的速度有多快。默认值为每次按下按键时平移7像素。

### .keys : Object

这一对象包含了用于控制相机平移的按键代码的引用。默认值为4个箭头（方向）键。
```JS
controls.keys = { 
    LEFT: 37, //left arrow 
    UP: 38, // up arrow 
    RIGHT: 39, // right arrow 
    BOTTOM: 40 // down arrow 
}
```
请参阅[this page](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)来查看所有按键的代码列表。

### .maxAzimuthAngle : Float

你能够水平旋转的角度的上限，范围是-Math.PI到Math.PI（或Infinity无限制）， 其默认值为Infinity。

### .maxDistance : Float

你能够将相机向外移动多少（仅适用于PerspectiveCamera），其默认值为Infinity。

### .maxPolarAngle : Float

你能够垂直旋转的角度的上限，范围是0到Math.PI，其默认值为Math.PI。

### .maxZoom : Float

你能够将相机缩小多少( 仅适用于OrthographicCamera only )，其默认值为Infinity。

### .minAzimuthAngle : Float

你能够水平旋转的角度的下限，范围是-Math.PI到Math.PI（或-Infinity无限制）， 其默认值为-Infinity。

### .minDistance : Float

你能够将相机向内移动多少（仅适用于PerspectiveCamera），其默认值为0。

### .minPolarAngle : Float

你能够垂直旋转的角度的下限，范围是0到Math.PI，其默认值为0。

### .minZoom : Float

你能够将相机放大多少( 仅适用于OrthographicCamera )，其默认值为0。

### .mouseButtons : Object

这一对象包含了对用于控制的鼠标按钮的引用。`controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }`

### .object : Camera

正被控制的摄像机。

### .panSpeed : Float

位移的速度，其默认值为1。

### .position0 : Vector3

由 .saveState : saveState和 .reset : reset方法在内部使用。

### .rotateSpeed : Float

旋转的速度，其默认值为1.

### .screenSpacePanning : Boolean

定义当平移的时候摄像机的位置将如何移动。如果为true，摄像机将在屏幕空间内平移。 否则，摄像机将在与摄像机向上方向垂直的平面中平移。其默认值为false。

### .target0 : Vector3

由 .saveState : saveState和 .reset : reset方法在内部使用。

### .target : Vector3 __ ** 焦点

控制器的焦点，.object的轨道围绕它运行。 它可以在任何时候被手动更新，以更改控制器的焦点。

### .touches : Object

This object contains references to the touch actions used by the controls.`controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }`

### .zoom0 : Float

由 .saveState : saveState和 .reset : reset方法在内部使用。

### .zoomSpeed : Float

摄像机缩放的速度，其默认值为1。 Speed of zooming / dollying. Default is 1.



## Methods

### .dispose () : null

移除所有的事件监听。

### .getAzimuthalAngle () : radians

获得当前的水平旋转，单位为弧度。

### .getPolarAngle () : radians

获得当前的垂直旋转，单位为弧度。

### .reset () : null

将控制器重置为上次调用.saveState时的状态，或者初始状态。

### .saveState () : null

保存当前控制器的状态。这一状态可在之后由.reset所恢复。

### .update () : Boolean

**更新控制器**。**必须在摄像机的变换发生任何手动改变后调用**， 或如果.autoRotate或.enableDamping被设置时，在update循环里调用。