import { z } from 'zod'

const lgSchema = z.enum(['en', 'ru', 'fr'])
type Lg = z.infer<typeof lgSchema>

const localeElementSchema = z.object({
	en: z
		.object({
			id: z.number(),
			cg_name: z.string(),
			cg_description: z.string(),
			cg_title: z.string(),
			cg_slug: z.string(),
			meta_description: z.string(),
			meta_keywords: z.string(),
			link: z.string(),
		})
		.partial(),
	ru: z
		.object({
			id: z.number(),
			cg_name: z.string(),
			cg_description: z.string(),
			cg_title: z.string(),
			cg_slug: z.string(),
			meta_description: z.string(),
			meta_keywords: z.string(),
			link: z.string(),
		})
		.partial(),
	fr: z
		.object({
			id: z.number(),
			cg_name: z.string(),
			cg_description: z.string(),
			cg_title: z.string(),
			cg_slug: z.string(),
			meta_description: z.string(),
			meta_keywords: z.string(),
			link: z.string(),
		})
		.partial(),
})

const localeSocialSchema = z.object({
	en: z.object({
		extra_meta_content: z.string().optional(),
	}),
	ru: z.object({
		extra_meta_content: z.string().optional(),
	}),
	fr: z.object({
		extra_meta_content: z.string().optional(),
	}),
})

const ogSchema = z.object({
	id: z.number(),
	cat_id: z.number(),
	og_property_name: z.string(),
	locale: z.object({
		en: z.object({}),
		ru: z.object({
			og_content_value: z.string(),
		}),
		fr: z.object({}),
	}),
})

const twitterSchema = z.object({
	id: z.number(),
	cat_id: z.number(),
	extra_meta_name: z.string(),
	locale: localeSocialSchema,
})

const baseDataJsonSchema = z.object({
	id: z.number(),
	depth: z.number(),
	numchild: z.number(),
	category_image: z.string().nullable(),
	logo_image: z.string().nullable(),
	menu_image: z.string().nullable(),
	separate_menu: z.boolean(),
	c_images: z.number(),
	product_rep_1_id: z.number().nullable(),
	product_rep_2_id: z.number().nullable(),
	c_views: z.number(),
	og: z.array(ogSchema).nullable(),
	twitter: z.array(twitterSchema).nullable(),
	locale: localeElementSchema,
	search_target: z.boolean().optional(),
	path_to_top: z.array(z.number()),
})

type DataJson = z.infer<typeof baseDataJsonSchema> & {
	childs?: DataJson[]
}



const dataJsonSchema: z.ZodType<DataJson> = baseDataJsonSchema.extend({
	childs: z.lazy(() => dataJsonSchema.array()).optional(),
})

const dataJsonArraySchema = z.array(dataJsonSchema)

export interface PostData {
	parentId: number | undefined
	cg_name: string
}



export { dataJsonArraySchema }
