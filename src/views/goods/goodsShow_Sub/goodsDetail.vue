<template>
    <div>
        <div align="center">
            <el-button type="danger"  size="mini" plain icon="el-icon-back"
                        @click="backPage()"> 返回 </el-button>
        </div>

        <div class="" v-if="isShow">
            <div id="wrapper" style="float:inherit">
                <div id="left">
                    <img :src="goodsDetail.mainImage" width="90%"/>
                </div>
                <div id="right">
                    <div class="itemName">
                        <span>{{goodsDetail.name}}</span><br/>
                        <span style="color: #cf3322;font-size: medium">{{goodsDetail.subtitle}}</span>
                    </div>
                    <div style="margin-top: 10px; color: #a4abae;">
                        价格：<span style="font-size: 20px; color: #880000">{{goodsDetail.price}}</span>
                    </div>
                    <div style="margin-top: 10px; color: #a4abae;">
                        库存：<span style="font-size: 20px; color: #000000">{{goodsDetail.stock}}</span>
                    </div>
                    <br/><br/><br/><br/>
                    <div style="bottom: 10px;">
                        <el-button type="warning" icon="el-icon-shopping-cart-1">加入购物车</el-button>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <h1>{{returnMsg}}</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: "goodsDetail",
        data(){
            return{
                productId: this.$route.query.productId ? this.$route.query.productId : 0,
                goodsDetail :null,
                isShow:true,//是否显示详情区域
                returnMsg:"",

            }
        },
        mounted:function () {
            console.log("商品详细",this. productId);
            this.getDetail();
        },
        // activated(){
            // this.productId = this.$route.query.productId ? this.$route.query.productId : 0;
            // this.getDetail();
        // },
        // deactivated(){
        //     this.goodsDetail=null;
        // },
        methods:{
            getDetail() {
                if (this.productId > 0) {
                    //    product/datail.do
                    this.postRequest('/api/product/datail.do?productId='+this.productId ).then(resp => {
                        if (resp && resp.status === 200) {
                            let data = resp.data;
                            console.log("查询的数据-获取商品详细", data);
                            if (data.status !== 0) {
                                this.returnMsg=data.msg;
                                this.isShow= false;
                                return;
                            }
                            this.isShow = true;
                            this.goodsDetail=data.data;
                            // if (data.data.total > 0) {
                            //     this.productData = data.data.list;
                            // }
                        }
                    })
                }else {

                }
            },
            backPage(){
                // this.$route.meta.keepAlive=false;
                this.goodsDetail=null;
                // this.$router.back();
                this.$router.go(-1);
            },
        }
    }
</script>

<style scoped>
    #wrapper{
        /*margin:0 auto;*/
        /*width:80%;*/
        height: 100%;
        top: 20px;
        position: relative;
        padding-left: 420px;
        min-height: 600px;
    }
    #left{
        /*float:left;*/
        /*width: 300px;*/
        /*height: auto;*/
        position: absolute;
        top: 0;
        left: 0;
        width: 400px;
    }
    #right{
        /*float:left;*/
        /*width:auto;*/
        /*height:100%;*/
        float: right;
        width: 100%;
        margin-bottom: 20px;
        text-align: left;
    }


    .product-details-wrap {
        display: block;
        opacity: 0.95;
        font-family: "微软雅黑";
        width: 1024px;
        margin: 0px auto 0;
        background: #FFFFFF;
        padding: 40px 20px 20px 20px;

    }
    .pd-product-intro-wrap {
        position: relative;
        padding-left: 420px;
        min-height: 520px;
        zoom:1;
    }
    .product-preview {
        position: absolute;
        top: 0;
        left: 0;
        width: 400px;
    }
    .itemInfo-wrap {
        float: right;
         width: 100%;
         margin-bottom: 20px;
     }
    .itemName {
        font-size: 16px;
        color: #1b1b1b;
        overflow: hidden;
        font-weight: bold;
        padding-left: 10px;
        margin-bottom: 3px;
    }
</style>