[TOC]

# Plane



#### new Cesium.Plane(normal, distance)[Core/Plane.js 34](https://github.com/CesiumGS/cesium/blob/1.92/Source/Core/Plane.js#L34)

A plane in Hessian Normal Form defined by

```
ax + by + cz + d = 0
```

where (a, b, c) is the plane's `normal`, d is the signed `distance` to the plane, and (x, y, z) is any point on the plane.

| Name       | Type                                                         | Description                                                  |
| :--------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `normal`   | [Cartesian3](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html) | The plane's normal (normalized).                             |
| `distance` | Number                                                       | The shortest distance from the origin to the plane. The sign of `distance` determines which side of the plane the origin is on. <br>If `distance` is positive, the origin is in the half-space in the direction of the normal; if negative, the origin is in the half-space opposite to the normal; if zero, the plane passes through the origin. |

如果distance为正数，则原点位于法向量方向的half-space；

如果负数为负，则与正常相反的半空间。 如果零，则飞机通过原点。



射线与平面求交的示例, 理解distance参数

```js
const ray = new Cesium.Ray(new Cesium.Cartesian3(0,0,0), new Cesium.Cartesian3(0,0,-1));
const plane = new Cesium.Plane(
    Cesium.Cartesian3.normalize(new Cesium.Cartesian3(0,0,2), new Cesium.Cartesian3()),
    10
);
console.log(ray);console.log(plane);
console.log(Cesium.IntersectionTests.rayPlane(ray, plane));
```

```
Ray {
	direction: Cartesian3 {x: 0, y: 0, z: -1}
	origin: Cartesian3 {x: 0, y: 0, z: 0}
    }
Plane {
	distance: 10,
	normal: Cartesian3 {x: 0, y: 0, z: 1}
	}
Cartesian3 {x: 0, y: 0, z: -10}
```



射线: 从原点射向(0,0,-1)

平面: 垂直于法向量(0,0,1), 且距离原点为10, 原点与法向量在平面的同一侧; 即可以理解为平面在z轴负值处.

射线与平面的焦点:  `{x: 0, y: 0, z: -10}`



##### Throws:

- [DeveloperError](https://cesium.com/learn/cesiumjs/ref-doc/DeveloperError.html) : Normal must be normalized