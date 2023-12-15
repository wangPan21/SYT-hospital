import request from "@/utils/request";
import type {UserParams,QrCode,SubmitOrder,OrderResponseData,
             PayReslt,UseringoResponseData,CertationTypeResponseData,
             UserOrderInfoResponseData,AllUserResponseData,
             AllOrderStateResponseData} from "@/api/user/type";

enum API {
    SUBMIMITORDER_URL='/order/orderInfo/auth/submitOrder/',
    GETORDERINFO_URL='/order/orderInfo/auth/getOrderInfo/',
    CANCELORDER_URL='/order/orderInfo/auth/cancelOrder/',
    CREATENATIVE_URL='/order/weixin/createNative/',
    PATSTATUS_URL='/order/weixin/queryPayStatus/',
    GETUSERINFO_URL='/user/auth/getUserInfo',
    CERIFICATIONTYPE_URL='/cmn/dict/findByDictCode/',
    USERAUAH_URL='/user/auth/userAuah',
    USERORDERINFO_URL='/order/orderInfo/auth/',
    ALLUSER_URL='/user/patient/auth/findAll',
    ORDERSTATE_URL='/order/orderInfo/auth/getStatusList',
    CITY_URL='/cmn/dict/findByParentId/',
}


//提交订单 /order/orderInfo/auth/submitOrder/{hoscode}/{scheduleId}/{patientId}
export const reqSubmitOrder =(hoscode:string,scheduleId:string,patientId:string)=>request.post<SubmitOrder>(API.SUBMIMITORDER_URL+`${hoscode}/${scheduleId}/${patientId}`)

//获取订单  /order/orderInfo/auth/getOrderInfo/{id}
export const reqGetIndent = (id:string) => request.get<OrderResponseData>(API.GETORDERINFO_URL+`${id}`)

//取消预约 /order/orderInfo/auth/cancelOrder/{orderId}
export const reqCancelOrder =(orderId:string)=>request.get(API.CANCELORDER_URL+`${orderId}`)

//获取微信二维码  /order/weixin/createNative/{orderId}
export const reqWxCreateImg = (orderId:string) => request.get<QrCode>(API.CREATENATIVE_URL+`${orderId}`);

//查询订单支付的结果 /order/weixin/queryPayStatus/{orderId}
export const reqPayStatus =(orderId:string)=> request.get<PayReslt>(API.PATSTATUS_URL+`${orderId}`);

//当前账号用户信息  /user/auth/getUserInfo
export const reqGetUserInfo =()=>request.get<UseringoResponseData>(API.GETUSERINFO_URL);

//获取证件类型的接口地址 /cmn/dict/findByDictCode/{dictCode}
export const reqFindDictCode = (CertificatesType = "CertificatesType") =>request.get<CertationTypeResponseData,any>(API.CERIFICATIONTYPE_URL+CertificatesType);

//实名认证 /user/auth/userAuah
export const getUserAuah = (data:UserParams) =>request.post(API.USERAUAH_URL,data);

//获取用户分页列表  /order/orderInfo/auth/{page}/{limit}
export const reqUserInfo = (page:number,limit:number)=>request.get<UserOrderInfoResponseData>(API.USERORDERINFO_URL+`${page}/${limit}`);

//获取全部就诊人信息 /user/patient/auth/findAll
export const reqGetAllUser =()=>request.get<AllUserResponseData,any>(API.ALLUSER_URL);

//获取全部订单状态信息 /order/orderInfo/auth/getStatusList
export const reqGetStatus =()=>request.get<AllOrderStateResponseData,any>(API.ORDERSTATE_URL);

//获取中国各个城市的数据 /cmn/dict/findByParentId/{parentId}
export const reqCity =(parentId:string)=>request.get<any>(API.CITY_URL+`${parentId}`)
