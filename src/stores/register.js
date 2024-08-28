// import { defineStore } from 'pinia';
// import { ref } from 'vue';
// import { companyRegisterAPI } from '@/apis/register';

// //商家註冊
// export const UserCompanyRegister = defineStore('Register',() => {
//     const registerInfo = ref({});
//     const getCompanyRegisterInfo = async ({username, password, company_name, vat_number, address, telephone}) =>{
//         const res = await companyRegisterAPI({username, password, company_name, vat_number, address, telephone});
//         registerInfo.value = res.data;
//     }

//     const clearRegisterInfo = () => {
//         registerInfo.value = {};
//     }

//     return{
//         registerInfo,
//         getCompanyRegisterInfo,
//         clearRegisterInfo
//     }
// },{
//     //開啟register持久化插件
//     persist:true
// });