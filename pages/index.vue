<script setup lang="ts">
import DataChilds from '~/components/dataChilds.vue'
const data = await useData().get()
</script>

<template>
	<DataChilds v-if="data" :childs="data" />
</template>
