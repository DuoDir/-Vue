//基础/其他
const pathItem=process.env.pathItem;

const baseOrOtherApi={
    // 登录
    login:pathItem+'/olayc/misLogin',		//登录接口

    //个人数据看板
    indexNum:pathItem+'/olyc/indexNum',	//个人数据看板

    getRoutesList:pathItem+'a/getRoutesList',   //获取用户权限

}

export default baseOrOtherApi;