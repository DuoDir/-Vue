<template>
	<div>
		<el-col :span="6"><span @click="goToIndex()">欧了约车|客服工单系统</span></el-col>
		<div class="header-right">
			<div class="dot-box">
				<i class="el-icon-bell"></i>
				<el-badge :max="10" class="item">
				</el-badge>
			</div>
			<el-select v-model="selectValue" placeholder="请选择" size="mini" class="select-box">
				<el-option v-for="item in options" :key="item.id" :label="item.value" :value="item.id">
				</el-option>
			</el-select>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selectValue: "欢迎",
				options: [{
					id: 1,
					value: "欢迎"
				}/* , {
					id: 2,
					value: "cs0821"
				}, {
					id: 3,
					value: "cs0822"
				} */]
			}
		},
		mounted() {
			this.getLoginInfo()
		},
		methods: {
			//获取登录信息
			getLoginInfo() {
				var _this = this;
				//				var params={}
				//				this.$axios.post(url,params).then(res=>{
				//					_this.options=res.data
				//				})
			},

			//回到首页
			goToIndex(){
				this.$router.push({
					path:"/overview",
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.header-right {
		position: absolute;
		top: 0;
		right: 20px;
		display: flex;
		.dot-box {
			margin-right: 15px;
			.item {
				right: 12px;
				top: -7px;
			}
		}
		.select-box {
			width: 106px;
		}
	}
</style>