[TOC]



# DataView [地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)

**`DataView`** 视图是一个可以从 二进制[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的[字节序](https://developer.mozilla.org/zh-CN/docs/Glossary/Endianness)问题。

<iframe class="interactive interactive-js" frameborder="0" height="250" src="https://interactive-examples.mdn.mozilla.net/pages/js/dataview-constructor.html" title="MDN Web Docs Interactive Example" width="100%" style="margin: 0px; padding: 10px; border: 1px solid rgb(234, 242, 244); max-width: 100%; box-sizing: border-box; background-color: rgb(245, 249, 250); color: rgb(51, 51, 51); height: 490px; width: 770.25px;"></iframe>

## 语法

```
new DataView(buffer [, byteOffset [, byteLength]])
```

### 参数



- `buffer`

  一个 已经存在的[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 或 [`SharedArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) 对象，`DataView` 对象的数据源。

- `byteOffset` 可选

  此 `DataView` 对象的第一个字节在 buffer 中的字节偏移。如果未指定，则默认从第一个字节开始。

- `byteLength` 可选

  此 DataView 对象的字节长度。如果未指定，这个视图的长度将匹配buffer的长度。

### 返回值



一个表示指定数据缓存区的新`DataView` 对象。（这句话也许不是非常有助于说明清楚）

你可以把返回的对象想象成一个二进制字节缓存区 array buffer 的“解释器”——它知道如何在读取或写入时正确地转换字节码。这意味着它能在二进制层面处理整数与浮点转化、字节顺序等其他有关的细节问题。

### 异常



- `RangeError`

  如果 `byteOffset` 或者 `byteLength `参数的值导致视图超出了 buffer 的结束位置就会抛出此异常。 例如，假设 buffer （缓冲对象）是 16 字节长度，`byteOffset` 参数为 8，`byteLength` 参数为 10，这个错误就会抛出，这是因为结果视图试图超出 buffer 对象的总长度 2 个字节。

## 描述

### Endianness（字节序）



需要多个字节来表示的数值，在存储时其字节在内存中的相对顺序依据平台架构的不同而不同，参照 [Endianness](https://developer.mozilla.org/zh-CN/docs/Glossary/Endianness)。而使用 DataView 的访问函数时，不需要考虑平台架构中所使用的是哪种字节序。

```js
var littleEndian = (function() {
  var buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true /* 设置值时，使用小端字节序 */);
  // Int16Array 使用系统字节序（由此可以判断系统字节序是否为小端字节序）
  return new Int16Array(buffer)[0] === 256;
})();
console.log(littleEndian); // 返回 true 或 false
```

### 64 位整数值



因为 JavaScript 目前不包含对 64 位整数值支持的标准，所以 `DataView` 不提供原生的 64 位操作。作为变通，您可以实现自己的 `getUint64()` 函数，以获得精度高达 [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) 的值，可以满足某些特定情况的需求。

```js
function getUint64(dataview, byteOffset, littleEndian) {
  // 将 64 位整数值分成两份 32 位整数值
  const left =  dataview.getUint32(byteOffset, littleEndian);
  const right = dataview.getUint32(byteOffset+4, littleEndian);

  // 合并两个 32 位整数值
  const combined = littleEndian? left + 2**32*right : 2**32*left + right;

  if (!Number.isSafeInteger(combined))
    console.warn(combined, 'exceeds MAX_SAFE_INTEGER. Precision may be lost');

  return combined;
}
```

或者，如果需要填满 64 位，可以创建一个 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。此外，尽管原生 BigInt 要比用户端的库中模拟的 BigInt 快得多，但在 JavaScript 中，BigInt 总是比 32 位整数慢得多，这是因为 BigInt 的大小是可变的。

```js
const BigInt = window.BigInt, bigThirtyTwo = BigInt(32), bigZero = BigInt(0);
function getUint64BigInt(dataview, byteOffset, littleEndian) {
  // 将 64 位整数值分成两份 32 位整数值
  const left = BigInt(dataview.getUint32(byteOffset|0, !!littleEndian)>>>0);
  const right = BigInt(dataview.getUint32((byteOffset|0) + 4|0, !!littleEndian)>>>0);

  // 合并两个 32 位整数值并返回
  return littleEndian ? (right<<bigThirtyTwo)|left : (left<<bigThirtyTwo)|right;
}
```

## 属性

所有 `DataView` 实例都继承自 [`DataView.prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/prototype)，并且允许向 DataView 对象中添加额外属性。

- [`DataView.prototype.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/constructor)

  指定用来生成原型的构造函数.初始化值是标准内置DataView构造器.

- [`DataView.prototype.buffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/buffer) 只读

  被视图引入的[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).创建实例的时候已固化因此是只读的.

- [`DataView.prototype.byteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/byteLength) 只读

  从 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)中读取的字节长度. 创建实例的时候已固化因此是只读的.

- [`DataView.prototype.byteOffset`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/byteOffset) 只读

  从 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)读取时的偏移字节长度. 创建实例的时候已固化因此是只读的.

## 方法

### 读

- [`DataView.prototype.getInt8()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt8)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处获取一个8-bit数(一个字节).

- [`DataView.prototype.getUint8()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint8)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处获取一个8-bit数(无符号字节).

- [`DataView.prototype.getInt16()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt16)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处获取一个16-bit数(短整型).

- [`DataView.prototype.getUint16()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint16)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处获取一个16-bit数(无符号短整型).

- [`DataView.prototype.getInt32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt32)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处获取一个32-bit数(长整型).

- [`DataView.prototype.getUint32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint32)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处获取一个32-bit数(无符号长整型).

- [`DataView.prototype.getFloat32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat32)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处获取一个32-bit数(浮点型).

- [`DataView.prototype.getFloat64()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat64)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处获取一个64-bit数(双精度浮点型).

### 写

- [`DataView.prototype.setInt8()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt8)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处储存一个8-bit数(一个字节).

- [`DataView.prototype.setUint8()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint8)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处储存一个8-bit数(无符号字节).

- [`DataView.prototype.setInt16()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt16)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处储存一个16-bit数(短整型).

- [`DataView.prototype.setUint16()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint16)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处储存一个16-bit数(无符号短整型).

- [`DataView.prototype.setInt32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt32)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处储存一个32-bit数(长整型).

- [`DataView.prototype.setUint32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint32)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处储存一个32-bit数(无符号长整型).

- [`DataView.prototype.setFloat32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat32)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处储存一个32-bit数(浮点型).

- [`DataView.prototype.setFloat64()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat64)

  `从`[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)起始位置以byte为计数的指定偏移量(byteOffset)处储存一个64-bit数(双精度浮点型).

## 示例

```js
var buffer = new ArrayBuffer(16);
var view = new DataView(buffer, 0);

view.setInt16(1, 42);
view.getInt16(1); // 42
```