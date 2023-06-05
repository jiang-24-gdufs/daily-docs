[toc]

[TOC]

# Primitive

A primitive represents geometry in the [`Scene`](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html). The geometry can be from a single [`GeometryInstance`](https://cesium.com/learn/cesiumjs/ref-doc/GeometryInstance.html) as shown in example 1 below, or from an array of instances, even if the geometry is from different geometry types, e.g., an [`RectangleGeometry`](https://cesium.com/learn/cesiumjs/ref-doc/RectangleGeometry.html) and an [`EllipsoidGeometry`](https://cesium.com/learn/cesiumjs/ref-doc/EllipsoidGeometry.html) as shown in Code Example 2.

**A primitive combines geometry instances with an [`Appearance`](https://cesium.com/learn/cesiumjs/ref-doc/Appearance.html) that describes the full shading, including [`Material`](https://cesium.com/learn/cesiumjs/ref-doc/Material.html) and `RenderState`.** 

一个 **primitive** 组合了几何实例(s) 和一个描述完整着色的外观(包括Material和RenderState)。



##### 参数options:

| Name                       | Type                                                         | Default               | Description                                                  |
| :------------------------- | :----------------------------------------------------------- | :-------------------- | :----------------------------------------------------------- |
| `geometryInstances`        | Array.`<[GeometryInstance]>` \| [GeometryInstance](http://www.southsmart.com/smartmap/smart3d/cesiumdoc/GeometryInstance.html) |                       | optionalThe geometry instances - or a single geometry instance - to render. |
| `appearance`               | [Appearance](http://www.southsmart.com/smartmap/smart3d/cesiumdoc/Appearance.html) |                       | optionalThe appearance used to render the primitive.         |
| `depthFailAppearance`      | [Appearance](http://www.southsmart.com/smartmap/smart3d/cesiumdoc/Appearance.html) |                       | optionalThe appearance used to shade this primitive when it fails the depth test. |
| `show`                     | Boolean                                                      | `true`                | optionalDetermines if this primitive will be shown.          |
| `modelMatrix`              | [Matrix4](http://www.southsmart.com/smartmap/smart3d/cesiumdoc/Matrix4.html) | `Matrix4.IDENTITY`    | optionalThe 4x4 transformation matrix that transforms the primitive (all geometry instances) from model to world coordinates. |
| `vertexCacheOptimize`      | Boolean                                                      | `false`               | optionalWhen `true`, geometry vertices are optimized for the pre and post-vertex-shader caches. |
| `interleave`               | Boolean                                                      | `false`               | optionalWhen `true`, geometry vertex attributes are interleaved, which can slightly improve rendering performance but increases load time. |
| `compressVertices`         | Boolean                                                      | `true`                | optionalWhen `true`, the geometry vertices are compressed, which will save memory. |
| `releaseGeometryInstances` | Boolean                                                      | `true`                | optionalWhen `true`, the primitive does not keep a reference to the input `geometryInstances` to save memory. |
| `allowPicking`             | Boolean                                                      | `true`                | optionalWhen `true`, each geometry instance will only be pickable with [`Scene#pick`](http://www.southsmart.com/smartmap/smart3d/cesiumdoc/Scene.html#pick). When `false`, GPU memory is saved. |
| `cull`                     | Boolean                                                      | `true`                | optionalWhen `true`, the renderer frustum culls and horizon culls the primitive's commands based on their bounding volume. Set this to `false` for a small performance gain if you are manually culling the primitive. |
| `asynchronous`             | Boolean                                                      | `true`                | optionalDetermines if the primitive will be created asynchronously or block until ready. |
| `debugShowBoundingVolume`  | Boolean                                                      | `false`               | optionalFor debugging only. Determines if this primitive's commands' bounding spheres are shown. |
| `shadows`                  | [ShadowMode](http://www.southsmart.com/smartmap/smart3d/cesiumdoc/global.html#ShadowMode) | `ShadowMode.DISABLED` | optionalDetermines whether this primitive casts or receives shadows from light sources. |

- releaseGeometryInstances: 默认为 `true`

  When `true`, the primitive does not **keep a reference** to the input `geometryInstances` to save memory.  (读取`.geometryInstances`属性, 可能会读到 undefined )

- asynchronous: 默认为 `true`

  Determines if the primitive will be created asynchronously or block until ready. 

  If false initializeTerrainHeights() must be called first.

- allowPicking: 默认为 `true `

  Determines if the primitive will be created asynchronously or block until ready. 

  If false initializeTerrainHeights() must be called first.

##### Examples:

```javascript
// 1. Draw a translucent ellipse on the surface with a checkerboard pattern
const instance = new Cesium.GeometryInstance({
  geometry : new Cesium.EllipseGeometry({
      center : Cesium.Cartesian3.fromDegrees(-100.0, 20.0),
      semiMinorAxis : 500000.0,
      semiMajorAxis : 1000000.0,
      rotation : Cesium.Math.PI_OVER_FOUR,
      vertexFormat : Cesium.VertexFormat.POSITION_AND_ST
  }),
  id : 'object returned when this instance is picked and to get/set per-instance attributes'
});
scene.primitives.add(new Cesium.Primitive({
  geometryInstances : instance,
  appearance : new Cesium.EllipsoidSurfaceAppearance({
    material : Cesium.Material.fromType('Checkerboard')
  })
}));
// 2. Draw different instances each with a unique color
const rectangleInstance = new Cesium.GeometryInstance({
  geometry : new Cesium.RectangleGeometry({
    rectangle : Cesium.Rectangle.fromDegrees(-140.0, 30.0, -100.0, 40.0),
    vertexFormat : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
  }),
  id : 'rectangle',
  attributes : {
    color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5)
  }
});
const ellipsoidInstance = new Cesium.GeometryInstance({
  geometry : new Cesium.EllipsoidGeometry({
    radii : new Cesium.Cartesian3(500000.0, 500000.0, 1000000.0),
    vertexFormat : Cesium.VertexFormat.POSITION_AND_NORMAL
  }),
  modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(-95.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 500000.0), new Cesium.Matrix4()),
  id : 'ellipsoid',
  attributes : {
    color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
  }
});
scene.primitives.add(new Cesium.Primitive({
  geometryInstances : [rectangleInstance, ellipsoidInstance],
  appearance : new Cesium.PerInstanceColorAppearance()
}));
```

## construtor

#### new Cesium.Primitive(options)



# GroundPrimitive

A primitive combines geometry instances with an [`Appearance`](https://cesium.com/learn/cesiumjs/ref-doc/Appearance.html) that describes the full shading, including [`Material`](https://cesium.com/learn/cesiumjs/ref-doc/Material.html) and `RenderState`. 



# PrimitiveCollection

A collection of primitives. This is most often used with [`Scene#primitives`](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#primitives), but `PrimitiveCollection` is also a primitive itself so collections can be added to collections forming a hierarchy.

一个 primitive 的集合。这最常与 `Scene#primitives` 一起使用，但是 **PrimitiveCollection 本身也是一个 primitive** ，所以集合可以被添加到形成一个层次结构的集合。

### Methods

#### remove(primitive) → Boolean

Removes a **primitive(primitiveCollection)** from the collection.