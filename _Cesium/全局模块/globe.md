[TOC]

# new Cesium.Globe(ellipsoid) 

The globe rendered in the scene, including its terrain ([`Globe#terrainProvider`](https://cesium.com/learn/cesiumjs/ref-doc/Globe.html#terrainProvider)) and imagery layers ([`Globe#imageryLayers`](https://cesium.com/learn/cesiumjs/ref-doc/Globe.html#imageryLayers)). Access the globe using [`Scene#globe`](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#globe).

| Name        | Type                                                         | Default           | Description                                         |
| :---------- | :----------------------------------------------------------- | :---------------- | :-------------------------------------------------- |
| `ellipsoid` | [Ellipsoid](https://cesium.com/learn/cesiumjs/ref-doc/Ellipsoid.html) | `Ellipsoid.WGS84` | optionalDetermines the size and shape of the globe. |



# methods

#### getHeight(cartographic) → Number|undefined [Scene/Globe.js 755](https://github.com/CesiumGS/cesium/blob/1.82/Source/Scene/Globe.js#L755)

Get the height of the surface at a given cartographic.

| Name           | Type                                                         | Description                                    |
| :------------- | :----------------------------------------------------------- | :--------------------------------------------- |
| `cartographic` | [Cartographic](https://cesium.com/learn/cesiumjs/ref-doc/Cartographic.html) | The cartographic for which to find the height. |

##### Returns:

The height of the cartographic or undefined if it could not be found.



#### pick(ray, scene, result) → [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html)|undefined [Scene/Globe.js 727](https://github.com/CesiumGS/cesium/blob/1.82/Source/Scene/Globe.js#L727)

Find an intersection between a ray and the globe surface that was rendered. 

The ray must be given in world coordinates.

| Name     | Type                                                         | Description                                        |
| :------- | :----------------------------------------------------------- | :------------------------------------------------- |
| `ray`    | [Ray](https://cesium.com/learn/cesiumjs/ref-doc/Ray.html)    | The ray to test for intersection.                  |
| `scene`  | [Scene](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html) | The scene.                                         |
| `result` | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | optionalThe object onto which to store the result. |

##### Returns:

The intersection or `undefined` if none was found.

##### Example:

```javascript
// find intersection of ray through a pixel and the globe
var ray = viewer.camera.getPickRay(windowCoordinates);
var intersection = globe.pick(ray, scene);
```