# Ray



#### new Cesium.Ray(origin, direction)

Represents a ray that extends infinitely from the provided origin in the provided direction.

| Name        | Type                                                         | Default           | Description                       |
| :---------- | :----------------------------------------------------------- | :---------------- | :-------------------------------- |
| `origin`    | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | `Cartesian3.ZERO` | optionalThe origin of the ray.    |
| `direction` | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | `Cartesian3.ZERO` | optionalThe direction of the ray. |

```js
function Ray(origin, direction) {
  direction = Cartesian3.clone(defaultValue(direction, Cartesian3.ZERO));
  if (!Cartesian3.equals(direction, Cartesian3.ZERO)) {
    Cartesian3.normalize(direction, direction); // 归一化
  }

  this.origin = Cartesian3.clone(defaultValue(origin, Cartesian3.ZERO));
  this.direction = direction;
}
```

