<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>收益</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="refreshData">
            <ion-icon slot="icon-only" name="refresh-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>每日收益</ion-label>
        </ion-list-header>
        <ion-item v-for="(item, index) in dailyEarnings" :key="index" :color="item.profit_status === '盈利' ? 'success' : 'danger'">
          <ion-label>{{ item.date }}: {{ item.profit_amount }}</ion-label>
        </ion-item>
      </ion-list>
      <ion-list>
        <ion-list-header>
          <ion-label>年度收益</ion-label>
        </ion-list-header>
        <ion-item v-for="(year, index) in yearlyEarnings" :key="index" @click="toggleYear(index)">
          <ion-label>{{ year.year }}: {{ year.total_profit }} ({{ year.profit_rate }}%)</ion-label>
        </ion-item>
        <ion-list v-if="expandedYearIndex !== null">
          <ion-list-header>
            <ion-label>月度收益</ion-label>
          </ion-list-header>
          <ion-item v-for="(month, index) in yearlyEarnings[expandedYearIndex].monthly_earnings" :key="index">
            <ion-label>{{ month.month }}: {{ month.monthly_profit }} ({{ month.monthly_profit_rate }}%)</ion-label>
          </ion-item>
        </ion-list>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonList, IonListHeader, IonLabel, IonItem } from '@ionic/vue';
import axios from 'axios';

export default {
  name: 'EarningsPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem
  },
  data() {
    return {
      dailyEarnings: [],
      yearlyEarnings: [],
      expandedYearIndex: null
    };
  },
  methods: {
    async fetchData() {
      try {
        const dailyResponse = await axios.get('/api/daily-earnings');
        const yearlyResponse = await axios.get('/api/yearly-earnings');
        this.dailyEarnings = dailyResponse.data;
        this.yearlyEarnings = yearlyResponse.data;
      } catch (error) {
        console.error('数据加载失败，请稍后重试');
      }
    },
    refreshData() {
      this.fetchData();
    },
    toggleYear(index) {
      this.expandedYearIndex = this.expandedYearIndex === index ? null : index;
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
ion-item[color="success"] {
  --background: #d4edda;
}
ion-item[color="danger"] {
  --background: #f8d7da;
}
</style>
