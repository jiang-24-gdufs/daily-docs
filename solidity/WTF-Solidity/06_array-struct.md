[toc]

# 引用类型 array, struct

## 数组 array

数组（`Array`）是`solidity`常用的一种变量类型，用来存储一组数据（整数，字节，地址等等）。

数组分为固定长度数组和可变长度数组两种：

- 固定长度数组：在声明时指定数组的长度。用`T[k]`的格式声明，其中`T`是元素的类型，`k`是长度

- 可变长度数组（动态数组）：在声明时不指定数组的长度。用`T[]`的格式声明，其中`T`是元素的类型

```solidity
// 固定长度 Array
uint[8] array1;
bytes1[5] array2;
address[100] array3;

// 可变长度 Array
uint[] array4;
bytes1[] array5;
address[] array6;
bytes array7; // bytes 类型为数组
```

**注意**：`bytes`比较特殊，是数组，但是不用加`[]`。另外，不能用`byte[]`声明单字节数组，可以使用`bytes`或`bytes1[]`。`bytes` 比 `bytes1[]` 省gas。



### 创建数组的规则

在solidity里，创建数组有一些规则：

- 对于`memory`修饰的`动态数组`，可以用`new`操作符来创建，但是必须声明长度，并且声明后长度不能改变。
- 数组字面常数(Array Literals)是写作表达式形式的数组，用方括号包着来初始化array的一种方式，并且里面每一个元素的type是以第一个元素为准的，例如`[1,2,3]`里面所有的元素都是`uint8`类型，因为在solidity中如果一个值没有指定type的话，默认就是**最小单位**的该type，这里 **`uint` 的默认最小单位类型就是`uint8`**。而`[uint(1),2,3]`里面的元素都是`uint`类型，因为第一个元素指定了是`uint`类型了，我们都以第一个元素为准。
- 如果创建的是动态数组，你需要一个一个元素的赋值。

```solidity
// memory动态数组
uint[] memory array8 = new uint[](5);
bytes memory array9 = new bytes(9);

 uint[] memory x = new uint[](3);
x[0] = 1;
x[1] = 3;
x[2] = 4;
```

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract C {
    function f() public pure {
        g([uint(1), 2, 3]);
    }
    function g(uint[3] memory) public pure {
        // ...
    }
}
```

### 数组成员

- `length`: 数组有一个包含元素数量的`length`成员，`memory`数组的长度在创建后是固定的。
- `push()`: `动态数组`拥有`push()`成员，可以在数组最后添加一个**`0`元素**，并返回该元素的引用。
- `push(x)`: `动态数组`拥有`push(x)`成员，可以在数组最后添加一个`x`元素。
- `pop()`: `动态数组`拥有`pop()`成员，可以移除数组最后一个元素。



## 结构体 struct

`Solidity`支持通过构造结构体的形式定义新的类型。

结构体中的元素可以是原始类型，也可以是引用类型；结构体可以作为数组或映射的元素。

创建结构体的方法：

```solidity
// 结构体
    struct Student{
        uint256 id;
        uint256 score; 
    }

    Student student; // 初始一个student结构体
    
    // 构造函数式创建结构体
    student = Student(3, 90);
    // 构造函数式key value
     student = Student({id: 4, score: 60});
```