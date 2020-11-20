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
<%- include('components/path', {  // 组件使用
  data
})%>
```

### 二、MySql

- mysql 下载地址：<https://dev.mysql.com/downloads/mysql/>
- sequel 客户端下载地址：<https://sequelpro.com/download>
- sequel 客户端链接 mysql 问题：<https://www.jianshu.com/p/9a645c473676>
- mysql 基础语法：<https://www.runoob.com/mysql/mysql-delete-query.html>
- eg（注：mysql 中关键字需要用``包裹, 如 password）:

```
-- INSERT INTO users (username, `password`, nickname) VALUES  ("林俊杰", "123456", "JJLin")

-- UPDATE users SET nickname="jjLin" WHERE id=4

-- DELETE FROM users WHERE id=4

-- SELECT * FROM blogs INNER JOIN users ON users.id=blogs.userid

-- SELECT blogs.*, users.username, users.nickname FROM blogs INNER JOIN users ON users.id=blogs.userid
```

### 三、Sequelize

演示代码：<https://github.com/JayChen1195/sequelize-test>
