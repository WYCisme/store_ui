import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/user/login'
import Home from '../views/goods/home'
import MyOrder from '../views/goods/myOrder'
import ShoppingCart from '../views/goods/shoppingCart'
import myRecommendation from '../views/goods/myRecommendation'
import goodsShow from '../views/goods/goodsShow'
import goodsDetail from '../views/goods/goodsShow_Sub/goodsDetail'
Vue.use(Router);

export default new Router({
  base:'/',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/home',
      name: '主页',
      component: Home,
      hidden: true,
      meta: {
          requireAuth: true,
      },
      children: [
          {
              path: '/home/goodsShow',
              name: '商品展示',
              component: goodsShow,
              hidden: true,
              meta: {
                  requireAuth: true,
                  keepAlive: true
              },
              children: []
          },
          {
              path: '/home/goodsDetail',
              name: '商品详细',
              component: goodsDetail,
              hidden: true,
              meta: {
                  requireAuth: true,
                  keepAlive: false
              },
              children: []
          },
          {
              path: '/home/myOrder',
              name: '我的订单',
              component: MyOrder,
              hidden: true,
              meta: {
                  requireAuth: true,
                  keepAlive: true
              },
              children: [

              ]
          },
          {
              path: '/home/shoppingCart',
              name: '购物车',
              component: ShoppingCart,
              hidden: true,
              meta: {
                  requireAuth: true,
                  keepAlive: true
              },
              children: [

              ]
          },
          {
              path: '/home/myRecommendation',
              name: '我的推荐',
              component: myRecommendation,
              hidden: true,
              meta: {
                  requireAuth: true,
                  keepAlive: true
              },
              children: [

              ]
          },
      ]
    }
  ]
})
