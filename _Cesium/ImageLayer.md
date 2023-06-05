[TOC]

# ImageLayer [#](https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayer.html?classFilter=image)

#### new Cesium.ImageryLayer(imageryProvider, options)[Scene/ImageryLayer.js 129](https://github.com/CesiumGS/cesium/blob/1.83/Source/Scene/ImageryLayer.js#L129)

An imagery layer that displays tiled image data from a single imagery provider on a [`Globe`](https://cesium.com/learn/cesiumjs/ref-doc/Globe.html).

在Globe上显示来自单个影像提供程序的切片图像数据的影像图层

| Name              | Type                                                         | Description                                  |
| :---------------- | :----------------------------------------------------------- | :------------------------------------------- |
| `imageryProvider` | [ImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/ImageryProvider.html) | The imagery provider to use.                 |
| `options`         | Object                                                       | optionalObject with the following properties |

# ImageLayerCollection [#](https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayerCollection.html?classFilter=image)

#### new Cesium.ImageryLayerCollection()[Scene/ImageryLayerCollection.js 20](https://github.com/CesiumGS/cesium/blob/1.83/Source/Scene/ImageryLayerCollection.js#L20)

An ordered collection of imagery layers.

##### Demo:

- [Cesium Sandcastle Imagery Adjustment Demo](https://sandcastle.cesium.com/index.html?src=Imagery%20Adjustment.html)
- [Cesium Sandcastle Imagery Manipulation Demo](https://sandcastle.cesium.com/index.html?src=Imagery%20Layers%20Manipulation.html)

### 属性

#### layerAdded : [Event](https://cesium.com/learn/cesiumjs/ref-doc/Event.html)

#### layerMoved : [Event](https://cesium.com/learn/cesiumjs/ref-doc/Event.html)

#### layerRemoved : [Event](https://cesium.com/learn/cesiumjs/ref-doc/Event.html)

#### layerShownOrHidden : [Event](https://cesium.com/learn/cesiumjs/ref-doc/Event.html)

#### length : Number

​	Gets the number of layers in this collection.

### 方法

#### add(layer, index)  [Scene/ImageryLayerCollection.js 81](https://github.com/CesiumGS/cesium/blob/1.83/Source/Scene/ImageryLayerCollection.js#L81)

Adds a layer to the collection.



#### addImageryProvider(imageryProvider, index) → [ImageryLayer](https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayer.html) [Scene/ImageryLayerCollection.js 118](https://github.com/CesiumGS/cesium/blob/1.83/Source/Scene/ImageryLayerCollection.js#L118)

Creates a new layer using the given ImageryProvider and adds it to the collection. 

Returns: The newly created layer.

| Name              | Type                                                         | Description                                                  |
| :---------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `layer`           | [ImageryLayer](https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayer.html) | the layer to add.                                            |
| `imageryProvider` | [ImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/ImageryProvider.html) | the imagery provider to create a new layer for.              |
| `index`           | Number                                                       | [optional] the index to add the layer at. If omitted, the layer will be added on top of all existing layers.要在其上添加层的索引。如果省略，该层将添加到所有现有Layers的顶部。 索引与get方法关联 |

# ImageProvider [#](https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayer.html?classFilter=image)

#### abstract new Cesium.ImageryProvider() [Scene/ImageryProvider.js 34](https://github.com/CesiumGS/cesium/blob/1.83/Source/Scene/ImageryProvider.js#L34)

Provides imagery to be displayed on the surface of an ellipsoid. This type describes an interface and is not intended to be instantiated directly.

提供要在椭球体表面上显示的图像。此类型描述接口，不打算直接实例化。q