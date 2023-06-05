[toc]

## [Cesium3DTile - Cesium Documentation](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTile.html)

Cesium3DTileset中的瓦片。首次创建平铺时，不会加载其内容；内容会根据视图在需要时按需加载。
不要直接构造它，而是通过Cesium3DTileset#tileVisible访问Tiles。

#### parent : [Cesium3DTile](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTile.html)[Scene/Cesium3DTile.js 197](https://github.com/CesiumGS/cesium/blob/1.82/Source/Scene/Cesium3DTile.js#L197)

This tile's parent or `undefined` if this tile is the root.

When a tile's content points to an external tileset JSON file, the external tileset's root tile's parent is not `undefined`; 

instead, the parent references the tile (with its content pointing to an external tileset JSON file) as if the two tilesets were merged.

当一个tile的内容指向一个外部tileset JSON文件时，外部tileset的根tile的父级不是`undefined`； 

相反，父级引用 tile（其内容指向外部 tileset JSON 文件），就像合并了两个 tileset 一样。



#### transform : [Matrix4](https://cesium.com/learn/cesiumjs/ref-doc/Matrix4.html)[Scene/Cesium3DTile.js 64](https://github.com/CesiumGS/cesium/blob/1.82/Source/Scene/Cesium3DTile.js#L64)

The local transform of this tile.



### 





## [Cesium3DTileset - Cesium Documentation](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html?classFilter=3dT)

A [3D Tiles tileset](https://github.com/CesiumGS/3d-tiles/tree/master/specification), used for streaming massive heterogeneous 3D geospatial datasets(用于流式传输海量异构3D地理空间数据集。).

###  new Cesium.Cesium3DTileset(options)



### 属性: 

#### *readonly* boundingSphere : [BoundingSphere](https://cesium.com/learn/cesiumjs/ref-doc/BoundingSphere.html) 

The tileset's bounding sphere (包围球).

##### Example:

```js
{
    // center 为Cartesian3类型
    "center": {
        "x": -2331373.86938567,
        "y": 5383129.369807665,
        "z": 2495183.4033160703
    },
    "radius": 457.8223414493367
}
```

```javascript
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url : 'http://localhost:8002/tilesets/Seattle/tileset.json'
}));

tileset.readyPromise.then(function(tileset) {
    // Set the camera to view the newly added tileset
    viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
});
```



#### modelMatrix : [Matrix4](https://cesium.com/learn/cesiumjs/ref-doc/Matrix4.html) 

A 4x4 transformation matrix that transforms the entire tileset.

A 4x4 transformation matrix that transforms the tileset's root tile.

? 上面两个是我在文档的Options与Property中复制下来的. 应该还是同一个意思的...

Default Value: `Matrix4.IDENTITY`

##### Example:

```javascript
// Adjust a tileset's height from the globe's surface.
var heightOffset = 20.0;
var boundingSphere = tileset.boundingSphere;
// 因为要计算m转成空间距离的坐标, 所以从C3转成rad再转成C3
var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
// 计算出了两点之前的偏移后使用Matrix4计算偏移后的矩阵
tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
```



#### root : [Cesium3DTile](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTile.html) 

The root tile.



#### tileVisible : [Event](https://cesium.com/learn/cesiumjs/ref-doc/Event.html)

This event fires once for each visible tile in a frame. **This can be used to manually style a tileset.**  使用这个时间来自定义样式

The visible [`Cesium3DTile`](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTile.html) is passed to the event listener.

This event is fired during the tileset traversal while the frame is being rendered so that updates to the tile take effect in the same frame. Do not create or modify Cesium entities or primitives during the event listener.

> 当 frame 在渲染后这个事件会在 tileset 遍历期间触发, 以便对 tile 的更新在同一帧中生效.
>
> 在事件侦听器期间，请勿在事件侦听器期间创建或修改Cesium实体或基元。

##### Examples:

```javascript
tileset.tileVisible.addEventListener(function(tile) {
    if (tile.content instanceof Cesium.Batched3DModel3DTileContent) {
        console.log('A Batched 3D Model tile is visible.');
    }
});
// Apply a red style and then manually set random colors for every other feature when the tile becomes visible.
tileset.style = new Cesium.Cesium3DTileStyle({
    color : 'color("red")'
});
tileset.tileVisible.addEventListener(function(tile) {
    const content = tile.content;
    const featuresLength = content.featuresLength;
    for (let i = 0; i < featuresLength; i+=2) {
        content.getFeature(i).color = Cesium.Color.fromRandom();
    }
});
```



## More

### **Cesium3dTileset.modelMatrix** & Cesium3dTileset.root.transform