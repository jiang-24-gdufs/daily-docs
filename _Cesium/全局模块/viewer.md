[TOC]



#### new Cesium.Viewer(container, options) [Widgets/Viewer/Viewer.js 391](https://github.com/CesiumGS/cesium/blob/1.83/Source/Widgets/Viewer/Viewer.js#L391)

A base widget for building applications. 

It composites all of the standard Cesium widgets into one reusable package. 

​	它将所有标准Cesium小部件复制到一个可重用的包装中; 即挂到一个顶部的全局对象上(如camera, imageryLayers 等对象也可以在scene中进行访问)

The widget can always be extended by using mixins, which add functionality useful for a variety of applications.

| Name        | Type                                                         | Description                                         |
| :---------- | :----------------------------------------------------------- | :-------------------------------------------------- |
| `container` | Element \| String                                            | The DOM element or ID that will contain the widget. |
| `options`   | [Viewer.ConstructorOptions](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions) | optionalObject describing initialization options    |

## 属性

#### readonly camera : [Camera](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html)[Widgets/Viewer/Viewer.js 1237](https://github.com/CesiumGS/cesium/blob/1.83/Source/Widgets/Viewer/Viewer.js#L1237)

Gets the camera.

#### readonly clock : [Clock](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html)[Widgets/Viewer/Viewer.js 1262](https://github.com/CesiumGS/cesium/blob/1.83/Source/Widgets/Viewer/Viewer.js#L1262) 

Gets the clock. [运行相关]

#### readonly dataSources : [DataSourceCollection](https://cesium.com/learn/cesiumjs/ref-doc/DataSourceCollection.html)[Widgets/Viewer/Viewer.js 1132](https://github.com/CesiumGS/cesium/blob/1.83/Source/Widgets/Viewer/Viewer.js#L1132)

Gets the set of [`DataSource`](https://cesium.com/learn/cesiumjs/ref-doc/DataSource.html) instances to be visualized.

####  readonly entities : [EntityCollection](https://cesium.com/learn/cesiumjs/ref-doc/EntityCollection.html)[Widgets/Viewer/Viewer.js 1120](https://github.com/CesiumGS/cesium/blob/1.83/Source/Widgets/Viewer/Viewer.js#L1120)

Gets the collection of entities not tied to a particular data source. This is a shortcut to [`dataSourceDisplay.defaultDataSource.entities`](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#dataSourceDisplay).

#### readonly imageryLayers : [ImageryLayerCollection](https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayerCollection.html)[Widgets/Viewer/Viewer.js 1209](https://github.com/CesiumGS/cesium/blob/1.83/Source/Widgets/Viewer/Viewer.js#L1209)

Gets the collection of image layers that will be rendered on the globe.

#### readonly scene : [Scene](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html)[Widgets/Viewer/Viewer.js 1156](https://github.com/CesiumGS/cesium/blob/1.83/Source/Widgets/Viewer/Viewer.js#L1156)

Gets the scene.

#### terrainProvider : [TerrainProvider](https://cesium.com/learn/cesiumjs/ref-doc/TerrainProvider.html)[Widgets/Viewer/Viewer.js 1221](https://github.com/CesiumGS/cesium/blob/1.83/Source/Widgets/Viewer/Viewer.js#L1221)

The terrain provider providing surface geometry for the globe.

#### trackedEntity : [Entity](https://cesium.com/learn/cesiumjs/ref-doc/Entity.html)|undefined[Widgets/Viewer/Viewer.js 1411](https://github.com/CesiumGS/cesium/blob/1.95/Source/Widgets/Viewer/Viewer.js#L1411)

Gets or sets the Entity instance currently being **tracked by the camera**.

飞行管理中`setView` 方法使用了该属性



## 方法

#### flyTo(target, options) → Promise.`<Boolean>`[Widgets/Viewer/Viewer.js 2049](https://github.com/CesiumGS/cesium/blob/1.83/Source/Widgets/Viewer/Viewer.js#L2049)



#### zoomTo(target, offset) → Promise.`<Boolean>`[Widgets/Viewer/Viewer.js 2020](https://github.com/CesiumGS/cesium/blob/1.83/Source/Widgets/Viewer/Viewer.js#L2020)