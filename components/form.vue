<script setup lang="ts">
import z from 'zod'
//  import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import  { formSchema } from '~/types';

const data = useData()
const showNotify = ref(false)

const props = defineProps<{
	parentId?: number
	// showFormRef: globalThis.Ref<boolean, boolean>
}>()


type Schema = z.infer<typeof formSchema>

const state = reactive({
	cg_name: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
	const {error} = await data.post({ ...event.data, parentId: props.parentId })
	// props.showFormRef.value = false
	if (!error.success) {}
}


</script>

<template>
	<UForm :schema="formSchema" :state="state" class="space-y-4" @submit="onSubmit">
		<UFormGroup label="cg_name" name="cg_name">
			<UInput v-model="state.cg_name" />
		</UFormGroup>
		<UButton type="submit"> Submit </UButton>
	</UForm>
	</template>
