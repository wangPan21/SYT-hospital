import request from '@/utils/request'
import type { UserResponseData,HospitalDetail,LoginData,UserInfo,WXLoginResponseData,HospitalWordData,DoctorResponseData,DoctorInfoData} from "./type";
import type { AddOrUpdateUser } from "@/api/user/type";
//枚举请求地址
enum API {
    HOSPITALDETALL_URL="/hosp/hospital/",
    HOSPITALDEPARMENT_URL="/hosp/hospital/department/",
    GETUSERCODE_URL="/sms/send/",
    HOSTITALLOGIN_URL="/user/login",
    WXLOGIN_URL="/user/weixin/getLoginParam/",
    HOSPITALWORK_URL="/hosp/hospital/auth/getBookingScheduleRule/",
    HOSTITALDOCTOR_URL='/hosp/hospital/auth/findScheduleList/',
    GEYUSER_URL='/user/patient/auth/findAll',
    GETDOCTOR_URL='/hosp/hospital/getSchedule/',
    ADDUSER_URL="/user/patient/auth/save",
    UPDATEUSER_URL='/user/patient/auth/update',
    DELETEUSER_URL='/user/patient/auth/remove/',
}

//获取医院详情接口  /api/hosp/hospital/{hoscode}
export const reqHospitalDetail =(hoscode:string)=>request.get<HospitalDetail>(API.HOSPITALDETALL_URL+hoscode);

//获取某一个医院科室的数据 /api/hosp/hospital/department/{hoscode}
export const reqHospitalParment =(hoscode:string)=>request.get(API.HOSPITALDEPARMENT_URL+hoscode);

//获取登陆验证码  /api/sms/send/{phone}
export const reqGetcode =(phone:string) =>request.get(API.GETUSERCODE_URL+phone);

//登陆按钮的接口  /api/user/login
export const reqLogin = (data:LoginData)=>request.post<UserInfo>(API.HOSTITALLOGIN_URL, data);

//获取微信扫码登陆需要参数   /api/user/weixin/getLoginParam
export const reqWxLogin = (wxRedirectUri:string) =>request.get<WXLoginResponseData>(API.WXLOGIN_URL+`?wxRedirectUri=${wxRedirectUri}`);

//获取可预约排班数据  /hosp/hospital/auth/getBookingScheduleRule/{page}/{limit}/{hoscode}/{depcode}
export const reqHospitalWork = (page:number,limit:number,hoscode:string,depcode:string)=>request.get<HospitalWordData>(API.HOSPITALWORK_URL+`${page}/${limit}/${hoscode}/${depcode}`)

//获取医生排班数据  /hosp/hospital/auth/findScheduleList/{hoscode}/{depcode}/{workDate}
export const reqHospitalDoctor = (hoscode:string,depcode:string,workDate:string) =>request.get<DoctorResponseData>(API.HOSTITALDOCTOR_URL+`${hoscode}/${depcode}/${workDate}`);

//获取就诊人列表 /user/patient/auth/findAll
export const reqGetUser = () => request.get<UserResponseData>(API.GEYUSER_URL);

//根据排班id获取排班数据 /hosp/hospital/getSchedule/{scheduleId}
export const reqGetDoctor = (scheduleId:string) => request.get<DoctorInfoData>(API.GETDOCTOR_URL+`${scheduleId}`)
  
//新增与修改就诊人
export const reqAddOrUpDateUser = (data:AddOrUpdateUser)=>{
    //修改就诊人
    if (data.id) {
        return request.put<any,any>(API.UPDATEUSER_URL,data);
    }
    //新增就诊人
    else{
        return request.post<any,any>(API.ADDUSER_URL,data);
    }
}

// 删除就诊人 /user/patient/auth/remove/{id}
export const deleteUser =(id:string)=>request.delete(API.DELETEUSER_URL+`${id}`)