<template>
    <div>
        <div class="search-input" >
            <el-input type="text"  prefix-icon="el-icon-search" v-model=searchStr property="搜索商品"
                      style="width: 200px; padding-right: 10px"/>
            <el-button type="primary" @click="searchGoods()" icon="el-icon-search" size="mini">搜索</el-button>

            <span style="margin-left: 20px">分类查看</span>
            <el-select v-model="selectCategory" style="width: 150px;margin-left: 10px" @change="searchGoodsByCategoryID">
                <el-option v-for="(cate,ind) in allCategory" :label="cate.name" :value="cate.id" :key="cate.id"></el-option>
            </el-select>
        </div>

        <div style="display: flex;flex-wrap: wrap;text-align: left; vertical-align: super; padding: 5px;">
            <el-card style="width: 250px;margin: 8px; padding: 5px ; font-size: small"
                     v-for="(goods,index) in productData.slice((curPage-1)*pagesize,curPage*pagesize)" :key="goods.id">
                <div  @click="checkDetail(goods.id)" style="padding: 2px">
                    <div style="text-align: center; padding: 0 ; margin: 0;" >
                        <img :src="goods.mainImage" alt="商品图片" width="150" style="padding: 0 ; margin: 0;"/>
                    </div>
                    <span>{{goods.name}}</span><br/>
                    <span style="color: #ff0000;">{{goods.subtitle}}</span>
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
                pagesize:10,
                curPage:1,

                productData:[],
                productDataAll:[],
                // searchStr : this.$route.query.searchStr ? this.$route.query.searchStr : null,
                searchStr :"",

                allCategory:[],
                selectCategory:null,//分类查看的分类id
            }
        },
        mounted:function () {
            this.getAll();
            this.getAllCategory();
        },
        methods: {
            getAll(){
                if (this.searchStr === null || this.searchStr === ""){
                    //获取所有商品
                    this.postRequest('/api/product/list_all.do').then(resp=>{
                        if (resp && resp.status === 200) {
                            let data = resp.data;
                            console.log("查询的数据-获取所有商品",data);
                            if (data.data.length > 0) {
                                this.productData = data.data;
                                this.productDataAll = data.data;
                            }
                        }
                    })
                } else {
                    this.searchGoods();
                }
            },
            getAllCategory(){
                this.postRequest('/api/product/list_category.do').then(resp=>{
                    if (resp && resp.status === 200) {
                        let data = resp.data;
                        console.log("查询的数据-获取所有分类",data);
                        if (data.data.length > 0) {
                            this.allCategory = data.data;
                        }
                    }
                })

            },

            checkDetail(id){
                // this.$router.replace({ path:'/home/myOrder'})
                this.$router.push({ path:'/home/goodsDetail',query:{productId:id}})
                // this.$router.push({name:'商品详细',params: {type:'check',id:id}})

            },
            searchGoods(){
                this.postRequest('/api/product/like_name.do?string=' + this.searchStr).then(resp=>{
                    if (resp && resp.status === 200) {
                        this.productData = [];
                        let data = resp.data;
                        console.log("查询的数据--展示",data);
                        if (data.data.length > 0) {
                            this.productData = data.data;
                        }else {
                            this.$notify.warning({message:"搜索数据为空！",offset: 100});
                        }
                    }
                });
            },
            searchGoodsByCategoryID(val){
                console.log("categoryId",val);
                this.productData= [];
                for ( let i of this.productDataAll){
                    if (i.categoryId === val) {
                        this.productData.push(i);
                    }
                }
                if (this.productData.length === 0) {
                    this.$notify.info({message:"该分类下没有商品",offset:50});
                    this.productData = this.productDataAll;
                }

            },
        }
    }
</script>

<style scoped>

</style>