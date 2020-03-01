<template>
    <div>
        <div class="search-input" >
            <el-input type="text"  prefix-icon="el-icon-search" v-model=searchStr property="搜索商品"
                      style="width: 200px; padding-right: 10px"/>
            <el-button type="primary" @click="searchGoods()">搜索</el-button>
        </div>

        <h3>商品展示页</h3>

        <div style="display: flex;justify-content: space-around;flex-wrap: wrap;text-align: left; vertical-align: super; padding: 5px;">
            <el-card style="width: 300px;margin: 5px; padding: 5px"
                     v-for="(goods,index) in productData.slice((curPage-1)*pagesize,curPage*pagesize)" :key="goods.id">
                <div  @click="checkDetail(goods.id)" style="padding: 5px">

                    <div style="text-align: center; padding: 0px ; margin: 0px;" >
                        <img :src="goods.mainImage" alt="商品图片" width="250" style="padding: 0px ; margin: 0px;"/>
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
                :total="productData.length">
        </el-pagination>

    </div>
</template>

<script>
    export default {
        name: "goodsShow",

        data(){
            return{
                pagesize:6,
                curPage:1,

                productData:null,
                // searchStr : this.$route.query.searchStr ? this.$route.query.searchStr : null,
                searchStr :"",
            }
        },
        mounted:function () {
            this.getAll();
        },
        methods: {
            getAll(){
                if (this.searchStr === null || this.searchStr === ""){
                    //获取所有商品
                    this.postRequest('/api/manage/product/list.do').then(resp=>{
                        if (resp && resp.status === 200) {
                            let data = resp.data;
                            console.log("查询的数据-获取所有商品",data);
                            if (data.data.total > 0) {
                                this.productData = data.data.list;
                            }
                        }
                    })
                } else {
                    this.searchGoods();
                }

            },
            checkDetail(id){
                // this.$router.replace({ path:'/home/myOrder'})
                this.$router.push({ path:'/home/goodsDetail',query:{productId:id}})
                // this.$router.push({name:'商品详细',params: {type:'check',id:id}})

            },
            searchGoods(){
                this.postRequest('/api/product/like_name.do?string=' + this.searchStr).then(resp=>{
                    if (resp && resp.status === 200) {
                        this.productData = null;
                        let data = resp.data;
                        console.log("查询的数据--展示",data);
                        if (data.data.length > 0) {
                            this.productData = data.data;
                        }else {
                            this.$message({
                                type: 'error',
                                message: '暂无数据！!'
                            });
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>