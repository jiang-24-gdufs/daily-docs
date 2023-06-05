# GridHelper

坐标格辅助对象. 坐标格实际上是2维线数组.

```js
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper )
```

### GridHelper( size : number, divisions : Number, colorCenterLine : Color, colorGrid : Color )

建议size & divisions 设置为偶数

- size - -  坐标格尺寸. 默认为 10.
- divisions - -  坐标格细分次数. 默认为 10.
- colorCenterLine - -  中线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x444444
- colorGrid - -  坐标格网格线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x888888