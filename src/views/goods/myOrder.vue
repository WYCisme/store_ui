<template>
    <div>
        <el-tabs v-model="defaultTabName" type="card" stretch >
            <el-tab-pane label="未完成订单" name="unComplete">
                <div>
                    <el-table empty-text="暂无未完成订单"
                              :data="orderF" border stripe  >
                        <el-table-column >
                            <template slot-scope="v">
                                <div style=" margin-left: 20px">
                                    <div v-for="(item,index) in v.row.orderItemVoList"
                                         style="height: auto; align-items: center;text-align: left ;clear:both">
                                        <!--商品详细-->
                                        <span style="float: left; width: 50px">
                                            <img :src="item.productImage" width="50" height="auto" />
                                        </span>
                                        <span style="float: left; width: 200px">{{item.productName}}</span>
                                        <!--数量，金额-->
                                        <div style="float: left; display: table-cell;; margin-left: 30px">
                                            <span style="display: table; width: auto; ">数量:{{item.quantity}}</span>
                                            <span style="display: table; width: auto; margin-top: 10px">小计:{{item.totalPrice}}</span>
                                        </div>
                                        <!--创建时间-->
                                        <i class="el-icon-time" style="margin-left: 30px"></i>
                                        <span style=" width: auto; " >{{item.createTime}}</span>

                                        <!--详情-->
                                        <el-button style="margin-left: 30px;" type="primary" size="mini" plain @click="toOrderDetail(v.row)">详情</el-button>
                                    </div>
                                    <div style="clear:both; font-size: medium; margin-left: 20px">
                                        <span>订单编号：{{v.row.orderNo}}</span>
                                        <span style="margin-left: 20px; color: #ff0000;font-weight: bold">商品金额：{{v.row.payment}}</span>
                                        <el-button style="margin-left: 30px;" type="primary" size="medium"
                                                   v-if="v.row.statusDesc==='未支付'" @click="toPay(v.row.orderNo)">去支付</el-button>

                                        <span style="margin-left: 30px;" v-if="v.row.statusDesc==='已发货'">
                                            已发货
                                        <el-button style="margin-left: 30px;" type="primary" size="mini"
                                                   @click="recvGoods(v.row.orderNo)">确认收货</el-button>
                                        </span>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已完成订单" name="Completed"
                         :data="orderList" >
                <div>
                    <el-table empty-text="暂无已完成订单"
                              :data="orderT" border stripe  >
                        <el-table-column>
                            <template slot-scope="v">
                                <div style=" margin-left: 20px">
                                    <div v-for="(item,index) in v.row.orderItemVoList"
                                         style="height: auto; align-items: center;text-align: left ;clear:both">
                                        <!--商品详细-->
                                        <span style="float: left; width: 50px">
                                            <img :src="item.productImage" width="50" height="auto" />
                                        </span>
                                        <span style="float: left; width: 200px">{{item.productName}}</span>
                                        <!--数量，金额-->
                                        <div style="float: left; display: table-cell;; margin-left: 30px">
                                            <span style="display: table; width: auto; ">数量:{{item.quantity}}</span>
                                            <span style="display: table; width: auto; margin-top: 10px">小计:{{item.totalPrice}}</span>
                                        </div>
                                        <!--创建时间-->
                                        <i class="el-icon-time" style="margin-left: 30px"></i>
                                        <span style=" width: auto; " >{{item.createTime}}</span>

                                        <!--详情-->
                                        <el-button style="margin-left: 30px;" type="primary" size="mini" plain @click="toOrderDetail(v.row)">详情</el-button>
                                        <span style="margin-left: 20px">评分</span>
                                    </div>
                                    <div style="clear:both; font-size: medium; margin-left: 20px">
                                        <span>订单编号：{{v.row.orderNo}}</span>
                                        <span style="margin-left: 20px; color: #ff0000;font-weight: bold">商品金额：{{v.row.payment}}</span>

                                        <span style="margin-left: 30px;" >{{v.row.statusDesc}}</span>

                                    </div>

                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "myOrder",
        data(){
            return{
                defaultTabName:'unComplete',

                orderList:[],//所有订单数据
                orderF:[],//未完成订单
                orderT:[],//已完成订单

            }
        },
        mounted:function () {
            this.getAllOrders();
        },
        methods:{
            getAllOrders(){
                this.orderList=[];
                this.orderF=[];
                this.orderT=[];
              this.getRequest('/api/order/list.do').then(resp=>{
                  if (resp && resp.status === 200) {
                      this.orderList = resp.data.data;
                      console.log("订单数据",this.orderList);

                      for (let i of this.orderList) {
                          if (i.statusDesc === "未支付" ||i.statusDesc === "已发货" ) {
                              this.orderF.push(i);//未完成
                          }else {
                              this.orderT.push(i);//已完成
                          }
                      }
                      console.log("订单数据F",this.orderF);
                      console.log("订单数据T",this.orderT);
                  }
              })
            },
            toOrderDetail(row){
                this.$store.commit('addOrderDetail',JSON.stringify(row));
                this.$router.push({path:'/home/myOrder/orderDetail'});

            },
            toPay(orderNo){
                this.$store.commit('addOrderNo',orderNo);
                // this.$router.push({path:'/home/payPage'});//暂时不用跳转，只做逻辑
                this.$confirm('现在支付？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '稍后',
                    type: 'warning'
                }).then(() => {
                    // this.$router.push({path:'/home/payPage'});//暂时不用跳转，只做逻辑
                    this.postRequest('/api/order/pay2.do?orderNo=' + orderNo).then(resp => {
                        if (resp && resp.status === 200) {
                            console.log("支付请求-",resp.data);
                            this.$notify({
                                type: 'success',
                                message: '支付成功!',
                                offset:50
                            });
                            this.getAllOrders();
                        }
                    });

                }).catch(() => {
                    this.$notify({
                        type: 'info',
                        message: '已取消支付',
                        offset:50
                    });
                });

            },

            recvGoods(orderNo){
                this.postRequest('/api/order/receive_good.do?orderNo=' + orderNo).then(resp => {
                    if (resp && resp.status === 200) {
                        console.log("确认收货-",resp.data);
                        this.$notify({
                            type: 'success',
                            message: '收货成功!',
                            offset:50
                        });
                        this.getAllOrders();
                    }
                });

            }
        }
    }
</script>

<style scoped>

</style>