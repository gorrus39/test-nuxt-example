<script setup lang="ts">
import type { DataJson } from '~/types-src'
import Form from '~/components/form.vue'

const showChilds = ref(true)
const showFormRef = ref(false)

const props = defineProps<{
	childs: DataJson[]
	parendId?: number
}>()

const locales = computed(() => {
	return props.childs.map((child) => {
		const locale = useLocale(child.locale)
		return {
			id: child.id,
			cg_name: 'cg_name' in locale ? locale.cg_name : null,
			childs: child.childs,
			showChilds: ref(true),
		}
	})
})
const showForm = (id: number) => {
	showFormRef.value = true
}
</script>

<template>
	<UModal v-model="showFormRef">
		<Form :parendId="parendId"/>
	</UModal>

	<div class="pl-4">
		<div v-for="child in locales" :key="child.id">
			<UIcon
				name="i-ep:arrow-down-bold"
				:class="['w-5', 'h-5', 'pointer', 'transition-transform', 'duration-100', { 'rotate-180': !child.showChilds.value }]"
				@click="child.showChilds.value = !child.showChilds.value" />
			<b>{{ child.cg_name }}</b>
			<Transition>
				<div v-if="child.childs && child.showChilds.value">
					<UButton @click="showForm(child.id)" class="pl-10">Add item</UButton>
					<DataChilds :childs="child.childs" :parendId="child.id"/>
				</div>
			</Transition>
		</div>
	</div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
