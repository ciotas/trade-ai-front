<template>
  <ion-button expand="full" @click="loginWithWeChat" color="primary">
    <ion-icon slot="start" name="logo-wechat"></ion-icon>
    微信登录
  </ion-button>
</template>

<script setup>
const loginWithWeChat = () => {
  // 微信网页授权登录逻辑
  const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
  const appId = 'YOUR_WECHAT_APP_ID'; // 替换为你的微信应用ID
  const state = 'SOME_RANDOM_STATE'; // 你可以随机生成一个状态字符串

  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
};
</script>

<style scoped>
</style>
