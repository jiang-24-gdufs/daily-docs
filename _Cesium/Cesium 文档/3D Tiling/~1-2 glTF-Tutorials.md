[glTF-Tutorials/README.md at master · KhronosGroup/glTF-Tutorials (github.com)](https://github.com/KhronosGroup/glTF-Tutorials/blob/master/gltfTutorial/README.md)

[glTF格式详解(目录) - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/65264050)

## glTF: A transmission format for 3D scenes

The goal of glTF is to define a standard for representing 3D content, in a form that is suitable for use in runtime applications. The existing file formats are not appropriate for this use case: some of do not contain any scene information, but only geometry data; others have been designed for exchanging data between authoring applications, and their main goal is to retain as much information about the 3D scene as possible, resulting in files that are usually large, complex, and hard to parse. Additionally, the geometry data may have to be preprocessed so that it can be rendered with the client application.

None of the existing file formats were designed for the use case of efficiently transferring 3D scenes over the web and rendering them as efficiently as possible. But glTF is not "yet another file format." It is the definition of a *transmission* format for 3D scenes:

- The scene structure is described with JSON, which is very compact and can easily be parsed.
- The 3D data of the objects are stored in a form that can be directly used by the common graphics APIs, so there is no overhead for decoding or pre-processing the 3D data.

## glTF:一个3D场景数据格式

glTF格式的目标是为3D内容的数据格式提供统一的标准，方便应用程序读取进行渲染。目前来说已经存在的3D数据格式不是没有包含场景数据，就是包含一些只能用于特定创作软件的数据，许多时候，需要对几何数据进行预处理才能直接用于渲染。

目前而言，现存的3D数据格式不能够方便地在互联网上进行传输，以及直接高效地进行渲染。glTF的目标是作为一个中转格式，而不是另一个新的3D数据格式：

- 使用JSON来描述场景结构，可以方便地被应用程序分析处理。
- 3D数据以一种可以被大多数图形API直接使用的方式进行存储，不需要应用程序进行解码或预处理操作。