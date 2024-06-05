<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ monthly.month }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>月收益: {{ monthly.amount }}</p>
      <p>收益率: {{ monthly.rate }}%</p>
    </ion-card-content>
  </ion-card>
</template>

<script setup>
const props = defineProps({
  monthly: Object
});
</script>

<style scoped>
ion-card {
  width: 48%;
  margin-bottom: 1em;
}
</style>
