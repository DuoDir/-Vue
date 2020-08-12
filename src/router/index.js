import Vue from 'vue'
import Router from 'vue-router'
import baseRouter from '@/router/base_router' //系统基础相关路由
import store from '../store'

Vue.use(Router)

let routes=[
	
]

routes = new Set([...routes, ...baseRouter]);

const router = new Router({
	mode:'hash',
	routes
})

router.beforeEach((to, from, next)=>{
	let list=store.state.routesListData.routesList;
	if(Object.keys(list).length === 0){		
		store.dispatch('addRoutesListMsg').then(()=>{
			next({path:to.path})
		})
		
	}else{
		next()
	}
})

export default router