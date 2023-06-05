[toc]

# SceneTransforms

Functions that do scene-dependent transforms between rendering-related coordinate systems.



### Methods

#### static Cesium.SceneTransforms.wgs84ToDrawingBufferCoordinates(scene, position, result) → [Cartesian2](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian2.html)[Scene/SceneTransforms.js 286](https://github.com/CesiumGS/cesium/blob/1.91/Source/Scene/SceneTransforms.js#L286)

Transforms a position in WGS84 coordinates to drawing buffer coordinates. This may produce different results from SceneTransforms.wgs84ToWindowCoordinates when the browser zoom is not 100%, or on high-DPI displays.

将WGS84坐标中的位置转换为绘制缓冲区坐标。 当浏览器缩放不是100％时或高DPI显示时，这可能会产生不同的结果。

| Name       | Type                                                         | Description                                                  |
| :--------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `scene`    | [Scene](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html) | The scene.                                                   |
| `position` | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The position in WGS84 (world) coordinates.                   |
| `result`   | [Cartesian2](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian2.html) | optionalAn optional object to return the input position transformed to window coordinates. |

##### Returns:

The modified result parameter or a new Cartesian2 instance if one was not provided. This may be `undefined` if the input position is near the center of the ellipsoid.



#### static Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position, result) → [Cartesian2](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian2.html)[Scene/SceneTransforms.js 48](https://github.com/CesiumGS/cesium/blob/1.91/Source/Scene/SceneTransforms.js#L48)

Transforms a position in WGS84 coordinates to window coordinates. This is commonly used to place an HTML element at the same screen position as an object in the scene.

将WGS84坐标的位置转换为窗口坐标。 这通常用于将HTML元素放置在与场景中的对象相同的屏幕位置。

| Name       | Type                                                         | Description                                                  |
| :--------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `scene`    | [Scene](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html) | The scene.                                                   |
| `position` | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The position in WGS84 (world) coordinates.                   |
| `result`   | [Cartesian2](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian2.html) | optionalAn optional object to return the input position transformed to window coordinates. |

##### Returns:

The modified result parameter or a new Cartesian2 instance if one was not provided. This may be `undefined` if the input position is near the center of the ellipsoid.

