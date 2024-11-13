<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { useForm } from '~/composables/form'
import { formSchema, type Form } from '~/types'

const toast = useToast()
const form = useForm()
const store = useNodesStore()

async function onSubmit(event: FormSubmitEvent<Form>) {
	const { success } = await store.postItem({ ...event.data, parentId: form.formData.value.parentId })
	form.closeForm()

	const background = success ? 'bg-green-400' : 'bg-red-400'
	const title = success ? 'Successfully!' : 'Unsuccessfully!'
	toast.add({
		title,
		ui: {
			progress: { background },
		},
	})
	if (success) await store.refresh()
}
</script>

<template>
	<UNotifications />
	<UModal v-model="form.show.value">
		<UForm :schema="formSchema" :state="form.formData.value" @submit="onSubmit" class="p-3">
			<UFormGroup label="cg_name" name="cg_name">
				<UInput v-model="form.formData.value.cg_name" />
			</UFormGroup>
			<UButton type="submit"> Submit </UButton>
		</UForm>
	</UModal>
</template>
