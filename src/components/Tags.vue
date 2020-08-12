<template>
	<!--页面顶部选项卡-->
	<div class="tags">
		<el-menu mode="horizontal" text-color="#687596" active-text-color="#687596">
			<el-menu-item v-for="(item, index) in visitedViews" :key="index" :class="activeIndex==item.fullPath?'isActive':''" @click="selectTab(item)">
				{{item.title}}
				<i class="el-icon-close" @click.prevent.stop="removeTab(item)"></i>
			</el-menu-item>
		</el-menu>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeView: ""
			}
		},
		mounted(){
			this.format_date();	// 时间戳转换
		},
		computed: {
			//获取vuex存储的已预览标签页
			visitedViews() {
				return this.$store.state.tagsview.visitedViews
			},
			//获取当前预览标签
			activeIndex() {
				return this.$store.state.tagsview.activeView;
			}
		},
		methods: {
			selectTab(item) {
				this.$store.dispatch('addVisitedViews', item)
				this.$router.push(item.fullPath);
			},
			isActive(route) {
//				if(route.name=="createWorkList"){
//					this.$store.dispatch('deleteRelateOrder'); //清除订单缓存
//				}
				return route.name === this.$route.name
			},
			//删除标签页
			removeTab(route) {
				this.$route.meta.flag = "delete";
				this.$route.meta.keepAlive = false;
				if(route.name=='callerInfo'){
					this.$store.dispatch('addInComePhoneInfo', "");
				}
				if(route.name=='callerInfoCreate'){
					this.$store.dispatch('addCreatePhoneInfo',"");
				}
				if(route.name=="createWorkList"){
					this.$confirm("当前工单未保存，是否确认关闭", '提示', {
							confirmButtonText: '关闭',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							let index=this.$route.query.orderIndex
							let order=this.$route.query.orderInfos
							if(order){
								this.$store.dispatch('deleteSelectOrder',order); //清除订单缓存
								this.$store.dispatch('deleteRelateOrder',index); //清除订单缓存
							}
							this.confirmDelete(route)
						})
				}else{
					this.confirmDelete(route)
				}
				
			},
			confirmDelete(route){
				var _this = this;
				this.$store.dispatch('delVisitedViews', route).then(views => {
					if(_this.isActive(route)) {
						let lastView = views.slice(-1)[0]
						if(lastView) {
							_this.$router.push({
								path: lastView.fullPath,
								query: lastView.query
							});
						} else {
							_this.$router.push('/')
						}
					}
				})
			},
      format_date(){
       // 时间戳转换日期
				Date.prototype.Format = function (fmt) {
						var o = {
										"M+": this.getMonth() + 1, // 月份
										"d+": this.getDate(), // 日
										"h+": this.getHours(), // 小时
										"m+": this.getMinutes(), // 分
										"s+": this.getSeconds(), // 秒
										"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
										"S": this.getMilliseconds() // 毫秒
						};
						if (/(y+)/.test(fmt))
								fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
						for (var k in o)
								if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
						return fmt;
				} 
      }
		},
	}
</script>

<style>
	.tags {
		position: fixed;
		background: #fff;
		width: 100%;
		z-index: 1000;
	}
	
	.tags .el-menu--horizontal>.el-menu-item.is-active {
		border-bottom: transparent;
	}
	
	.tags .isActive {
		border-bottom: 2px solid #409EFF !important;
	}
</style>