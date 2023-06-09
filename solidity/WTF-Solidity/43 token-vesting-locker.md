[toc]

# 线性释放

## 代币归属条款

在区块链领域，`Web3`初创公司会给团队分配代币，同时也会将代币低价出售给风投和私募。如果他们把这些低成本的代币同时提到交易所变现，币价将被砸穿，散户直接成为接盘侠。

项目方一般会约定代币归属条款（token vesting），在归属期内逐步释放代币，减缓抛压，并防止团队和资本方过早躺平。



# 代币锁

什么是流动性提供者`LP`代币，为什么要锁定流动性，并写一个简单的`ERC20`代币锁合约。

代币锁(Token Locker)是一种简单的时间锁合约，它可以把合约中的代币锁仓一段时间，受益人在锁仓期满后可以取走代币。代币锁一般是用来锁仓流动性提供者`LP`代币的。



### 什么是`LP`代币？

区块链中，用户在去中心化交易所`DEX`上交易代币，例如`Uniswap`交易所。`DEX`和中心化交易所(`CEX`)不同，去中心化交易所使用自动做市商(`AMM`)机制，需要用户或项目方提供资金池，以使得其他用户能够即时买卖。简单来说，用户/项目方需要质押相应的币对（比如`ETH/DAI`）到资金池中，作为补偿，`DEX`会给他们铸造相应的流动性提供者`LP`代币凭证，证明他们质押了相应的份额，供他们收取手续费。

### 为什么要锁定流动性？

如果项目方毫无征兆的撤出流动性池中的`LP`代币，那么投资者手中的代币就无法变现，直接归零了。这种行为也叫`rug-pull`，仅2021年，各种`rug-pull`骗局从投资者那里骗取了价值超过28亿美元的加密货币。

但是如果`LP`代币是锁仓在代币锁合约中，在锁仓期结束以前，项目方无法撤出流动性池，也没办法`rug pull`。因此代币锁可以防止项目方过早跑路（要小心锁仓期满跑路的情况）。

