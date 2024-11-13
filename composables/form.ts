type FormData = {
	parentId?: number | undefined
	cg_name: string | undefined
}

const emptyFormData = {
	cg_name: undefined,
}

const formData = ref<FormData>(emptyFormData)
const show = ref(false)

export const useForm = () => {
	const newItem = ({ parentId }: { parentId: number | undefined }) => {
		formData.value = { parentId, ...emptyFormData }
		show.value = true
	}

	const closeForm = () => {
		formData.value = emptyFormData
		show.value = false
	}

	// const editItem = { id }

	return { formData, newItem, closeForm, show }
}
