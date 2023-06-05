[toc]

# [Vue.js Development](https://nuxt.com/docs/guide/concepts/vuejs-development#vuejs-development)

Nuxt 3 integrates Vue 3,



### [Single File Components](https://nuxt.com/docs/guide/concepts/vuejs-development#single-file-components)



### [Components Auto-imports](https://nuxt.com/docs/guide/concepts/vuejs-development#components-auto-imports)

Every Vue component created in the [`components/` directory](https://nuxt.com/docs/guide/directory-structure/components) of a Nuxt project will be available in your project without having to import it. 

[`components/`目录](https://nuxt.com/docs/guide/directory-structure/components)中创建的每个Vue组件都将在您的项目中可用，而无需导入它

If a component is not used anywhere, your production’s code will not include it.



### [Vue Router](https://nuxt.com/docs/guide/concepts/vuejs-development#vue-router)

Most applications need multiple pages and a way to navigate between them. 

This is called **routing**. 

Nuxt uses a [`pages/` directory](https://nuxt.com/docs/guide/directory-structure/pages) and naming conventions to directly create routes mapped to your files using the official [Vue Router library](https://router.vuejs.org/).

[`pages/`目录](https://nuxt.com/docs/guide/directory-structure/pages)和命名约定，使用官方[Vue路由器库](https://router.vuejs.org/)直接创建映射到您文件的路由