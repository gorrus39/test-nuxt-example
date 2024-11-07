<script setup lang="ts">
const language = useLanguage().current
const languages = useLanguage().available
</script>

<template>
	<div>
		<USelect v-model="language" :options="languages" class="w-48" />
		<span>current language: {{ language }}</span>
		<slot />
	</div>
</template>

<!-- flag:ru-4x3 -->
<!-- flag:re-4x3 -->
<!-- flag:us-4x3 -->
