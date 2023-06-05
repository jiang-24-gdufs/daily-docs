[TOC]

# JulianDate

#### new Cesium.JulianDate(julianDayNumber, secondsOfDay, timeStandard)[Core/JulianDate.js 206](https://github.com/CesiumGS/cesium/blob/1.95/Source/Core/JulianDate.js#L206)

Represents an astronomical Julian date, which is the number of days since noon on January 1, -4712 (4713 BC). For increased precision, this class stores the whole number part of the date and the seconds part of the date in separate components. In order to be safe for arithmetic and represent leap seconds, the date is always stored in the International Atomic Time standard [`TimeStandard.TAI`](https://cesium.com/learn/cesiumjs/ref-doc/global.html#TimeStandard#.TAI).

代表一个天文学的朱利安日期，这是1月1日中午以来-4712（公元前4713年）的天数。 为了提高精度，此类将日期的整数部分和日期的秒部分存储在单独的组件中。 为了安全地算术并代表LEAP秒，该日期始终存储在国际原子时间标准Timestandard.tai中。

| Name              | Type                                                         | Default            | Description                                                  |
| :---------------- | :----------------------------------------------------------- | :----------------- | :----------------------------------------------------------- |
| `julianDayNumber` | Number                                                       | `0.0`              | ``optional` ` The Julian Day Number representing the number of whole days. Fractional days will also be handled correctly.<br>朱利安日的数量代表了整天的数量。 分数日也将正确处理。 |
| `secondsOfDay`    | Number                                                       | `0.0`              | ``optional` ` The number of seconds into the current Julian Day Number. Fractional seconds, negative seconds and seconds greater than a day will be handled correctly.<br>当前朱利安日号的秒数。 分数秒，负秒和秒钟大于一天，将正确处理。 |
| `timeStandard`    | [TimeStandard](https://cesium.com/learn/cesiumjs/ref-doc/global.html#TimeStandard) | `TimeStandard.UTC` | ``optional` ` The time standard in which the first two parameters are defined. |



#### static Cesium.JulianDate.fromDate(date, result) → [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html)[Core/JulianDate.js 278](https://github.com/CesiumGS/cesium/blob/1.95/Source/Core/JulianDate.js#L278)

Creates a new instance from a JavaScript Date.

| Name     | Type                                                         | Description                                         |
| :------- | :----------------------------------------------------------- | :-------------------------------------------------- |
| `date`   | Date                                                         | A JavaScript Date.                                  |
| `result` | [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html) | `optional` An existing instance to use for the result. |

##### Returns:

The modified result parameter or a new instance if none was provided.



#### static Cesium.JulianDate.toDate(julianDate) → Date[Core/JulianDate.js 719](https://github.com/CesiumGS/cesium/blob/1.95/Source/Core/JulianDate.js#L719)

Creates a JavaScript Date from the provided instance. Since JavaScript dates are only accurate to the nearest millisecond and cannot represent a leap second, consider using [`JulianDate.toGregorianDate`](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html#.toGregorianDate) instead. If the provided JulianDate is during a leap second, the previous second is used.

| Name         | Type                                                         | Description               |
| :----------- | :----------------------------------------------------------- | :------------------------ |
| `julianDate` | [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html) | The date to be converted. |



#### static Cesium.JulianDate.now(result) → [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html)[Core/JulianDate.js 615](https://github.com/CesiumGS/cesium/blob/1.95/Source/Core/JulianDate.js#L615)

Creates a new instance that represents the current system time. This is equivalent to calling `JulianDate.fromDate(new Date());`.

| Name     | Type                                                         | Description                                         |
| :------- | :----------------------------------------------------------- | :-------------------------------------------------- |
| `result` | [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html) | `optional` An existing instance to use for the result. |



#### static Cesium.JulianDate.toIso8601(julianDate, precision) → String[Core/JulianDate.js 751](https://github.com/CesiumGS/cesium/blob/1.95/Source/Core/JulianDate.js#L751)

Creates an ISO8601 representation of the provided date.

| Name         | Type                                                         | Description                                                  |
| :----------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `julianDate` | [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html) | The date to be converted.                                    |
| `precision`  | Number                                                       | optionalThe number of fractional digits used to represent the seconds component. By default, the most precise representation is used. |



#### static Cesium.JulianDate.fromIso8601(iso8601String, result) → [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html)[Core/JulianDate.js 313](https://github.com/CesiumGS/cesium/blob/1.95/Source/Core/JulianDate.js#L313)

Creates a new instance from a from an [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) date. This method is superior to `Date.parse` because it will handle all valid formats defined by the ISO 8601 specification, including leap seconds and sub-millisecond times, which discarded by most JavaScript implementations.

| Name            | Type                                                         | Description                                         |
| :-------------- | :----------------------------------------------------------- | :-------------------------------------------------- |
| `iso8601String` | String                                                       | An ISO 8601 date.                                   |
| `result`        | [JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html) | optionalAn existing instance to use for the result. |

##### Returns:

The modified result parameter or a new instance if none was provided.