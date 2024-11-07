<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const data = useData()

const schema = object({
	cg_name: string().required('Required').min(3, 'min 3 characters').max(20, 'max 20 characters'),
})

const props = defineProps<{
	parendId?: number
}>()

type Schema = InferType<typeof schema>

const state = reactive({
	cg_name: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
	// Do something with event.data
	console.log(event.data)
	console.log('props.parendId', props.parendId)
	data.post({ ...event.data, parentId:props.parentId })
}

// console.log(state)

// watch(state, (value)=>console.log('value', value))
</script>

<template>
	<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
		<UFormGroup label="cg_name" name="cg_name">
			<UInput v-model="state.cg_name" />
		</UFormGroup>
		<UButton type="submit"> Submit </UButton>
	</UForm>
</template>
