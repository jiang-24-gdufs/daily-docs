[toc]

# Layers

Layers 对象为 Object3D 分配 1个到 32 个图层。32个图层从 0 到 31 编号标记。 在内部实现上，每个图层对象被存储为一个 [bit mask~位掩码`](https://en.wikipedia.org/wiki/Mask_(computing))， 默认所有 Object3D 对象都存储在第 0 个图层上。

图层对象可以用于控制对象的显示。当 camera 的内容被渲染时与其**共享图层相同的物体会被显示**。每个对象都需要与一个 camera 共享图层。 camera带有layers属性, 是从Object3D继承下来的

每个继承自 Object3D 的对象都有一个 Object3D.layers 对象。



## 构造函数

### Layers()

创建一个新的图层对象，该对象默认与第 0 图层关联。



## 属性

### .mask : Integer

用 bit mask 表示当前图层对象与 0 - 31 中的哪些图层相对应。所属层所对应的比特位为 1，其他位位 0。





## 方法

### .disable ( layer : Integer ) : null

layer - 一个 0 - 31 的整数。

删除图层对象与参数指定图层的对应关系。

### .enable ( layer : Integer ) : null

layer - 一个 0 - 31 的整数。

增加图层对象与参数指定图层的对应关系。

### .set ( layer : Integer ) : null

layer - 一个 0 - 31 的整数。

删除图层对象已有的所有对应关系，增加与参数指定的图层的对应关系。

### .test ( layers : Layers ) : Boolean

layers - 一个图层对象。

如果传入图层对象与当前对象属于相同的一组图层，则返回 true，否则返回 false。

### .toggle ( layer : Integer ) : null

layer - 一个 0 - 31 的整数。

根据参数切换对象所属图层。

### .enableAll () : null

Add membership to all layers.

### .disableAll () : null

Remove membership from all layers.