[TOC]

# ScreenSpaceCameraController

Modifies the camera position and orientation based on mouse input to a canvas.

## 属性

#### enableCollisionDetection : Boolean 

Enables or disables camera collision detection with terrain.

默认为true, 即为开启碰撞检测.

#### enableInputs : Boolean

If true, inputs are allowed conditionally with the flags enableTranslate, enableZoom, enableRotate, enableTilt, and enableLook. If false, all inputs are disabled. 

NOTE: This setting is for temporary use cases, such as camera flights and drag-selection of regions (see Picking demo). It is typically **set to false** **at the start** of such events, and **set true on completion**. To keep inputs disabled past the end of camera flights, you must use the other booleans (enableTranslate, enableZoom, enableRotate, enableTilt, and enableLook).

如果为true，则有条件地允许输入flag EnableTranslate，enabentzoom，EnableRotate，EnableTilt和EnableLook。如果为false，则禁用所有输入

注意：此设置用于临时用例，例如camera flights and drag-selection of regions (see Picking demo）。 在此类事件的开始时通常将其设置为FALSE，并在完成时设置为TRUE。 要使输入禁用过去的相机航班结束，您必须使用其他布尔（EnableTransLate，Endablezoom，Enablerotate，EnableTilt和EnableLook） 一共5个子项。



#### enableTranslate : Boolean

If true, allows the user to pan around the map. If false, the camera stays locked at the current position. 

This flag only applies in 2D and Columbus view modes.

Default Value: `true`

二维模式下是否允许鼠标坐标拖拽平移.

#### enableZoom : Boolean

If true, allows the user to zoom in and out. If false, the camera is locked to the current distance from the ellipsoid.

Default Value: `true`

是否允许缩放

#### enableRotate : Boolean

If true, allows the user to **rotate** the world which translates the user's position. This flag only applies in 2D and 3D.

Default Value: `true`

#### enableTilt : Boolean

If true, allows the user to **tilt** the camera. If false, the camera is locked to the current heading. This flag only applies in 3D and Columbus view.

Default Value: `true`

是否允许右键拖动跳转相机的heading, 仅在3D模式下可以用.



#### enableLook : Boolean

If true, allows the user to use free-look. If false, the camera view direction can only be changed through translating or rotating. This flag only applies in 3D and Columbus view modes.

Default Value: `true`



设置为false, 球体默认情况下会保持在场景中间.

## 方法





## 拓展

SceneMode



### 示例:

相机教程: [Camera Tutorial - Cesium Sandcastle](https://sandcastle.cesium.com/?src=Camera Tutorial.html)