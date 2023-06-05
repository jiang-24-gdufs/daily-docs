[toc]

# DataStorage

## Solidity中的引用类型

**引用类型(Reference Type)**：包括数组（`array`）和结构体（`struct`）

由于这类变量比较复杂，**占用存储空间大，我们在使用时必须要声明数据存储的位置**。

## 数据位置

solidity**数据存储位置有三类：`storage`，`memory`和`calldata`。**不同存储位置的`gas`成本不同。

`storage`类型的数据存在**链上**，类似计算机的硬盘，消耗`gas`多；

`memory`和`calldata`类型的临时存在内存里，消耗`gas`少。大致用法：

1. `storage`：**合约里的状态变量默认都是`storage`，存储在链上**。
2. `memory`：函数里的**参数和临时变量**一般用`memory`，存储在内存中，不上链。
3. `calldata`：和`memory`类似，存储在内存中，不上链。与`memory`的不同点在于**`calldata`变量不能修改**（`immutable`），一般用于函数的参数。

> 例子：

```solidity
function fCalldata(uint[] calldata _x) public pure returns(uint[] calldata){
    //参数为calldata数组，不能被修改
    // _x[0] = 0 //这样修改会报错
    return(_x);
}
```



### 数据位置和赋值规则

在**不同存储类型相互赋值**时候，有时会产生独立的副本（修改新变量不会影响原变量），有时会产生引用（修改新变量会影响原变量）。规则如下：

1. `storage`（合约的状态变量）赋值给本地`storage`（函数里的）时候，会创建引用，改变新变量会影响原变量。例子：
2. `storage`赋值给`memory`，会创建独立的副本，修改其中一个不会影响另一个；反之亦然。

3. `memory`赋值给`memory`，会创建引用，改变新变量会影响原变量。
4. 其他情况，变量赋值给`storage`，会创建独立的副本，修改其中一个不会影响另一个。

> 归纳一下:
>
> - 同类赋值创建引用, 保持统一的修改
> - 跨类赋值创建副本

例子:

    uint[] public x = [1,2,3]; // 状态变量：数组 x
    
    function fStorage() public{
        //声明一个storage的变量 xStorage，指向x。修改xStorage也会影响x
        uint[] storage xStorage = x;
        xStorage[0] = 100;
    }
    
    uint[] public x = [1,2,3]; // 状态变量：数组 x
    
    function fMemory() public view{
        //声明一个Memory的变量xMemory，复制x。修改xMemory不会影响x
        uint[] memory xMemory = x;
        xMemory[0] = 100;
        xMemory[1] = 200;
        uint[] memory xMemory2 = x;
        xMemory2[0] = 300;
    }

![image-20230524142529570](imgs/image-20230524142529570.png)![image-20230524142621355](imgs/image-20230524142621355.png)

fMemory 已经调用, x变量没改变

fStorage 已经调用, x变量改变



## 变量的作用域

`Solidity`中变量按作用域划分有三种，分别是状态变量（state variable），局部变量（local variable）和全局变量(global variable)

- 状态变量是数据存储在链上的变量，所有合约内函数都可以访问 ，`gas`消耗高。状态变量在合约内、函数外声明。可以在函数里更改状态变量的值
- 局部变量是仅在函数执行过程中有效的变量，函数退出后，变量无效。局部变量的数据存储在内存里，不上链，`gas`低。
- 全局变量是全局范围工作的变量，都是`solidity`预留关键字。他们可以在函数内不声明直接使用

```
function global() external view returns(address, uint, bytes memory){
    address sender = msg.sender;
    uint blockNum = block.number;
    bytes memory data = msg.data;
    return(sender, blockNum, data);
}
```

在上面例子里，我们使用了3个常用的全局变量：`msg.sender`, `block.number`和`msg.data`，他们分别代表请求发起地址，当前区块高度，和请求数据。

下面是一些常用的全局变量，更完整的列表请看这个[链接](https://learnblockchain.cn/docs/solidity/units-and-global-variables.html#special-variables-and-functions)：

- `blockhash(uint blockNumber)`: (`bytes32`)给定区块的哈希值 – 只适用于256最近区块, 不包含当前区块。
- `block.coinbase`: (`address payable`) 当前区块矿工的地址
- `block.gaslimit`: (`uint`) 当前区块的gaslimit
- `block.number`: (`uint`) 当前区块的number
- `block.timestamp`: (`uint`) 当前区块的时间戳，为unix纪元以来的秒
- `gasleft()`: (`uint256`) 剩余 gas
- **`msg.data`: (`bytes calldata`) 完整call data**
- **`msg.sender`: (`address payable`) 消息发送者 (当前 caller)**
- **`msg.sig`: (`bytes4`) calldata的前四个字节 (function identifier)**
- **`msg.value`: (`uint`) 当前交易发送的`wei`值**



### 全局变量-以太单位与时间单位 [文档](https://learnblockchain.cn/docs/solidity/units-and-global-variables.html#ether)

`Solidity`中不存在小数点，以`0`代替为小数点，来确保交易的精确度，并且防止精度的损失，利用以太单位可以避免误算的问题，方便程序员在合约中处理货币交易。

- `wei`: 1
- `gwei`: 1e9 = 1000000000
- `ether`: 1e18 = 1000000000000000000

为了保证精度把1eth/1e18的值作为最小单位



时间单位在`Solidity`中是一个重要的概念，有助于提高合约的可读性和可维护性。

**秒是缺省时间单位**，在时间单位之间, 数字后面带有 `seconds`、 `minutes`、 `hours`、 `days` 和 `weeks` 的可以进行换算

- `1 == 1 seconds`
- `1 minutes == 60 seconds`
- `1 hours == 60 minutes`
- `1 days == 24 hours`
- `1 weeks == 7 days`