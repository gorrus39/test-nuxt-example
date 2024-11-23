<script setup lang="ts">
import Form from '~/components/form.vue'

const language = useLanguage().current
const languages = useLanguage().available
</script>

<template>
	<div>
		<!-- <Form /> -->
		<!-- <USelect v-model="language" :options="languages" class="w-48" /> -->

		<slot />
	</div>
</template>

<!-- flag:ru-4x3 -->
<!-- flag:re-4x3 -->
<!-- flag:us-4x3 -->
