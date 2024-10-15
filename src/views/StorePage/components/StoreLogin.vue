<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const companyStore = useUserStore();
const router = useRouter();

const formData = ref({
  username: '',
  password: ''
})

const login = async (e) => {
  e.preventDefault();

  if (formData.value.username === '' || formData.value.password === '') {
    ElMessage({
      type: 'warning',
      message: "帳號密碼不能是空的"
    });
    return;
  }
  
  let username = formData.value.username;
  let password = formData.value.password;
  await companyStore.getCompanyInfo({ username, password });
  // router.go('/store/manage');
  if (companyStore.userInfo.role) {
    router.push('/store/manage/setting/account'); 
  }
  // console.log({ username, password });
}

const register = async () => {
  router.push('/store/register')
}


</script>

<template>
  <div class="login-container">
    <h2>商家登入</h2>
    <form>
      <input type="text" placeholder="帳號" v-model="formData.username" required>

      <input type="password" placeholder="密碼" v-model="formData.password" required>
      <div style="text-align: center;">
        <button type="submit" @click="login">登入</button>
        <button type="reset" style="text-decoration: underline;" @click="register">現在就註冊</button> 
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;


}

.login-container {
  background-color: #fff;
  padding: 50px 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 100px auto;

}

.login-container h2 {
  margin-bottom: 20px;
  text-align: center;
}

.login-container input[type="text"],
.login-container input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-container button {
  width: calc(50% - 10px);
  padding: 10px;
  margin: 10px 5px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

}

.login-container button[type="submit"] {
  width: calc(100% - 20px);
  margin: 10px;
  background-color: #007BFF;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.login-container button[type="reset"] {
  background-color: white;
  border: none;
  color: gray;
}



.login-container button:hover {
  opacity: 0.9;
}
</style>