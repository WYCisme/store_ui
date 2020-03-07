<template>
    <div>
        <el-table
                :data="theCart.cartProductVoList"
                tooltip-effect="dark"
                style="width: 100% ; "
                border stripe
                @selection-change="handleSelectionChanged"
        >
            <el-table-column     label="行号"
                                 type="index" align="center"
                                 width="50">
            </el-table-column>
            <el-table-column
                    type="selection" label="全选"
                    align="center"
                    width="55">
            </el-table-column>
            <el-table-column  label="商品信息"
                              align="center"
                              width="280">
                <template slot-scope="scope">
                    <div style="height: auto; align-items: center;text-align: left">
                        <span style="float: left; width: 50px">
                            <img :src="scope.row.productMainImage" width="50" height="auto" />
                        </span>
                        <span style="float: right; width: 180px">{{scope.row.productName}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column   label="单价"
                               prop="productPrice"
                               width="150"
                               align="center" >
            </el-table-column>
            <el-table-column   label="数量"
                               width="160"
                               align="center" >
                <template slot-scope="scope">
                    <el-input-number v-model="scope.row.quantity" :min="1" :max="scope.row.productStock"
                                     style="width: 130px;"
                                     @change="quantityChanged(scope.row,scope.$index)"
                    > </el-input-number>
                    <el-button size="mini" type="danger" plain slot="reference" v-if="isChange[scope.$index]"
                               @click="update_product_count(scope.row,scope.$index)">确定</el-button>
                </template>
            </el-table-column>
            <el-table-column   label="合计"
                               prop="productTotalPrice"
                               width="150"
                               align="center" >
            </el-table-column>

            <el-table-column label="操作" width="80" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" plain slot="reference"
                               @click="del_product_from_cart(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <p></p>
        <div style=" position:fixed ; bottom:10px;right: 0">
            <span>总价：{{totalPrice}}</span>
            <el-button type="danger" round style="margin-right: 20px; margin-left: 20px; font-weight: bolder;font-size: large;color: #ffffff;"
                       @click="goToSettlement">去 结 算</el-button>
        </div>
        <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "shoppingCart",
        data(){
            return{
                theCart:{
                    cartProductVoList:[],
                },
                selectCarts:[],//多选的商品
                totalPrice:0,//勾选的总价
                isChange:[],//是否修改了数量

            //         // {"id":1,"userId":23,"productId":1,"quantity":null,"productName":null,"productSubtitle":null,"productMainImage":null,"productPrice":null,"productStatus":null,"productTotalPrice":null,"productStock":null,"productChecked":null,"limitQuantity":null},
            //         // {"id":129,"userId":23,"productId":27,"quantity":32,"productName":"Midea/美的 BCD-535WKZM(E)冰箱双开门对开门风冷无霜智能电家用","productSubtitle":"送品牌烤箱，五一大促","productMainImage":"http://photo.16pic.com/00/13/78/16pic_1378599_b.jpg","productPrice":3299.00,"productStatus":2,"productTotalPrice":105568.00,"productStock":8876,"productChecked":1,"limitQuantity":"LIMIT_NUM_SUCCESS"},
            //         {"id":130,"userId":23,"productId":27,"quantity":24,"productName":"Midea/美的 BCD-535WKZM(E)冰箱双开门对开门风冷无霜智能电家用","productSubtitle":"送品牌烤箱，五一大促","productMainImage":"http://photo.16pic.com/00/13/78/16pic_1378599_b.jpg","productPrice":3299.00,"productStatus":2,"productTotalPrice":79176.00,"productStock":8876,"productChecked":1,"limitQuantity":"LIMIT_NUM_SUCCESS"}],
            //
            }
        },
        mounted:function(){
            this.getMyCart();
        },
        methods:{
            del_product_from_cart(row){
                this.$confirm('是否删除该商品？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    this.getRequest('/api/cart/delete_alone_product.do?productId='+ row.id ).then(resp => {
                        if (resp && resp.status === 200 ) {
                            console.log("删除购物车里的--",resp.data);
                            this.getMyCart();
                            this.$notify.success({
                                message: '已删除',
                                offset:100
                            });
                        }
                    })

                }).catch(() => {
                    this.$notify.warning({
                        message: '已取消删除',
                        offset:100
                    });
                });

            },
            getMyCart(){
                this.getRequest('/api/cart/list.do' ).then(resp => {
                    if (resp && resp.status === 200) {
                        this.theCart =resp.data.data;
                        let index=0;
                        for(let it in this.theCart){
                            this.isChange[index]=false;
                            index++;
                        }
                        console.log("购物车数据",this.theCart)
                    }
                })
            },
            handleSelectionChanged(val){
                this.selectCarts = val;
                console.log("选择的商品",this.selectCarts);
                for (let it of this.selectCarts) {
                    this.totalPrice += it.productTotalPrice;
                }
            },
            //数量改变后调整合计
            quantityChanged(row,index){
                row.productTotalPrice = row.productPrice * row.quantity;
                this.isChange[index] = true;
                console.log("行号",index);

            },
            update_product_count(row,index){
                console.log("行号",index);
                this.isChange[index] = false;
                this.postRequest('/api/cart/update_product_count2.do?'+
                    'id='+ row.id+
                    '&userId='+ row.userId+
                    '&productId='+ row.productId +
                    '&quantity='+ row.quantity +
                    '&checked=1'
                 ).then(resp => {
                    if (resp && resp.status === 200) {
                        console.log("更新购物车数据");
                        if (resp.data.status === 0) {
                            this.$notify.success({
                                message: resp.data.data,
                                offset:100
                            })
                        }else {
                            this.$notify.error({
                                message: resp.data.msg,
                                offset:100
                            })
                        }
                    }
                });
                // this.$router.go(0);
                location.reload()
            },
            goToSettlement(){
                if (this.selectCarts.length < 1) {
                    this.$notify.warning({message:'请勾选商品！',offset:100});
                    return;
                }
                this.$store.commit('addCartsTemp',JSON.stringify(this.selectCarts));
                this.$router.push({path:'/home/settlement'})
            },


        }

    }
</script>

<style scoped>

</style>