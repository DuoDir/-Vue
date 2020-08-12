<template>
	<div class="navMenu">
		<el-menu v-for="(menuItem,index) in navMenus" :key="index" router :default-active="activeIndex" background-color="#4a505f" text-color="#b3b3b7" :collapse="isCollapse" active-text-color="#fff" style="height: 100%;">
			<el-submenu 
			v-if="menuItem.childs" 
			:key="index" 
			:index="menuItem.index">
				<template slot="title">
					<i :class="menuItem.icon"></i>
					<span slot="title">{{menuItem.title}}</span>
				</template>
				<div v-for="(childItem,index) in menuItem.childs" :key="index">
					<el-submenu v-if="childItem.childs" :index="childItem.index">
						<template slot="title">{{childItem.title}}</template>
						<el-menu-item v-for="(item,index) in childItem.childs" :key="index" :index="item.index">{{item.title}}</el-menu-item>
					</el-submenu>
					<el-menu-item v-else :index="childItem.index">{{childItem.title}}</el-menu-item>
				</div>
			</el-submenu>
			<!-- <template slot="title"><i :class="menuItem.icon"></i><span>{{menuItem.title}}</span></template> -->
			<el-menu-item v-else :index="menuItem.index"><i :class="menuItem.icon"></i><span slot="title">{{menuItem.title}}</span></el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				navMenus: [{
					index: "workOlder",
					title: '测试列表',
					icon: "el-icon-document",
				}, {
					index: "ora",
					title: '欧了小程序后台',
					icon: "el-icon-truck",
				}, {
					index: "user",
					title: '用户管理',
					icon: "el-icon-user",
				}, 
				{
					index: "setting",
					title: '设置',
					icon: "el-icon-setting",
					childs: [
						{
							index: "/11",
							title: '1'
						}, 
						{
							index: "/22",
							title: '2'
						}, 
						{
							index: "/33",
							title: '3'
						}
					]
				},
				],
				isCollapse: true
			}
		},
		computed: {
			//获取当前预览标签
			activeIndex() {
				return this.$store.state.tagsview.activeView;
			},
		}
	}
</script>

<style scoped>
	.el-menu-item {
		height: 60px;
		line-height: 60px;
	}
</style>