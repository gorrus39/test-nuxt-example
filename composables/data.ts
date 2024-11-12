import {  nodeSchema, type Node, type PostData } from '~/types'
import z from 'zod'

export const useData = () => {
	const data = ref<null | Node[]>(null)

	async function get() {
		const { data: dataJson } = await useFetch('/api/data')

		const parsed = z.array(nodeSchema).safeParse(dataJson.value)
		if (parsed.success) {
			data.value = parsed.data as Node[]
		} else {
			console.error('invalid fetched data type')
		}
		return data.value
	}

	async function post(data: PostData) {
		const response = await $fetch('/api/data', { method: 'POST', body: data })
		return {  error: response }
	}

	return { get, post }
}
