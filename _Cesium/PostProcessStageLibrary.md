[toc]

# PostProcessStageLibrary

Contains functions for creating common **post-process stages**.



#### Cesium.PostProcessStageLibrary.createEdgeDetectionStage() → [PostProcessStage](https://cesium.com/learn/cesiumjs/ref-doc/PostProcessStage.html) ~ [Scene/PostProcessStageLibrary.js 240](https://github.com/CesiumGS/cesium/blob/1.94/Source/Scene/PostProcessStageLibrary.js#L240)

Creates a post-process stage that **detects edges**.

Writes the color to the output texture with alpha set to 1.0 when it is on an edge.

This stage has the following uniforms: `color` and `length`

- `color` is the color of the highlighted edge. The default is `Color#BLACK`.
- `length` is the length of the edges in pixels. The default is `0.5`.

This stage is not supported in 2D.

##### Returns:

A post-process stage that applies an edge detection effect.

##### Example:

```javascript
// multiple silhouette effects
const yellowEdge = Cesium.PostProcessLibrary.createEdgeDetectionStage();
yellowEdge.uniforms.color = Cesium.Color.YELLOW;
yellowEdge.selected = [feature0];

const greenEdge = Cesium.PostProcessLibrary.createEdgeDetectionStage();
greenEdge.uniforms.color = Cesium.Color.LIME;
greenEdge.selected = [feature1];

// draw edges around feature0 and feature1
postProcessStages.add(Cesium.PostProcessLibrary.createSilhouetteStage([yellowEdge, greenEdge]);
```



#### Cesium.PostProcessStageLibrary.createSilhouetteStage(edgeDetectionStages) → [PostProcessStageComposite](https://cesium.com/learn/cesiumjs/ref-doc/PostProcessStageComposite.html) ~ [Scene/PostProcessStageLibrary.js 330](https://github.com/CesiumGS/cesium/blob/1.94/Source/Scene/PostProcessStageLibrary.js#L330)

Creates a post-process stage that applies a **silhouette (轮廓)** effect.

A silhouette effect composites the color from the edge detection pass with input color texture.

This stage has the following uniforms when `edgeDetectionStages` is `undefined`: `color` and `length`

- `color` is the color of the highlighted edge. The default is `Color#BLACK`. 

- `length` is the length of the edges in pixels. The default is `0.5`.



拥有相同名称`name`属性的 `PostProcessStageComposite`对象会在移除后有冲突