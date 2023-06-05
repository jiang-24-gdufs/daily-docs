[toc]

# Clock

#### new Cesium.Clock(options)[Core/Clock.js 43](https://github.com/CesiumGS/cesium/blob/1.91/Source/Core/Clock.js#L43)

A simple clock for keeping track of simulated time.

**options**: Object with the following properties:

| Name            | Type                                                         | Default                             | Description                                                  |
| :-------------- | :----------------------------------------------------------- | :---------------------------------- | :----------------------------------------------------------- |
| `startTime`     | [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html) |                                     | optionalThe start time of the clock.                         |
| `stopTime`      | [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html) |                                     | optionalThe stop time of the clock.                          |
| `currentTime`   | [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html) |                                     | optionalThe current time.                                    |
| `multiplier`    | Number                                                       | `1.0`                               | optionalDetermines how much time advances when [`Clock#tick`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#tick) is called, negative values allow for advancing backwards. |
| `clockStep`     | [ClockStep](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClockStep) | `ClockStep.SYSTEM_CLOCK_MULTIPLIER` | optionalDetermines if calls to [`Clock#tick`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#tick) are frame dependent or system clock dependent. |
| `clockRange`    | [ClockRange](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClockRange) | `ClockRange.UNBOUNDED`              | optionalDetermines how the clock should behave when [`Clock#startTime`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#startTime) or [`Clock#stopTime`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#stopTime) is reached. |
| `canAnimate`    | Boolean                                                      | `true`                              | optionalIndicates whether [`Clock#tick`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#tick) can advance time. This could be false if data is being buffered, for example. The clock will only tick when both [`Clock#canAnimate`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#canAnimate) and [`Clock#shouldAnimate`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#shouldAnimate) are true. |
| `shouldAnimate` | Boolean                                                      | `false`                             | optionalIndicates whether [`Clock#tick`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#tick) should attempt to advance time. The clock will only tick when both [`Clock#canAnimate`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#canAnimate) and [`Clock#shouldAnimate`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#shouldAnimate) are true. |

##### Throws:

- [DeveloperError](https://cesium.com/learn/cesiumjs/ref-doc/DeveloperError.html) : startTime must come before stopTime.

##### Example:

```javascript
// Create a clock that loops on Christmas day 2013 and runs in real-time.
const clock = new Cesium.Clock({
   startTime : Cesium.JulianDate.fromIso8601("2013-12-25"),
   currentTime : Cesium.JulianDate.fromIso8601("2013-12-25"),
   stopTime : Cesium.JulianDate.fromIso8601("2013-12-26"),
   clockRange : Cesium.ClockRange.LOOP_STOP,
   clockStep : Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER
});
```

##### See:

- [ClockStep](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClockStep)
- [ClockRange](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClockRange)
- [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html)



### Members

#### canAnimate : Boolean [Core/Clock.js 115](https://github.com/CesiumGS/cesium/blob/1.91/Source/Core/Clock.js#L115)

Indicates whether [`Clock#tick`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#tick) can advance time. This could be false if data is being buffered, for example. The clock will only advance time when both [`Clock#canAnimate`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#canAnimate) and [`Clock#shouldAnimate`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#shouldAnimate) are true.

指示 `[Clock#tick`] 是否可以提前时间。 例如，如果数据被缓冲，则这可能是 false 的。 时钟只会推进[`Clock#cananimate`]和[ `Clock#canimate` ]是真实的。



#### currentTime : [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html)[Core/Clock.js 155](https://github.com/CesiumGS/cesium/blob/1.91/Source/Core/Clock.js#L155)

The current time. Changing this property will change [`Clock#clockStep`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#clockStep) from [`ClockStep.SYSTEM_CLOCK`](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClockStep#.SYSTEM_CLOCK) to [`ClockStep.SYSTEM_CLOCK_MULTIPLIER`](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClockStep#.SYSTEM_CLOCK_MULTIPLIER).

####  multiplier : Number[Core/Clock.js 184](https://github.com/CesiumGS/cesium/blob/1.91/Source/Core/Clock.js#L184)

Gets or sets how much time advances when [`Clock#tick`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#tick) is called. Negative values allow for advancing backwards. If [`Clock#clockStep`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#clockStep) is set to [`ClockStep.TICK_DEPENDENT`](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClockStep#.TICK_DEPENDENT), this is the number of seconds to advance. If [`Clock#clockStep`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#clockStep) is set to [`ClockStep.SYSTEM_CLOCK_MULTIPLIER`](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClockStep#.SYSTEM_CLOCK_MULTIPLIER), this value is multiplied by the elapsed system time since the last call to [`Clock#tick`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#tick). Changing this property will change [`Clock#clockStep`](https://cesium.com/learn/cesiumjs/ref-doc/Clock.html#clockStep) from [`ClockStep.SYSTEM_CLOCK`](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClockStep#.SYSTEM_CLOCK) to [`ClockStep.SYSTEM_CLOCK_MULTIPLIER`](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClockStep#.SYSTEM_CLOCK_MULTIPLIER).

