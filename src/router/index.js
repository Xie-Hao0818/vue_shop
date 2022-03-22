import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从那个路径跳转而来
  //next是一个函数，表示放行
  //next()放行    next('/login') 强制跳转
  if (to.path === '/login') return next() //要访问的页面为登录页面，直接放行
  //获取token
  const tokenStr = window.sessionStorage.getItem("token")
  if (!tokenStr) return next('/login') //没有token强制跳转到登录页面
  next()  //有token放行
})

export default router
