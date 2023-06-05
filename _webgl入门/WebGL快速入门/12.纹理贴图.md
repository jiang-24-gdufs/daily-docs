# WebGL纹理贴图

在实际的工程中创建三维场景往往会使用纹理贴图，简单地说就是把png、jpg等格式图片显示在WebGL三维场景中，比如一个产品的三维模型上贴一个商标。一张图片从数据结构的角度看， 文件中包含的信息就是和颜色缓冲区中的RGB或RGBA数据一样，.jpg格式图片数据包含RGB红绿蓝三个颜色分量，.png格式图片的数据除了RGB三个分量还包含透明度A分量， 在WebGL中可以通过调节透明度A分量的值可以实现颜色叠加，模拟透明、半透明的玻璃效果。

前面学习过顶点位置坐标、顶点颜色、顶点法向量三种顶点数据，本节课要引入新的顶点数据纹理坐标。图片称为纹理图像，图片上的一个像素称为纹素，一个纹素就是一个RGB或RGBA值。 把整个图片看成一个平面区域，用一个二维Uv坐标系可以描述每一个纹素的位置。

![UV](http://www.webgl3d.cn/upload/webgl22UV.png)

### 整体解析代码

程序定义了四个顶点位置坐标，同时定义了4个纹理坐标，两组坐标一一对应，顶点坐标会经过光栅化处理得到片元数据，纹理坐标在光栅化过程中会进行插值计算， 内插出一系列纹理坐标数据，每一片元都对应一个纹理坐标，内插出的纹理坐标会按照一定的规律对应纹理图像上的纹素，内插得到的片元纹理坐标会传递给片元着色器。

图片的像素数据会通过相关WebGL API处理后传递给片元着色器，片元着色器利用插值计算得到的坐标数据可以抽取纹理图像中的纹素，把抽取的纹素逐个赋值给光栅化顶点坐标得到的片元。

理解纹理映射的代码可以参考1.7节《varying变量和颜色插值》，通过类比学习，一方面可以节约学习成本， 另一方面可以更加清晰地理解渲染管线的运行规律。《varying变量和颜色插值》中程序，顶点颜色数据会进行插值计算，得到的与片元一一对应的像素值， 像素数据然后传递给片元着色器逐片元赋值给像素对应的片元。本节课的程序中没有顶点颜色数据，片元的颜色值来自纹理图片，进行插值计算的不是顶点颜色数据而是纹理坐标。

顶点着色器源码

```javascript
attribute vec4 a_Position;//顶点位置坐标
attribute vec2 a_TexCoord;//纹理坐标
varying vec2 v_TexCoord;//插值后纹理坐标
void main() {
  //顶点坐标apos赋值给内置变量gl_Position
  gl_Position = a_Position;
  //纹理坐标插值计算
  v_TexCoord = a_TexCoord;
}
```

片元着色器源码

```javascript
//所有float类型数据的精度是highp
precision highp float;
// 接收插值后的纹理坐标
varying vec2 v_TexCoord;
// 纹理图片像素数据
uniform sampler2D u_Sampler;
void main() {
  // 采集纹素，逐片元赋值像素值
  gl_FragColor = texture2D(u_Sampler,v_TexCoord);
}
```

这段程序和《varying变量和颜色插值》的着色器程序整体上是神似的，区别是多了`uniform sampler2D u_Sampler;`，其它的地方都是代码的细节不同，框架结构是没有变化的。

第13行代码声明了一个顶点位置坐标变量，顶点的位置决定的事纹理贴图会被映射在WebGL三维空间中的那个位置。第14行代码声明的是纹理坐标变量，纹理坐标也是顶点数据，因此使用关键字attribute声明， 声明的是二维纹理坐标，因此定义的是包含两个分量的vec2类型数据。三个顶点坐标可以在WebGL图形系统三维空间中确定一个三角形区域，三个纹理坐标数据可以对应一张纹理图片上的三角形区域上的纹素，这也就是说， 映射一张矩形纹理贴图，至少要定义两个三角面，两个三角面包含六个顶点，有两个顶点位置重复，也就是说至少要定义4个顶点位置坐标，4个纹理坐标。

`varying vec2 v_TexCoord;`使用关键字`varying`声明了一个纹理坐标变量`v_TexCoord`，在main函数中`v_TexCoord = a_TexCoord;`把`attribute`关键字声明的纹理坐标变量`a_TexCoord`赋值给`varying`关键字声明的纹理坐标变量`v_TexCoord`， 前面说过关键字`attribute`声明的顶点数据赋值给`varying`关键字声明的变量，该顶点数据在顶点光栅化的时候会进行插值计算，内插出一系列和片元一一对应的数据，不论顶点的颜色数据，还是顶点的纹理坐标数据都会进行插值计算。

片元着色器程序中`varying vec2 v_TexCoord;`和顶点着色器程序中的`varying vec2 v_TexCoord;`是一样的，这很好理解，因为顶点着色器中的程序内插出的纹理坐标要传递给片元着色器，这样的书写方式就是一个标识而已， 顶点着色器和片元着色器都可以看做一个独立的支持可编程的处理器单元，在各自的程序中使用`varying`关键字声明相同的数据类型变量，就意味着告诉WWebGL图形系统这个数据会从顶点着色器处理单元传递给片元着色器处理单元。

`uniform sampler2D u_Sampler;`使用关键字`uniform`声明了一个`sampler2D`取样器类型变量`u_Sampler`，`sampler2D`关键字和`float`、`int`、`vec2`、`mat4`一样都是标识数据类型的关键字，`sampler2D`表示一种取样器类型变量，简单点说就是对应纹理图片的像素数据， `attribute`关键字声明的`mat4`、`vec4`等类型数据会通过`gl.vertexAttribPointer()`把顶点数据传入点缓冲区，顶点处理器可以调用缓冲区中的数据。 对于`uniform`关键字声明的`sampler2D`类型数据会通过`gl.uniform1i()`把纹理图片的像素数据传入纹理缓冲区中，纹理缓冲区和顶点缓冲区都可以相关的WebGL API方法创建，对于有独立显卡的PC，这些创建的缓冲区一般都是是显卡上显存的特定区域， 每种结构的数据往往有特定结构的存储单元来存储管理，这样可以提高显卡渲染管线处理顶点数据、纹理图片像素数据的效率。

`gl_FragColor = texture2D(u_Sampler,v_TexCoord);`类似`gl_FragColor = v_color;`都是逐片元赋值像素数据，`v_color`是顶点颜色数据插值后的像素数据，每一个片元对应一个`v_color`像素数据，对于纹理映射而言， 每一个片元的颜色数据，需要从纹理图片的纹素中采集抽取，`texture2D()`方法是着色器语言内置支持用于采样纹理图片纹素的函数。`texture2D()`方法的第一个参数`u_Sampler`对应的纹理贴图的纹素数据， 第二个参数`v_TexCoord`表示片元的纹理坐标，每一个纹理坐标对应`u_Sampler`数据的一个纹素，执行该方法就可以返回`v_TexCoord`坐标对应的纹理图片上的纹素，然后赋值给`v_TexCoord`坐标对应的片元，`v_TexCoord`坐标的作用就是把纹素映射到片元， 映射操作是通过内置函数`texture2D()`完成的。

### 获取变量

```javascript
/**
 * 从program对象获取相关的变量
 * attribute变量声明的方法使用getAttribLocation()方法
 * uniform变量声明的方法使用getAttribLocation()方法
 **/
var a_Position = gl.getAttribLocation(program,'a_Position');
var a_TexCoord = gl.getAttribLocation(program,'a_TexCoord');
var u_Sampler = gl.getUniformLocation(program,'u_Sampler');
```

在片元着色器中声明取样器变量`u_Sampler`使用关键字`uniform`,获取该变量地址使用的是`gl.getUniformLocation()`，纹理图片像素数据先传入纹理缓冲区中，然后通过变量地址可以把缓冲区中的纹理数据传递给片元着色器变量`u_Sampler`。

### 创建顶点和纹理数据

顶点数据通过类型数组构造函数Float32Array()创建，纹理数据通过浏览器加载纹理图片实现。

```javascript
/**
 * 四个顶点坐标数据data，z轴为零
 * 定义纹理贴图在WebGL坐标系中位置
 **/
var data=new Float32Array([
    -0.5, 0.5,//左上角——v0
    -0.5,-0.5,//左下角——v1
    0.5,  0.5,//右上角——v2
    0.5, -0.5 //右下角——v3
]);
/**
 * 创建Uv纹理坐标数据textureData
 **/
var textureData = new Float32Array([
    0,1,//左上角——Uv0
    0,0,//左下角——Uv1
    1,1,//右上角——Uv2
    1,0 //右下角——Uv3
]);
/**
 * 加载纹理图像像素数据
 **/
var image = new Image();
image.src = 'texture.jpg';//设置图片路径
image.onload = texture;//图片加载成功后执行texture函数
```

第64行代码`Float32Array([-0.5, 0.5...`定义了四个顶点的坐标数据，设置绘制模式为TRIANGLE_STRIP，4个顶点可以绘制出两个三角面，顶点v0、v1、v2组成一个三角面，顶点v1、v2、v3组成一个三角面。 第73行`new Float32Array([0,1,...`定义了四个顶点对应的纹理坐标，顶点纹理坐标Uv0、uv1、uv2构成的三角形区域对应的纹理像素会映射到顶点v0、v1、v2组成的三角面， 顶点纹理坐标uv1、uv2、uv3构成的三角形区域对应的纹理像素会映射到顶点v1、v2、v3组成的三角面。你可以更改程序进行测试验证，可以把最后一个顶点v3和纹理坐标uv3删除， `drawArrays`的参数4更改为3，刷新浏览器可以看到只会显示纹理贴图的一半，这些就是说你可以通过纹理坐标选择纹理图片上任何区域的像素， 你可以通过顶点位置坐标控制纹理坐标选中区域的像素显示位置。

创建纹理数据和本程序中创建顶点数据的方式不同，与其说是创建不如说是加载已有图片的纹理数据。对于OpenGL程序是从本地磁盘存储器加载图片， 对于WebGL，已经部署好的WebGL网页程序是从网址对应的服务器上加载图片。第61行代码`new Image()`表示创建一个纹理图片对象，`Image()`是浏览器支持的构造函数， 执行操作符`new`返回的结果是一个图片对象，`image.src = 'texture.jpg';`通过src属性可以添加要加载的图片所在的存储位置。网站正式部署后，图片位于服务器上通过网络下载需要一定时间， 所以通过`image.onload = texture;`实现异步加载，`.onload`属性是浏览器一个事件属性，它的属性值是一个函数的名字，代码`image.onload = loadTexture`就表示当浏览器加载`image`图片对象完成后， 触发`loadTexture()`函数，这个函数的作用是处理图片的像素数据，传入显卡的纹理缓冲区中，供GPU的片元着色器调用赋值给片元。这就是为什么使用异步加载的原因， 如果网速太慢浏览器还没完成图片的加载，程序去执行`loadTexture`函数就无法找到图片的像素数据传入纹理缓冲区。

图片的像素尺寸要保证为2的n次幂，比如16、512、256、1024等，可以自由组合出256x256、128x512等像素尺寸图片。

### 声明`texture()`函数

```javascript
/**
 创建缓冲区textureBuffer，传入图片纹理数据，然后执行绘制方法drawArrays()
 **/
function texture() {
    var texture = gl.createTexture();//创建纹理图像缓冲区
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //纹理图片上下反转
    gl.activeTexture(gl.TEXTURE0);//激活0号纹理单元TEXTURE0
    gl.bindTexture(gl.TEXTURE_2D, texture);//绑定纹理缓冲区
    //设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    //设置纹素格式，jpg格式对应gl.RGB
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler, 0);//纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
    // 进行绘制
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
//创建纹理图像缓冲区
var texture = gl.createTexture();
```

WebGL API`gl.createTexture()`表示在显存上开辟一个纹理缓冲区用来存储纹理数据，执行`gl.createTexture()`后返回一个纹理对象赋值给变量`texture`。创建顶点缓冲区使用的WebGL API是`gl.createBuffer()`，可以对比记忆学习。

```javascript
//纹理图片上下反转
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
```

`gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);`的作用是用来翻转图片，具体点说就是设置纹理图片相对Uv坐标系的位置对应关系，最简单的方法，你可以注释掉这一行语句或者把方法的第二个参数`true`更改为`false`，刷新浏览器查看纹理贴图显示效果。`gl.pixelStorei()`的第一个参数可以是`gl.UNPACK_FLIP_Y_WEBGL`或`gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL`，前者的作用控制图片的左上角还是左下角与Uv坐标原点重合，第二个参数是第一个参数的布尔值`false`或`true`，默认都是`false`。 `gl.UNPACK_FLIP_Y_WEBGL`默认是`flase`，图片倒置左上角与Uv坐标原点重合，可以把值设置为`true`，图片的左下角与Uv坐标原点重合。`gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL`的作用是将图像像素值的RGB三个分量逐分量乘以透明度分量A， 默认`false`，表示不执行此操作。

```javascript
//激活0号纹理单元TEXTURE0
gl.activeTexture(gl.TEXTURE0);
```

`gl.activeTexture(gl.TEXTURE0);`使用了WebGL API`gl.activeTexture()`，`gl.activeTexture()`的作用是激活纹理缓冲区的某个子单元，一个纹理单元有一个编号，一个纹理单元用来存储管理一幅纹理贴图，纹理缓冲区有多个纹理单元，可以保证同时处理使用多个纹理贴图， 具体数量取决于显卡硬件和浏览器的WebGL图形系统设置，对于WebGL至少支持8个纹理单元，分别标识为`gl.TEXTURE0`、`gl.TEXTURE1`、... `gl.TEXTURE7`。

```javascript
gl.bindTexture(gl.TEXTURE_2D, texture);//绑定纹理缓冲区
```

`gl.bindTexture(gl.TEXTURE_2D, texture);`使用的WebGL API`gl.bindTexture()`可以类比`gl.bindBuffer()`学习，它们的作用都是用来绑定缓冲区，缓冲区只有绑定后才可以传入数据，`bindBuffer()`用于绑定顶点缓冲区或者顶点索引缓冲区， 第一个参数是`gl.ARRAY_BUFFER`或`gl.ELEMENT_ARRAY_BUFFER`，分别对应顶点数据、顶点索引数居；`bindTexture()`用于绑定纹理数据，函数第一参数是`gl.TEXTURE_2D`或`gl.TEXTURE_CUBE_MAP`， `gl.TEXTURE_2D`表示普通的二维纹理贴图，`gl.TEXTURE_CUBE_MAP`表示立方体纹理贴图用于创建环境贴图，两个方法的第二个参数是要绑定的缓冲区对象名字。

```javascript
//设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
110 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
//设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
112 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
```

第110行和第112行代码使用的方法`gl.texParameteri()`主要用来设置纹理贴图的填充方式，比如顶点位置坐标确定的绘制区域像素尺寸小于纹理坐标选中的纹理图片区域像素尺寸，比如绘制区域像素250x250，纹理贴图像素512x512， 这时候就要舍去纹理贴图部分纹素，为了图片更好的显示效果，肯定不能随意删除剪裁，要满足一定规律，修饰处理像素，比如4个连续像素抽掉中间的两个，剩下两个像素的过渡就不够光滑。 方法的第二个参数是`gl.TEXTURE_MIN_FILTER`对应的纹理图像需要缩小的情况，也就是纹理图片像素尺寸比绘制区域大，本案例中canvas的宽高是500x500px，顶点绘制区域是宽高一半250x250px，纹理贴图是256x256px偏大， 自然需要设置第89行代码，第91行代码的第二个参数是`gl.TEXTURE_MAG_FILTER`，对应的是纹理贴图偏小需要放大的情况，对于本程序可有可无，方法的第三个参数是第二个参数的值，一般WebGL图形系统都有一个默认值。 如果需要也可以设置，不同的值代表图像不同的处理算法，不同的算法纹理贴图在缩放的时候效果不同。程序中使用的第三个参数是`gl.LINEAR`，它对应的处理算法是纹理图片要生成新像素位置周围的四个相邻像素颜色值进行加权平均， 结果赋值给新的像素。

| 纹理参数              | 填充模式 | 默认值                   |
| :-------------------- | :------- | :----------------------- |
| gl.TEXTURE_MAG_FILTER | 纹理放大 | gl.LINEAR                |
| gl.TEXTURE_MIN_FILTER | 纹理缩小 | gl.NEAREST_MIPMAP_LINEAR |
| gl.TEXTURE_WRAP_S     | 水平填充 | gl.REPEAT                |
| gl.TEXTURE_WRAP_T     | 竖直填充 | gl.REPEAT                |

gl.TEXTURE_MAG_FILTER或gl.TEXTURE_MIN_FILTER主要用于纹理贴图缩放，对应值gl.LINEAR、gl.NEAREST

| 值         | 含义                                                         |
| :--------- | :----------------------------------------------------------- |
| gl.NEAREST | 纹理坐标乘以纹理图片需要缩放的倍数得到像素的选取坐标，选择坐标对应的像素，多余的舍弃掉 |
| gl.LINEAR  | 选择纹理坐标对应的像素周围的像素颜色值进行加权平均，相比gl.NEAREST的效果更好，付出的代价是更消耗硬件资源 |

gl.TEXTURE_WRAP_S和gl.TEXTURE_WRAP_T往往是用在贴图阵列的场景，比如地面地板阵列贴图效果。

| 值                 | 含义                       |
| :----------------- | :------------------------- |
| gl.gl.REPEAT       | 平铺方式                   |
| gl.MIRRORED_REPEAT | 镜像方式                   |
| gl.CLAMP_TO_EDGE   | 绘制区域边缘使用贴图的部分 |

```javascript
//设置纹素格式，jpg格式对应gl.RGB
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
```

`gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);`代码使用的WebGL API`gl.texImage2D()`可以类比WebGL API`gl.bufferData()`学习,WebGL API`gl.bufferData()`设置的是把顶点数据传入WebGL API`gl.bindBuffer()`绑定的顶点缓冲区中，WebGL API`gl.texImage2D()`设置的是把纹理数据传入WebGL API`gl.bindTexture()`绑定的纹理缓冲区中激活的纹理单元， 纹理数据是RGB或RGBA像素值，jpg格式是RGB结构，png格式是RGBA结构，像素分量可以设置不同的字节数，最低是一个字节的无符号整型，0~255共256个值，也可以是多字节的浮点数。`gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);`代码中WebGL API`gl.texImage2D()`的第三个参数`gl.RGB`表示纹理图片的格式， 第四个参数`gl.RGB`表示纹理数据的格式，纹理数据是从图片数据采样抽取过来的。第5个参数`gl.UNSIGNED_BYTE`表示RGB每个分量占一个字节，最后一个参数image是图片对象的变量名。

| 格式               | 含义             | 图片格式   |
| :----------------- | :--------------- | :--------- |
| gl.RGB             | 红、绿、蓝三原色 | .JPG、.BMP |
| gl.RGBA            | 三原色+透明度    | .PNG       |
| gl.LUMINANCE       | 流明             | 灰度图     |
| gl.LUMINANCE_ALPHA | 透明度           | 灰度图     |

| 格式                      | 含义                                 |
| :------------------------ | :----------------------------------- |
| gl.UNSIGNED_BYTE          | 无符号整型，每个颜色分量一个字节长度 |
| gl.UNSIGNED_SHORT_5_6_5   | RGB：RGB每个分量对应长度5、6、5位    |
| gl.UNSIGNED_SHORT_4_4_4_4 | RGBA：RGBA每个分量对应长度4位        |
| gl.UNSIGNED_SHORT_5_5_5_1 | RGBA：RGB每个分量对应长度5位，A是1位 |

```javascript
//纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
gl.uniform1i(u_Sampler, 0);
```

`gl.uniform1i(u_Sampler, 0);`代码使用的WebGL API`gl.uniform1i()`可以类比WebGL API`gl.vertexAttribPointer()`学习,WebGL API`gl.vertexAttribPointer()`设置的是顶点数据传递给顶点着色器，WebGL API`gl.uniform1i()`设置的是把纹理数据传递给片元着色器，第一个参数是片元着色器采样器变量地址`u_Sampler`， 0表示纹理缓冲区中激活的纹理单元编号，设置好后，执行绘制函数，片元着色器就可以在纹理单元中提取像素数据赋值给片元。