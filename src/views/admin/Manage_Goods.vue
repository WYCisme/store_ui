<template>
    <div>
        <el-tabs stretch type="card" v-model="defaultTab">
            <el-tab-pane label="商品管理" name="商品管理">
                <div class="search-input" >


                    <el-input type="text"  prefix-icon="el-icon-search" v-model=searchStr property="搜索商品"
                              style="width: 200px; padding-right: 10px"/>
                    <el-button type="primary" @click="searchGoods()" icon="el-icon-search" size="medium">搜索</el-button>
                </div>
                <div style="display: flex;flex-wrap: wrap;text-align: left; vertical-align: super; padding: 5px;">
                    <el-card style="width: 250px;margin: 8px; padding: 5px ; font-size: small"
                             v-for="(goods,index) in productData.slice((curPage-1)*pagesize,curPage*pagesize)" :key="goods.id">
                        <div  @click="checkDetail(goods.id)" style="padding: 2px">
                            <div style="text-align: center; padding: 0 ; margin: 0;width: 150px; height: 300px;" >
                                <img :src="goods.mainImage" alt="商品图片" width="100%" style="padding: 0 ; margin: 0;"/>
                            </div>
                            <span>{{goods.name}}</span><br/>
                            <span style="color: #ff0000;">{{goods.subtitle}}</span>
                        </div>
                        <div style="margin-top: 5px; text-align: center ;">
                            <el-button size="mini" type="success" plain v-if="goods.status === 1" @click="changeProduct(goods)"> 编辑</el-button>
                            <el-button size="mini" type="danger" plain v-if="goods.status === 1" @click="changeStatus(goods)"> 下架</el-button>
                            <el-button size="mini" type="primary" plain v-if="goods.status === 2" @click="changeStatus(goods)"> 上架</el-button>
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

            </el-tab-pane>
            <el-tab-pane label="新增商品" name="新增商品">
                <div style="margin-left: 20px;clear: both;" >
                    <el-form  label-width="400" style="width: 600px" label-position="left" :inline="true">
                        <el-form-item class="label_item" label="分类">
                            <!--<el-input v-model="addProductData.categoryId"></el-input>-->
                            <el-select v-model="addProductData.categoryId">
                                <el-option v-for="cate in allCategory" :value="cate.id" :label="cate.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="label_item" label="商品标题">
                            <el-input v-model="addProductData.name"></el-input>
                        </el-form-item>
                        <el-form-item class="label_item" label="商品子标题" >
                            <el-input v-model="addProductData.subtitle"></el-input>
                        </el-form-item>
                        <el-form-item class="label_item" label="商品单价" >
                            <el-input-number v-model="addProductData.price" :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item class="label_item" label="商品库存" >
                            <el-input-number v-model="addProductData.stock" :min="1"></el-input-number>
                        </el-form-item>
                        <el-form-item class="label_item" label="商品状态">
                            <el-select v-model="addProductData.status">
                                <el-option value="1" label="上架" ></el-option>
                                <el-option value="2" label="下架"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  class="label_item" label="商品展示图">
                            <span >{{addProductData.mainImage}}</span>
                            <el-upload
                                    class="upload-demo"
                                    action="/api/manage/product/richtext_img_upload.do"
                                    name="upload_file"
                                    :file-list="fileList"
                                    :on-success="fileUploadSuccess">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" size="medium" @click="addProduct">确定</el-button>
                    <el-button type="danger" plain="" size="medium" @click="addProductData={}">重置</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="商品分类" name="商品分类">
                <div style="margin-left: 20px">
                    <el-button @click="dialogAddCate = true" type="success" size="medium">新增分类</el-button>
                    <el-dialog title="新增分类" :visible.sync="dialogAddCate" center :modal="false">
                        <span>
                            分类名称
                        <el-input v-model="addCategoryData.categoryName" style="float: left;"></el-input>
                        </span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogAddCate = false">取 消</el-button>
                            <el-button type="primary" @click="addCategory">确 定</el-button>
                        </span>
                    </el-dialog>
                    <el-table :data="allCategory" stripe align="left">
                        <el-table-column label="ID" property="id"></el-table-column>
                        <el-table-column label="名称" property="name">
                            <template slot-scope="v" style="display: block">
                                <el-input v-if="v.row.isEdit" v-model="v.row.name" style="float: left;"></el-input>
                                <el-button v-if="v.row.isEdit" size="mini" style="float: left;"
                                    @click="editOk(v.$index, v.row)">确认</el-button>
                                <el-button v-if="v.row.isEdit" size="mini" style="float: left;"
                                    @click="editCancel(v.$index, v.row)">取消</el-button>
                                <span v-else >{{v.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="v">
                                <el-button size="mini" @click="handleEdit(v.$index, v.row)">编辑</el-button>
                                <!--<el-button size="mini" type="danger" @click="handleDelete(v.$index, v.row)">删除</el-button>-->
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
        data(){
            return{
                pagesize:10,
                curPage:1,

                productData:[],
                searchStr :"",

                defaultTab:"商品管理",//默认标签也

                addProductData:{//需要添加的商品信息
                    // id:null,
                    categoryId: null,
                    name: null,
                    subtitle: null,
                    mainImage: null,
                    price: null,
                    stock: null,
                    detail:"...",
                    status: null,
                },
                fileList:[],//上传的文件列表
                allCategory:[],//所有的商品分类信息

                dialogAddCate:false,//新增分类弹窗
                addCategoryData:{
                    parentId:0,
                    categoryName:null,
                }
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
                    this.postRequest('/api/manage/product/list.do').then(resp=>{///manage/product/list.do
                        if (resp && resp.status === 200) {
                            let data = resp.data;
                            console.log("查询的数据-获取所有商品",data);
                            if (data.data.length > 0) {
                                this.productData = data.data;
                            }
                        }
                    })
                } else {
                    this.searchGoods();
                }

            },
            getAllCategory(){
                this.postRequest('/api/manage/category/get_category.do').then(resp=>{
                    if (resp && resp.status === 200) {
                        let data = resp.data;
                        console.log("查询的数据-获取所有分类",data);
                        if (data.data.length > 0) {
                            this.allCategory = data.data;
                            for (let i of this.allCategory) {
                                // this.isEdit.push(false);
                                this.allCategory.isEdit = false;
                            }
                        }
                    }
                })

            },
            checkDetail(id){
                // this.$router.replace({ path:'/home/myOrder'})
                this.$router.push({ path:'/Manage_Goods/manage_goodsDetail',query:{productId:id}})
                // this.$router.push({name:'商品详细',params: {type:'check',id:id}})

            },
            searchGoods(){
                this.postRequest('/api/product/like_name.do?string=' + this.searchStr).then(resp=>{
                    if (resp && resp.status === 200) {
                        this.productData = null;
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
            changeStatus(goods){
                let status = goods.status === 1 ? 2 : 1;

                this.postRequest('/api/manage/product/set_sale_status.do?productId='+ goods.id+ '&status=' + status).then(resp=> {
                    if (resp && resp.status === 200) {
                        if (resp.data.status === 0) {
                            goods.status=status;
                            this.$notify.success({message:resp.data.data,offset:50})
                        }else {
                            this.$notify.error({message:resp.data.data,offset:50})
                        }
                    }
                })
            },
            changeProduct(goods){
                this.addProductData = goods;
                this.defaultTab = "新增商品";
            },

            fileUploadSuccess(response, file, fileList){
                console.log(response);
                this.addProductData.mainImage = response.file_path;
            },
            addProduct(){
                let parm = this.objectToParma(this.addProductData);
                console.log("addProductData",this.addProductData);
                console.log("parm",parm);
                this.postRequest('/api/manage/product/save.do'+ parm).then(resp=>{
                    if (resp && resp.status === 200) {
                        console.log("添加商品",resp.data);
                        this.$notify.success({message:resp.data.data,offset:50})
                    }
                })
            },
            addCategory(){
                let parm = this.objectToParma(this.addCategoryData);
                this.postRequest('/api/manage/category/add_category.do'+ parm).then(resp=>{
                    if (resp && resp.status === 200) {
                        console.log("添加分类",resp.data);
                        if (resp.data.status === 0) {
                            this.$notify.success({message:resp.data.data,offset:50});
                            this.getAllCategory();
                        }
                    }
                });
                this.dialogAddCate = false
            },
            handleEdit(index,row){
                row.isEdit=true;
                this.$set(this.allCategory, index, row)
            },
            editCancel(index,row){
                row.isEdit=false;
                this.$set(this.allCategory, index, row);
            },
            editOk(index,row){
                row.isEdit=false;
                this.$set(this.allCategory, index, row);
                ///manage/category/set_category_name.do
                this.postRequest('/api/manage/category/set_category_name.do?categoryId='+row.id +'&categoryName=' + row.name).then(resp=>{
                    if (resp && resp.status === 200) {
                        this.$notify.success({message:resp.data.data,offset:50})
                    }
                })

            },
            handleDelete(index,row){

            }
        }
    }
</script>

<style scoped>
    .label_item{
        width: 300px;
        text-align: left;
        /*text-align:right;*/
        /*display: inline-block;*/
        /*text-align-last: justify;*/
    }
</style>