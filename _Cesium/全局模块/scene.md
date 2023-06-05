[TOC]

# Scene



# properties

#### *readonly* clampToHeightSupported : Boolean

Returns `true` if the [`Scene#clampToHeight`](https://cesium.com/docs/cesiumjs-ref-doc/Scene.html#clampToHeight) and [`Scene#clampToHeightMostDetailed`](https://cesium.com/docs/cesiumjs-ref-doc/Scene.html#clampToHeightMostDetailed) functions are supported.

##### See:

- [Scene#clampToHeight](https://cesium.com/docs/cesiumjs-ref-doc/Scene.html#clampToHeight)
- [Scene#clampToHeightMostDetailed](https://cesium.com/docs/cesiumjs-ref-doc/Scene.html#clampToHeightMostDetailed)



#### *readonly* groundPrimitives : 

Gets the collection of ground primitives.

#### *readonly* primitives : 

Gets the collection of primitives.

# methods

#### clampToHeight(cartesian, objectsToExclude, width, result) → [Cartesian3](https://cesium.com/docs/cesiumjs-ref-doc/Cartesian3.html)

Clamps the given cartesian position to the scene geometry along the geodetic surface normal. Returns the clamped position or `undefined` if there was no scene geometry to clamp to. May be used to clamp objects to the globe, 3D Tiles, or primitives in the scene.

沿大地表面法线将给定的笛卡尔位置**夹**在场景几何体上。 

如果没有要夹紧的场景几何体，则返回夹紧位置或未定义。

可用于将对象夹紧到地球、3D 平铺或场景中的图元。

This function only clamps to globe tiles and 3D Tiles that are rendered in the current view. Clamps to all other primitives regardless of their visibility.

此功能仅适用于当前视图中呈现的地球图块和 3D 图块。 夹到所有其他基元，而不管它们的可见性。

| Name               | Type                                                         | Default | Description                                                  |
| :----------------- | :----------------------------------------------------------- | :------ | :----------------------------------------------------------- |
| `cartesian`        | [Cartesian3](https://cesium.com/docs/cesiumjs-ref-doc/Cartesian3.html) |         | The cartesian position.                                      |
| `objectsToExclude` | Array.`<Object>`                                             |         | optionalA list of primitives, entities, or 3D Tiles features to not clamp to. |
| `width`            | Number                                                       | `0.1`   | optionalWidth of the intersection volume in meters.          |
| `result`           | [Cartesian3](https://cesium.com/docs/cesiumjs-ref-doc/Cartesian3.html) |         | optionalAn optional object to return the clamped position.   |

##### Returns:

The modified result parameter or a new Cartesian3 instance if one was not provided. This may be `undefined` if there was no scene geometry to clamp to.

##### Throws:

- [DeveloperError](https://cesium.com/docs/cesiumjs-ref-doc/DeveloperError.html) : clampToHeight is only supported in 3D mode.
- [DeveloperError](https://cesium.com/docs/cesiumjs-ref-doc/DeveloperError.html) : clampToHeight requires depth texture support. Check clampToHeightSupported.

##### Example:

```javascript
// Clamp an entity to the underlying scene geometry
var position = entity.position.getValue(Cesium.JulianDate.now());
entity.position = viewer.scene.clampToHeight(position);
```

##### See:

- [Scene#sampleHeight](https://cesium.com/docs/cesiumjs-ref-doc/Scene.html#sampleHeight)
- [Scene#sampleHeightMostDetailed](https://cesium.com/docs/cesiumjs-ref-doc/Scene.html#sampleHeightMostDetailed)
- [Scene#clampToHeightMostDetailed](https://cesium.com/docs/cesiumjs-ref-doc/Scene.html#clampToHeightMostDetailed)





### 拾取相关

#### pick(windowPosition, width, height) → Object

Returns an object with a `primitive` property that contains the first (top) primitive in the scene at a particular window coordinate or undefined if nothing is at the location. Other properties may potentially be set depending on the type of primitive and may be used to further identify the picked object.

返回一个具有`primitive`属性的对象，该对象包含场景中特定窗口坐标处的第一个(顶部)基本体，如果该位置没有任何内容，则返回undefined。可以潜在地根据primitive的类型来设置其他属性，并且可以使用这些属性来进一步标识所拾取的对象。

**When a feature of a 3D Tiles tileset is picked, `pick` returns a [`Cesium3DTileFeature`](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileFeature.html) object.**

| Name             | Type                                                         | Default | Description                               |
| :--------------- | :----------------------------------------------------------- | :------ | :---------------------------------------- |
| `windowPosition` | [Cartesian2](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian2.html) |         | Window coordinates to perform picking on. |
| `width`          | Number                                                       | `3`     | optionalWidth of the pick rectangle.      |
| `height`         | Number                                                       | `3`     | optionalHeight of the pick rectangle.     |

##### Returns:

Object containing the picked primitive.



#### pickPosition(windowPosition, result) → [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html)

Returns the **cartesian position** reconstructed from the depth buffer and window position.

The position reconstructed from the depth buffer in 2D may be slightly different from those reconstructed in 3D and Columbus view. This is caused by the difference in the distribution of depth values of perspective and orthographic projection.

Set [`Scene#pickTranslucentDepth`](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#pickTranslucentDepth) to `true` to include the depth of translucent primitives; otherwise, this essentially picks through translucent primitives.

| Name             | Type                                                         | Description                                        |
| :--------------- | :----------------------------------------------------------- | :------------------------------------------------- |
| `windowPosition` | [Cartesian2](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian2.html) | Window coordinates to perform picking on.          |
| `result`         | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | optionalThe object on which to restore the result. |

##### Returns:

The cartesian position.



#### drillPick(windowPosition, limit, width, height) → `Array.<*>`

Returns a list of objects, each containing a `primitive` property, for all primitives at a particular window coordinate position. Other properties may also be set depending on the type of primitive and may be used to further identify the picked object. The primitives in the list are ordered by their visual order in the scene (front to back).

返回特定窗口坐标位置的所有基元的对象列表，每个对象都包含“primitive”属性。 

也可以根据基元的类型设置其他性质，并且可以用于进一步识别拾取的对象。 

列表中的基元由它们在场景中的可视状态（前面返回）排序。

| Name             | Type                                                         | Default | Description                                                  |
| :--------------- | :----------------------------------------------------------- | :------ | :----------------------------------------------------------- |
| `windowPosition` | [Cartesian2](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian2.html) |         | Window coordinates to perform picking on.                    |
| `limit`          | Number                                                       |         | optionalIf supplied, stop drilling after collecting this many picks. |
| `width`          | Number                                                       | `3`     | optionalWidth of the pick rectangle.                         |
| `height`         | Number                                                       | `3`     | optionalHeight of the pick rectangle.                        |

##### Returns:

Array of objects, each containing 1 picked primitives.

##### Throws:

- [DeveloperError](https://cesium.com/learn/cesiumjs/ref-doc/DeveloperError.html) : windowPosition is undefined.

