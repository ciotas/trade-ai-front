import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
// import Tabs from '../views/TabsPage.vue';
import HomePage from '../views/HomePage.vue';
// import HoldingsPage from '../views/HoldingsPage.vue';
// import TradeRecordsPage from '../views/TradeRecordsPage.vue';
import ConfigPage from '../views/ConfigPage.vue';
import LoginPage from '../views/LoginPage.vue';
import RiskCapturePage from '../views/RiskCapturePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/risk',
    name: 'RiskCapturePage',
    component: RiskCapturePage
  },
  // {
  //   path: '/holdings',
  //   name: 'Holdings',
  //   component: HoldingsPage
  // },
  // {
  //   path: '/trade-records',
  //   name: 'TradeRecords',
  //   component: TradeRecordsPage
  // },
  {
    path: '/config',
    name: 'Config',
    component: ConfigPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
