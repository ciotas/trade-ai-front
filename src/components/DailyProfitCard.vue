<template>
  <ion-card :color="profit.color">
    <ion-card-header>
      <ion-card-title>{{ profit.date }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ profit.amount }}</p>
    </ion-card-content>
  </ion-card>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
  profit: Object
});

const color = computed(() => (props.profit.amount >= 0 ? 'success' : 'danger'));
</script>

<style scoped>
ion-card {
  width: 48%;
  margin-bottom: 1em;
}
</style>
