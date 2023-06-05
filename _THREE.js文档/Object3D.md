[toc]



# 构造器

Object3D()



# 属性

- scale: Vector3
  - 物体的局部缩放。默认值是Vector3( 1, 1, 1 )。
  - 使用 scale.set(x, y, z) , 一般控制尺寸只需要设置x,y分量, 有点类似于尺寸单位像素?  但是在空间中又是相对单位
- position
- rotate
- scale
- layers
  - 物体的层级关系。 物体只有和一个正在使用的**Camera**至少**在同一个层时才可见**。
  - 使用Raycaster时，此属性还可用于在射线相交测试中过滤掉不需要的对象。
- visible 
  - 值为**true**时，物体将被渲染。默认值为**true**。
- 

# 静态属性



# 方法

1. 查找类方法

   - ### .getObjectById ( id : Integer ) : Object3D

     id —— 标识该对象实例的唯一数字。

     搜索该对象的子级，返回第一个带有匹配id的子对象。
     请注意，id是按照时间顺序来分配的：1、2、3、……，每增加一个新的对象就自增1。

   - ### .getObjectByName ( name : String ) : Object3D

     name —— 用于来匹配子物体中Object3D.name属性的字符串。

     搜索该对象的子级，返回第一个带有匹配name的子对象。
     请注意，大多数的对象中name默认是一个空字符串，要使用这个方法，你将需要手动地设置name属性。

   - ### .getObjectByProperty ( name : String, value : Float ) : Object3D

     name —— 将要用于查找的属性的名称。
     value —— 给定的属性的值。

     搜索该对象的子级，返回第一个给定的属性中包含有匹配的值的子对象。

2. 转换类方法

   1. rotateX/Y/Z(rad: Float): this

      绕**局部空间**的X/Y/Z轴旋转这个物体。

   2. translateX/Y/Z(distance: Float):this

      沿着X/Y/Z轴将平移**distance**个单位。

3. 遍历

   1. traverse(callback: Function): null

      callback - 以一个object3D对象作为第一个参数的函数。

      在对象以及后代中执行的回调函数。

   2. .traverseVisible ( callback : Function ) : null

      callback - 以一个object3D对象作为第一个参数的函数。

      类似traverse函数，但在这里，回调函数仅对可见的对象执行，不可见对象的后代将不遍历。

   3. .traverseAncestors ( callback : Function ) : null

      callback - 以一个object3D对象作为第一个参数的函数。

      在所有的祖先中执行回调函数。

   

   

