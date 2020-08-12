const tagsView = {
	state: {
		visitedViews: [], //存放所有浏览过的且不重复的路由数据
		activeView: '', //默认标签页
	},
	mutations: {
		//添加路由
		ADD_VISITED_VIEWS(state, view) {
			state.activeView = view.fullPath;
			let addView = true; //增加标签页面
			for(let [i, v] of state.visitedViews.entries()) {
				if(v.name == view.name) {
					if(v.name == "createWorkList") {
						if(v.query.phone == view.query.phone && v.query.orderWay == view.query.orderWay && v.query.type == view.query.type) {
							state.visitedViews[i].isReload = false
							state.visitedViews[i].path = view.path;
							state.visitedViews[i].fullPath = view.fullPath;
							addView = false;
							return;
						}
					} else {
						state.visitedViews[i].isReload = false
						state.visitedViews[i].path = view.path;
						state.visitedViews[i].fullPath = view.fullPath;
						state.visitedViews[i].query = view.query;
						addView = false;
						return;
					}
				}
			}
			if(addView) {
				state.visitedViews.push({
					title: view.meta.title,
					path: view.path,
					fullPath: view.fullPath,
					name: view.name,
					isReload: true,
					query: view.query
				})
			}
		},
		//关闭标签页
		DEL_VISITED_VIEWS(state, view) {
			if(state.visitedViews.length == 1) return;
			for(let [i, v] of state.visitedViews.entries()) {
				if(v.name == view.name) {
					if(view.name == 'createWorkList') {
						if(v.query.phone == view.query.phone && v.query.orderWay == view.query.orderWay && v.query.type == view.query.type) {
							state.visitedViews.splice(i, 1);
							return;
						}
					} else {
						state.visitedViews.splice(i, 1);
						return;

					}
				}
			}
		},

		

	},
	actions: {
		addVisitedViews({
			commit
		}, view) {
			commit('ADD_VISITED_VIEWS', view)
		},

		delVisitedViews({
			commit,
			state
		}, view) {
			return new Promise((resolve) => {
				commit('DEL_VISITED_VIEWS', view);
				resolve([...state.visitedViews]);
			})
		},
		
	}
}

export default tagsView