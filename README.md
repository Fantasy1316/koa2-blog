## A blog project development by koa2 + mysql + radis

### 一、ejs 引擎

```javascript
<%= data %> // 变量渲染
```

```javascript
<% if (data) { %>  // 条件渲染
   // do something
<% } else { %>
  // do something
<% } %>
```

```javascript
<% data.forEach(item => { %> // 循环渲染
  // do something
<% }) %>
```

```javascript
<%- include('conponents/path', {  // 组件使用
  data
})%>
```
