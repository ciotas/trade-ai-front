<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>风险采集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="risk-capture-container">
        <ion-button @click="captureRiskPoint">拍照识别风险点</ion-button>
        <RiskPoint :points="riskPoints" :error="errorMessage" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import RiskPoint from '@/components/RiskPoint.vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import '@ionic/pwa-elements';

export default defineComponent({
  name: 'RiskCapturePage',
  components: { RiskPoint },
  setup() {
    const riskPoints = ref([]);
    const errorMessage = ref('');

    const captureRiskPoint = async () => {
      try {
        errorMessage.value = ''; // Clear any previous error message
        const image = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 100
        });

        // 将图片提交到后台接口
        const response = await submitImageToBackend(image);
        riskPoints.value = response.data.map((point, index) => ({
          id: index + 1,
          description: point
        }));
      } catch (error) {
        if (error.message.includes('User cancelled photos app')) {
          errorMessage.value = '用户取消了拍照。请重试。';
        } else {
          errorMessage.value = '拍照过程中出现错误：' + error.message;
        }
        console.error('Error capturing photo:', error);
      }
    };

    const submitImageToBackend = async (image) => {
      const formData = new FormData();
      formData.append('file', await fetch(image.webPath).then(res => res.blob()), 'photo.jpg');

      const response = await fetch('https://your-backend-api.com/identify-risks', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit image');
      }

      return response.json();
    };

    return { riskPoints, errorMessage, captureRiskPoint };
  }
});
</script>

<style scoped>
.risk-capture-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.risk-points {
  margin-top: 20px;
  width: 100%;
}

.risk-points ul {
  list-style-type: none;
  padding: 0;
}

.risk-points li {
  background: #f8d7da;
  margin: 8px 0;
  padding: 10px;
  border-radius: 4px;
}
</style>
