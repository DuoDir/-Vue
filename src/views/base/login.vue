<template>
    <div :class="bodyview">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            
            
            <el-form-item label="账号" prop="accnumber">
                <el-input v-model.number="ruleForm.accnumber"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    data() {
      var checkAccNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }else{
            callback();
        }
        // setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字值'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('必须年满18岁'));
        //     } else {
        //       callback();
        //     }
        //   }
        // }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        else {
        //   if (this.ruleForm.checkPass !== '') {
        //     this.$refs.ruleForm.validateField('checkPass');
        //   }
          callback();
        }
      };
    //   var validatePass2 = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请再次输入密码'));
    //     } else if (value !== this.ruleForm.pass) {
    //       callback(new Error('两次输入密码不一致!'));
    //     } else {
    //       callback();
    //     }
    //   };
      return {
        ruleForm: {
          pass: '',
          accnumber: ''
        },
        bodyview:'bodyview',
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          
          accnumber: [
            { validator: checkAccNumber, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //   alert('submit!');
            let params = {
                manager:this.ruleForm.accnumber,
                pwd:this.ruleForm.pass,
                // systemId:1
            }
            // console.log(1)
            this.$axios.post(this.pathItem.login, params)
            .then(res => {
                let r=res;
                if(r.code == 0) {
                    this.$router.push({path:'/base/index',query:{_token:r.data.token.token}});
                }else{
                    this.$alert(r.msg, '提示', {
                        confirmButtonText: '确定',
                        type:'warning',
                    });
                }
            })
            .catch(res=>{
                this.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    type:'error',
                });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>


<style scope="scoped">
.bodyview{
    width: 500px;
    margin: 160px auto;
}
</style>