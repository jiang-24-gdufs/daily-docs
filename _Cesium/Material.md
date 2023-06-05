[toc]

# Material

#### new Cesium.Material(options)[Scene/Material.js 270](https://github.com/CesiumGS/cesium/blob/1.91/Source/Scene/Material.js#L270)

A Material defines surface appearance through a combination of diffuse, specular, normal, emission, and alpha components. These values are specified using a JSON schema called Fabric which gets parsed and assembled into glsl shader code behind-the-scenes. Check out the [wiki page](https://github.com/CesiumGS/cesium/wiki/Fabric) for more details on Fabric.

cn:

> Material defines 表面外观 through a combination of 漫反射, 镜面反射, 法向量, 发射? and α分量.
>
> These values are 指定 using a json schema(方案)  called  Fabric(布料) which gets parsed and assembled(组装的) into glsl shader code behind-the-scenes.



Base material types and their **uniforms**: (shader中的变量)

- Color

- - `color`: rgba color object.

- Image

- - `image`: path to image.
  - `repeat`: Object with x and y values specifying the number of times to repeat the image.

- DiffuseMap

- - `image`: path to image.
  - `channels`: Three character string containing any combination of r, g, b, and a for selecting the desired image channels.
  - `repeat`: Object with x and y values specifying the number of times to repeat the image.

- AlphaMap

- - `image`: path to image.
  - `channel`: One character string containing r, g, b, or a for selecting the desired image channel.
  - `repeat`: Object with x and y values specifying the number of times to repeat the image.

- SpecularMap

- - `image`: path to image.
  - `channel`: One character string containing r, g, b, or a for selecting the desired image channel.
  - `repeat`: Object with x and y values specifying the number of times to repeat the image.

- EmissionMap

- - `image`: path to image.
  - `channels`: Three character string containing any combination of r, g, b, and a for selecting the desired image channels.
  - `repeat`: Object with x and y values specifying the number of times to repeat the image.

- BumpMap

- - `image`: path to image.
  - `channel`: One character string containing r, g, b, or a for selecting the desired image channel.
  - `repeat`: Object with x and y values specifying the number of times to repeat the image.
  - `strength`: Bump strength value between 0.0 and 1.0 where 0.0 is small bumps and 1.0 is large bumps.

- NormalMap

- - `image`: path to image.
  - `channels`: Three character string containing any combination of r, g, b, and a for selecting the desired image channels.
  - `repeat`: Object with x and y values specifying the number of times to repeat the image.
  - `strength`: Bump strength value between 0.0 and 1.0 where 0.0 is small bumps and 1.0 is large bumps.

- Grid

- - `color`: rgba color object for the whole material.
  - `cellAlpha`: Alpha value for the cells between grid lines. This will be combined with color.alpha.
  - `lineCount`: Object with x and y values specifying the number of columns and rows respectively.
  - `lineThickness`: Object with x and y values specifying the thickness of grid lines (in pixels where available).
  - `lineOffset`: Object with x and y values specifying the offset of grid lines (range is 0 to 1).

- Stripe

- - `horizontal`: Boolean that determines if the stripes are horizontal or vertical.
  - `evenColor`: rgba color object for the stripe's first color.
  - `oddColor`: rgba color object for the stripe's second color.
  - `offset`: Number that controls at which point into the pattern to begin drawing; with 0.0 being the beginning of the even color, 1.0 the beginning of the odd color, 2.0 being the even color again, and any multiple or fractional values being in between.
  - `repeat`: Number that controls the total number of stripes, half light and half dark.

- Checkerboard

- - `lightColor`: rgba color object for the checkerboard's light alternating color.
  - `darkColor`: rgba color object for the checkerboard's dark alternating color.
  - `repeat`: Object with x and y values specifying the number of columns and rows respectively.

- Dot

- - `lightColor`: rgba color object for the dot color.
  - `darkColor`: rgba color object for the background color.
  - `repeat`: Object with x and y values specifying the number of columns and rows of dots respectively.

- Water

- - `baseWaterColor`: rgba color object base color of the water.
  - `blendColor`: rgba color object used when blending from water to non-water areas.
  - `specularMap`: Single channel texture used to indicate areas of water.
  - `normalMap`: Normal map for water normal perturbation.
  - `frequency`: Number that controls the number of waves.
  - `animationSpeed`: Number that controls the animations speed of the water.
  - `amplitude`: Number that controls the amplitude of water waves.
  - `specularIntensity`: Number that controls the intensity of specular reflections.

- RimLighting

- - `color`: diffuse color and alpha.
  - `rimColor`: diffuse color and alpha of the rim.
  - `width`: Number that determines the rim's width.

- Fade

- - `fadeInColor`: diffuse color and alpha at `time`
  - `fadeOutColor`: diffuse color and alpha at `maximumDistance` from `time`
  - `maximumDistance`: Number between 0.0 and 1.0 where the `fadeInColor` becomes the `fadeOutColor`. A value of 0.0 gives the entire material a color of `fadeOutColor` and a value of 1.0 gives the the entire material a color of `fadeInColor`
  - `repeat`: true if the fade should wrap around the texture coodinates.
  - `fadeDirection`: Object with x and y values specifying if the fade should be in the x and y directions.
  - `time`: Object with x and y values between 0.0 and 1.0 of the `fadeInColor` position

- PolylineArrow

- - `color`: diffuse color and alpha.

- PolylineDash

- - `color`: color for the line.
  - `gapColor`: color for the gaps in the line.
  - `dashLength`: Dash length in pixels.
  - `dashPattern`: The 16 bit stipple pattern for the line..

- PolylineGlow

- - `color`: color and maximum alpha for the glow on the line.
  - `glowPower`: strength of the glow, as a percentage of the total line width (less than 1.0).
  - `taperPower`: strength of the tapering effect, as a percentage of the total line length. If 1.0 or higher, no taper effect is used.

- PolylineOutline

- - `color`: diffuse color and alpha for the interior of the line.
  - `outlineColor`: diffuse color and alpha for the outline.
  - `outlineWidth`: width of the outline in pixels.

- ElevationContour

- - `color`: color and alpha for the contour line.
  - `spacing`: spacing for contour lines in meters.
  - `width`: Number specifying the width of the grid lines in pixels.

- ElevationRamp

- - `image`: color ramp image to use for coloring the terrain.
  - `minimumHeight`: minimum height for the ramp.
  - `maximumHeight`: maximum height for the ramp.

- SlopeRamp

- - `image`: color ramp image to use for coloring the terrain by slope.

- AspectRamp

- - `image`: color ramp image to use for color the terrain by aspect.

- ElevationBand

- - `heights`: image of heights sorted from lowest to highest.
  - `colors`: image of colors at the corresponding heights.

### constructor options

| Name                  | Type                                                         | Default                             | Description                                                  |
| :-------------------- | :----------------------------------------------------------- | :---------------------------------- | :----------------------------------------------------------- |
| `strict`              | Boolean                                                      | `false`                             | optionalThrows errors for issues that would normally be ignored, including unused uniforms or materials. |
| `translucent`         | Boolean \| function                                          | `true`                              | optionalWhen or a function that returns , the geometry with this material is expected to appear translucent.`true``true` |
| `minificationFilter`  | [TextureMinificationFilter](https://cesium.com/learn/cesiumjs/ref-doc/global.html#TextureMinificationFilter) | `TextureMinificationFilter.LINEAR`  | optionalThe [`TextureMinificationFilter`](https://cesium.com/learn/cesiumjs/ref-doc/global.html#TextureMinificationFilter) to apply to this material's textures. |
| `magnificationFilter` | [TextureMagnificationFilter](https://cesium.com/learn/cesiumjs/ref-doc/global.html#TextureMagnificationFilter) | `TextureMagnificationFilter.LINEAR` | optionalThe [`TextureMagnificationFilter`](https://cesium.com/learn/cesiumjs/ref-doc/global.html#TextureMagnificationFilter) to apply to this material's textures. |
| `fabric`              | Object                                                       |                                     | The fabric JSON used to generate the material.               |

##### Example:

```javascript
// Create a color material with fromType:
polygon.material = Cesium.Material.fromType('Color');
polygon.material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 1.0);

// Create the default material:
polygon.material = new Cesium.Material();

// Create a color material with full Fabric notation:
polygon.material = new Cesium.Material({
    fabric : {
        type : 'Color',
        uniforms : {
            color : new Cesium.Color(1.0, 1.0, 0.0, 1.0)
        }
    }
});
```

##### Demo:

- [Cesium Sandcastle Materials Demo](https://sandcastle.cesium.com/index.html?src=Materials.html)

##### See:

- [Fabric wiki page](https://github.com/CesiumGS/cesium/wiki/Fabric) for a more detailed options of Fabric.