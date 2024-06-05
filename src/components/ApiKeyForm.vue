<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>API Key 配置</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item>
        <ion-label position="stacked">API Key</ion-label>
        <ion-input v-model="apiKey" placeholder="请输入API Key"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">API Secret</ion-label>
        <ion-input type="password" v-model="apiSecret" placeholder="请输入API Secret"></ion-input>
      </ion-item>
      <ion-button expand="full" @click="saveApiKey">保存</ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script setup>
import { ref } from 'vue';

const apiKey = ref('');
const apiSecret = ref('');

const saveApiKey = async () => {
  try {
    const response = await fetch('/api/api_config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ api_key: apiKey.value, api_secret: apiSecret.value }),
    });

    if (response.ok) {
      alert('API Key 保存成功');
    } else {
      alert('保存失败，请检查输入');
    }
  } catch (error) {
    alert('保存过程中出现错误');
  }
};
</script>

<style scoped>
ion-card {
  margin-bottom: 1em;
}
</style>
