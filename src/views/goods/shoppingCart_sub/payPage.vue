<template>
    <div>
        <h1>支付页面</h1>
        <img :src="payImg" width="400" align="center"/>
    </div>
</template>

<script>
    export default {
        name: "payPage",
        data(){
            return{
                payImg:null,

            }
        },
        mounted:function () {
            console.log("支付页-订单编号",this.OrderNo);
            this.doPay();
        },
        computed:{
            OrderNo(){
                return this.$store.state.OrderNo
            }
        },

        methods:{
            doPay() {
                this.postRequest('/api/order/pay2.do?orderNo=' + this.OrderNo).then(resp => {
                    if (resp && resp.status === 200) {
                        console.log("支付请求-",resp.data);
                        this.payImg = resp.data.data.qrUrl;
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>