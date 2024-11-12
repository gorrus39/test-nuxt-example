<script setup lang="ts">
import Notification from '~/components/notification.vue';
import { useNotification } from '~/composables/notification';

const language = useLanguage().current
const languages = useLanguage().available

const notification = useNotification()

const openNotification = () => {
	notification.update({
		show: true,
		message: 'success',
		success: true
	})
}
watch(notification, () => {

})
</script>

<template>
	<div>

		<Notification />
		<h1>{{ notification }}</h1>
		<button @click="openNotification">open notification</button>
		<USelect v-model="language" :options="languages" class="w-48" />
		<span>current language: {{ language }}</span>
		<slot />
	</div>
</template>

<!-- flag:ru-4x3 -->
<!-- flag:re-4x3 -->
<!-- flag:us-4x3 -->
