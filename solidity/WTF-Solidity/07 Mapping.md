[toc]

# 映射类型 mapping

Solidity中存储键值对的数据结构，可以理解为哈希表。

声明映射的格式为`mapping(_KeyType => _ValueType)`，其中`_KeyType`和`_ValueType`分别是`Key`和`Value`的变量类型。

```
mapping(uint => address) public idToAddress; // id映射到地址
mapping(address => address) public swapPair; // 币对的映射，地址到地址
```

## 映射的规则

- **规则1**：映射的`_KeyType`只能选择Solidity内置的值类型，比如`uint`，`address`等，不能用自定义的结构体。而`_ValueType`可以使用自定义的类型。

- **规则2**：**映射的存储位置必须是`storage`**，因此可以用于合约的状态变量，函数中的`storage`变量，和library函数的参数（见[例子](https://github.com/ethereum/solidity/issues/4635)）。不能用于`public`函数的参数或返回结果中，因为`mapping`记录的是一种关系 (key - value pair)。

- **规则3**：如果映射声明为`public`，那么Solidity会自动给你创建一个`getter`函数，可以通过`Key`来查询对应的`Value`。
- **规则4**：给映射新增的键值对的语法为`_Var[_Key] = _Value`，其中`_Var`是映射变量名，`_Key`和`_Value`对应新增的键值对。

## 映射的原理

- **原理1**: 映射不储存任何键（`Key`）的资讯，也没有length的资讯。
- **原理2**: 映射使用`keccak256(abi.encodePacked(key, slot))`当成offset存取value，其中`slot`是映射变量定义所在的插槽位置。
- **原理3**: 因为Ethereum会定义所有未使用的空间为0，所以未赋值（`Value`）的键（`Key`）初始值都是各个type的默认值，如uint的默认值是0。

> 理解映射（Mapping）的原理可以帮助我们更好地理解其在 Solidity 中的工作方式。下面是对原理1、原理2和原理3的解释：
>
> 原理1: 映射不储存任何键（Key）的信息，也没有length的信息。
> - 映射本质上是一种键值对的结构，用于将键映射到相应的值。然而，映射并不像数组或列表那样存储所有键的信息，也没有类似数组长度（length）的信息。相反，映射只存储已赋值的键值对。
>
> 原理2: 映射使用keccak256(abi.encodePacked(key, slot))作为offset来存取value，其中slot是映射变量定义所在的插槽位置。
> - 在底层实现中，映射使用键（Key）的哈希值（使用keccak256函数计算）和插槽位置（slot）来计算偏移量（offset），并用该偏移量来存取相应的值（Value）。插槽位置是映射变量定义所在的存储位置。
>
> 原理3: 因为以太坊会将所有未使用的空间初始化为0，所以未赋值（Value）的键（Key）初始值都是各个类型的默认值，如uint的默认值是0。
> - **在以太坊的存储模型中，所有未使用的存储空间都会被初始化为0**。因此，对于映射中未赋值的键（Key），它们的初始值将是相应类型的默认值。例如，对于uint类型，默认值为0。
>
> 综上所述，映射（Mapping）在 Solidity 中是一种键值对的结构，它使用哈希值和插槽位置来存储和访问值。未赋值的键的初始值是相应类型的默认值，由于未使用的存储空间被初始化为0。映射的灵活性和高效性使其成为在智能合约中存储和检索数据的常用工具。



> #### abi.encodePacked(key, slot) 这里的代码是什么意思
>
> `abi.encodePacked(key, slot)` 是 Solidity 中的一个函数调用，**用于将参数打包成紧凑的字节序列**。
>
> 具体来说：
> - `abi` 是 Solidity 中的一个库，提供了与 ABI（Application Binary Interface）相关的功能。
> - `encodePacked` 是 `abi` 库中的一个函数，用于将参数打包成紧凑的字节序列。
> - `key` 和 `slot` 是函数调用的参数，可以是任意 Solidity 类型的表达式。
>
> 通过调用 `abi.encodePacked(key, slot)`，我们可以将 `key` 和 `slot` 参数的字节表示按顺序打包在一起，形成一个紧凑的字节序列。这个字节序列通常用于在 Solidity 中进行哈希计算或其他需要紧凑字节表示的操作。
>
> 在原理2中提到的映射原理中，`abi.encodePacked(key, slot)` 用于计算键（key）和插槽位置（slot）的组合，以生成用于访问映射值的偏移量（offset）。实际上，这里的 `abi.encodePacked(key, slot)` 将键和插槽位置的字节表示进行拼接，并作为输入来计算哈希值，用于生成偏移量。
>
> 总结而言，`abi.encodePacked(key, slot)` 是 Solidity 中用于将参数打包成紧凑字节序列的函数，常用于哈希计算或其他需要处理字节表示的操作。在映射中的原理2中，它被用于计算偏移量以访问映射的值。



## 变量初始值

在`solidity`中，声明但没赋值的变量都有它的初始值或默认值。

### 值类型初始值

- `boolean`: `false`
- `string`: `""`
- `int`: `0`
- `uint`: `0`
- `enum`: 枚举中的第一个元素
- `address`: `0x0000000000000000000000000000000000000000` (或 `address(0)`)
- `function`
  - `internal`: 空白函数
  - `external`: 空白函数

可以用`public`变量的`getter`函数验证上面写的初始值是否正确：

```
    bool public _bool; // false
    string public _string; // ""
    int public _int; // 0
    uint public _uint; // 0
    address public _address; // 0x0000000000000000000000000000000000000000

    enum ActionSet { Buy, Hold, Sell}
    ActionSet public _enum; // 第1个内容Buy的索引0

    function fi() internal{} // internal空白函数
    function fe() external{} // external空白函数 
```

### 引用类型初始值

- 映射`mapping`: 所有元素都为其默认值的`mapping`
- 结构体`struct`: 所有成员设为其默认值的结构体, (key/value都为0)
- 数组`array`
  - 动态数组: `[]`
  - 静态数组（定长）: 所有成员设为其默认值的静态数组

可以用`public`变量的`getter`函数验证上面写的初始值是否正确：

```solidity
    // Reference Types
    uint[8] public _staticArray; // 所有成员设为其默认值的静态数组[0,0,0,0,0,0,0,0]
    uint[] public _dynamicArray; // `[]`
    mapping(uint => address) public _mapping; // 所有元素都为其默认值的mapping
    // 所有成员设为其默认值的结构体 0, 0
    struct Student{
        uint256 id;
        uint256 score; 
    }
    Student public student;
```

### `delete`操作符

`delete a`会让变量`a`的值变为初始值。



# 常数 constant和immutable

`constant`（常量）和`immutable`（不变量）。

状态变量声明这个两个关键字之后，不能在合约后更改数值。这样做的好处是提升合约的安全性并节省`gas`。

只有**数值**变量可以声明`constant`和`immutable`；

`string`和`bytes`可以声明为`constant`，但不能为`immutable`。

### constant

`constant`变量必须在声明的时候初始化，之后再也不能改变。尝试改变的话，编译不通过。

```
    // constant变量必须在声明的时候初始化，之后不能改变
    uint256 constant CONSTANT_NUM = 10;
    string constant CONSTANT_STRING = "0xAA";
    bytes constant CONSTANT_BYTES = "WTF";
    address constant CONSTANT_ADDRESS = 0x0000000000000000000000000000000000000000;
```

### immutable

`immutable`变量**可以在声明时或构造函数中初始化**，因此更加灵活。

```
    // immutable变量可以在constructor里初始化，之后不能改变
    uint256 public immutable IMMUTABLE_NUM = 9999999999;
    address public immutable IMMUTABLE_ADDRESS;
    uint256 public immutable IMMUTABLE_BLOCK;
    uint256 public immutable IMMUTABLE_TEST;
```

- `constant`变量初始化之后，尝试改变它的值，会编译不通过并抛出`TypeError: Cannot assign to a constant variable.`的错误。
- `immutable`变量初始化之后，尝试改变它的值，会编译不通过并抛出`TypeError: Immutable state variable already initialized.`的错误。