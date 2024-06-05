<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>资金分配比例</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item>
        <ion-label>现货市场</ion-label>
        <ion-range v-model="spotPercentage" min="0" max="100" step="1">
          <ion-label slot="start">0%</ion-label>
          <ion-label slot="end">100%</ion-label>
        </ion-range>
      </ion-item>
      <ion-item>
        <ion-label>合约市场</ion-label>
        <ion-range v-model="futuresPercentage" min="0" max="100" step="1">
          <ion-label slot="start">0%</ion-label>
          <ion-label slot="end">100%</ion-label>
        </ion-range>
      </ion-item>
      <ion-button expand="full" @click="saveFundAllocation">保存</ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script setup>
import { ref, watch } from 'vue';

const spotPercentage = ref(85);
const futuresPercentage = ref(15);

watch(spotPercentage, () => {
  futuresPercentage.value = 100 - spotPercentage.value;
});

watch(futuresPercentage, () => {
  spotPercentage.value = 100 - futuresPercentage.value;
});

const saveFundAllocation = async () => {
  try {
    const response = await fetch('/api/fund_allocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spot: spotPercentage.value, futures: futuresPercentage.value }),
    });

    if (response.ok) {
      alert('资金分配比例保存成功');
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
