// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store'
import router from './router'
import axios from './assets/js/axios_reset.js'
import path from './assets/js/path.js'
import ElementUI from 'element-ui';
import VueClipboard from 'vue-clipboard2' // 复制文本-需要
import formatDate from './assets/js/format_date.js'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/public_style.css';

Vue.use(ElementUI);
Vue.use(VueClipboard) // 复制文本-需要
Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.pathItem = path.pathList;
Vue.prototype.formatDate = formatDate;
/* eslint-disable no-new */
Vue.filter('formatDate', formatDate);
new Vue({
	el: '#app',
	store,
	router,
	components: {
		App
	},
	template: '<App/>'
})
//强制删除缓存页面
Vue.mixin({
	beforeRouteLeave: function(to, from, next) {
		if(from && from.meta.flag && from.meta.flag === "delete") { //此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
			if(this.$vnode && this.$vnode.data.keepAlive) {
				if(this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
					if(this.$vnode.componentOptions) {
						var key = this.$vnode.key == null ?
							this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '') :
							this.$vnode.key;
						var cache = this.$vnode.parent.componentInstance.cache;
						var keys = this.$vnode.parent.componentInstance.keys;
						if(cache[key]) {
							if(keys.length) {
								var index = keys.indexOf(key);
								if(index > -1) {
									keys.splice(index, 1);
								}
							}
							delete cache[key];
						}
					}
				}
			}
			this.$destroy();
		}
		next();
	},
});