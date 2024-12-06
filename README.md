## 爱回译项目
### 启动
pnpm i
pnpm run dev
todo
1. 请求 done
2. router 
   1. https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html
3. rem设置
4. ui组件
   1. vant： https://vant-ui.github.io/vant/#/zh-CN/quickstart
5. 页面开发
   1. main
   2. huiyi
   3. ask
6. 部署
   1. 分环境 vite build --mode staging
7. pc端适配

1. 软键盘处理
   1. 基础情况
      1. ios上，软件盘是覆盖展示
      2. 安卓是窗口变小
   2. 解决方案（主要处理ios）
      1. input框必须为fixed，bottom 为0
      2. 监听键盘弹出，使用focus，让需要展示的内容跑到页面底部
      3. 监听键盘收起，使用blur，window.scrollTo(0, 0) ,否则页面整体底部会有空白
      4. touchStart 其他元素，软件盘立刻收起，防止底部有空白区域（参考了链接： https://ada.baidu.com/site/wjzjudgp/agent?imid=d12cd0b7ef3d44a7dee6929a02a6a238）
