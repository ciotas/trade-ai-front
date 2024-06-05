<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>任务管理</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openNewTaskModal">新增任务</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <template v-if="tasks.length > 0">
        <ion-list>
          <ion-card v-for="task in tasks" :key="task.id">
            <ion-card-header>
              <ion-card-title>{{ task.name }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>实现方式: {{ task.method || '未定义' }}</p>
              <p>时间安排: {{ task.start_at || '未定义' }} - {{ task.end_at || '未定义' }}</p>
              <p>任务进度: <ion-progress-bar :value="task.progress || 0"></ion-progress-bar></p>
              <p>责任人员: {{ task.responsible || '未定义' }}</p>
              <ion-button @click="openEditTaskModal(task)">修改</ion-button>
              <ion-button color="danger" @click="confirmDeleteTask(task)">删除</ion-button>
            </ion-card-content>
          </ion-card>
        </ion-list>
      </template>
      <template v-else>
        <div class="no-tasks">
          <p>当前没有任务</p>
        </div>
      </template>
      <ion-toast :isOpen="showError" message="加载失败，请重试" duration="2000"></ion-toast>
    </ion-content>

    <TaskForm :isOpen="isModalOpen" :taskData="selectedTask" :isEditMode="isEditMode" @update:isOpen="isModalOpen = $event" @taskSubmitted="handleTaskSubmitted" />
  </ion-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonProgressBar, IonToast } from '@ionic/vue';
import TaskForm from '../components/TaskForm.vue';

export default {
  name: 'TaskManagement',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonProgressBar,
    IonToast,
    TaskForm
  },
  setup() {
    const tasks = ref([]);
    const showError = ref(false);
    const isModalOpen = ref(false);
    const selectedTask = ref(null);
    const isEditMode = ref(false);

    const loadTasks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/tasks');
        const data = await response.json();
        tasks.value = data;
        console.log("Tasks after load: ", tasks.value);  // 调试日志
      } catch (error) {
        showError.value = true;
      }
    };

    const openNewTaskModal = () => {
      selectedTask.value = { name: '', start_at: '', end_at: '', method: '', responsible: '' };
      isEditMode.value = false;
      isModalOpen.value = true;
    };

    const openEditTaskModal = (task) => {
      selectedTask.value = task;
      isEditMode.value = true;
      isModalOpen.value = true;
    };

    const confirmDeleteTask = async (task) => {
      try {
        await fetch(`http://localhost:8000/api/tasks/${task.id}`, {
          method: 'DELETE'
        });
        tasks.value = tasks.value.filter(t => t.id !== task.id);
      } catch (error) {
        showError.value = true;
      }
    };

    const handleTaskSubmitted = (newTask) => {
      if (isEditMode.value) {
        const index = tasks.value.findIndex(t => t.id === newTask.id);
        tasks.value[index] = newTask;
      } else {
        tasks.value.unshift(newTask);
      }
    };

    onMounted(() => {
      loadTasks();
    });

    return {
      tasks,
      showError,
      isModalOpen,
      selectedTask,
      isEditMode,
      openNewTaskModal,
      openEditTaskModal,
      confirmDeleteTask,
      handleTaskSubmitted
    };
  }
};
</script>

<style scoped>
.no-tasks {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
</style>
