<script setup lang="ts">
import { useForm } from '~/composables/form'
import type { Node } from '~/types'

const props = defineProps<{
	childs: Node[] | undefined
	parendId?: number
}>()

const form = useForm()

const locales = computed(() => {
	if (!props.childs) return []

	return props.childs.map((child) => {
		const locale = useLocale(child.locale)
		return {
			id: child.id,
			cg_name: 'cg_name' in locale ? locale.cg_name : null,
			childs: child.childs,
			showChilds: ref(false),
		}
	})
})

const openForm = () => form.newItem({ parentId: props.parendId })
</script>

<template>
	<div class="pl-4">
		<UButton @click="openForm" class="pl-10">New item</UButton>
		<div v-for="child in locales" :key="child.id">
			<UIcon
				name="i-ep:arrow-down-bold"
				:class="['w-5', 'h-5', 'pointer', 'transition-transform', 'duration-100', { 'rotate-180': !child.showChilds.value }]"
				@click="child.showChilds.value = !child.showChilds.value" />

			<span>{{ child.childs?.length || 0 }}</span>
			<b>{{ child.cg_name }}</b>
			<Transition>
				<div v-if="child.showChilds.value">
					<DataChilds :childs="child?.childs" :parendId="child.id" />
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
