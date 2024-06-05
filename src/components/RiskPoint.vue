<template>
  <div class="risk-point-container">
    <ion-alert
      :is-open="showErrorAlert"
      header="错误"
      :message="errorMessage"
      :buttons="alertButtons"
      @didDismiss="showErrorAlert = false"
    ></ion-alert>
    <div v-if="riskPoints.length > 0" class="risk-points">
      <h2>识别出的风险点:</h2>
      <ul>
        <li v-for="(point, index) in riskPoints" :key="index">{{ point.description }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'RiskPoint',
  props: {
    points: Array,
    error: String,
  },
  setup(props) {
    const riskPoints = ref(props.points);
    const errorMessage = ref(props.error);
    const showErrorAlert = ref(!!props.error);

    watch(() => props.points, (newPoints) => {
      riskPoints.value = newPoints;
    });

    watch(() => props.error, (newError) => {
      errorMessage.value = newError;
      showErrorAlert.value = !!newError;
    });

    const alertButtons = [{ text: '确定', handler: () => { showErrorAlert.value = false; } }];

    return {
      riskPoints,
      errorMessage,
      showErrorAlert,
      alertButtons,
    };
  }
});
</script>

<style scoped>
.risk-point-container {
  width: 100%;
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
