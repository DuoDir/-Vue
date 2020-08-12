import axios from '../assets/js/axios_reset'
import path from '../assets/js/path.js'
import router from '../router'

const pathItem = path.pathList;

//获取当前用户路由权限
export const getRoutesList =async ()=>{
    let response;
    await axios.post(pathItem.getRoutesList, {})
    .then(res=>{
        if (res.code==1) {
            response = res.data;
            router.addRoutes(response);
        } else {
            response='';
            alert(res.msg)
        }
    })
    return response;
}

