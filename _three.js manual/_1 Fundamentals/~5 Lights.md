# 光照

### 动态地改变光照的参数

使用 [lil-gui](https://github.com/georgealways/lil-gui) 来实现

为了可以通过 `lil-gui` 调节颜色，我们创建一个辅助对象。

对象内有一个 `getter` 和 `setter`，当 `lil-gui` 从对象内获取 `value` 值的时候，触发了 `getter`，会根据创建对象实例时传入的 `object` 和 `prop`，返回一个十六进制色值的字符串，当通过 `lil-gui` 控制改变这个 `value` 的时候，就触发了 `setter`，会用十六进制的色值字符串作为参数调用 `object.prop.set`。

以下是 helper 类的代码：

```js
class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}
```

以及创建 lil-gui 的代码：

```js
const gui = new GUI();
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 2, 0.01);
```

## 环境光

这就是环境光，它没有方向，无法产生阴影，**场景内任何一点受到的光照强度都是相同的**，除了改变场景内所有物体的颜色以外，不会使物体产生明暗的变化，看起来并不像真正意义上的光照。

通常的作用是提亮场景，让暗部不要太暗。

## 半球光



## 方向光

方向光（[`DirectionalLight`](http://127.0.0.1:5500/docs/#api/zh/lights/DirectionalLight)）常常用来表现太阳光照的效果。

方向光对象需要添加目标点 `light.target.position.set(-5, 0, 0);`

方向光（[`DirectionalLight`](http://127.0.0.1:5500/docs/#api/zh/lights/DirectionalLight)）的方向是从它的位置照向目标点的位置。

方向光(平行光)表示的是来自一个方向上的光，并不是从某个点发射出来的，而是**从一个无限大的平面内，发射出全部相互平行的光线**。



辅助对象: 使用`DirectionalLightHelper`

```js
const helper = new THREE.DirectionalLightHelper(light);
scene.add(helper);

function updateLight() {
    light.target.updateMatrixWorld();
    helper.update();
}
updateLight();

gui.add(light, 'intensity', 0, 2, 0.01);
```



## 点光源（[`PointLight`](http://127.0.0.1:5500/docs/#api/zh/lights/PointLight)）

是从一个点朝各个方向发射出光线的一种光照效果。

添加一个 `PointLightHelper`

[`PointLightHelper`](http://127.0.0.1:5500/docs/#api/zh/helpers/PointLightHelper) 不是一个点，而是在光源的位置绘制了一个小小的线框宝石体来代表点光源。也可以使用其他形状来表示点光源，只要给点光源添加一个自定义的 [`Mesh`](http://127.0.0.1:5500/docs/#api/zh/objects/Mesh) 子节点即可。

点光源（[`PointLight`](http://127.0.0.1:5500/docs/#api/zh/lights/PointLight)）有额外的一个范围（[`distance`](http://127.0.0.1:5500/docs/#api/zh/lights/PointLight#distance)）属性。 

- 如果 `distance` 设为 0，则光线可以照射到无限远处。
- 如果大于 0，则只可以照射到指定的范围，**光照强度在这个过程中逐渐衰减**，在光源位置时，`intensity` 是设定的大小，在距离光源 `distance` 位置的时候，`intensity` 为 0。

```js
const helper = new THREE.PointLightHelper(light);
scene.add(helper);

function updateLight() {
    helper.update();
}

gui.add(light, 'intensity', 0, 2, 0.01);
gui.add(light, 'distance', 0, 40).onChange(updateLight);

```



## 聚光灯

## 矩形区域光



### 其他

 [`WebGLRenderer`](http://127.0.0.1:5500/docs/#api/zh/renderers/WebGLRenderer) 中有一个设置项 `physicallyCorrectLights`。

这个设置会影响（随着离光源的距离增加）光照如何减弱。这个设置会影响点光源（[`PointLight`](http://127.0.0.1:5500/docs/#api/zh/lights/PointLight)）和聚光灯（[`SpotLight`](http://127.0.0.1:5500/docs/#api/zh/lights/SpotLight)），矩形区域光（[`RectAreaLight`](http://127.0.0.1:5500/docs/#api/zh/lights/RectAreaLight)）会自动应用这个特性。

在设置光照时，基本思路是不要设置 `distance` 来表现光照的衰减，也不要设置 `intensity`。

而是**设置光照的 [`power`](http://127.0.0.1:5500/docs/#api/zh/lights/PointLight#power) 属性**，以**流明为单位**，three.js 会进行物理计算，从而**表现出接近真实的光照效果**。

在这种情况下 three.js 参与计算的长度单位是米，一个 60瓦 的灯泡大概是 800 流明强度。并且光源有一个 **[`decay`](http://127.0.0.1:5500/docs/#api/zh/lights/PointLight#decay) 属性，为了模拟真实效果，应该被设置为 `2`。**



需要注意，每添加一个**光源**到场景中，都会**降低 three.js 渲染场景的速度**，所以应该尽量使用最少的资源来实现想要的效果。