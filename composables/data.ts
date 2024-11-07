import { dataJsonArraySchema } from '~/types-zod'
import type { DataJson } from '~/types-src'

export const useData = () => {
	const data = ref<null | DataJson[]>(null)

	async function get() {
		const { data: dataJson } = await useFetch('/api/data')

		const parsed = dataJsonArraySchema.safeParse(dataJson.value)
		if (parsed.success) {
			data.value = parsed.data as DataJson[]
		} else {
			console.error('invalid fetched data type')
		}
		return data.value
	}

	async function post(newData: DataJson[]) {
		const { data: success } = await useFetch('/api/data', { method: 'POST', body: newData })
		return { success }
	}

	return { get, post }
}
