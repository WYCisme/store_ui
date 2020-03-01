import {getRequest} from './api'
import {Message} from 'element-ui'


export const isNotNullORBlank = (...args)=> {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i];
    if (argument == null || argument === '' || argument == undefined) {
      Message.warning({message: '数据不能为空!'})
      return false;
    }
  }
  return true;
}
export const initMenu = (router, store)=> {
  if (store.state.routes.length > 0) {
    return;
  }
  //添加自定义层级菜单
  let InfoPage= {
    path: "/home",
    name: "介绍",
    iconCls: "fa fa-windows",
    meta: {
      keepAlive: true,
    },
    component: "Home",
    children: [
      {
        path: "/info/page",
        name: "项目信息",
        iconCls: "",
        meta: {
          keepAlive: true,
        },
        component: "InfoPage",
        children: []
      },
      {
        path: "/demandResult",
        name: "需求计划查询结果",
        iconCls: "",
        meta: {
          keepAlive: true,
        },
        component: "QueryCondition",
        children: []
      },
      {
        path: "/annualPlan",
        name: "年度计划",
        iconCls: "",
        meta: {
          keepAlive: false,
        },
        component: "DemAnnualPlan",
        children: []
      },
      {
        path: "/annualPlan",
        name: "月度计划",
        iconCls: "",
        meta: {
          keepAlive: false,
        },
        component: "DemMonthlyPlanOrder",
        children: []
      },
      {
        path: "/userinfoP",
        name: "个人中心",
        iconCls: "",
        meta: {
          keepAlive: false,
        },
        component: "UserInfoPage",
        children: []
      },
      {
        path: "/infoSettingP",
        name: "设置",
        iconCls: "",
        meta: {
          keepAlive: false,
        },
        component: "SettingPage",
        children: []
      }
      ]
  };

  getRequest("/api/config/sysmenu").then(resp=> {
    if (resp && resp.status === 200) {
      var respData=resp.data;
      respData.push(InfoPage);//添加自定义菜单
      var fmtRoutes = formatRoutes(respData);
      router.addRoutes(fmtRoutes);
      store.commit('initMenu', fmtRoutes);
      // store.dispatch('connect');
    }
  })
}
export const formatRoutes = (routes)=> {
  let fmRoutes = [];
  routes.forEach(router=> {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      component(resolve){
         // console.log(router);
        // if (component.startsWith("Home")) {
        //   require(['../components/' + component + '.vue'], resolve);
        // }
        // //需求计划查询
        // else if (component.startsWith("Query")) {
        //   require(['../components/query/' + component + '.vue'], resolve)
        // }
        // //需求计划编制
        // else if (component.startsWith("Dem")) {
        //   require(['../components/demand_plan/' + component + '.vue'], resolve)
        // }
        // //需求审批
        // else if (component.startsWith("Appr")) {
        //   require(['../components/approval/' + component + '.vue'], resolve)
        // }
        // //系统管理
        // else if (component.startsWith("Sys")) {
        //   require(['../components/system/' + component + '.vue'], resolve)
        // }
        // else if(component.startsWith("Info")){
        //   require(['../components/' + component + '.vue'], resolve)
        // }
        // else if(component.startsWith("Pur")){
        //   require(['../components/purchase/' + component + '.vue'], resolve)
        // }
        // else if(component.startsWith("POrder")){
        //   require(['../components/purchaseOrder/' + component + '.vue'], resolve)
        // }
        // else if(component.startsWith("UserInfo")){
        //   require(['../components/userInfo/' + component + '.vue'], resolve)
        // }
        // else if(component.startsWith("Setting")){
        //   require(['../components/userInfo/' + component + '.vue'], resolve)
        // }
      },
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children
    };

    fmRoutes.push(fmRouter);
  });
  return fmRoutes;
};
