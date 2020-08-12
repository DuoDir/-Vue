<template>
  <div>
    <el-row>
      <el-col :span="24" class="title-search">
        <div class="grid-content bg-purple-dark">
          <el-col :span="12" class="title-search-left"><div class="grid-content bg-purple"><i class="el-icon-search"></i>信息筛选</div></el-col>
          <el-col :span="12" class="title-search-right">
            <div class="grid-content bg-purple-light">
              <el-button type="primary" size="small" @click="reset">重置</el-button>
              <el-button type="primary" size="small" icon="el-icon-search" @click="searchFun">点击搜索</el-button>
            </div>
          </el-col>
        </div>
        </el-col>
    </el-row>
    <el-row class="search-text">
      <el-col :span="24">
        <el-col :span="8" class="search-test1">
          用户信息<el-input v-model="list.userInfo" placeholder="输入ID/姓名/手机号" class="search-message"></el-input>
        </el-col>
        <el-col :span="8">
          状态<el-select v-model="list.isDelete" clearable placeholder="请选择" class="search-city">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          创建时间<el-date-picker class="search-date" v-model="list.time" type="daterange" value-format="yyyy-MM-dd"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="title-search">
        <div class="grid-content bg-purple-dark">
          <el-col :span="12" class="title-search-left"><div class="grid-content bg-purple"><i class="el-icon-s-order"></i>用户列表</div></el-col>
          <el-col :span="12" class="title-search-right">
            <div class="grid-content bg-purple-light">
              <el-button type="primary" size="small"  @click="createModel">添加</el-button>
            </div>
          </el-col>
        </div>
        </el-col>
    </el-row>
<!-- 表格 -->
      <el-table :data="tableData" style="width: 100%;" border>
      <el-table-column prop="numId" label="ID" width="180"></el-table-column>
      <el-table-column prop="misUsername" label="姓名" width="180"></el-table-column>
      <el-table-column prop="misRoleName" label="角色"></el-table-column>
      <el-table-column prop="misPhone" label="手机号"></el-table-column>
      <el-table-column prop="misAccount" label="关联账号" width="180"></el-table-column>
      <el-table-column prop="seatNo" label="坐席号"></el-table-column>
      <el-table-column prop="seatPwd" label="坐席密码" width="180"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="button" label="操作" fixed="right" width="100">
        <template slot-scope="scope">
        <div v-if="scope.row.misRoleId == 104 || scope.row.misRoleId == 102" class="text-center"><el-button type="text" size="small" @click="editModel(scope.row.id)">编辑</el-button></div>
        <div class="text-center"><el-button @click="dis(scope.row)" type="text" size="small">{{scope.row.statusButton}}</el-button></div>
        <div class="text-center"><el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button></div>
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="bottom-box">
      <el-col :span="24" class="button-pager">
          <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="10"
            layout="total, prev, pager, next"
            :total=total>
          </el-pagination>   -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size=sizeChang
            layout="total, prev, pager, next, sizes, jumper"
            :total=total>
          </el-pagination>
      </el-col>
    </el-row>
    <!-- 创建 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-row class="dia-message">
        <el-col class="right-text" :span="6"><div class="grid-content bg-purple"><span class="redspan">*</span>姓名</div></el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <!-- <el-input class="dia-rot" v-model="createData.name" placeholder="输入ID/名称" size="mini"></el-input> -->
            <el-autocomplete 
              class="inline-input dia-rot"
              size="mini"
              v-model="state"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
          </el-col>
      </el-row>
      <el-row class="dia-message" v-if="isShow">
        <el-col class="right-text" :span="6"><div class="grid-content bg-purple"><span class="redspan">*</span>角色</div></el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <el-input class="dia-rot" v-model="createData.misRoleName" placeholder="" size="mini" :disabled="true"></el-input>
          </div>
          </el-col>
      </el-row>
      <el-row class="dia-message" v-if="isShow">
        <el-col class="right-text" :span="6"><div class="grid-content bg-purple"><span class="redspan">*</span>坐席工号</div></el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <el-input class="dia-rot" v-model="createData.seatNo" placeholder="请输入工号" size="mini"></el-input>
          </div>
          </el-col>
      </el-row>
      <el-row class="dia-message" v-if="isShow">
        <el-col class="right-text" :span="6"><div class="grid-content bg-purple"><span class="redspan">*</span>坐席密码</div></el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <el-input class="dia-rot" v-model="createData.seatPwd" placeholder="请输入密码" size="mini" show-password></el-input>
          </div>
          </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="create" :disabled="creatButton">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑用户" :visible.sync="edit_dialogVisible" width="30%" :before-close="handleClose">
      <el-row class="dia-message">
        <el-col class="right-text" :span="6"><div class="grid-content bg-purple"><span class="redspan">*</span>姓名</div></el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <el-input class="dia-rot" v-model="editData.misUsername" placeholder="请输入工号" size="mini" :disabled="true"></el-input>
          </div>
        </el-col>
        <!-- <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <el-autocomplete 
              class="inline-input dia-rot"
              size="mini"
              v-model="state"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
          </el-col> -->
      </el-row>
      <el-row class="dia-message">
        <el-col class="right-text" :span="6"><div class="grid-content bg-purple"><span class="redspan">*</span>角色</div></el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <el-input class="dia-rot" v-model="editData.misRoleName" placeholder="" size="mini" :disabled="true"></el-input>
          </div>
          </el-col>
      </el-row>
      <el-row class="dia-message">
        <el-col class="right-text" :span="6"><div class="grid-content bg-purple"><span class="redspan">*</span>坐席工号</div></el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <el-input class="dia-rot" v-model="editData.seatNo" placeholder="请输入工号" size="mini"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="dia-message">
        <el-col class="right-text" :span="6"><div class="grid-content bg-purple"><span class="redspan">*</span>坐席密码</div></el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <el-input class="dia-rot" v-model="editData.seatPwd" placeholder="请输入密码" size="mini" show-password></el-input>
          </div>
          </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edit_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog
      title="删除用户"
      :visible.sync="del_dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>确定删除本条数据</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="del_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="del_saver">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'group',
  data(){
    return {
      options: [{value: '1',label: '启用'}, {value: '2',label: '禁用'}],
      list:{
        userInfo:'',//用户姓名
        isDelete:'',//状态
        createdAtStart:'',//开始时间
        createdAtEnd:'',//结束时间
        time:'',//开始-结束时间
        groupId:''//组id
      },
      // 表格
      tableData: [],
      // 分页
      currentPage: 1,//当前页数
      sizeChang:10,//每页多少条
      total:0,//总共多少条
      // 区分是否为客服
      isShow:false,
      // 创建
      createData:{
        state:'',//姓名
        misRoleName:'',//角色
        seatNo:'',//工号
        seatPwd:'',//密码
        misRoleId:'',//roleCode，来自选择的角色
        misUserId:'',//id
        groupId:'',//组传过来的id
      },
      // 编辑
      editData:{
        id:'',
        misUsername:'',//姓名
        misRoleName:'',//角色
        seatNo:'',//工号
        seatPwd:'',//密码
        misRoleId:'',//roleCode，来自选择的角色
        misUserId:'',//id
        misPhone:'',//电话
        misAccount:''//关联账号
      },
      dialogVisible: false,//模态框
      // 编辑
      edit_dialogVisible:false,
      //删除
      del_dialogVisible:false,
      deleteId:'',
      // 输入匹配查询
      restaurants: [],
      state: '',
      creatButton:true, //  添加用户按钮
      
    }
  },
  mounted(){
    this.createData.groupId = this.$route.query.id;
    
    this.list.groupId = this.$route.query.id;
    this.load(this.currentPage,this.sizeChang);
  },
  methods:{
    handleSizeChange(val){//每页多少条
      //监视每页多少条
      this.sizeChang = val;
      this.load(this.currentPage,this.sizeChang);
    },
    handleCurrentChange(val){//当前页
      this.currentPage = val;
      this.load(this.currentPage,this.sizeChang);
    },
    handleClose(done) {//弹出框点击遮罩层部分
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    load(pageNumber,sizeNumber){       
      var pageNumber = pageNumber-1;
      this.list.createdAtStart = this.list.time[0];
      this.list.createdAtEnd = this.list.time[1];
      if(this.list.time.length == 0){
        this.list.createdAtStart = '';
        this.list.createdAtEnd = '';
      }
      this.list.pageNum = pageNumber;
      this.list.pageSize = sizeNumber;
      this.openFullScreen();
        this.$axios.post(this.pathItem.getUserListPage,this.list)
        .then(res=>{
          if(res.code == '1'){
            let r = res.data;
            //数据
            this.total = r.totalElements;//总页数
            for(let d in r.content){
              r.content[d].numId = r.content[d].numId.toString().padStart(4, 0);
              if(r.content[d].isDelete == 1){
                r.content[d].statusButton = '禁用';
              }else{
                r.content[d].statusButton = '启用';
              }
            }
            this.tableData = r.content;
          // this.$message({message: res.msg,type: 'success'});
          }else{
          this.$message({
            message: res.msg,
            type: 'warning'
          });
          }
          this.openFullScreen('close');
        })
        .catch((err)=>{
          this.$message.error('错了哦，这是一条错误消息');
          this.openFullScreen('close');
        })
    },
    createModel(){//创建
        this.dialogVisible = true;
        this.creatButton = true;
        this.isShow = false;
        this.state = '';//姓名
        this.createData.misRoleName = '';//角色
        this.createData.seatNo = '';//工号
        this.createData.seatPwd = '';//密码
    },
    create(){//提交创建
      if(this.state != this.createData.realName){ //  无内容不可提交
        this.$message({message: '请选择列表用户添加',type: 'warning'});
        return;
      } 
      if(!this.notNull([this.state])){return};
      if(this.createData.misRoleId == '104' || this.createData.misRoleId == '102'){
        if(!this.notNull([this.state,this.createData.seatNo,this.createData.seatPwd])){return};
      }
      this.openFullScreen();
        this.$axios.post(this.pathItem.addOrUpdateUser,{
          misRoleName:this.createData.misRoleName,
          misUsername:this.state,
          misRoleId:this.createData.misRoleId,//角色id
          misUserId:this.createData.misUserId,
          seatNo:this.createData.seatNo,
          seatPwd:this.createData.seatPwd,
          groupId:this.createData.groupId,
          misPhone:this.createData.misPhone,//电话
          misAccount:this.createData.misAccount,//关联账号
        })
        .then(res=>{
          if(res.code == '1'){
            this.dialogVisible = false;
            this.load(this.currentPage,this.sizeChang);
            this.$message({message: res.msg,type: 'success'});
          }else{
            this.$message({message: res.msg,type: 'warning'});
          }
            this.openFullScreen('close');
        })
        .catch((err)=>{
          this.$message.error('错了哦，这是一条错误消息');
          this.openFullScreen('close');
        })
    },
    editModel(id){
      this.edit_dialogVisible = true;
      this.editModel.id = id;
      this.$axios.post(this.pathItem.getUserById,{id:this.editModel.id})
      .then(res=>{
        if(res.code == '1'){
          let r = res.data;
          this.editData.misUsername = r.misUsername;
          this.editData.misRoleName = r.misRoleName;
          this.editData.seatNo = r.seatNo;
          this.editData.seatPwd = r.seatPwd;
          this.editData.misRoleId = r.misRoleId;
          this.editData.misUserId = r.misUserId;

        }else{
        this.$message({
          message: res.msg,
          type: 'warning'
        });
        }
      })
      .catch((err)=>{
        this.$message.error('错了哦，这是一条错误消息');
      })
    },
    edit(){//编辑
      // let a = this.notNull([this.editData.seatNo,this.editData.seatPwd]);
      // console.log(a)
      // return;
      if(!this.notNull([this.editData.seatNo,this.editData.seatPwd])){return};
      this.openFullScreen();
        this.$axios.post(this.pathItem.addOrUpdateUser,{
          misRoleName:this.editData.misRoleName,
          misUsername:this.editData.misUsername,
          misRoleId:this.editData.misRoleId,//角色id
          misUserId:this.editData.misUserId,
          seatNo:this.editData.seatNo,
          seatPwd:this.editData.seatPwd,
          id:this.editModel.id
        })
        .then(res=>{
          if(res.code == '1'){
            this.edit_dialogVisible = false;
            this.load(this.currentPage,this.sizeChang);
            this.$message({message: res.msg,type: 'success'});
          }else{
            this.$message({message: res.msg,type: 'warning'});
          }
            this.openFullScreen('close');
        })
        .catch((err)=>{
          this.$message.error('错了哦，这是一条错误消息');
          this.openFullScreen('close');
        })
    },
    del(id){
      this.del_dialogVisible = true;
      this.deleteId = id;
    },
    del_saver(){
      this.openFullScreen();
      this.$axios.post(this.pathItem.deleteUserById,{id:this.deleteId})
      .then(res=>{
        if(res.code == '1'){
          this.$message({message: res.msg,type: 'success'});
          this.load(this.currentPage,this.sizeChang);
          this.del_dialogVisible = false;
        }else{
          this.$message({message: res.msg,type: 'warning'});
        }
        this.openFullScreen('close');
      })
      .catch((err)=>{
        this.$message.error('错了哦，这是一条错误消息');
        this.openFullScreen('close');
      })
    },
    dis(data){//禁用
        let state;
        if(data.statusButton == '禁用'){
          state = 2;
        }else{
          state = 1;
        }
        this.openFullScreen();
        this.$axios.post(this.pathItem.updateUserStatusById,{id:data.id,isDelete:state})
        .then(res=>{
          if(res.code == '1'){
            this.$message({message: res.msg,type: 'success'});
            this.load(this.currentPage,this.sizeChang);
          }else{
            this.$message({message: res.msg,type: 'warning'});
          }
          this.openFullScreen('close');
        })
        .catch((err)=>{
          this.$message.error('错了哦，这是一条错误消息');
          this.openFullScreen('close');
        })
    },
    reset(){//重置
        this.list.userInfo = '';//用户姓名
        this.list.isDelete = '';//状态
        this.list.createdAtStart = '';//开始时间
        this.list.createdAtEnd = '';//结束时间
        this.list.time = '';//开始-结束时间
    },
    searchFun(){
      this.load(this.currentPage,this.sizeChang);
    },
    //输入匹配
    querySearch(queryString, cb) {
      // var restaurants = this.restaurants;
      // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      var results =this.restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {//select 点击返回
      this.creatButton = false;
      if(item.roleCode == '104' || item.roleCode == '102'){
        this.isShow = true;
      }else{
        this.isShow = false;
      }
      this.createData.misRoleName = item.roleName;
      this.createData.misRoleId = item.roleCode;
      this.createData.misUserId = item.id;

      this.createData.misPhone = item.mobile;//电话
      this.createData.misAccount = item.manager;//关联账号

      this.createData.realName = item.realName;//选择人的姓名
      console.log(this.createData.realName)
    },
    openFullScreen(val) {//加载框
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      if(val == 'close'){
        loading.close();
      }
    },
    notNull(arr,type='text'){//限制为空
      for(let d in arr){
        if(arr[d].length == 0){
          this.$message({message: '必填项不可为空',type: 'warning'});
          return false;
          };
          
      }
      return true;
    }
  },
  watch:{
    state(){//新建输入查询
      // this.restaurants = this.loadAll();//输入匹配内容
      this.$axios.post(this.pathItem.getUserByUserName,{userName:this.state,page:'1',pageSize:'10'})
      .then(res=>{
        if(res.code == '1'){
          let r = res.data;
          //数据
          for(let d in res.data){
            // console.log(res.data[d]);
            res.data[d].value = res.data[d].realName;
          }
          this.restaurants = res.data;
        // this.$message({message: res.msg,type: 'success'});
        }else{
        this.$message({
          message: res.msg,
          type: 'warning'
        });
        }
      })
      .catch((err)=>{
        this.$message.error('错了哦，这是一条错误消息');
      })
    },
  },
}
</script>

<style lang="scss" scoped>
$pleft :20px;
$search-input:62%;
.title-search-left{
  padding-left: $pleft;
}
.title-search-right{
  text-align: right;
  padding-right: 20px;
}
.search-test1{
  padding-left: $pleft;
}
.search-text{
  font-size: 14px;
  background-color: #fff;
  height: 60px;
  line-height: 60px;
}
.search-city{
  margin-left: 14px;
  width: $search-input;
  height: 100%;
}
.search-message{
  width: $search-input;
  padding-left: $pleft;
}
.search-date{
  width: $search-input;
  margin-left: $pleft;
}
.button-pager{
  text-align: center;
  
}
.button-style{
  margin-left: 10px;
}
.el-button-cz{
  margin-top: 10px;
}
//弹窗内容
.dia-message{
  // border: 1px solid black;
  height:32px;
  line-height: 32px;
  margin-bottom: 14px;
}
.right-text{
  text-align: right;
  padding-right: 10px;
}
.redspan{
  color:red;
}
.dia-rot{
  width:70%;
}
.bottom-box{
  // background: #03a9f4;
  background-color: #fff;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.text-center{
  text-align: center;
}
</style>