<template>
    <div>
        <el-tabs style="margin-top: 10px;"  @tab-click="handleClick" stretch type="card" v-model="defaultTabs">
            <el-tab-pane label="历史热门" name="1"></el-tab-pane>
            <el-tab-pane label="优质商品" name="2"></el-tab-pane>
            <el-tab-pane label="猜你喜欢" name="3"></el-tab-pane>
        </el-tabs>
        <div style="display: flex;justify-content: space-around;flex-wrap: wrap;text-align: left; vertical-align: super; padding: 5px;">
            <el-card style="width: 200px;margin: 1px 1px 1px 1px; padding: 5px"
                     v-for="(goods,index) in goodsData.slice((curPage-1)*pagesize,curPage*pagesize)" :key="goods.id">
                <div  @click="checkDetail(goods.id)" style="padding: 5px">

                    <div style="text-align: center; padding: 0px ; margin: 0px;" >
                        <img :src="goods.mainImage" alt="商品图片" width="150" style="padding: 0px ; margin: 0px;"/>
                    </div>
                    <span>{{goods.name}}</span><br/>
                    <span>{{goods.subtitle}}</span>
                </div>
            </el-card>
        </div>
        <br/>
        <el-pagination
                :current-page.sync="curPage"
                :page-size="pagesize"
                :page-count="7"
                background
                small
                layout="total,prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                :total="goodsData.length">
        </el-pagination>

    </div>
</template>

<script>
    export default {
        name: "myRecommendation",
        data(){
            return{
                pagesize:6,
                curPage:1,
                defaultTabs:"1",
                goodsData:[],//展示数据
                historyGoods:[],//历史
                goodGoods:[],//优质
                maybeLikeGoods:[],//猜你喜欢
            }
        },
        mounted(){
            this.getHistoryGoods();
            this.getGoodProduct();
            this.getUserCommend();

            // setTimeout(()=>{
            //     console.log("默认热门");
            //     this.goodsData = this.historyGoods;//默认
            // },1000);//1秒后执行赋值

        },
        methods:{
            handleClick(tab){
                console.log("tab",tab.name);
                if (tab.name === "1"){
                    console.log("热门");
                    // this.getHistoryGoods();
                    this.goodsData = this.historyGoods;

                } else if (tab.name === "2") {
                    console.log("优质");
                    // this.getGoodProduct();
                    this.goodsData = this.goodGoods;
                }else {
                    console.log("用户感兴趣");
                    // this.getUserCommend();
                    this.goodsData = this.maybeLikeGoods;

                }
            },
            //历史热门
            getHistoryGoods(){
                this.getRequest('/api/score/history.do').then(resp=> {
                    if (resp && resp.status === 200) {
                        // console.log("历史热门",resp.data);
                        let ids=[];
                        for (let i of resp.data.data) {
                            if (i !== null) {
                                ids.push(i.productId);
                            }
                        }
                        this.postRequest('/api/product/list_good_product.do?productIds=' + ids).then(resp=> {
                            if (resp && resp.status === 200) {
                                this.historyGoods = resp.data.data;
                                this.goodsData = resp.data.data;
                                console.log("历史热门商品",this.historyGoods);
                            }
                        });
                    }
                })
            },
            //优质商品
            getGoodProduct(){
                this.getRequest('/api/score/goodProduct.do').then(resp=> {
                    if (resp && resp.status === 200) {
                        // console.log("优质商品",resp.data);
                        let ids=[];
                        for (let i of resp.data.data) {
                            if (i !== null) {
                                ids.push(i.productId);
                            }
                        }
                        this.postRequest('/api/product/list_good_product.do?productIds=' + ids).then(resp=> {
                            if (resp && resp.status === 200) {
                                this.goodGoods = resp.data.data;
                                // this.goodsData = resp.data.data;
                                console.log("优质商品",this.goodGoods);
                            }
                        });
                    }
                })
            },
            //用户感兴趣
            getUserCommend(){
                this.getRequest('/api/score/userCommend.do').then(resp=> {
                    if (resp && resp.status === 200) {
                        for (let i of resp.data.data) {
                            if (i !== null) {
                                this.maybeLikeGoods.push(i);
                            }
                        }
                        console.log("用户感兴趣",this.maybeLikeGoods);
                    }
                })
            },
            checkDetail(id){
                // this.$router.replace({ path:'/home/myOrder'})
                this.$router.push({ path:'/home/goodsDetail',query:{productId:id}})
                // this.$router.push({name:'商品详细',params: {type:'check',id:id}})

            },
        }
    }
</script>

<style scoped>

</style>