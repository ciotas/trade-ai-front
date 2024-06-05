<template>
  <div>
    <ion-item>
      <ion-label position="stacked">手机号码</ion-label>
      <ion-input v-model="phoneNumber" type="tel" @input="validatePhoneNumber"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">短信验证码</ion-label>
      <ion-input v-model="verificationCode" type="text" @input="validateVerificationCode"></ion-input>
      <ion-button slot="end" size="default" @click="sendVerificationCode" :disabled="isSending || !isPhoneNumberValid">
        {{ verificationButtonText }}
      </ion-button>
    </ion-item>
    <ion-button expand="full" @click="authenticate" :disabled="!isVerificationCodeValid">登录 / 注册</ion-button>
    <ion-toast :is-open="showToast" :message="toastMessage" :duration="2000" @did-dismiss="closeToast"></ion-toast>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from '../axios';
import { IonItem, IonLabel, IonInput, IonButton, IonToast } from '@ionic/vue';

export default {
  name: 'AuthForm',
  components: {
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonToast
  },
  setup(props, { emit }) {
    const phoneNumber = ref('');
    const verificationCode = ref('');
    const showToast = ref(false);
    const toastMessage = ref('');
    const isSending = ref(false);
    const countdown = ref(0);

    const validatePhoneNumber = () => {
      if (phoneNumber.value.length !== 11) {
        toastMessage.value = '请输入有效的11位手机号码';
        showToast.value = true;
      }
    };

    const validateVerificationCode = () => {
      if (verificationCode.value.length !== 4) {
        toastMessage.value = '请输入4位验证码';
        showToast.value = true;
      }
    };

    const closeToast = () => {
      showToast.value = false;
    };

    const sendVerificationCode = async () => {
      if (phoneNumber.value.length !== 11) {
        toastMessage.value = '请输入有效的11位手机号码';
        showToast.value = true;
        return;
      }

      isSending.value = true;
      countdown.value = 60;
      try {
        await sendCodeToPhone(phoneNumber.value);
        toastMessage.value = '验证码已发送';
        showToast.value = true;
        startCountdown();
      } catch (error) {
        toastMessage.value = error.response ? error.response.data.message : '发送验证码失败，请稍后再试';
        showToast.value = true;
        isSending.value = false;
      }
    };

    const startCountdown = () => {
      const interval = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          clearInterval(interval);
          isSending.value = false;
        }
      }, 1000);
    };

    const authenticate = async () => {
      if (verificationCode.value.length !== 4) {
        toastMessage.value = '验证码应为4位数字';
        showToast.value = true;
        return;
      }

      try {
        const response = await authenticateUser(phoneNumber.value, verificationCode.value);
        const { access_token } = response.data;
        localStorage.setItem('token', access_token);
        emit('authenticated');
      } catch (error) {
        toastMessage.value = error.response ? error.response.data.message : '验证码错误或手机号码无效';
        showToast.value = true;
      }
    };

    const isValidPhoneNumber = (number) => {
      return number.length === 11;
    };

    const isValidVerificationCode = (code) => {
      return code.length === 4;
    };

    const sendCodeToPhone = (phone) => {
      return axios.post('/api/sendVerificationCode', null, {
        params: { phone_number: phone },
      });
    };

    const authenticateUser = (phone, code) => {
      return axios.post('/api/authenticate', null, {
        params: {
          phone_number: phone,
          verification_code: code,
        },
      });
    };

    return {
      phoneNumber,
      verificationCode,
      showToast,
      toastMessage,
      isSending,
      countdown,
      verificationButtonText: computed(() => (countdown.value > 0 ? `${countdown.value}秒后重新获取` : '获取验证码')),
      isPhoneNumberValid: computed(() => isValidPhoneNumber(phoneNumber.value)),
      isVerificationCodeValid: computed(() => isValidVerificationCode(verificationCode.value)),
      sendVerificationCode,
      authenticate,
      closeToast,
      validatePhoneNumber,
      validateVerificationCode,
    };
  },
};
</script>

<style scoped>
ion-button {
  margin-top: 16px;
}
ion-item {
  align-items: center;
}
ion-item ion-button {
  margin-left: auto;
  --padding-start: 16px;
  --padding-end: 16px;
  --background: var(--ion-color-primary);
  --color: var(--ion-color-light);
}
</style>
