import { defineStore } from "pinia";
import type { AddOrUpdateUser } from "@/api/user/type";

const useVipUser = defineStore('vipUser',{
    state:() =>{
        return {
            num:'123',
            userParams:{} as AddOrUpdateUser
        }
    },
    actions:{},
    getters:{}
})
export default useVipUser;