<template>
    <div>
        <h3>商品展示页</h3>
        <div style="display: flex;justify-content: space-around;flex-wrap: wrap;text-align: left; vertical-align: super">
            <el-card style="width: 300px;margin-bottom: 5px; padding: 5px"
                     v-for="(goods,index) in productData.slice((curPage-1)*pagesize,curPage*pagesize)" :key="goods.id">
                <div  @click="checkDetail(goods.id)">

                    <div style="text-align: center; padding: 0px ; margin: 0px;" >
                        <img :src="goods.imageHost + goods.mainImage"  height="150" width="250" style="padding: 0px ; margin: 0px;"/>
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

            }
        },
        mounted:function () {
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
        },
        methods: {
            checkDetail(id){
                // this.$router.replace({ path:'/home/myOrder'})
                this.$router.replace({ path:'/goodsShow/goodsDetail'})
                // this.$router.push({name:'商品详细',params: {type:'check',id:id}})

            },
        }
    }
</script>

<style scoped>

</style>