import fs from 'fs'
import { readBody } from 'h3'
import { dataJsonArraySchema } from '~/types-zod'

export default defineEventHandler(async (event) => {
	const workingFilePath = useRuntimeConfig().workingFilePath
	const newData = await readBody(event)

	const parsed = dataJsonArraySchema.safeParse(newData)
	if (parsed.success) {
		try {
			fs.writeFileSync(workingFilePath, JSON.stringify(parsed.data), 'utf-8')
			return { success: true }
		} catch (error) {
			return { success: false }
		}
	} else {
		console.error('invalid fetched data type')
		console.log(parsed.error)
		return { success: false }
	}
})
