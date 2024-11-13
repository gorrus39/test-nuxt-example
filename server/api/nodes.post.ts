import fs from 'fs'
import { readBody } from 'h3'
import { formSchema, Node } from '~/types'
import { getParentNodeById } from '~/utils/utils'

const maxNodeIdInit = process.env.maxNodeIdInit
let nodeId = maxNodeIdInit ? +maxNodeIdInit : 100

export default defineEventHandler(async (event) => {
	const workingFilePath = useRuntimeConfig().workingFilePath
	const formData = await readBody(event)

	const parsed = formSchema.safeParse(formData)
	if (parsed.success) {
		try {
			const nodes = JSON.parse(fs.readFileSync(workingFilePath, 'utf-8'))
			const parentId = formData.parentId as number | undefined
			const id = ++nodeId
			const cg_name = formData.cg_name
			const locale = {
				ru: {},
				en: {
					id,
					cg_name,
				},
				fr: {},
			}
			const newNode = {
				id,
				locale,
			}

			if (parentId == undefined) {
				nodes.unshift(newNode)
			} else {
				const parendNode = getParentNodeById(nodes, parentId)
				if (parendNode == undefined) {
					throw Error('unexpected error')
				}

				parendNode.childs ? parendNode.childs.unshift(newNode) : (parendNode.childs = [newNode])
			}

			fs.writeFileSync(workingFilePath, JSON.stringify(nodes), 'utf-8')
			return { success: true }
		} catch (error) {
			return { success: false }
		}
	} else {
		return { success: false }
	}
})
