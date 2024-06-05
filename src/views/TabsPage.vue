<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon name="home-outline"></ion-icon>
          <ion-label>首页</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="holdings" href="/holdings">
          <ion-icon name="briefcase-outline"></ion-icon>
          <ion-label>持仓</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="trade-records" href="/trade-records">
          <ion-icon name="document-text-outline"></ion-icon>
          <ion-label>交易记录</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="config" href="/config">
          <ion-icon name="settings-outline"></ion-icon>
          <ion-label>设置</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';
</script>
