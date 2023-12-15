//定义用户相关的仓库
import { defineStore } from "pinia";
import { reqGetcode,reqLogin } from "@/api/hospital/index";
import type {LoginData,UserLoginResponseData} from "@/api/hospital/type"
import {SET_TOKEN, GET_TOKEN, DEL_TOKEN} from '@/utils/user'

const useUserStore = defineStore("User", {
  state: () => {
    return {
      dialogFormVisible: false, //控制登陆组件的dialog显示与隐藏
      code:'', //验证码
      userInfo:JSON.parse(GET_TOKEN() as string)||{}
    };
  },
  actions: {
    //获取验证码的方法
    async getCode(phone: string) {
      let result = await reqGetcode(phone);
      //@ts-ignore
      if (result.code == 200) {
        this.code = result.data;
      }else{
        return Promise.reject(new Error('faile'))
      }
    },

    //点击登录请求
    async userLogin(loginParam:LoginData){
      //@ts-ignore
      let result:UserLoginResponseData =  await reqLogin(loginParam);
      if (result.code == 200) {
          this.userInfo = result.data;
          SET_TOKEN(JSON.stringify(this.userInfo));
          return "ok"      
      } else{
        Promise.reject(new Error(result.message))
      }
    },

    //点击退出登陆
    loginout(){
      //清空仓库数据
      this.userInfo={name:'',token:''}
      //清空本地数据
      DEL_TOKEN();
    },

    //查询微信扫码状态（本地是否存储数据）
    queryState(){
      //开启定时器，询问本地是否存储用户信息
      let timer = setInterval(()=>{
        //扫码成功：本地存储有数据
        if (GET_TOKEN()) {
          //关闭对话框
          this.dialogFormVisible =false;
          //仓库从本地存储数据
          this.userInfo = JSON.parse(GET_TOKEN() as string);
          // 关闭定时器
          clearInterval(timer);
        }
      },1000);
    }
  },
  getters: {

  },
});
export default useUserStore;
