<script setup lang="ts">
import DataChilds from '~/components/dataChilds.vue'
const store = useNodesStore()
await store.fetchData()
console.log(store.nodes)
</script>

<template>
	<DataChilds v-if="store.nodes" :childs="store.nodes" />
</template>
