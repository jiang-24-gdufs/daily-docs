[toc]

# Cartesian3



#### new Cesium.Cartesian3(x, y, z)[Core/Cartesian3.js 20](https://github.com/CesiumGS/cesium/blob/1.92/Source/Core/Cartesian3.js#L20)

A 3D Cartesian point.

| Name | Type   | Default | Description              |
| :--- | :----- | :------ | :----------------------- |
| `x`  | Number | `0.0`   | optionalThe X component. |
| `y`  | Number | `0.0`   | optionalThe Y component. |
| `z`  | Number | `0.0`   | optionalThe Z component. |

## 静态方法

#### static Cesium.Cartesian3.multiplyComponents(left, right, result) → [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) [Core/Cartesian3.js 481](https://github.com/CesiumGS/cesium/blob/1.92/Source/Core/Cartesian3.js#L481)

Computes the componentwise product of two Cartesians.

| Name     | Type                                                         | Description                                |
| :------- | :----------------------------------------------------------- | :----------------------------------------- |
| `left`   | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The first Cartesian.                       |
| `right`  | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The second Cartesian.                      |
| `result` | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The object onto which to store the result. |



#### static Cesium.Cartesian3.dot(left, right) → Number [Core/Cartesian3.js 464](https://github.com/CesiumGS/cesium/blob/1.92/Source/Core/Cartesian3.js#L464)

Computes the dot (scalar) product of two Cartesians.

| Name    | Type                                                         | Description           |
| :------ | :----------------------------------------------------------- | :-------------------- |
| `left`  | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The first Cartesian.  |
| `right` | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The second Cartesian. |



#### static Cesium.Cartesian3.cross(left, right, result) → [Cartesian3 ](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html)[Core/Cartesian3.js 818](https://github.com/CesiumGS/cesium/blob/1.92/Source/Core/Cartesian3.js#L818)

Computes the cross (outer) product of two Cartesians.

| Name     | Type                                                         | Description                                |
| :------- | :----------------------------------------------------------- | :----------------------------------------- |
| `left`   | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The first Cartesian.                       |
| `right`  | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The second Cartesian.                      |
| `result` | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The object onto which to store the result. |



```js
/**
 * Computes the dot (scalar) product of two Cartesians.
 *
 * @param {Cartesian3} left The first Cartesian.
 * @param {Cartesian3} right The second Cartesian.
 * @returns {Number} The dot product.
 */
Cartesian3.dot = function (left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
};

/**
 * Computes the componentwise product of two Cartesians.
 *
 * @param {Cartesian3} left The first Cartesian.
 * @param {Cartesian3} right The second Cartesian.
 * @param {Cartesian3} result The object onto which to store the result.
 * @returns {Cartesian3} The modified result parameter.
 */
Cartesian3.multiplyComponents = function (left, right, result) {
  result.x = left.x * right.x;
  result.y = left.y * right.y;
  result.z = left.z * right.z;
  return result;
};

/**
 * Computes the cross (outer) product of two Cartesians.
 *
 * @param {Cartesian3} left The first Cartesian.
 * @param {Cartesian3} right The second Cartesian.
 * @param {Cartesian3} result The object onto which to store the result.
 * @returns {Cartesian3} The cross product.
 */
Cartesian3.cross = function (left, right, result) {
  const leftX = left.x; const leftY = left.y; const leftZ = left.z;
  const rightX = right.x; const rightY = right.y; const rightZ = right.z;

  result.x = leftY * rightZ - leftZ * rightY;
  result.y = leftZ * rightX - leftX * rightZ;
  result.z = leftX * rightY - leftY * rightX;
  return result;
};
```





#### static Cesium.Cartesian3.magnitudeSquared(cartesian) → Number [Core/Cartesian3.js 362](https://github.com/CesiumGS/cesium/blob/1.92/Source/Core/Cartesian3.js#L362)

Computes the provided Cartesian's squared magnitude.

| Name        | Type                                                         | Description                                                  |
| :---------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `cartesian` | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The Cartesian instance whose squared magnitude is to be computed. |

##### Returns:

The squared magnitude.



#### static Cesium.Cartesian3.magnitude(cartesian) → Number [Core/Cartesian3.js 380](https://github.com/CesiumGS/cesium/blob/1.92/Source/Core/Cartesian3.js#L380)

Computes the Cartesian's magnitude (length).

| Name        | Type                                                         | Description                                               |
| :---------- | :----------------------------------------------------------- | :-------------------------------------------------------- |
| `cartesian` | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The Cartesian instance whose magnitude is to be computed. |

##### Returns:

The magnitude.



```js
/**
 * Computes the provided Cartesian's squared magnitude.
 *
 * @param {Cartesian3} cartesian The Cartesian instance whose squared magnitude is to be computed.
 * @returns {Number} The squared magnitude.
 */
Cartesian3.magnitudeSquared = function (cartesian) {
  //>>includeStart('debug', pragmas.debug);
  Check.typeOf.object("cartesian", cartesian);
  //>>includeEnd('debug');

  return (
    cartesian.x * cartesian.x +
    cartesian.y * cartesian.y +
    cartesian.z * cartesian.z
  );
};

/**
 * Computes the Cartesian's magnitude (length).
 *
 * @param {Cartesian3} cartesian The Cartesian instance whose magnitude is to be computed.
 * @returns {Number} The magnitude.
 */
Cartesian3.magnitude = function (cartesian) {
  return Math.sqrt(Cartesian3.magnitudeSquared(cartesian));
};
```



##### 常用坐标转换API

| API                                                          |                  说明                  |
| ------------------------------------------------------------ | :------------------------------------: |
| Cesium.Cartographic.fromCartesian(cartesian, ellipsoid, result) |              笛卡尔转弧度              |
| Cesium.Cartographic.fromDegrees(longitude, latitude, height, result) |          经纬度转弧度(度单位)          |
| Cesium.CesiumMath.toDegrees(radians)                         |                弧度转度                |
| Cesium.CesiumMath.toRadians(degrees)                         |                度转弧度                |
| Cesium.Cartographic.fromRadians(longitude, latitude, height, result) |         经纬度转弧度(弧度单位)         |
| Cesium.Cartographic.toCartesian(cartographic, ellipsoid, result) |              弧度转笛卡尔              |
| var pick1= scene.globe.pick(viewer.camera.getPickRay(pt1), scene) //其中pt1为一个二维屏幕坐标 | 平面坐标转三维坐标(其实都是笛卡尔坐标) |
| var geoPt1= scene.globe.ellipsoid.cartesianToCartographic(pick1) //其中pick1是一个Cesium.Cartesian3对象 |        笛卡尔三维坐标转地理坐标        |
| var point1=[geoPt1.longitude / Math.PI * 180,geoPt1.latitude / Math.PI * 180]; //其中geoPt1是一个地理坐标 |            地理坐标转经纬度            |
| var cartographic = Cesium.Cartographic.fromDegree(point) //point是经纬度值 |         经纬度转地理坐标(弧度)         |
| var coord_wgs84 = Cesium.Cartographic.fromDegrees(lng, lat, alt);//单位：度，度，米 |            经纬度转地理坐标            |
| var cartesian = Cesium.Cartesian3.fromDegree(point)          |           经纬度转笛卡尔坐标           |

##### 笛卡尔坐标系api

| API                                                          |                           说明                           |
| ------------------------------------------------------------ | :------------------------------------------------------: |
| Cesium.Cartesian3.abs(cartesian, result)                     |                        计算绝对值                        |
| Cesium.Cartesian3.add(left, right, result)                   |                  计算两个笛卡尔的分量和                  |
| Cesium.Cartesian3.angleBetween(left, right)                  |                     计算角度(弧度制)                     |
| Cesium.Cartesian3.cross(left, right, result)                 |                         计算叉积                         |
| Cesium.Cartesian3.distance(left, right)                      |                       计算两点距离                       |
| Cesium.Cartesian3.distanceSquared(left, right)               |                     计算两点平方距离                     |
| Cesium.Cartesian3.divideByScalar(cartesian, scalar, result)  |                       计算标量除法                       |
| Cesium.Cartesian3.divideComponents(left, right, result)      |                       计算两点除法                       |
| Cesium.Cartesian3.dot(left, right)                           |                         计算点乘                         |
| Cesium.Cartesian3.equals(left, right)                        |                     比较两点是否相等                     |
| Cesium.Cartesian3.fromArray(array, startingIndex, result)    |             从数组中提取3个数构建笛卡尔坐标              |
| Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result) |           将将纬度转换为笛卡尔坐标(单位是度°)            |
| Cesium.Cartesian3.fromDegreesArray(coordinates, ellipsoid, result) | 返回给定经度和纬度值数组（以度为单位）的笛卡尔位置数组。 |
| Cesium.Cartesian3.fromDegreesArrayHeights(coordinates, ellipsoid, result) |         返回给定经度,纬度和高度的笛卡尔位置数组          |
| Cesium.Cartesian3.fromElements(x, y, z, result)              |                  创建一个新的笛卡尔坐标                  |
| Cesium.Cartesian3.fromRadians(longitude, latitude, height, ellipsoid, result) |              返回笛卡尔坐标以弧度制的经纬度              |
| Cesium.Cartesian3.fromRadiansArray(coordinates, ellipsoid, result) |            返回笛卡尔坐标以弧度制的经纬度数组            |
| Cesium.Cartesian3.fromRadiansArrayHeights(coordinates, ellipsoid, result) |          返回笛卡尔坐标以弧度制的经纬度高度数组          |
| Cesium.Cartesian3.fromSpherical(spherical, result)           |                将提供的球面转换为笛卡尔系                |
| Cesium.Cartesian3.lerp(start, end, t, result)                |      使用提供的笛卡尔数来计算t处的线性插值或外推。       |
| Cesium.Cartesian3.magnitude(cartesian)                       |                      计算笛卡尔长度                      |
| Cesium.Cartesian3.magnitudeSquared(cartesian)                |                 计算提供的笛卡尔平方量级                 |
| Cesium.Cartesian3.maximumByComponent(first, second, result)  |  比较两个笛卡尔并计算包含所提供笛卡尔最大成分的笛卡尔。  |
| Cesium.Cartesian3.maximumComponent(cartesian)                |           计算所提供笛卡尔坐标系的最大分量的值           |
| Cesium.Cartesian3.midpoint(left, right, result)              |             计算右笛卡尔和左笛卡尔之间的中点             |
| Cesium.Cartesian3.minimumByComponent(first, second, result)  |  比较两个笛卡尔并计算包含所提供笛卡尔的最小分量的笛卡尔  |
| Cesium.Cartesian3.minimumComponent(cartesian)                |           计算所提供笛卡尔坐标系的最小分量的值           |
| Cesium.Cartesian3.mostOrthogonalAxis(cartesian, result)      |             返回与提供的笛卡尔坐标最正交的轴             |
| Cesium.Cartesian3.multiplyByScalar(cartesian, scalar, result) |             将提供的笛卡尔分量乘以提供的标量             |
| Cesium.Cartesian3.multiplyComponents(left, right, result)    |                  计算两个笛卡尔的分量积                  |
| Cesium.Cartesian3.normalize(cartesian, result)               |               计算所提供笛卡尔的规范化形式               |
| Cesium.Cartesian3.pack(value, array, startingIndex)          |              将提供的实例存储到提供的数组中              |
| Cesium.Cartesian3.projectVector(a, b, result)                |                   将向量a投影到向量b上                   |
| Cesium.Cartesian3.subtract(left, right, result)              |                   计算两个笛卡尔分量差                   |
| Cesium.Cartesian3.unpack(array, startingIndex, result)       |                  从压缩的数组中检索实例                  |
| Cesium.Cartesian3.unpackArray(array, result)                 |             将笛卡尔分量数组解包为笛卡尔数组             |


