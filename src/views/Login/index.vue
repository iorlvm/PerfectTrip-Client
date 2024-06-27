<script setup>
</script>

<template>
  <div class="login-container">
    <h2>會員登入</h2>
    <form>
      <input type="text" placeholder="帳號" required>
      <input type="password" placeholder="密碼" required>
      <div style="text-align: center;">
        <button type="submit">登入</button>
        <button type="reset">清空</button>
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
  margin: 0;
}

.login-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.login-container h2 {
  margin-bottom: 20px;
  text-align: center;
}

.login-container input[type="text"],
.login-container input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-container button {
  width: calc(50% - 10px);
  padding: 10px;
  margin: 10px 5px;
  border: none;
  border-radius: 4px;
  background-color: #007BFF;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.login-container button[type="reset"] {
  background-color: #dc3545;
}

.login-container button:hover {
  opacity: 0.9;
}
</style>