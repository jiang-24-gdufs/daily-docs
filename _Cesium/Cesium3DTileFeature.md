[TOC]

# Cesium3DTileFeature

#### new Cesium.Cesium3DTileFeature()[Scene/Cesium3DTileFeature.js 39](https://github.com/CesiumGS/cesium/blob/1.82/Source/Scene/Cesium3DTileFeature.js#L39)

A feature of a [`Cesium3DTileset`](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html). Cesium3DTileset的一种特征。

Provides access to a feature's properties stored in the tile's batch table, as well as the ability to show/hide a feature and change its highlight color via [`Cesium3DTileFeature#show`](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileFeature.html#show) and [`Cesium3DTileFeature#color`](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileFeature.html#color), respectively.

提供对存储在平铺批次表中的要素特性的访问，以及分别通过Cesium3DTileFeature#show和Cesium3DTileFeature#color显示/隐藏要素和更改其高亮显示颜色的功能。

Modifications to a `Cesium3DTileFeature` object have the lifetime of the tile's **content**. If the tile's content is unloaded, e.g., due to it going out of view and needing to free space in the cache for visible tiles, listen to the [`Cesium3DTileset#tileUnload`](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html#tileUnload) event to save any modifications. Also listen to the [`Cesium3DTileset#tileVisible`](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html#tileVisible) event to reapply any modifications.

对Cesium3DTileFeature对象的修改具有磁贴内容的生存期。如果分幅的内容被卸载(例如，由于其超出视图并需要释放缓存中的空间以供可见分幅使用)，请侦听Cesium3DTileset#tileUnload事件以保存任何修改。还要监听Cesium3DTileset#tileVisible事件以重新应用任何修改。

Do not construct this directly. Access it through [`Cesium3DTileContent#getFeature`](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileContent.html#getFeature) or picking using [`Scene#pick`](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#pick) and [`Scene#pickPosition`](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#pickPosition).


不要直接构建它。通过**Cesium3DTileContent#getFeature**访问，或使用**Scene#Pick**和Scene#PickPosition进行拾取。



##### Example:

```javascript
// On mouse over, display all the properties for a feature in the console log.
handler.setInputAction(function(movement) {
    var feature = scene.pick(movement.endPosition); // 拾取
    if (feature instanceof Cesium.Cesium3DTileFeature) {
        var propertyNames = feature.getPropertyNames(); // 重要方法
        var length = propertyNames.length;
        for (var i = 0; i < length; ++i) {
            var propertyName = propertyNames[i];
            console.log(propertyName + ': ' + feature.getProperty(propertyName));
        }
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
```



### Members

#### color : [Color](https://cesium.com/learn/cesiumjs/ref-doc/Color.html)[Scene/Cesium3DTileFeature.js 76](https://github.com/CesiumGS/cesium/blob/1.88/Source/Scene/Cesium3DTileFeature.js#L76)

Gets or sets the highlight color multiplied with the feature's color. When this is white, the feature's color is not changed. This is set for all features when a style's color is evaluated.



#### polylinePositions : Float64Array[Scene/Cesium3DTileFeature.js 99](https://github.com/CesiumGS/cesium/blob/1.88/Source/Scene/Cesium3DTileFeature.js#L99)

Gets a typed array containing the ECEF positions of the polyline. Returns undefined if [`Cesium3DTileset#vectorKeepDecodedPositions`](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html#vectorKeepDecodedPositions) is false or the feature is not a polyline in a vector tile.

> ##### Experimental
>
> This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.

#### readonly primitive : [Cesium3DTileset](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html)[Scene/Cesium3DTileFeature.js 150](https://github.com/CesiumGS/cesium/blob/1.88/Source/Scene/Cesium3DTileFeature.js#L150)

All objects returned by [`Scene#pick`](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#pick) have a `primitive` property. This returns the tileset containing the feature.



#### show : Boolean[Scene/Cesium3DTileFeature.js 56](https://github.com/CesiumGS/cesium/blob/1.88/Source/Scene/Cesium3DTileFeature.js#L56)

Gets or sets if the feature will be shown. This is set for all features when a style's show is evaluated.



#### readonly tileset : [Cesium3DTileset](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html)[Scene/Cesium3DTileFeature.js 134](https://github.com/CesiumGS/cesium/blob/1.88/Source/Scene/Cesium3DTileFeature.js#L134)

Gets the tileset containing the feature.



### Methods

#### static Cesium.Cesium3DTileFeature.getPropertyInherited(content, batchId, name) → [Scene/Cesium3DTileFeature.js 245](https://github.com/CesiumGS/cesium/blob/1.88/Source/Scene/Cesium3DTileFeature.js#L245)

Returns a copy of the feature's property with the given name, examining all the metadata from 3D Tiles 1.0 formats, the EXT_mesh_features and legacy EXT_feature_metadata glTF extensions, and the 3DTILES_metadata 3D Tiles extension. Metadata is checked against name from most specific to most general and the first match is returned. Metadata is checked in this order:

1. Batch table (feature metadata) property by semantic
2. Batch table (feature metadata) property by property ID
3. Tile metadata property by semantic
4. Tile metadata property by property ID
5. Group metadata property by semantic
6. Group metadata property by property ID
7. Tileset metadata property by semantic
8. Tileset metadata property by property ID
9. Otherwise, return undefined

For 3D Tiles Next details, see the [3DTILES_metadata Extension](https://github.com/CesiumGS/3d-tiles/tree/3d-tiles-next/extensions/3DTILES_metadata) for 3D Tiles, as well as the [EXT_mesh_features Extension](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features) for glTF. For the legacy glTF extension, see [EXT_feature_metadata Extension](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_feature_metadata)

| Name      | Type                                                         | Description                                                  |
| :-------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `content` | [Cesium3DTileContent](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileContent.html) | The content for accessing the metadata                       |
| `batchId` | Number                                                       | The batch ID (or feature ID) of the feature to get a property for |
| `name`    | String                                                       | The semantic or property ID of the feature. Semantics are checked before property IDs in each granularity of metadata. |

##### Returns:

The value of the property or `undefined` if the feature does not have this property.

> ##### Experimental
>
> This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.



#### **getProperty(name)** → [Scene/Cesium3DTileFeature.js 210](https://github.com/CesiumGS/cesium/blob/1.88/Source/Scene/Cesium3DTileFeature.js#L210)

Returns a copy of the value of the feature's property with the given name. This includes properties from this feature's class and inherited classes when using a batch table hierarchy.

| Name   | Type   | Description                              |
| :----- | :----- | :--------------------------------------- |
| `name` | String | The case-sensitive name of the property. |

##### Returns:

The value of the property or `undefined` if the feature does not have this property.



#### **getPropertyNames(results)** → Array.`<String>`[Scene/Cesium3DTileFeature.js 188](https://github.com/CesiumGS/cesium/blob/1.88/Source/Scene/Cesium3DTileFeature.js#L188)

Returns an array of property names for the feature. This includes properties from this feature's class and inherited classes when using a batch table hierarchy.

| Name      | Type             | Description                                       |
| :-------- | :--------------- | :------------------------------------------------ |
| `results` | Array.`<String>` | optionalAn array into which to store the results. |

##### Returns:

The names of the feature's properties.



#### hasProperty(name) → Boolean[Scene/Cesium3DTileFeature.js 175](https://github.com/CesiumGS/cesium/blob/1.88/Source/Scene/Cesium3DTileFeature.js#L175)

Returns whether the feature contains this property. This includes properties from this feature's class and inherited classes when using a batch table hierarchy.

| Name   | Type   | Description                              |
| :----- | :----- | :--------------------------------------- |
| `name` | String | The case-sensitive name of the property. |

##### Returns:

Whether the feature contains this property.



#### setProperty(name, value)[Scene/Cesium3DTileFeature.js 349](https://github.com/CesiumGS/cesium/blob/1.88/Source/Scene/Cesium3DTileFeature.js#L349)

Sets the value of the feature's property with the given name.

If a property with the given name doesn't exist, it is created.

| Name    | Type   | Description                                    |
| :------ | :----- | :--------------------------------------------- |
| `name`  | String | The case-sensitive name of the property.       |
| `value` | *      | The value of the property that will be copied. |

##### Throws:

- [DeveloperError](https://cesium.com/learn/cesiumjs/ref-doc/DeveloperError.html) : Inherited batch table hierarchy property is read only.







## 那features上的属性是怎么来的呢?

哪里先设置? 数据吧?

获取bim基础属性

```ts
private _getBaseProperty(feature) {
    const propertyNames = feature.getPropertyNames();
    
    for(...) {
        const propertyName = propertyNames[i];
        const val = feature.getProperty(propertyName);
    }
}
```



### debugOptions

debugColorizeTiles 

debugShowBoundingVolume 