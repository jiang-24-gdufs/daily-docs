[TOC]

# CallbackProperty

#### new Cesium.CallbackProperty(callback, isConstant)

A [`Property`](https://cesium.com/learn/cesiumjs/ref-doc/Property.html) whose value is **lazily evaluated** by a callback function.

| Name         | Type                                                         | Description                                                  |
| :----------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `callback`   | [CallbackProperty.Callback](https://cesium.com/learn/cesiumjs/ref-doc/CallbackProperty.html#.Callback) | The function to be called when the property is evaluated.    |
| `isConstant` | Boolean                                                      | `true` when the callback function returns the same value every time, `false` if the value will change. |

有些类似于watch