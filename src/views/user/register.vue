<template>
    <div style=" text-align: center; margin: 100px auto; width: 200px" >
        <el-form  align="center"  label-width="150" label-position="right">
            <el-form-item label="用户名：" class="form-item">
                <el-input style="width: 250px" v-model="userInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码：" class="form-item">
                <el-input style="width: 250px" type="password" v-model="userInfo.password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" class="form-item">
                <el-input style="width: 250px" type="email" v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="电话：" class="form-item">
                <el-input style="width: 250px" type="tel" v-model="userInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="问题：" class="form-item">
                <el-input style="width: 250px" type="text" v-model="userInfo.question"></el-input>
            </el-form-item>
            <el-form-item label="答案：" class="form-item">
                <el-input style="width: 250px" type="text" v-model="userInfo.answer"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitReg">立即创建</el-button>
                <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "register",
        data(){
            return{
                userInfo:{},

            }
        },
        methods:{
            submitReg(){
                let parm = this.objectToParma(this.userInfo);
                this.postRequest('/api/user/register.do'+ parm).then(resp=>{
                    if (resp && resp.status === 200) {
                        console.log("Register ",resp.data);
                        if (resp.data.status === 0) {
                            this.$notify.success({message:resp.data.data + "  返回登录！",offset:50})
                            this.$router.replace({path:'/'});
                        }else {
                            this.$notify.error({message:resp.data.data ,offset:50})
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .form-item {
    }

</style>