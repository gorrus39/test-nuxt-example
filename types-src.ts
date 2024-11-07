export type Lg = 'en' | 'ru' | 'fr'

export type LocaleElements = {
	[key in Lg]: Locale | {}
}

export type Locale = {
	id: number
	cg_name: string
	cg_description: string
	cg_title: string
	cg_slug: string
	meta_description: string
	meta_keywords: string
	link: string
}

type LocaleSocial = {
	[key in Lg]: {
		extra_meta_content?: string
	}
}

interface Og {
	id: number
	cat_id: number
	og_property_name: string
	locale: {
		en: {}
		ru: {
			og_content_value: string
		}
		fr: {}
	}
}

interface Twitter {
	id: number
	cat_id: number
	extra_meta_name: string
	locale: LocaleSocial
}

export interface DataJson {
	id: number
	depth: number
	numchild: number
	category_image: string | null
	logo_image: string | null
	menu_image: string | null
	separate_menu: boolean
	c_images: number
	product_rep_1_id: number | null
	product_rep_2_id: number | null
	c_views: number
	og: null | Og[]
	twitter: null | Twitter[]
	locale: LocaleElements
	search_target?: boolean
	path_to_top: number[]
	childs?: DataJson[]
}
