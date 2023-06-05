# [Data Fetching](https://nuxt.com/docs/getting-started/data-fetching#data-fetching)

Nuxt provides `useFetch`, `useLazyFetch`, `useAsyncData` and `useLazyAsyncData` to handle data fetching within your application.



## [Refreshing Data](https://nuxt.com/docs/getting-started/data-fetching#refreshing-data)

有时，在用户访问页面的整个过程中，您可能需要刷新从 API 加载的数据。如果用户选择分页、过滤结果、搜索等，就会发生这种情况。

您可以使用`refresh()`从可组合项返回的方法`useFetch()`来刷新具有不同查询参数的数据：

```vue
<script setup>
const page = ref(1);

const { data: users, pending, refresh, error } = 
      await useFetch(() => `users?page=${page.value}&take=6`, 
                     { baseURL: config.API_BASE_URL });

function previous() {
  page.value--;
  refresh();
}

function next() {
  page.value++;
  refresh();
}
</script>
```



## [Directly Calling an API Endpoint](https://nuxt.com/docs/getting-started/data-fetching#directly-calling-an-api-endpoint)

直接调用 API。Nuxt 3 提供了一个全局可用的`$fetch`方法

使用`$fetch`有许多好处，包括：

如果它在服务器上运行，它将“巧妙地”处理直接 API 调用，或者如果它在客户端(浏览器)上运行，则对您的 API 进行客户端调用。（它还可以处理调用第三方 API。）

此外，它还具有便利的功能，包括自动解析响应和字符串化数据。