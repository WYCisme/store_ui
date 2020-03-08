<template>
    <div style="margin-left: 10px;">
        <div align="center">
            <el-button type="danger"  size="mini" plain icon="el-icon-back"
                       @click="$router.back()"> 返回 </el-button>
        </div>

        <!--订单信息-->
        <h3 style=" margin-left: 10px; font-weight: normal; margin-bottom: 0;margin-top: 30px " align="left">订单信息</h3><br/>
        <div align="left" style="margin-left: 10px; width: 600px; padding-top: 10px;padding-bottom: 10px">
            <span style="margin-left: 10px;">
                <span style="font-weight: bold ;">订 单 号 ：</span>
                {{orderDetail.orderNo}}</span>
            <span style="margin-left: 10px;">
                <span style="font-weight: bold ;">创建时间：</span>
                {{orderDetail.orderItemVoList[0].createTime}}</span>
            <br/><br/>
            <span style="margin-left: 10px;">
                <span style="font-weight: bold ;">收货信息：</span>
                {{orderDetail.shippingVo.receiverProvince}}-
                {{orderDetail.shippingVo.receiverCity}}-
                {{orderDetail.shippingVo.receiverAddress}}
                {{orderDetail.shippingVo.receiverMobile}}
                {{orderDetail.shippingVo.receiverName}}(收)
            </span>
            <br/><br/>
            <span style="margin-left: 10px;">
                <span style="font-weight: bold ;">订单状态：</span>
                <span style="color: #ff0000; font-weight: bold ;">{{orderDetail.statusDesc}}</span>

            </span>
            <span style="margin-left: 10px;">
               <span style="font-weight: bold ;">支付方式：</span>
                <span style="color: #003992; ">{{orderDetail.paymentTypeDesc}}</span>
            </span>
        </div>
        <!--商品清单-->
        <br/>
        <h3 style=" margin-left: 10px; font-weight: normal;  " align="left">商品清单</h3>
        <el-table
                :data="orderDetail.orderItemVoList"
                tooltip-effect="dark"
                style="width: 100% ; "
                border stripe
        >
            <el-table-column     label="序号"
                                 type="index" align="center"
                                 width="50">
            </el-table-column>
            <el-table-column  label="商品信息"
                              align="center"
                              width="280">
                <template slot-scope="scope">
                    <div style="height: auto; align-items: center;text-align: left">
                        <span style="float: left; width: 50px">
                            <img :src="scope.row.productImage" width="50" height="auto" />
                        </span>
                        <span style="float: right; width: 180px">{{scope.row.productName}}</span>
                    </div>
                </template>
            </el-table-column>
            <!--<el-table-column   label="单价"-->
            <!--prop="productPrice"-->
            <!--width="150"-->
            <!--align="center" >-->
            <!--</el-table-column>-->
            <el-table-column   label="数量"
                               width="150"
                               property="quantity"
                               align="center" >
            </el-table-column>
            <el-table-column   label="合计"
                               prop="totalPrice"
                               width="150"
                               align="center" >
            </el-table-column>

        </el-table>
        <p></p>
        <div style=" position:fixed ; right: 100px">
            商品总价：<span style="color: #ff0000; font-weight: bolder">{{orderDetail.payment}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        mounted:function () {
            console.log("订单详情",this.orderDetail)
        },
        computed:{
            orderDetail(){
                return this.$store.state.orderDetail
            }
        }
    }
</script>

<style scoped>

</style>