import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/user/login'
import Home from '../views/goods/home'
import ShoppingCart from '../views/goods/shoppingCart'
import MyOrder from '../views/goods/myOrder'
import myRecommendation from '../views/goods/myRecommendation'
import goodsShow from '../views/goods/goodsShow'
import goodsDetail from '../views/goods/goodsShow_Sub/goodsDetail'
import settlement from '../views/goods/shoppingCart_sub/settlement'
import orderDetail from '../views/goods/myOrder_sub/orderDetail'
import payPage from '../views/goods/shoppingCart_sub/payPage'

import AdminHome from '../views/admin/admin_home'

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
                      keepAlive: false
                  },
                  children: [
                  ]
              },
              {
                  path: '/home/myOrder/orderDetail',
                  name: '订单详细',
                  component: orderDetail,
                  hidden: true,
                  meta: {
                      requireAuth: true,
                      keepAlive: false
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
                      keepAlive: false
                  },
                  children: [
                  ]
              },
              {
                  path: '/home/settlement',
                  name: '结算',
                  component: settlement,
                  hidden: true,
                  meta: {
                      requireAuth: true,
                      keepAlive: false
                  },
                  children: [

                  ]
              },{
                  path: '/home/payPage',
                  name: '支付页面',
                  component: payPage,
                  hidden: true,
                  meta: {
                      requireAuth: true,
                      keepAlive: false
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
      },
      {
          path: '/admin_home',
          name: '管理员主页',
          component: AdminHome,
          hidden: true,
          meta: {
              requireAuth: true,
          },
          children: [
              {
                  path: '/Manage_Goods',
                  name: '商品管理',
                  component: ()=>import('../views/admin/Manage_Goods'),
                  hidden: true,
                  meta: {
                      requireAuth: true,
                      keepAlive: false
                  },
                  children: []
              },
              {
                  path: '/Manage_Goods/manage_goodsDetail',
                  name: '商品详细',
                  component: ()=>import('../views/admin/manage_goodsDetail'),
                  hidden: true,
                  meta: {
                      requireAuth: true,
                      keepAlive: false
                  },
                  children: []
              },
              {
                  path: '/Manage_Order',
                  name: '订单管理',
                  component: ()=>import('../views/admin/Manage_Order'),
                  hidden: true,
                  meta: {
                      requireAuth: true,
                      keepAlive: false
                  },
                  children: [
                  ]
              },
              {
                  path: '/Manage_Order/manage_orderDetail',
                  name: '订单详细',
                  component: ()=>import('../views/admin/manage_orderDetail'),
                  hidden: true,
                  meta: {
                      requireAuth: true,
                      keepAlive: false
                  },
                  children: [
                  ]
              },
          ]

      }
  ]
})
