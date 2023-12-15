import {defineStore} from 'pinia';
import { reqHospitalDetail,reqHospitalParment } from "@/api/hospital";
import type { HospitalDetail,DeparmentResponseData, HosPitalDetail } from "@/api/hospital/type";
import { DetailState } from "./interface";
//pinia 仓库写法：组合式API、选择式API写法
const useDetailStore = defineStore('Detail',{
    state :():DetailState=>{
        return{
            //医院详情数据
            hospitalInfo:({}as HosPitalDetail),
            // 科室详情数据
            hospitalDepartment:[]
        }
    },

    actions:{
        //获取医院详情的方法
        async getHospital(hoscode: string) {
            //@ts-ignore
            let result: HospitalDetail = await reqHospitalDetail(hoscode);
            if (result.code == 200) {
                this.hospitalInfo = result.data;
            }
        },

        //获取医院科室详情
        async getHospitalDepartment(hoscode:string){
            //@ts-ignore
            let result:DeparmentResponseData = await reqHospitalParment(hoscode)
            if (result.code == 200) {
                this.hospitalDepartment = result.data;
            }            
        }
    },

    getters:{

    }
});

//获取仓库的方法并且对外暴露
export default useDetailStore;