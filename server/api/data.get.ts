import fs from 'fs'

export default defineEventHandler(() => {
	const workingFilePath = useRuntimeConfig().workingFilePath
	const content = fs.readFileSync(workingFilePath, 'utf-8')
	return JSON.parse(content)
})
