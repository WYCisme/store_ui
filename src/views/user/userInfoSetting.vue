<template>
    <div style=" text-align: center; margin: 0 auto; width: 300px; clear: both" >
        <h2>修改密码</h2>
        <el-form :inline="true"  align="center"  label-width="150" label-position="right">
            <el-row>
                <el-form-item label="原密码：" class="form-item">
                    <el-input style="width: 250px" v-model="user.passwordOld" type="password" show-password=""></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="原密码：" class="form-item">
                    <el-input style="width: 250px" v-model="user.passwordNew"  type="password" show-password=""></el-input>
                </el-form-item>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitChange">修改</el-button>
                <el-button @click="$router.back()">取消</el-button>

            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "userInfoSetting",
        data(){
            return{
                user: {
                    passwordOld: null,
                    passwordNew: null,
                }
            }
        },
        methods:{
            submitChange(){
                let parm = this.objectToParma(this.user);
                this.postRequest('/api/user/reset_password.do'+ parm).then(resp=>{
                    if (resp && resp.status === 200) {
                        console.log("changePassword",resp.data);
                        if (resp.data.status === 0) {
                            this.$notify.success({message:resp.data.msg ,offset:50})
                        }else {
                            this.$notify.error({message:resp.data.msg ,offset:50})
                        }
                    }
                })
            }
        },
    }
</script>

<style scoped>
.form-item{
    text-align: right;
}
</style>