<template>
	<el-container style="background-color:#fff" class="workOlder">
		<!-- 工单侧边栏 -->
		<el-aside width="200px">
			<el-menu  class="el-menu-vertical-demo">
				<div>
					<h4 class="asideTitle">工单中心</h4>
					<i class="el-icon-refresh refresh" @click="refresh"></i>
				</div>
				<el-menu-item-group>
					<el-menu-item index="1-0" @click="changeMenu('我的工单','1','6','')">我的工单<span v-text="numList.my"></span></el-menu-item>
					<el-menu-item index="1-1" class="listNum" @click="changeMenu('已派单','','5','2')">已派单<span v-text="numList.ypd"></span></el-menu-item>
					<el-menu-item index="1-2" class="listNum" @click="changeMenu('已接单','','0','2')">已接单<span v-text="numList.yjd"></span></el-menu-item>
					<el-menu-item index="1-3" class="listNum" @click="changeMenu('待审核','','1','3')">待审核<span v-text="numList.dsh"></span></el-menu-item>
					<el-menu-item index="1-4" class="listNum" @click="changeMenu('已完成','','1','6')">已完成<span v-text="numList.ywc"></span></el-menu-item>
					<el-menu-item index="1-5" class="listNum" @click="changeMenu('已退回','','1','5')">已退回<span v-text="numList.yth"></span></el-menu-item>
					<el-menu-item index="1-6" class="listNum" @click="changeMenu('已延期','','1','',true)">已延期<span v-text="numList.yyq"></span></el-menu-item>
					<el-menu-item index="1-7" class="listNum" @click="changeMenu('即将延期','','4','')">即将延期<span v-text="numList.jjyq"></span></el-menu-item>
					<el-menu-item index="1-8" class="listNum" @click="changeMenu('抄送','','7','')">抄送<span v-text="numList.chs"></span></el-menu-item>
					<!-- <el-menu-item index="1-0" @click="changeMenu('我受理的工单','','0','')">我受理的工单</el-menu-item>
					<el-menu-item index="1-1" class="listNum" @click="changeMenu('我受理的工单','待确认','0','1')">待确认<span v-text="numList.dqrhandle"></span></el-menu-item>
					<el-menu-item index="1-2" class="listNum" @click="changeMenu('我受理的工单','受理中','0','2')">受理中<span v-text="numList.slzhandle"></span></el-menu-item>
					<el-menu-item index="1-3" class="listNum" @click="changeMenu('我受理的工单','审核中','0','3')">审核中<span v-text="numList.shzhandle"></span></el-menu-item>
					<el-menu-item index="1-4" class="listNum" @click="changeMenu('我受理的工单','已延期','0','3',true)">已延期<span v-text="numList.yyqhandle"></span></el-menu-item>

					<el-menu-item index="2-0" @click="changeMenu('我发起的工单','','1','')">我发起的工单</el-menu-item>
					<el-menu-item index="2-1" class="listNum" @click="changeMenu('我发起的工单','待确认','1','1')">待确认<span v-text="numList.dqrstart"></span></el-menu-item>
					<el-menu-item index="2-2" class="listNum" @click="changeMenu('我发起的工单','受理中','1','2')">受理中<span v-text="numList.slzstart"></span></el-menu-item>
					<el-menu-item index="2-3" class="listNum" @click="changeMenu('我发起的工单','审核中','1','3')">审核中<span v-text="numList.shzstart"></span></el-menu-item>
					<el-menu-item index="2-5" class="listNum" @click="changeMenu('我发起的工单','已延期','1','3',true)">已延期<span v-text="numList.yyqstart"></span></el-menu-item>
					<el-menu-item index="2-4" class="listNum" @click="changeMenu('我发起的工单','已退回','1','5')">已退回<span v-text="numList.ythstart"></span></el-menu-item>

					<el-menu-item index="3-0" @click="changeMenu('我退回的工单','','2','')">我退回的工单</el-menu-item>
					<el-menu-item index="3-1" class="listNum" @click="changeMenu('我退回的工单','待确认','2','1')">待确认<span v-text="numList.dqrback"></span></el-menu-item>
					<el-menu-item index="3-2" class="listNum" @click="changeMenu('我退回的工单','受理中','2','2')">受理中<span v-text="numList.slzback"></span></el-menu-item>
					<el-menu-item index="3-3" class="listNum" @click="changeMenu('我退回的工单','审核中','2','3')">审核中<span v-text="numList.shzback"></span></el-menu-item>
					<el-menu-item index="3-4" class="listNum" @click="changeMenu('我退回的工单','已退回','2','5')">已退回<span v-text="numList.ythback"></span></el-menu-item> -->

					<el-menu-item index="4-0" @click="changeMenu('全部工单','1','3','')">全部工单<span v-text="numList.all"></span></el-menu-item>
					
				</el-menu-item-group>
			</el-menu>
		</el-aside>
		<el-container :class="listStyle">
			<el-header>
				<div class="header">
					<span class="menu1" v-text="menuName1"></span>
					<span class="menu2" v-text="menuName2"></span>
					
				</div>
			</el-header>
			<el-main>
				<!-- 查询条件 -->
				<div class="ib">
					<!-- <span class="hText">进电类型</span>
					<el-select class="hSelect" v-model="seekList.incomingPhoneType" placeholder="请选择" size="small">
						<el-option v-for="item in options.incomingPhoneType" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<span class="hText">来电号码</span><el-input class="hInput" placeholder="输入来电号码" v-model="seekList.incomingPhoneNum"></el-input>
					<span class="hText">订单号</span><el-input class="hInput" placeholder="输入订单号" v-model="seekList.orderNo"></el-input>
					<span class="hText">发起人</span>
					<el-select v-model="seekList.originator" placeholder="请选择" size="small">
						<el-option v-for="item in options.originatorList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<span v-if="status1==1" class="hText">状态</span>
					<el-select v-if="status1==1" v-model="seekList.workOrderStatus" placeholder="请选择" size="small">
						<el-option v-for="item in options.workOrderStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-button type="primary" size="medium" icon="el-icon-search" @click="selectTable">查询</el-button>
					<el-button type="primary" size="medium" icon='el-icon-download' :loading="downLoading" @click="exportFun">导出</el-button>
					<el-button slot="append" icon="el-icon-more" @click="togole" class="hMore"></el-button> -->

					<el-row :gutter="0">
						<el-col :span="6">
							<span class="secText">进电类型</span>
							<el-select class="hSelect" v-model="seekList.incomingPhoneType" placeholder="请选择" size="small">
								<el-option v-for="item in options.incomingPhoneType" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<el-col :span="6">
							<span class="secText">来电号码</span>
							<el-input class="hInput" placeholder="输入来电号码" v-model="seekList.incomingPhoneNum"></el-input>
						</el-col>
						<el-col :span="6">
							<!-- <span class="secText">工单分类</span> 
							<el-cascader :options="olderSoltList" v-model="olderSolt" @change="handleChange" size="small"></el-cascader> -->
							<span class="secText">订单号</span>
							<el-input class="hInput" placeholder="输入订单号" v-model="seekList.orderNo"></el-input>
							<!-- <el-cascader :options="receiverList" v-model="receiver" @change="handleChange" size="small"></el-cascader> -->
						</el-col>
						<el-col :span="6">
							<span class="secText">发起人</span>
							<el-select v-model="seekList.initiatorId" placeholder="请选择" size="small">
								<el-option key="-1" label="请选择" value="-1"></el-option>
								<el-option v-for="item in options.originatorList" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						
					</el-row>
					<el-row :gutter="0">
						<el-col :span="12">
							<span v-if="status1==1" class="secText">状态</span>
							<el-select v-if="status1==1" v-model="seekList.workOrderStatus" placeholder="请选择" size="small">
								<el-option v-for="item in options.workOrderStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<el-col :span="12" :class="status1!=1?btnRight:''" v-show="!selectStatus">
							<el-button type="primary" size="medium" icon="el-icon-search" @click="selectTable">查询</el-button>
							<el-button type="primary" size="medium" icon='el-icon-download' :loading="downLoading" @click="exportFun">导出</el-button>
							<el-button type="primary" size="medium" icon="el-icon-delete" @click="clearAll">重置</el-button>
							<el-button type="primary" plain icon="el-icon-more" @click="togole" class="hMore">更多</el-button>
						</el-col>
					</el-row>
				</div>
				<!-- 更多查询条件 -->
				<div class="moreSelect" v-show="selectStatus">
					<el-row :gutter="0">
						<el-col :span="6">
							<span class="secText">城市</span>
							<el-select v-model="seekList.city" placeholder="请选择" size="small">
								<el-option v-for="item in options.city" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<el-col :span="6">
							<span class="secText">工单ID</span>
							<el-input v-model="seekList.flagID" placeholder="请输入工单ID" size="small"></el-input>
						</el-col>
						<el-col :span="6">
							<!-- <span class="secText">工单分类</span> 
							<el-cascader :options="olderSoltList" v-model="olderSolt" @change="handleChange" size="small"></el-cascader> -->
							<span class="secText">受理人</span> 
							<el-select v-model="seekList.receiverId" placeholder="请选择" size="small">
								<el-option key="-1" label="请选择" value="-1"></el-option>
								<el-option v-for="item in options.receiverList" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<!-- <el-cascader :options="receiverList" v-model="receiver" @change="handleChange" size="small"></el-cascader> -->
						</el-col>
						<el-col :span="6">
							<span class="secText">投诉级别</span>
							<el-select v-model="seekList.complaintRank" placeholder="请选择" size="small">
								<el-option v-for="item in options.complaintRank" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<!-- <el-col :span="4">
							<span class="secText">订单渠道</span>
							<el-select v-model="seekList.channel" placeholder="请选择" size="small">
								<el-option v-for="item in options.channelList" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col> -->
					</el-row>
					<el-row :gutter="0">
						<el-col :span="6">
							<span class="secText">订单渠道</span>
							<el-select v-model="seekList.channel" placeholder="请选择" size="small">
								<el-option v-for="item in options.channelList" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<!-- <el-col :span="6">
							<span class="secText">解决方案</span>
							<el-select v-model="seekList.solution" placeholder="请选择" size="small">
								<el-option v-for="item in options.solution" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col> -->
						<el-col :span="6">
							<span class="secText">工单来源</span>
							<el-select v-model="seekList.sourceType" placeholder="请选择" size="small">
								<el-option v-for="item in options.sourceTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<el-col :span="6">
							<span class="secText">工单类型</span>
							<el-select v-model="seekList.workOrderType" placeholder="请选择" size="small">
								<el-option v-for="item in options.workOrderTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<!-- <el-col :span="6">
							<span class="secText">创建时间</span>
							<el-date-picker class="dataStyle" v-model="time2" type="datetimerange" align="right" unlink-panels size="small" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
						</el-col> -->
						<!-- <el-col :span="6">
							<span class="secText">创建时间</span>
							<el-date-picker class="dataStyle" v-model="time2" type="daterange" align="right" unlink-panels size="small" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
						</el-col> -->
						
					</el-row>
					<el-row :gutter="0">
						<el-col :span="6">
							<span class="secText">司机ID</span>
							<el-input v-model="seekList.chauffeurId" placeholder="请输入司机ID" size="small"></el-input>
						</el-col>
						<el-col :span="6">
							<span class="secText">司管姓名</span>
							<el-input v-model="seekList.sgName" placeholder="请输入司管姓名" size="small"></el-input>
						</el-col>
						
						<!-- <el-col :span="6">
							<span class="secText">创建时间</span>
							<el-date-picker class="dataStyle" v-model="time2" type="datetimerange" align="right" unlink-panels size="small" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
						</el-col> -->
						<!-- <el-col :span="6">
							<span class="secText">创建时间</span>
							<el-date-picker class="dataStyle" v-model="time2" type="daterange" align="right" unlink-panels size="small" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
						</el-col> -->
						
					</el-row>
					<el-row :gutter="0">
						<el-col :span="12">
							<span class="secText">创建时间</span>
							<el-date-picker class="dataStyle" v-model="time2" type="datetimerange" align="right" unlink-panels size="small" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
						</el-col>
						
						<el-col :span="12" :class="btnRight">
							<el-button type="primary" size="medium" icon="el-icon-search" @click="selectTable">查询</el-button>
							<el-button type="primary" size="medium" icon='el-icon-download' :loading="downLoading" @click="exportFun">导出</el-button>
							<el-button type="primary" size="medium" icon="el-icon-delete" @click="clearAll">重置</el-button>
							<el-button type="primary" plain icon="el-icon-more" @click="togole" class="hMore">收起</el-button>
						</el-col>
					</el-row>
				</div>
				<el-table v-loading="tableLoading" element-loading-text="拼命加载中" :data="tableData" border style="width: 100% ;margin-top:20px">
					<el-table-column prop="flagID" label="ID"></el-table-column>
					<!-- <el-table-column label="剩余受理时间">
						<template slot-scope="{row}">
							{{ row.surplusTime || '--' }}
						</template> 
					</el-table-column> -->
					<el-table-column prop="cityName" label="城市"></el-table-column>
					<!-- <el-table-column prop="complaintRank" label="级别"></el-table-column> -->
					<el-table-column label="订单渠道">
						<template slot-scope="scope">
							<div v-text="scope.row.orderSource==1?'自建':'高德'" class="orderSource"></div>
						</template>
					</el-table-column>
					<el-table-column label="工单来源">
						<template slot-scope="scope">
							<div v-text="scope.row.sourceType==1?'自建':'高德'" class=""></div>
						</template>
					</el-table-column>
					<el-table-column label="工单类型">
						<template slot-scope="scope">
							<div v-text="scope.row.workOrderType==1?'投诉':scope.row.workOrderType==2?'咨询':scope.row.workOrderType==3?'建议':''" class=""></div>
						</template>
					</el-table-column>
					<el-table-column label="工单标题">
						<template slot-scope="scope">
							<el-popover placement="bottom" width="400" trigger="hover">
								<div class="popoverTitle">{{scope.row.title}}</div>
								<div style="padding:10px 20px">
									<span class="popoverTitle2">描述：</span>
									<p>{{ scope.row.questionDescription}}</p>
									<span v-if="scope.row.appeal" class="popoverTitle2">诉求：</span>
									<p v-if="scope.row.appeal">{{ scope.row.appeal}}</p>
									<p v-if="scope.row.attachmentNum" class="oTitle" @click="detail(scope.row)">查看<span>{{ scope.row.attachmentNum }}</span>个附件>></p>
								</div>
								<span style="margin-left: 10px" class="oTitle" slot="reference">{{ scope.row.title }}</span>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column prop="incomingPhoneNum" label="来电号码"></el-table-column>
					<el-table-column label="进电类型">
						<template slot-scope="scope">
							<div class="">{{scope.row.incomingPhoneType==1?'司机':scope.row.incomingPhoneType==2?'乘客':scope.row.incomingPhoneType==3?'高德':scope.row.incomingPhoneType==4?'其他':''}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="initiatorName" label="发起人"></el-table-column>
					<el-table-column prop="receiverName" label="受理人"></el-table-column>
					
					
					<el-table-column prop="createdAt" label="创建时间"></el-table-column>
					<el-table-column prop="complaintRank" label="投诉级别">
						<template slot-scope="scope">
							<div class="">{{scope.row.complaintRank==1?'轻':scope.row.complaintRank==2?'中':scope.row.complaintRank==3?'重':''}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="statusName" label="状态"></el-table-column>
					<!-- <el-table-column label="解决方案" show-overflow-tooltip >
						<template slot-scope="{row}">
							{{ row.solutionName || '--' }}
						</template>
					</el-table-column> -->
					<el-table-column fixed="right" label="操作">
						<template slot-scope="scope">
							<!-- <el-button v-if="scope.row.isTurn==0" @click="goToPage(scope.row,1)" type="text" size="small">详情</el-button>
							<el-button v-if="scope.row.isTurn==1" @click="goToPage(scope.row,2)" type="text" size="small">受理</el-button>
							<el-button v-if="scope.row.isTurn==3" @click="goToPage(scope.row,3)" type="text" size="small">审核</el-button> -->
							<div v-if="scope.row.isTurn==0" @click="goToPage(scope.row,1)" class="likeButton">详情</div>
							<div v-if="scope.row.isTurn==1" @click="goToPage(scope.row,2)" class="likeButton">受理</div>
							<div v-if="scope.row.isTurn==3" @click="goToPage(scope.row,3)" class="likeButton">审核</div>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<div class="block right">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"
					layout="total, prev, pager, next, sizes, jumper" :total="total">
					</el-pagination>
				</div>
			</el-main>
			<!-- <el-footer>Footer</el-footer> -->
		</el-container>
	</el-container>
</template>

<script>
export default {
    data() {
    	return {
			downloadText:'导出',
			downLoading:false,	//导出加载
			tableLoading:false,	//列表加载
			// 标题名称
			menuName1:'我的工单',
			menuName2:"",
			status1:"1",
			btnRight:'btnRight',//按钮组向右
			listStyle:'listStyle',
			// 工单列表数量
			numList:{
				// 我的工单
				my: '',//我的工单
				ypd: '',//已派单
				yjd: '',//已接单     
				dsh: '',//待审核
  				yyq: '',//已延期
				jjyq: '',//即将延期 
				ywc:'',//已完成
				yth:'',//已退回
				// 全部工单
				all: '',//全部  
				chs:'',//抄送   
			},
		// 查询条件
			selectStatus:false,//查询条件开闭
			// 工单分类
			olderSolt:[],
			//受理人
			receiverList:[],
			receiver:[],
			//发起人
			originatorList:[],
			originator:[],
			//创建时间快捷选项
			pickerOptions: {
				shortcuts: [{
					text: '今天',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					picker.$emit('pick', [start, end]);
					}
				},{
					text: '最近一周',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近一个月',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近三个月',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					picker.$emit('pick', [start, end]);
					}
				}]
			},
			// 时间
			time1:[],
			time2:[],
			seekList:{
				mark: 6,//0—我受理，1—我发起，2—我退回
				workOrderStatus:[],//1---待确认，2--受理中，3--审核中，4---已延期，5--已退回，6---已完成
				size:"",//条数
				page:"",//当前页数
				city:"",//城市
				incomingPhoneType:"",//进电类型 1司机 2客户 3高德用户 4其他
				workOrderClassifyNo:"",
				workOrderClassifyNo1:"",//工单分类1
				workOrderClassifyNo2:"",//工单分类2
				workOrderClassifyNo3:"",//工单分类3
				workOrderClassifyNo4:"",//工单分类4
				// solution:"",//解决方案
				incomingPhoneCount:"",//呼入电话次数
				orderNo:"",//订单信息
				initiatorGroupId:"",//发起组
				initiatorId:"-1",//发起人
				receiverGroupId:"",//受理组
				receiverId:"-1",//受理人id
				complaintRank:"",//投诉级别
				priority:"",//优先级
				customer:"",//乘客信息
				driver:"",//司机信息
				createdAtS:"",//创建开始时间
				createdAtE:"",//创建结束时间
				incomingPhoneTimeS:"",//来电开始时间
				incomingPhoneTimeE:"",//来电结束时间
				message:"",

				isDelay:"",

				// 1.2版修改，新加查询参数
				incomingPhoneNum:'',	//来电号码
				flagID:'',	//工单ID
				// workOrderStatus:[],	//状态
				channel:'',	//订单渠道
				sourceType:'',	//工单来源
				workOrderType:'',	//工单类型
				chauffeurId:'',	//司机ID
				sgName:'',	//司管姓名
			},
			choice:{},
			// 下拉列表
			options: {
				select: [],
				incomingPhoneType:[
					{value: '1', label: '司机'},
					{value: '2', label: '乘客'},
					// {value: '3', label: '高德'},
					// {value: '4', label: '其它'},
				],
				priority:[
					{value: '1', label: '一般'},
					{value: '2', label: '紧急'},
				],
				complaintRank:[
					{value: '1', label: '轻'},
					{value: '2', label: '中'},
					{value: '3', label: '重'},
				],
				incomingPhoneCount:[
					{value: '1', label: '1'},
					{value: '2', label: '2'},
					{value: '3', label: '3'},
					{value: '4', label: '4'},
					{value: '5', label: '5'},
				],
				/* solution:[
					{value: '安抚', label: '安抚'},
					{value: '优惠券补偿', label: '优惠券补偿'},
					{value: '退款', label: '退款'},
					{value: '订单关闭', label: '订单关闭'},
					{value: '警告', label: '警告'},
					{value: '罚款', label: '罚款'},
					{value: '辞退', label: '辞退'},
				], */
				city:[],
				group:[],
				groupPerson:[],
				groupPerson2:[],
				workOrderStatus:[
					{value: '', label: '请选择'},
					{value: '2', label: '受理中'},
					{value: '3', label: '审核中'},
					{value: '6', label: '已完成'},
					{value: '5', label: '已退回'}
				],	//状态
				channelList:[
					{value: '', label: '请选择'},
					{value: '1', label: '自建'},
					{value: '2', label: '高德'},
				],	//订单渠道
				sourceTypeList:[
					{value: '', label: '请选择'},
					{value: '1', label: '自建'},
					{value: '2', label: '高德'},
				],	//工单来源
				workOrderTypeList:[
					{value: '', label: '请选择'},
					{value: '1', label: '投诉'},
					{value: '2', label: '咨询'},
					{value: '3', label: '建议'}
				],	//工单类型
				originatorList:[],//发起人列表
				receiverList:[],//受理人列表
			},
			// 表格数据
			tableData: [],
			// 分页
			currentPage:1,
			pageSizes:[10,20,30,40],
			pageSize:10,
			total:0,

			
    	};
	},
	watch:{
		// 下拉级联
		// 'seekList.initiatorGroupId'(val){
		// 	this.options.groupPerson=[];
		// 	this.seekList.initiatorId = '';
		// 	this.findP(val);
		// },
		// 'seekList.receiverGroupId'(val){
		// 	this.options.groupPerson2=[];
		// 	this.seekList.receiverId = '';
		// 	this.findP2(val);
		// }
	},
	created(){
		// this.initWorkOrderIsDelay();
	},
	mounted(){
		this.selectTable();//列表查询
		this.cityOptions();//城市下拉
		this.selectNum();//查询工单数量
	},
    methods: {
		// 后台需要
		initWorkOrderIsDelay:function(){
			this.$axios.post(this.pathItem.initWorkOrderIsDelay, {})
			.then(res=>{})
		},
		// 查询列表
		selectTable:function(){
			this.tableLoading=true;		//变为加载状态
			// 时间
			// if(this.time1.length>0){
			// 	this.seekList.incomingPhoneTimeS=this.timestampToTime(this.time1[0]);
			// 	this.seekList.incomingPhoneTimeE=this.timestampToTime(this.time1[1]);
			// }
			if(this.time2.length>0){
				this.seekList.createdAtS=this.timestampToTime(this.time2[0]);
				this.seekList.createdAtE=this.timestampToTime(this.time2[1]);
			}else{
				this.seekList.createdAtS='';
				this.seekList.createdAtE='';
			}
			// 工单分类
			/* if(this.olderSolt.length>0){
				this.seekList.workOrderClassifyNo1=this.olderSolt[0];
				this.seekList.workOrderClassifyNo2=this.olderSolt[1];
				this.seekList.workOrderClassifyNo3=this.olderSolt[2];
				this.seekList.workOrderClassifyNo4=this.olderSolt[3];
			}else{
				this.seekList.workOrderClassifyNo1="";
				this.seekList.workOrderClassifyNo2="";
				this.seekList.workOrderClassifyNo3="";
				this.seekList.workOrderClassifyNo4="";
			} */
			// 受理人
			if(this.receiver.length>0){
				this.seekList.workOrderClassifyNo1=this.olderSolt[0];
				this.seekList.workOrderClassifyNo2=this.olderSolt[1];
				this.seekList.workOrderClassifyNo3=this.olderSolt[2];
				this.seekList.workOrderClassifyNo4=this.olderSolt[3];
			}else{
				this.seekList.workOrderClassifyNo1="";
				this.seekList.workOrderClassifyNo2="";
				this.seekList.workOrderClassifyNo3="";
				this.seekList.workOrderClassifyNo4="";
			}

			let workOrderStatus=this.seekList.workOrderStatus.split('');

			this.$axios.post(this.pathItem.getWorkOrderList, {
				mark : this.seekList.mark,//1—我的工单,已派单,待审核,已延期 0—已接单  4-即将延期
				workOrderStatus : workOrderStatus,//2---已接单，2,5--已派单，3--待审核，''---已延期，''--即将延期
				// workOrderStatus : this.seekList.workOrderStatus.length==0 ? '' : this.seekList.workOrderStatus,//2---已接单，2,5--已派单，3--待审核，''---已延期，''--即将延期
				size : this.pageSize,//条数
				page : this.currentPage-1,//当前页数
				city : this.seekList.city,//城市
				incomingPhoneType : this.seekList.incomingPhoneType=="" ? 0 : this.seekList.incomingPhoneType,//进电类型 1司机 2客户 3高德用户 4其他
				// workOrderClassifyNo1 : this.seekList.workOrderClassifyNo1,//工单分类1
				// workOrderClassifyNo2 : this.seekList.workOrderClassifyNo2,//工单分类2
				// workOrderClassifyNo3 : this.seekList.workOrderClassifyNo3,//工单分类3
				// workOrderClassifyNo4 : this.seekList.workOrderClassifyNo4,//工单分类4
				// solutionName : this.seekList.solution,//解决方案
				// incomingPhoneCount : this.seekList.incomingPhoneCount,//呼入电话次数
				orderNo : this.seekList.orderNo,//订单信息
				// initiatorGroupId : this.seekList.initiatorGroupId,//发起组
				initiatorId : this.seekList.initiatorId,//发起人
				// receiverGroupId : this.seekList.receiverGroupId,//受理组
				receiverId : this.seekList.receiverId,//受理人id
				complaintRank : this.seekList.complaintRank=="" ? 0 : this.seekList.complaintRank,//投诉级别
				priority : this.seekList.priority=="" ? 0 : this.seekList.priority,//优先级
				// customer : this.seekList.customer,//乘客信息
				// driver : this.seekList.driver,//司机信息
				createdAtS : this.seekList.createdAtS,//创建开始时间
				createdAtE : this.seekList.createdAtE,//创建结束时间
				// incomingPhoneTimeS : this.seekList.incomingPhoneTimeS,//来电开始时间
				// incomingPhoneTimeE : this.seekList.incomingPhoneTimeE,//来电结束时间
				message : this.seekList.message,
				isDelay : this.seekList.isDelay,
				incomingPhoneNum:this.seekList.incomingPhoneNum,//来电号码
				orderNo:this.seekList.orderNo,//订单号
				flagID:this.seekList.flagID,//工单ID
				orderSource:this.seekList.channel,//订单渠道
				sourceType:this.seekList.sourceType,//工单来源
				workOrderType:this.seekList.workOrderType,//工单类型
				chauffeurId:this.seekList.chauffeurId,//司机ID
				sgName:this.seekList.sgName,//司管姓名
			})
				.then(response => {
					var r = response;
					this.tableData = [];
					if (r.code == '1') {
						this.tableData = r.data.content;
						for(var i=0;i<this.tableData.length;i++){
							this.tableData[i].workOrderClassifyNo = this.tableData[i].workOrderClassifyNo4 || this.tableData[i].workOrderClassifyNo3 || this.tableData[i].workOrderClassifyNo2 || this.tableData[i].workOrderClassifyNo1;
						}
						this.tableData.workOrderClassifyNo = 
						this.total = r.data.totalElements;
					} else {
						this.$alert(r.msg, '提示', {
                            confirmButtonText: '确定',
                            type:'warning',
                        });
						// if (r.code == -4) {
						// 	//登录验证失败
						// 	parent.turnLogin1();
						// }
					}
					this.tableLoading=false;	//取消加载状态
				})
		},
		// 工单数量
		selectNum:function(){
			this.$axios.post(this.pathItem.leftNum, {})
			.then(res=>{
				if (res.code==1) {
					this.numList = res.data;
				} else {
					alert(res.msg)
				}
				
			})
		},
		// 导出
		exportFun:function(){
			this.downLoading=true;	//按钮切换为加载状态
			var form = new FormData();
			let workOrderStatus=this.seekList.workOrderStatus.split('');

			if(this.time2.length>0){
				this.seekList.createdAtS=this.timestampToTime(this.time2[0]);
				this.seekList.createdAtE=this.timestampToTime(this.time2[1]);
			}else{
				this.seekList.createdAtS='';
				this.seekList.createdAtE='';
			}

			form.append("mark" , this.seekList.mark);//1—我的工单,已派单,待审核,已延期 0—已接单  4-即将延期
			// form.append("workOrderStatus" , workOrderStatus);//1---待确认，2--受理中，3--审核中，4---已延期，5--已退回，6---已完成
			for(let w=0;w<workOrderStatus.length;w++){
				form.append(`workOrderStatus[]`,workOrderStatus[w]);
			}
			form.append("city" , this.seekList.city);//城市
			form.append("incomingPhoneType" , this.seekList.incomingPhoneType=="" ? 0 : this.seekList.incomingPhoneType);//进电类型 1司机 2客户 3高德用户 4其他
			// form.append("workOrderClassifyNo1" , this.seekList.workOrderClassifyNo1);//工单分类1
			// form.append("workOrderClassifyNo2" , this.seekList.workOrderClassifyNo2);//工单分类2
			// form.append("workOrderClassifyNo3" , this.seekList.workOrderClassifyNo3);//工单分类3
			// form.append("workOrderClassifyNo4" , this.seekList.workOrderClassifyNo4);//工单分类3
			// form.append("solutionName" , this.seekList.solution);//解决方案
			// form.append("incomingPhoneCount" , this.seekList.incomingPhoneCount);//呼入电话次数
			form.append("orderNo" , this.seekList.orderNo);//订单信息
			// form.append('initiatorGroupId' , this.seekList.initiatorGroupId);//发起组
			form.append("initiatorId" , this.seekList.initiatorId);//发起人
			// form.append("receiverGroupId" , this.seekList.receiverGroupId);//受理组
			form.append("receiverId" , this.seekList.receiverId);//受理人id
			form.append("complaintRank" , this.seekList.complaintRank=="" ? 0 : this.seekList.complaintRank);//投诉级别
			form.append("priority" , this.seekList.priority=="" ? 0 : this.seekList.priority);//优先级
			// form.append("customer" , this.seekList.customer);//乘客信息
			// form.append("driver" , this.seekList.driver);//司机信息
			form.append("createdAtS" , this.seekList.createdAtS);//创建开始时间
			form.append("createdAtE" , this.seekList.createdAtE);//创建结束时间
			// form.append("incomingPhoneTimeS" , this.seekList.incomingPhoneTimeS);//来电开始时间
			// form.append("incomingPhoneTimeE" , this.seekList.incomingPhoneTimeE);//来电结束时间
			form.append("message" , this.seekList.message);
			form.append("incomingPhoneNum" , this.seekList.incomingPhoneNum);//来电号码
			// form.append("orderNo" , this.seekList.orderNo);//订单号
			form.append("flagID" , this.seekList.flagID);//工单ID
			form.append("orderSource" , this.seekList.channel);//订单渠道
			form.append("sourceType" , this.seekList.sourceType);//工单来源
			form.append("workOrderType" , this.seekList.workOrderType);//工单类型
			form.append("isDelay" , this.seekList.isDelay);//是否延期
			form.append("chauffeurId" , this.seekList.chauffeurId);//司机ID
			form.append("sgName" , this.seekList.sgName);//司管姓名
			var that=this;
			let url = this.pathItem.exportWorkOrderList;
			let xhr = new XMLHttpRequest();
			xhr.open("POST", url, true); // 也可以使用POST方式，根据接口
			// xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xhr.withCredentials = true;
			xhr.responseType = "blob"; // 返回类型blob，XMLHttpRequest支持二进制流类型
			xhr.onload = function() {
				if (this.status === 200) {
					let blob = this.response; //使用response作为返回，而非responseText
					let reader = new FileReader();
					reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
					reader.onload = function(e) {
						// 转换完成，创建一个a标签用于下载
						let a = document.createElement("a");
						a.target="_blank";
						a.download = "工单列表.csv";
						a.href = e.target.result;
						// a.click();
						var evt = document.createEvent("MouseEvents");  
						evt.initEvent("click", true, true);
						a.dispatchEvent(evt);
					};
					that.downLoading=false;	//按钮切换为正常状态
				}
			};
			xhr.send(form);
		},
		// 下拉
		cityOptions:function(){
			//城市下拉获取
			this.$axios.post(this.pathItem.getWorkOrderCityList, {})
				.then(response => {
					var r = response;
					if (r.code == '1') {
						for(let i=0;i<r.data.length;i++){
							this.options.city.push({'value':r.data[i].code,'label':r.data[i].name});
						}
					} else {
						this.$alert(r.msg, '提示', {
                            confirmButtonText: '确定',
                            type:'warning',
                        });
						// if (r.code == -4) {
						// 	//登录验证失败
						// 	parent.turnLogin1();
						// }
					}
				})
				.catch(response => {
					this.$alert(response.msg, '提示', {
						confirmButtonText: '确定',
						type:'warning',
					});
				})

			//人员下拉获取
			this.$axios.post(this.pathItem.getAllUser, {})
				.then(response => {
					var r = response;
					if (r.code == '1') {
						let person=[];
						for(let i=0;i<r.data.length;i++){
							person.push({'value':r.data[i].misUserId,'label':r.data[i].misUsername});
						}
						this.options.originatorList=person;
						this.options.receiverList=person;
						/* this.options.originatorList.push({'value':'','label':'请选择'});
						this.options.receiverList.push({'value':'','label':'请选择'});
						for(let i=0;i<r.data.length;i++){
							this.options.originatorList.push({'value':r.data[i].misUserId,'label':r.data[i].misUsername});
							this.options.receiverList.push({'value':r.data[i].misUserId,'label':r.data[i].misUsername});
						} */
					} else {
						this.$alert(r.msg, '提示', {
                            confirmButtonText: '确定',
                            type:'warning',
                        });
						// if (r.code == -4) {
						// 	//登录验证失败
						// 	parent.turnLogin1();
						// }
					}
				})
				.catch(response => {
					this.$alert(response.msg, '提示', {
						confirmButtonText: '确定',
						type:'warning',
					});
				})
		},
		findP:function(id){
			this.$axios.post(this.pathItem.getAllUser, {
				groupId:id
			})
				.then(response => {
					var r = response;
					if (r.code == '1') {
						for(let i=0;i<r.data.length;i++){
							this.options.groupPerson.push({'value':r.data[i].misUserId,'label':r.data[i].misUsername});
						}
					} else {
						this.$alert(r.msg, '提示', {
                            confirmButtonText: '确定',
                            type:'warning',
                        });
						// if (r.code == -4) {
						// 	//登录验证失败
						// 	parent.turnLogin1();
						// }
					}
				})
				.catch(response => {
					this.$alert(response.msg, '提示', {
						confirmButtonText: '确定',
						type:'warning',
					});
				})
		},
		findP2:function(id){
			this.$axios.post(this.pathItem.getAllUser, {
				groupId:id
			})
				.then(response => {
					var r = response;
					if (r.code == '1') {
						for(let i=0;i<r.data.length;i++){
							this.options.groupPerson2.push({'value':r.data[i].misUserId,'label':r.data[i].misUsername});
						}
					} else {
						this.$alert(r.msg, '提示', {
                            confirmButtonText: '确定',
                            type:'warning',
                        });
						// if (r.code == -4) {
						// 	//登录验证失败
						// 	parent.turnLogin1();
						// }
					}
				})
				.catch(response => {
					this.$alert(response.msg, '提示', {
						confirmButtonText: '确定',
						type:'warning',
					});
				})
		},
		// 切换每页显示条数
		handleSizeChange(val) {
			this.currentPage = 1;
			this.pageSize = val;
			this.selectTable();
		},
		// 分页
		handleCurrentChange(val) {
			this.currentPage = val;
			this.selectTable();
		},
		// 刷新
		refresh:function(){
			this.selectTable();
			this.clearData();
			this.selectNum();
		},
		// 修改页面标题和数据
		changeMenu:function(name1,status1,num1,num2,flag){
			this.clearData();
			this.selectStatus = false;
			this.currentPage = 1;
			this.menuName1 = name1;
			this.status1 = status1;
			this.seekList.mark=num1;
			this.seekList.workOrderStatus=num2;
			
			if(flag == true){
				this.seekList.isDelay = 1;	
			}else{
				this.seekList.isDelay = "";	
			}		
			this.selectTable();
		},
		// 时间戳转换时间
		timestampToTime:function(timestamp) {
    		var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
			var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
			var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
			var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
			return Y+M+D+h+m+s;
		},
		// 切换搜索
		togole:function(){
			this.selectStatus = !this.selectStatus;
			this.clearData();
		},
		// 表格行操作
		showMsg:function(row){
			// console.log(row.id);
		},
		// 工单分类切换
		handleChange:function(){},
		// 清空
		clearAll(){
			this.seekList.city = "";//城市
			this.seekList.flagID = "";//工单ID
			this.seekList.receiverId = "-1";//受理人
			this.seekList.complaintRank = "";//投诉级别
			this.seekList.channel = "";//订单渠道
			// this.seekList.solution = "";//解决方案
			this.seekList.sourceType = "";//工单来源
			this.seekList.workOrderType = "";//工单类型
			this.time2 = "";//创建时间
			this.seekList.incomingPhoneType = "";//进电类型
			this.seekList.incomingPhoneNum = "";//来电号码
			this.seekList.orderNo = "";//订单号
			this.seekList.initiatorId = "-1";//发起人
			this.seekList.chauffeurId = "";//司机ID
			this.seekList.sgName = "";//司管姓名
			if(this.status1==1){
				this.seekList.workOrderStatus = "";//工单类型
			}
			
			
			this.seekList.message = "";
		},

		clearData:function(){
			this.seekList.city = "";//城市
			this.seekList.flagID = "";//工单ID
			this.seekList.receiverId = "-1";//受理人
			this.seekList.complaintRank = "";//投诉级别
			this.seekList.channel = "";//订单渠道
			// this.seekList.solution = "";//解决方案
			this.seekList.sourceType = "";//工单来源
			this.seekList.workOrderType = "";//工单类型
			this.time2 = "";//创建时间

			// this.olderSolt = [];//工单分类
			// this.seekList.complaintRank = "";//投诉级别
			// this.seekList.initiatorGroupId = "";//发起组
			// this.seekList.initiatorId = "";//发起人
			// this.seekList.receiverGroupId = "";//受理组
			// this.seekList.sourceType = "";//优先级
			// this.seekList.customer = "";//乘客信息
			// this.seekList.driver = "";//司机信息
			// this.time1 = "";//创建时间
			// this.seekList.createdAtS = "";//创建开始时间
			// this.seekList.createdAtE = "";//创建结束时间
			// this.seekList.incomingPhoneTimeS = "";//来电开始时间
			// this.seekList.incomingPhoneTimeE = "";//来电结束时间
			this.seekList.message = "";

		},
		// 跳转详情
		detail:function(row){
			let path="detailsWorkList";
			//进电类型为高德用户时跳转到高德工单详情页面
//			if(row.incomingPhoneType==3){
				path="detailsWorkGaode"
//			}
			this.$router.push({
				path:path,
				query:{
					id:row.id
				}
			})
		},
		// 点击跳转路由
		goToPage:function(row,type){
			//目前都是统一到详情页，通过id查询区分，为预防以后修改新建方法，以type进行区分
			switch(type){
				case 1://跳转详情
					this.$router.push({
						path:'/detailsWorkList',
						query:{
							id:row.id
						}
					})
					break;
				case 2://跳转受理
					this.$router.push({
						path:'/detailsWorkList',
						query:{
							id:row.id
						}
					})
					break;
				case 3://跳转审核
					this.$router.push({
						path:'/detailsWorkList',
						query:{
							id:row.id
						}
					})
					break;
			}
		},
		
		cancelInput:function (id){
			console.log(id);
		},
    }
};
</script>

<style scoped>
.workOlder .right{
	float: right;
}
.workOlder .el-main{
	font-size: 14px;
}
/* 侧栏 */
.workOlder .el-menu-item, .el-submenu__title {
    height: 44px;
    line-height: 44px;
}
.workOlder .el-menu-item-group>ul {
    padding-bottom: 20px;
}
.workOlder .refresh{
	margin-left: 80px;
	padding: 8px;
	cursor: pointer;
}
.workOlder .refresh:hover{
	font-size: 16px;
}
.workOlder .listNum{
	padding-left: 40px !important;
}
.workOlder .listNum span{
	float:right;
	display: inline-block;
	min-width: 40px;
}
.workOlder .menu1{
	font-weight: 700;
	font-size: 16px;
	color: #333;
	margin-right: 14px;
}
.workOlder .asideTitle{
	display: inline-block;
	padding-left: 10px;
	font-size: 16px;	
	margin-bottom: 10px;
}
.workOlder .el-menu-item-group__title {
	padding: 0;
}
.workOlder .el-submenu .el-menu-item {
	padding: 0 30px 0 45px;
}
/* 主体头部 */
.workOlder .el-header {
	padding: 0;
}
.workOlder .header{
	background-color: #dedede;
	color: #687596;
	font-weight: 700;
	height: 50px;
	line-height: 50px;
	padding: 0 20px;
    margin: 0;
}
.workOlder .ib{
	/* float: right; */
	/* display: inline-block; */
	/* border-bottom: #e6e6e6 solid 1px; */
	margin-bottom: 20px
}
.workOlder .moreSelect{
	border-top: #e6e6e6 solid 1px;
	padding-top: 20px
}
.workOlder .hInput{
	width: 140px;
	margin-right: 10px;
	
}
.workOlder .hSelect{
	width: 200px;
	margin-right: 10px;
}
.workOlder .hText{
	display: inline-block;
    width: 70px;
    text-align: right;
    padding-right: 10px;
	font-weight: 200;
	color: black;
	font-size: 14px
}
.workOlder .hMore{
	padding: 10px 10px 10px 12px;
}
/* 主体搜索 */
.workOlder .el-row{
	padding: 10px 0;
}
.workOlder .secText{
	display: inline-block;
    width: 70px;
    text-align: right;
    padding-right: 10px;
}
.workOlder .el-input--small,
.workOlder .el-select--small,
.workOlder .el-cascader--small
{/* small状态下input和select宽度 */
	width: 140px;
}
.workOlder .el-date-editor--daterange.el-input__inner{/* 日历选择器 */
	width: 215px;
}
.btnRight{
	float: right;
}
/* 表格 */
.workOlder .oTitle{
	color: blue;
	cursor: pointer;
}
.workOlder .el-popover {
    padding: 0;
}
.workOlder .likeButton{
	line-height: 48px;
    color: #00f;
}
.workOlder .popoverTitle{
	padding: 0 20px;
	line-height: 48px;
	background-color: #f6f6f6;
}
.workOlder .popoverTitle2{
	font-weight: 700;
}
/* 分页 */
.workOlder .block{
	padding: 10px 0;
}
.workOlder .el-main::-webkit-scrollbar {
    display: none;
}
.workOlder .el-table td, .el-table th {
    text-align: center;
}
.listStyle{
	margin-bottom: 70px;
}
</style>