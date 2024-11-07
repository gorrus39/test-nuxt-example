<script setup lang="ts">
import z from 'zod'
//  import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type { formSchema } from '~/types-zod';

const data = useData()


const props = defineProps<{
	parentId?: number
}>()

type Schema = z.infer<typeof formSchema>

const state = reactive({
	cg_name: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
	data.post({ ...event.data, parentId:props.parentId })
}

// console.log(state)

// watch(state, (value)=>console.log('value', value))
</script>

<template>
	<UForm :schema="formSchema" :state="state" class="space-y-4" @submit="onSubmit">
		<UFormGroup label="cg_name" name="cg_name">
			<UInput v-model="state.cg_name" />
		</UFormGroup>
		<UButton type="submit"> Submit </UButton>
	</UForm>
</template>
