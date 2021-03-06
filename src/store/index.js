import Vue from 'vue'
import Vuex from 'vuex'

import '../lib/stomp'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      user: {
          username: sessionStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(sessionStorage.getItem('user' || '[]')).username,
          // userId: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userId,
          // userface: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userface,
          // roles: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).roles
      },
      // cartsTemp: window.localStorage.getItem('carts' || '[]') == null ? '' :JSON.parse(window.localStorage.getItem('carts' || '[]')),
      cartsTemp: JSON.parse(sessionStorage.getItem("carts")),
      OrderNo:JSON.parse(sessionStorage.getItem('OrderNo')),//订单编号
      orderDetail:JSON.parse(sessionStorage.getItem('orderDetail')),//查看订单详情
  },
  mutations: {
    // initMenu(state, menus){
    //   state.routes = menus;
    // },
    login(state, user){
      state.user = user;
        sessionStorage.setItem('user', JSON.stringify(user));
    },
    logout(state){
      console.log("注销");
      state.user=null;
      state.routes = [];
        sessionStorage.removeItem('user');
    },
      addCartsTemp(state,carts){
          // window.localStorage.removeItem('carts');
          state.cartsTemp =JSON.parse(carts);
          sessionStorage.setItem("carts",carts)
          // window.localStorage.setItem('carts',carts);
      },
      addOrderNo(state,orderNo){
        state.OrderNo =JSON.parse(orderNo);
        sessionStorage.setItem("OrderNo",orderNo)
      },
      addOrderDetail(state,orderNo){
        state.orderDetail =JSON.parse(orderNo);
        sessionStorage.setItem("orderDetail",orderNo)
      },
  },
  actions: {
  }
});
