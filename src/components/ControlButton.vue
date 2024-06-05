<template>
  <ion-button @click="toggleTrading" :color="isTradingEnabled ? 'success' : 'danger'">
    {{ isTradingEnabled ? '暂停交易' : '开启交易' }}
  </ion-button>
</template>

<script setup>
const props = defineProps({
  isTradingEnabled: Boolean
});
const emit = defineEmits(['toggle']);

const toggleTrading = () => {
  emit('toggle');
};
</script>
