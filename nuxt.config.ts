import fs from 'fs'
import { getMaxNodeId } from './utils/utils'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: {
		enabled: false,
	},
	hooks: {
		'nitro:init'(any) {
			//  создание рабочего файла, если не создан ранее или был сброшен
			const workingFilePath = `${__dirname}/data-file/${process.env.NODE_ENV}.json`
			if (!fs.existsSync(workingFilePath)) {
				const srcFilePath = `${__dirname}/public/data-src.json`
				const originContent = fs.readFileSync(srcFilePath, 'utf-8')
				fs.writeFileSync(workingFilePath, originContent, 'utf-8')
			}
			// определение максимального id, чтобы при добавлении нового элемента записывать увеличенный id
			const nodes = JSON.parse(fs.readFileSync(workingFilePath, 'utf-8'))
			const maxNodeIdInit = getMaxNodeId(nodes)
			process.env.maxNodeIdInit = String(maxNodeIdInit)
		},
	},
	sourcemap: {
		server: true,
		client: true,
	},
	runtimeConfig: {
		workingFilePath: `${__dirname}/data-file/${process.env.NODE_ENV}.json`,
		public: {
			availableLanguages: ['ru', 'en', 'fr'],
			defaultLanguage: 'ru',
		},
	},
	modules: ['@nuxt/test-utils/module', '@nuxt/ui', '@pinia/nuxt'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	css: ['~/assets/css/main.css'],
})
