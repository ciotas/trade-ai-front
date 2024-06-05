<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>资金分配</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <canvas id="fundChart"></canvas>
    </ion-card-content>
  </ion-card>
</template>

<script setup>
import { onMounted } from 'vue';
// import Chart from 'chart.js/auto';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  distribution: Object
});

onMounted(() => {
  const ctx = document.getElementById('fundChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(props.distribution),
      datasets: [{
        data: Object.values(props.distribution),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    }
  });
});
</script>

<style scoped>
ion-card {
  /* width: 100%; */
  margin-bottom: 1em;
}
</style>
