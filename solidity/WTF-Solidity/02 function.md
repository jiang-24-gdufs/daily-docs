[toc]

# Function

```sol
function <function name>(<parameter types>) {internal|external|public|private} [pure|view|payable] [returns (<return types>)]
```

- `{internal|external|public|private}`：函数可见性说明符
- `[pure|view|payable]`：决定函数权限/功能的关键字
- `returns`：跟在函数名后面，用于声明返回的变量类型及变量名。
- `return`：用于函数主体中，返回指定的变量。



## 函数可见性

1. `{internal|external|public|private}`：函数可见性说明符，共有4种。

   - `public`：内部和外部均可见。
   - `private`：只能从本合约内部访问，继承的合约也不能使用。
   - `external`：只能从合约外部访问（但内部可以通过 `this.f()` 来调用，`f`是函数名）。
   - `internal`: 只能从合约内部访问，继承的合约可以用。

   **注意 1**：合约中定义的函数需要明确指定可见性，它们没有默认值。

   **注意 2**：`public|private|internal` 也可用于修饰状态变量。`public`变量会自动生成同名的`getter`函数，用于查询数值。未标明可见性类型的状态变量，默认为`internal`。



### internal v.s. external

- `internal` : 合约内的函数可以调用内部函数



## 关键字 [pure|view|payable]

决定函数权限/功能的关键字。

`payable`（可支付的）很好理解，带着它的函数，运行的时候可以给合约转入 ETH。

`pure` 和 `view`

`solidity` 引入这两个关键字主要是因为 以太坊交易需要支付气费（gas fee）。合约的状态变量存储在链上，gas fee 很贵，如果计算不改变链上状态，就可以不用付 `gas`。

包含 `pure` 和 `view` 关键字的函数是不改写链上状态的

- `pure` 函数既**不能读取也不能写入**链上的状态变量。
- `view`函数**能读取但也不能写入**状态变量

### 修改链上状态

在以太坊中，以下语句被视为修改链上状态：

1. 写入状态变量。
2. 释放事件。
3. 创建其他合约。
4. 使用 `selfdestruct`.
5. 通过调用发送以太币。
6. 调用任何未标记 `view` 或 `pure` 的函数。
7. 使用低级调用（low-level calls）。
8. 使用包含某些操作码的内联汇编。



### payable

`payable`: 递钱，能给合约支付eth的函数



## 返回值：return 和 returns

Solidity 中与函数输出相关的有两个关键字：`return`和`returns`。它们的区别在于：

- `returns`：跟在函数名后面，用于声明返回的变量类型及变量名。
- `return`：用于函数主体中，返回指定的变量。

```solidity
// 返回多个变量
function returnMultiple() public pure returns(uint256, bool, uint256[3] memory){
    return(1, true, [uint256(1),2,5]);
}
```



我们可以在 `returns` 中标明返回**变量的名称**。

Solidity **会初始化这些变量，并且自动返回这些函数的值**，无需使用 `return`。

```
// 命名式返回
function returnNamed() public pure returns(uint256 _number, bool _bool, uint256[3] memory _array){
    _number = 2;
    _bool = false;
    _array = [uint256(3),2,1];
}
```



## 解构式赋值

Solidity支持使用解构式赋值规则来读取函数的全部或部分返回值。

- 读取所有返回值：声明变量，然后将要赋值的变量用`,`隔开，按顺序排列。

```solidity
uint256 _number;
bool _bool;
uint256[3] memory _array;
(_number, _bool, _array) = returnNamed();
```



- 读取部分返回值：声明要读取的返回值对应的变量，不读取的留空。在下面的代码中，我们只读取`_bool`，而不读取返回的`_number`和`_array`：

```solidity
(, _bool2, ) = returnNamed();
```