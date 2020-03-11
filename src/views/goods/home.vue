<template>
    <div>
        <el-container class="el-container" style="position: absolute; width: 100%"  >
            <el-header  class="el-header" style="height: 110px; right: 0; left: 0; position: fixed;">
                <div class="tab">
                    <ul class="title">
                        <li> <router-link to="/home">首页</router-link> </li>
                        <li> <router-link to="/home/myOrder">我的订单</router-link> </li>
                        <li> <router-link to="/home/shoppingCart">购物车</router-link> </li>
                        <li> <router-link to="/home/myRecommendation">我的推荐</router-link> </li>
                        <li>
                            <el-dropdown @command="handleCommand">
                                <span >用户：{{user.username}} </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="onUserInfo">个人中心</el-dropdown-item>
                                    <!--<el-dropdown-item command="onSetting">设置</el-dropdown-item>-->
                                    <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul><br/>
                    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 10px">
                        <el-breadcrumb-item :to="{ path: '/home' }" >首页</el-breadcrumb-item>
                        <el-breadcrumb-item  :to="this.$router.currentRoute.path">{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>

            </el-header>
            <el-main  style="top: 120px;bottom: 0;right: 0; left: 0; position: fixed;">
                <!--<el-scrollbar>-->
                <div >
                    <!--<h1>main 内容</h1>-->
                    <goods-show v-if="this.$route.name==='主页'"></goods-show>
                    <keep-alive>
                        <!--这里的组件需要被缓存-->
                        <router-view v-if="this.$route.meta.keepAlive" style="width: 100%"></router-view>
                    </keep-alive>
                    <router-view v-if="!this.$route.meta.keepAlive"  style="width: 100%">
                        <!--这里的组件不需要被缓存-->
                    </router-view>
                </div>
                <!--</el-scrollbar>-->
            </el-main>


        </el-container>

    </div>
</template>

<script>
    import GoodsShow from "./goodsShow";
    export default {
        name: "home",
        components: {GoodsShow},
        data(){
            return {
                searchStr:null,
            }
        },
        mounted:function () {

        },
        methods: {
            handleCommand(cmd){
                if (cmd === 'logout') {
                    this.$confirm('注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // _this.getRequest("/api/logout");
                        this.$store.commit('logout');
                        this.$router.replace({path: '/'});
                    }).catch(() => {
                        this.$notify({
                            type: 'info',
                            message: '取消',
                            offset:50
                        });
                    });
                }else if(cmd === 'onUserInfo'){
                    this.$router.push({path: '/userInfoSetting'});
                }
            },
        },
        computed: {
            user(){
                return this.$store.state.user;
            },
            routes(){
                return this.$store.state.routes;
            },
        }

    }

</script>

<style scoped>
    .el-header, .el-footer {
        /*background-color: rgba(209, 209, 148, 0.49);*/
        color: #333;
        text-align: right;
        line-height: 60px;
        padding-bottom: 0px;
    }
    .el-main {
        padding: 0px;
        margin: 2px;
        background-color: #ffffff;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .search-input{
        display:block;
        margin-left:auto;
        margin-right:auto;
    }
    *{padding:0;margin:0;font:normal 15px "微软雅黑";color:#000;}
    ul{list-style-type: none;padding-left: 5px;margin-bottom: -2px}
    .tab{
        /*width:500px;*/
        text-align: right;
        margin: 10px auto;
    }
    a{text-decoration: none;}
    .title li{
        display: inline-block;
        border: 1px solid #999;
        border-bottom: 2px solid #a00;
        background: #fff;
        text-align: center;
        width: 100px;
        height: 30px;
        margin: 0 1px;
        line-height: 30px;
    }
    .title li a{
        text-align: center;
        display:block;
        height:100%;
        padding-top: 5px;
    }
    .el-dropdown{
        text-align: center;
        display:block;
        height:100%;
        padding-top: 5px;
    }
    .title .active{border-top:2px solid #a00;border-bottom: 2px solid #fff; }
    #content{margin: 0;border: 1px solid #ccc;border-top: 2px solid #a00;width: 300px}
    #content div{display: none;padding: 10px 0}
    #content .mod{display: block;}
</style>