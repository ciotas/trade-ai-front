<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>首页</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="daily-profit-cards">
        <DailyProfitCard v-for="profit in dailyProfits" :key="profit.date" :profit="profit" />
      </div>
      <div class="annual-profit-cards">
        <AnnualProfitCard v-for="annual in annualProfits" :key="annual.year" :annual="annual" />
      </div>
      <div class="monthly-profit-cards" v-if="showMonthlyProfits">
        <MonthlyProfitCard v-for="monthly in monthlyProfits" :key="monthly.month" :monthly="monthly" />
      </div>
      <FundDistributionChart :distribution="fundDistribution" />
      <ControlButton :isTradingEnabled="isTradingEnabled" @toggle="toggleTrading" />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import DailyProfitCard from '@/components/DailyProfitCard.vue';
import AnnualProfitCard from '@/components/AnnualProfitCard.vue';
import MonthlyProfitCard from '@/components/MonthlyProfitCard.vue';
import FundDistributionChart from '@/components/FundDistributionChart.vue';
import ControlButton from '@/components/ControlButton.vue';

const dailyProfits = ref([]);
const annualProfits = ref([]);
const monthlyProfits = ref([]);
const fundDistribution = ref({});
const isTradingEnabled = ref(true);
const showMonthlyProfits = ref(false);

const toggleTrading = () => {
  isTradingEnabled.value = !isTradingEnabled.value;
  // Perform the toggle trading action, e.g., make an API call
};

// Fetch data from the API
const fetchData = async () => {
  // Fetch daily profits
  const dailyResponse = await fetch('/api/earnings/daily');
  dailyProfits.value = await dailyResponse.json();

  // Fetch annual profits
  const annualResponse = await fetch('/api/earnings/annual');
  annualProfits.value = await annualResponse.json();

  // Fetch fund distribution
  const distributionResponse = await fetch('/api/fund_allocation');
  fundDistribution.value = await distributionResponse.json();
};

fetchData();
</script>

<style scoped>
.daily-profit-cards, .annual-profit-cards, .monthly-profit-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
