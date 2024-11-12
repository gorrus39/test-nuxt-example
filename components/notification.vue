<script setup lang="ts">
import { useNotification } from '~/composables/notification';

const notification = useNotification()
// setTimeout(() => notification.value.show = false,5000)
// console.log(notification.value)
// watch(notification, () => { })

const closeNotification = () => {
  notification.update({
    message: 'dsaf',
    show: false,
    success: false
  })
}
</script>

<template>
  <div v-if="notification.state.value.show" @click="closeNotification" :class="[`${notification.state.value.success ? 'success' : 'fail'}`,
    'm-auto p-5'
  ]">
    notification {{ notification.state.value.message }}
  </div>
</template>

<style scoped>
.success {
  background-color: green;
}

.fail {
  background-color: red;
}
</style>
