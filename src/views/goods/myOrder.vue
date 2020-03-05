<template>
    <div>
        <h1>我的订单</h1>
        <el-tabs v-model="defaultTabName" type="card" stretch="true" >
            <el-tab-pane label="未完成订单" name="unComplete">
                <template>
                    <div>
                        未完成订单
                    </div>
                </template>
            </el-tab-pane>
            <el-tab-pane label="已完成订单" name="Completed">
                <template>
                    <div>
                        已完成订单
                    </div>
                </template>

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
              this.postRequest('/api/manage/order/list.do').then(resp=>{
                  if (resp && resp.status === 200) {
                      console.log("订单数据",resp.data);
                  }
              })
            },
        }
    }
</script>

<style scoped>

</style>