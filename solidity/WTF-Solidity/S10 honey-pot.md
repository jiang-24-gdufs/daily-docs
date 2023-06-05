[toc]

#  S10. 貔貅 honey-pot

## 貔貅学入门

[貔貅](https://en.wikipedia.org/wiki/Pixiu)是中国的一个神兽，因为在天庭犯了戒，被玉帝揍的肛门封闭了，只能吃不能拉，可以帮人们聚财。但在Web3中，貔貅变为了不详之兽，韭菜的天敌。貔貅盘的特点：投资人只能买不能卖，仅有项目方地址能卖出。

通常一个貔貅盘有如下的生命周期：

1. 恶意项目方部署貔貅代币合约。
2. 宣传貔貅代币让散户上车，由于只能买不能卖，代币价格会一路走高。
3. 项目方`rug pull`卷走资金。

## 貔貅合约

这里我们介绍一个极简的ERC20代币貔貅合约`Pixiu`。在该合约中，只有合约拥有者可以在`uniswap`出售代币，其他地址不能。

`Pixiu` 有一个状态变量`pair`，用于记录`uniswap`中 `Pixiu-ETH LP`的币对地址。它主要有三个函数：

1. 构造函数：初始化代币的名称和代号，并根据 `uniswap` 和 `create2` 的原理计算`LP`合约地址，具体内容可以参考 [WTF Solidity 第25讲: Create2](https://github.com/AmazingAng/WTFSolidity/blob/main/25_Create2/readme.md)。这个地址会在 `_beforeTokenTransfer()` 函数中用到。
2. `mint()`：铸造函数，仅 `owner` 地址可以调用，用于铸造 `Pixiu` 代币。
3. `_beforeTokenTransfer()`：`ERC20`代币在被转账前会调用的函数。在其中，我们限制了当转账的目标地址 `to` 为 `LP` 的时候，也就是韭菜卖出的时候，交易会 `revert`；只有调用者为`owner`的时候能够成功。这也是貔貅合约的核心。

```solidity
// 极简貔貅ERC20代币，只能买，不能卖
contract HoneyPot is ERC20, Ownable {
    address public pair;

    // 构造函数：初始化代币名称和代号
    constructor() ERC20("HoneyPot", "Pi Xiu") {
        address factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f; // goerli uniswap v2 factory
        address tokenA = address(this); // 貔貅代币地址
        address tokenB = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6; //  goerli WETH
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA); //将tokenA和tokenB按大小排序
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        // calculate pair address
        pair = address(uint160(uint(keccak256(abi.encodePacked(
        hex'ff',
        factory,
        salt,
        hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
        )))));
    }
    
    /**
     * 铸造函数，只有合约所有者可以调用
     */
    function mint(address to, uint amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev See {ERC20-_beforeTokenTransfer}.
     * 貔貅函数：只有合约拥有者可以卖出
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        // 当转账的目标地址为 LP 时，会revert
        if(to == pair){
            require(from == owner(), "Can not Transfer");
        }
    }
}
```