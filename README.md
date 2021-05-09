# ework [GitHub](https://ework.murphyyi.com) 

> `ework`是一个简便的网址导航站,省去到处找服务地址烦恼......

## 添加网址

在`data`分支下存放着收录的网址信息文件

编辑data.json 即可添加地址 
```json
   {
      "icon": "https://www.baidu.com/favicon.ico",
      "name": "百度",
      "desc": "百度一下你就知道",
      "link": "https://www.baidu.com"
    }
```
欢迎PR道data 分支 增加导航数据


## 项目运行
```go
yarn 
// Compiles and hot-reloads for development
yarn serve

### Compiles and minifies for production
yarn build
```

> 把`docs`目录下的内容放在web服务器就可以啦

## 效果演示

[查看demo请戳这里](https://yi-nology.github.io/ework)

## 技术栈

vue2 + vuex + vue-router + vue-lazyload + iview +  clipboard + js-cookie + webpack + less + sass

