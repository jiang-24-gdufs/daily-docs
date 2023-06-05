# explorer-api

> https://zksync2-mainnet-explorer.zksync.io/transactions?limit=100&direction=older&accountAddress=0x7e7F6037d8FaaA29e1F70fb2BD22CE79A2dd8eAe

这里是一个zksync era的查询一个地址的交易的查询接口, 请读取该查询接口的交易总数并对该接口中的交易项进行解析, 告诉我每个字段分别是什么意思

以下是对查询接口的字段进行解析的说明：

1. "total": 交易总数，表示满足查询条件的交易总数目。
2. "limit": 查询的交易项数量限制。
3. "direction": 查询的方向，可能是"older"（较旧的交易）或"newer"（较新的交易）。
4. "accountAddress": 查询的账户地址，即指定的EVM地址。
5. "transactions": 交易项列表，包含每个交易的详细信息。

## transaction

这是提供的交易项的字段解析：

"transactionHash": 交易的哈希值，用于唯一标识该交易。
"data": 交易的详细数据信息。
"contractAddress": 合约地址，指定合约的EVM地址。
"calldata": 交易的调用数据，包括函数调用和参数。
"value": 交易的值，表示发送的货币数量或资产价值。
"factoryDeps": 工厂依赖，相关的合约工厂依赖关系。
"isL1Originated": 交易是否是来自第一层（Layer 1）的交易。
"status": 交易的状态，表示交易是否已验证。
"fee": 交易的手续费金额。
"nonce": 交易的随机数（nonce），用于防止重放攻击。
"blockNumber": 交易所在的区块号。
"l1BatchNumber": 第一层（Layer 1）批次号，指示交易所属的批次。
"blockHash": 交易所在区块的哈希值。
"indexInBlock": 交易在区块中的索引位置。
"initiatorAddress": 交易发起者的地址，即交易的发送者。
"receivedAt": 交易接收时间，表示交易被接收的时间戳。
"ethCommitTxHash": 以太坊提交交易的哈希值。
"ethProveTxHash": 以太坊证明交易的哈希值。
"ethExecuteTxHash": 以太坊执行交易的哈希值。
"erc20Transfers": ERC20代币转账列表。
"tokenInfo": 代币信息，包括代币地址、符号、名称、小数位数等。
"from": 代币发送者的地址。
"to": 代币接收者的地址。
"amount": 代币转账数量。
"balanceChanges": 余额变动列表，包括发送者和接收者的地址、金额和类型。
"tokenInfo": 代币信息，包括代币地址、符号、名称、小数位数等。
"from": 资金发送者的地址。
"to": 资金接收者的地址。
"amount": 资金变动的数量。
"type": 资金变动的类型，例如手续费（fee）或转账（transfer）。
"type": 交易类型，表示交易的种类。