//工单中心模块
const pathItem=process.env.pathItem;

const testListApi={
    getAuditButton: pathItem + '/olyc/getAuditButton',//订单操作状态

    getWorkOrderList: pathItem + '/olyc/getWorkOrderListPage',//工单列表 - 查询列表
    //getWorkOrderNum: pathItem + '/olyc/getWorkOrderCenterNum',//工单列表 - 工单数量
    leftNum:pathItem + '/olyc/leftNum',//工单列表 - 工单数量
        getWorkOrderCityList: pathItem + '/olyc/getMisOperationCity',//工单列表 - 城市下拉
        getAllGroup: pathItem + '/olyc/getAllGroup1',//工单列表 - 组下拉
    // getAllUser: pathItem + '/olyc/getAllUserByGroupId1',//工单列表 - 人下拉
    getAllUser: pathItem + '/olyc/getAllUser',//工单列表 - 所有人下拉
    getHotlineAll: pathItem + '/olyc/getHotlineAll',//获取所有坐席分机号
    exportWorkOrderList: pathItem + '/olyc/exportWorkOrderList',//工单列表 - 导出
    initWorkOrderIsDelay: pathItem + '/olyc/initWorkOrderIsDelay',//工单列表 - 后台要求
}


export default testListApi;