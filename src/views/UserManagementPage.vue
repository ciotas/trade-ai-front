<template>
  <div class="user-management-page">
    <h1>用户管理</h1>
    <notification-component />
    <monitoring-component />
    <div class="user-details">
      <user-detail-component />
      <user-performance-component />
    </div>
    <div class="task-details">
      <task-detail-component />
      <task-progress-component />
    </div>
  </div>
</template>

<script>
import NotificationComponent from '@/components/NotificationComponent.vue';
import MonitoringComponent from '@/components/MonitoringComponent.vue';
import UserDetailComponent from '@/components/UserDetailComponent.vue';
import UserPerformanceComponent from '@/components/UserPerformanceComponent.vue';
import TaskDetailComponent from '@/components/TaskDetailComponent.vue';
import TaskProgressComponent from '@/components/TaskProgressComponent.vue';

export default {
  name: 'UserManagementPage',
  components: {
    NotificationComponent,
    MonitoringComponent,
    UserDetailComponent,
    UserPerformanceComponent,
    TaskDetailComponent,
    TaskProgressComponent,
  },
};
</script>

<style scoped>
.user-management-page {
  padding: 20px;
}
.user-details, .task-details {
  margin-top: 20px;
}
</style>
