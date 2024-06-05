<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>登录 / 注册</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <AuthForm @authenticated="onAuthenticated"/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import AuthForm from '../components/AuthForm.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'AuthPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    AuthForm
  },
  setup() {
    const router = useRouter();

    const onAuthenticated = () => {
      router.push('/home');
    };

    return {
      onAuthenticated,
    };
  },
};
</script>

<style scoped>
ion-content {
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 16px;
  --padding-bottom: 16px;
}
</style>
