import z from 'zod'
import { defineStore } from 'pinia'
import { nodeSchema, type Node, type PostData } from '~/types'

export const useNodesStore = defineStore('nodes', {
	state: (): { nodes: Node[] | null } => ({
		nodes: null,
	}),
	actions: {
		async fetchData() {
			try {
				const data = await $fetch('/api/nodes')
				const parsed = z.array(nodeSchema).safeParse(data)
				if (parsed.success) {
					this.nodes = parsed.data as Node[]
				} else {
					throw new Error('failed parse data')
				}
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		},
		async postItem(data: PostData) {
			try {
				const response = await $fetch('/api/nodes', {
					method: 'POST',
					body: data,
				})
				await this.fetchData()
				return response
			} catch (error) {
				console.error('Ошибка при отправке данных:', error)
				return { success: false }
			}
		},
		async refresh() {
			try {
				this.nodes = await $fetch('/api/nodes')
			} catch (error) {
				console.error('Ошибка при обновлении данных:', error)
			}
		},
	},
})
