//管理首页模块接口
// @ts-ignore
import request from "@/utils/request";
import type {
    HospitalResponseData,
    HospitalLevelAndRegionResponseData,
    HospitalInfo,
} from "@/api/home/type";
//通过枚举管理首页模块的接口地址
enum API {
    //获取已有的医院数据接口
    HOSPITAL_UPL = "/hosp/hospital/",
    //获取医院的等级与地区接口 /cmn/dict/findByDictCode/{dictCode}
    HOSPITALLEVEIANDREGION_URL = "/cmn/dict/findByDictCode/",
    //搜索获取医院名称  /api/hosp/hospital/findByHosname/{hosname}
    HOSPITALFINDNAME_URL = "/hosp/hospital/findByHosname/",
}
//获取医院的数据 /hosp/hospital/{page}/{limit}
export const reqHospital = (
    page: number,
    limit: number,
    hostype = "",
    districtCode = ""
) =>
    request.get<any, HospitalResponseData>(
        API.HOSPITAL_UPL +
        `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`
    );

//获取医院的等级或者医院地区的数据
export const reqHospitalLevelAndRegion = (dictCode: string) =>
    request.get<any, HospitalLevelAndRegionResponseData>(
        API.HOSPITALLEVEIANDREGION_URL + `${dictCode}`
    );

//搜索获取医院名称  /api/hosp/hospital/findByHosname/{hosname}
export const reqHospitalName = (hosname: string) =>
    request.get<any, HospitalInfo>(API.HOSPITALFINDNAME_URL +hosname);
