import Vue from 'vue'
import App from './App.vue'

import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'


import {getRequest} from './api/api'
import {postRequest} from './api/api'
import {postLoginRequest} from './api/api'
import {deleteRequest} from './api/api'
import {putRequest} from './api/api'
import {initMenu} from './api/utils'
import {isNotNullORBlank} from './api/utils'


import './api/filter_utils'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/globalStyle.css'
// import Print from 'vue-print-nb'  //打印组件
// Vue.use(Print);

Vue.use(ElementUI);

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.postLoginRequest = postLoginRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.isNotNullORBlank = isNotNullORBlank;

Vue.config.productionTip = false

router.beforeEach((to, from, next)=> {
    console.log("router.beforeEach");
    console.log("to",to.name,"from",from.name,"next",next.name);
    if (to.name === 'Login') {
        next();
        return;
    }
    var username = store.state.user.username;
    console.log('store.state.user.username',username);
    if (username === '未登录' ) {
      if (to.meta.requireAuth || to.name == null) {
        next({path: '/', query: {redirect: to.path}})
      } else {
        next();
      }
    } else {
      // initMenu(router, store);
      next();
    }
  }
);

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
