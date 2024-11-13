import { z } from 'zod'

export const lgSchema = z.enum(['en', 'ru', 'fr'])
export type Lg = z.infer<typeof lgSchema>

// const twitterLocaleSchema = z.object({
// 	extra_meta_content: z.string().optional(),
// })

// const ogLocaleSchema = z.object({
// 	og_content_value: z.string().optional(),
// })

// const ogLocalesSchema = z.object({
// 	ru: ogLocaleSchema,
// 	en: ogLocaleSchema,
// 	fr: ogLocaleSchema,
// })
// const twitterLocalesSchema = z.object({
// 	en: twitterLocaleSchema,
// 	ru: twitterLocaleSchema,
// 	fr: twitterLocaleSchema,
// })

// const ogSchema = z.object({
// 	id: z.number(),
// 	cat_id: z.number(),
// 	og_property_name: z.string(),
// 	locale: ogLocalesSchema,
// })

// const twitterSchema = z.object({
// 	id: z.number(),
// 	cat_id: z.number(),
// 	extra_meta_name: z.string(),
// 	locale: twitterLocalesSchema,
// })

const localeSchema = z
	.object({
		id: z.number(),
		cg_name: z.string(),
		// cg_description: z.string(),
		// cg_title: z.string(),
		// cg_slug: z.string(),
		// meta_description: z.string(),
		// meta_keywords: z.string(),
		link: z.string(),
	})
	.partial()

const localesSchema = z.object({
	en: localeSchema,
	ru: localeSchema,
	fr: localeSchema,
})

export type Locales = z.infer<typeof localesSchema>
export type Locale = z.infer<typeof localeSchema>

const nodeBaseSchema = z.object({
	id: z.number(),
	// depth: z.number(),
	// numchild: z.number(),
	// category_image: z.string().nullable(),
	// logo_image: z.string().nullable(),
	// menu_image: z.string().nullable(),
	// separate_menu: z.boolean(),
	// c_images: z.number(),
	// product_rep_1_id: z.number().nullable(),
	// product_rep_2_id: z.number().nullable(),
	// c_views: z.number(),
	// og: z.array(ogSchema).nullable(),
	// twitter: z.array(twitterSchema).nullable(),
	locale: localesSchema,
	// search_target: z.boolean().optional(),
	// path_to_top: z.array(z.number()),
})

type NodeBase = z.infer<typeof nodeBaseSchema> & {
	childs?: NodeBase[]
}

export const nodeSchema: z.ZodType<NodeBase> = nodeBaseSchema.extend({
	childs: z.lazy(() => nodeSchema.array()).optional(),
})

export type Node = z.infer<typeof nodeSchema>

/////////////////////////////////////////////////////////////
export interface PostData {
	parentId: number | undefined
	cg_name: string
}

export const formSchema = z.object({
	cg_name: z.string({ required_error: 'Required' }).min(3, 'min 3 characters').max(20, 'max 20 characters'),
})

export type Form = z.infer<typeof formSchema>
