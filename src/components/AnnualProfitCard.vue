<template>
  <ion-card @click="toggleMonthly">
    <ion-card-header>
      <ion-card-title>{{ annual.year }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>总收益: {{ annual.total }}</p>
      <p>收益率: {{ annual.rate }}%</p>
      <div v-if="showMonthly">
        <MonthlyProfitCard v-for="monthly in annual.monthlyProfits" :key="monthly.month" :monthly="monthly" />
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup>
import { ref } from 'vue';
import MonthlyProfitCard from '@/components/MonthlyProfitCard.vue';
const props = defineProps({
  annual: Object
});

const showMonthly = ref(false);

const toggleMonthly = () => {
  showMonthly.value = !showMonthly.value;
};
</script>

<style scoped>
ion-card {
  margin-bottom: 1em;
}
</style>
