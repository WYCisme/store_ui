<template>
    <div style="margin: 10px 10px">
        <h1>商品结算</h1>
        <!--收货地址-->
        <h1 align="left">收货地址</h1>
        <div style="width: 240px;height: 60px;border:1px dashed #cf3322 ;text-align: left;padding-left: 20px">
            <span >
                {{addrInfoShow.receiverProvince}} {{addrInfoShow.receiverCity}} ( {{addrInfoShow.receiverName}} 收）
            </span><br/>
            <span style="margin-top: 20px">
                {{addrInfoShow.receiverAddress}} {{addrInfoShow.receiverMobile}}
            </span>
        </div>
        <div align="left" style="margin-top: 10px">
            <el-button @click="dialogFormVisible2 = true" size="mini" type="success" round>选择收获地址</el-button>
        </div>

        <el-dialog :title="isEdit?'编辑收货地址':'新增收货地址'" :visible.sync="dialogFormVisible" :modal="false" :modal-append-to-body="false" :show-close="false">
            <el-form v-model="addrInfo" inline label-width="130px">
                <el-form-item property="receiverName" label="收货人姓名：">
                    <el-input property="receiverName" v-model="addrInfo.receiverName"></el-input>
                </el-form-item>
                <el-form-item property="receiverPhone" label="收货人固定电话：">
                    <el-input property="receiverPhone" v-model="addrInfo.receiverPhone"></el-input>
                </el-form-item>
                <el-form-item property="receiverMobile" label="收货人手机：">
                    <el-input property="receiverMobile" v-model="addrInfo.receiverMobile"></el-input>
                </el-form-item>
                <el-form-item property="receiverProvince" label="所有省份：">
                    <el-input property="receiverProvince" v-model="addrInfo.receiverProvince"></el-input>
                </el-form-item>
                <el-form-item property="receiverCity" label="所在城市：">
                    <el-input property="receiverCity" v-model="addrInfo.receiverCity"></el-input>
                </el-form-item>
                <el-form-item property="receiverAddress" label="详细地址：">
                    <el-input property="receiverAddress" v-model="addrInfo.receiverAddress"></el-input>
                </el-form-item>
                <el-form-item property="receiverZip" label="邮编：">
                    <el-input property="receiverZip" v-model="addrInfo.receiverZip"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAddr" v-if="!isEdit">确 定</el-button>
                <el-button type="primary" @click="updateAddr" v-if="isEdit">确 定</el-button>

            </div>
        </el-dialog>
        <el-dialog title="选择收货地址" :visible.sync="dialogFormVisible2" :modal="false" :modal-append-to-body="false" :show-close="false" top="0">
            <div >
                <el-table :data="addrInfos"
                          tooltip-effect="dark"
                          style="width: 100% ; margin-top: 0px "
                          border stripe>
                    <el-table-column
                                     align="center"
                                     width="auto">
                        <template slot-scope="scope" >
                            <div>
                                <span >
                                    {{scope.row.receiverProvince}} {{scope.row.receiverCity}} ( {{scope.row.receiverName}} 收）
                                </span><br/>
                                                    <span style="margin-top: 20px">
                                    {{scope.row.receiverAddress}} {{scope.row.receiverMobile}}
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="it">
                            <div>
                                <el-button size="mini" type="primary" plain @click="selectAddrInfo(it.row)">选择</el-button>
                                <el-button size="mini" type="primary" plain @click="editAddrInfo(it.row)">编辑</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = true" size="mini" type="primary" round>新增收货地址</el-button>
            </div>

        </el-dialog>

        <!--商品清单-->
        <h1 align="left">商品清单</h1>
        <el-table
                :data="selectCarts"
                tooltip-effect="dark"
                style="width: 100% ; "
                border stripe
        >
            <el-table-column     label="行号"
                                 type="index" align="center"
                                 width="50">
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
                               width="150"
                               align="center" >
                <template slot-scope="scope">
                    <el-input v-model="scope.row.quantity"  style="width: 100% ; text-align: center" readonly
                    > </el-input>
                </template>
            </el-table-column>
            <el-table-column   label="小计"
                               prop="productTotalPrice"
                               width="150"
                               align="center" >
            </el-table-column>

        </el-table>
        <p></p>
        <div style=" position:fixed ; bottom:10px;right: 0">
            <span>总价：{{totalPrice}}</span>
            <el-button type="danger" round style="margin-right: 20px; margin-left: 20px; font-weight: bolder;font-size: large;color: #ffffff;"
                       @click="toPay">去 支 付</el-button>
        </div>


    </div>
</template>

<script>
    import ElSelectDropdown from "element-ui/packages/select/src/select-dropdown";
    export default {
        name: "settlement",
        components: {ElSelectDropdown},
        data(){
            return{
                totalPrice:0,
                dialogFormVisible:false,//地址选择弹出
                dialogFormVisible2:false,//地址选择弹出
                isEdit:false,
                addrInfo:{
                    userId:null,
                    receiverName:null,
                    receiverPhone:null,
                    receiverMobile:null,
                    receiverProvince:null,
                    receiverCity:null,
                    receiverAddress:null,
                    receiverZip:null
                },
                addrInfoShow:{
                    userId:null,
                    receiverName:null,
                    receiverPhone:null,
                    receiverMobile:null,
                    receiverProvince:null,
                    receiverCity:null,
                    receiverAddress:null,
                    receiverZip:null
                },
                addrInfos:[],//所有地址
            }
        },
        mounted:function () {
            console.log("商品清单",this.$store.state.cartsTemp);
            for (let it of this.selectCarts) {
                this.totalPrice += it.productTotalPrice;
            }

            this.getAllAddr();
        },
        methods:{
            getAllAddr(){
                this.getRequest('/api/shipping/list.do').then(resp=>{
                    if (resp && resp.status === 200) {
                        console.log("获取所有收货地址",resp.data);
                        this.addrInfos=resp.data.data.list;
                    }
                })
            },
            addAddr(){
                this.dialogFormVisible=false;
                this.addrInfo.userId = this.selectCarts[0].userId;
                this.postRequest('/api/shipping/add.do?userId='+ this.addrInfo.userId +
                    '&receiverName='+ this.addrInfo.receiverName+'' +
                    '&receiverPhone='+ this.addrInfo.receiverPhone+
                    '&receiverMobile='+ this.addrInfo.receiverMobile +
                    '&receiverProvince='+this.addrInfo.receiverProvince+
                    '&receiverCity='+ this.addrInfo.receiverCity +
                    '&receiverAddress='+ this.addrInfo.receiverAddress +
                    '&receiverZip='+ this.addrInfo.receiverZip).then(resp=>{
                        if (resp && resp.status === 200) {
                            console.log("地址添加--返回",resp.data);
                            // this.addrInfoShow=this.addrInfo;
                        }
                })
            },
            updateAddr(){
                // this.addrInfoShow = this.addrInfo;
                this.isEdit=false;
                this.dialogFormVisible=false;
                this.postRequest('/api/shipping/update.do?'+
                        'id='+this.addrInfo.id+
                        '&receiverName='+this.addrInfo.receiverName+
                        '&receiverPhone='+this.addrInfo.receiverPhone+
                        '&receiverMobile='+this.addrInfo.receiverMobile+
                        '&receiverProvince='+this.addrInfo.receiverProvince+
                        '&receiverCity='+this.addrInfo.receiverCity+
                        '&receiverAddress='+this.addrInfo.receiverAddress+
                        '&receiverZip='+this.addrInfo.receiverZip
                ).then(resp=>{
                    if (resp && resp.status === 200) {
                        console.log("地址更新",resp.data);
                    }
                })

            },
            editAddrInfo(row){
                this.dialogFormVisible=true;
                this.isEdit=true;

                this.addrInfo=row;
            },
            selectAddrInfo(row){
                this.addrInfoShow=row;
                this.dialogFormVisible2=false;
            },
            toPay(){
                if ( ! this.addrInfoShow.id ) {
                    this.$notify.warning({message:"请选择收货地址",offset:100});
                    return;
                }
                console.log("shippingId",this.addrInfoShow.id);
                let ids=[];
                for (let i of this.selectCarts) {
                    ids.push(i.id);
                }
                console.log("ids",ids);
                this.postRequest('/api/order/create2.do?shippingId='+this.addrInfoShow.id + '&cartIds=' + ids).then(resp=>{
                    if (resp && resp.status === 200) {
                        console.log("创建订单-",resp.data);
                    }
                })

            },
        },
        computed:{
            selectCarts(){
                return this.$store.state.cartsTemp;
            }
        }
    }
</script>

<style scoped>

</style>