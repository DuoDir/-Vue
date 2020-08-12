import baseOrOtherApi from '@/assets/js/api/baseOrOther_api.js';//基础/其他
import testListApi from '@/assets/js/api/testList_api.js';//工单模块

//接口路径
let pathList = {
		//基础/其他
		...baseOrOtherApi,

		//测试工单中心模块
		...testListApi,
        
}
export default {
  pathList
}
