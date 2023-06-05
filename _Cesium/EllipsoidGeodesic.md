[toc]

# EllipsoidGeodesic

#### new Cesium.EllipsoidGeodesic(start, end, ellipsoid)

Initializes a geodesic(测地线) on the ellipsoid connecting the two provided planetodetic (星球) points.

在连接两个提供的行星测地点的椭球体上初始化测地线。

| Name        | Type                                                         | Default           | Description                                         |
| :---------- | :----------------------------------------------------------- | :---------------- | :-------------------------------------------------- |
| `start`     | [Cartographic](https://cesium.com/learn/cesiumjs/ref-doc/Cartographic.html) |                   | optionalThe initial planetodetic point on the path. |
| `end`       | [Cartographic](https://cesium.com/learn/cesiumjs/ref-doc/Cartographic.html) |                   | optionalThe final planetodetic point on the path.   |
| `ellipsoid` | [Ellipsoid](https://cesium.com/learn/cesiumjs/ref-doc/Ellipsoid.html) | `Ellipsoid.WGS84` | optionalThe ellipsoid on which the geodesic lies.   |



### 属性

#### readonly surfaceDistance : Number

Gets the surface distance between the start and end point

获取起点和终点之间的表面距离



### 方法

####  setEndPoints(start, end)

Sets the start and end points of the geodesic

| Name    | Type                                                         | Description                                 |
| :------ | :----------------------------------------------------------- | :------------------------------------------ |
| `start` | [Cartographic](https://cesium.com/learn/cesiumjs/ref-doc/Cartographic.html) | The initial planetodetic point on the path. |
| `end`   | [Cartographic](https://cesium.com/learn/cesiumjs/ref-doc/Cartographic.html) | The final planetodetic point on the path.   |