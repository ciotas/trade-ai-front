<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>设置</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ApiKeyForm />
      <FundAllocationSlider />
    </ion-content>
  </ion-page>
</template>

<script setup>
import ApiKeyForm from '@/components/ApiKeyForm.vue';
import FundAllocationSlider from '@/components/FundAllocationSlider.vue';
</script>

<style scoped>
</style>
