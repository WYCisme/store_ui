<template>
    <div>
        <h1>支付页面</h1>
    </div>
</template>

<script>
    export default {
        name: "payPage",
        data(){
            return{

            }
        },
        mounted:function () {
            console.log("支付页-订单编号",this.OrderNo)
        },
        computed:{
            OrderNo(){
                return this.$store.state.OrderNo
            }
        },

        methods:{

        }
    }
</script>

<style scoped>

</style>