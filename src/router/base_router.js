import index from '@/views/base/index'
import login from '@/views/base/login'
import workOlder from '@/views/base/workOlder' //工单列表

const baseRouter=[
	{
		path: '/login', //模拟登录页，测试后删除
		name: 'login',
		component: login,
		meta: {
			title: '模拟登录'
		}
	},
	{
		path: '/base/index', //首页
		name: 'index',
		component: index,
		redirect: '/base/workOlder', //重定向 数据看板，首次进入页面显示内容
		children: [
			{
				path: '/base/workOlder', //工单列表
				name: 'workOlder',
				component: workOlder,
				meta: {
					title: '工单列表'
				}
			}, 
		]
	},
    
]


export default baseRouter;
