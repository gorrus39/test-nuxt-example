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
		token: 'token asdf',
		workingFilePath: `${__dirname}/data-file/${process.env.NODE_ENV}.json`,
		public: {
			availableLanguages: ['ru', 'en', 'fr'],
			defaultLanguage: 'ru',
			token: 'public token',
		},
	},
	modules: ['@nuxt/test-utils/module', '@nuxt/ui', '@pinia/nuxt', '@sidebase/nuxt-auth'],
	// auth: {
	// isEnabled: true,
	// disableServerSideAuth: false,
	// originEnvKey: 'AUTH_ORIGIN',
	// baseURL: '/api/auth',
	// baseURL: 'http://localhost:3000/api/auth',
	// provider: {
	// 	type: 'local',
	// 	endpoints: {
	// 		signIn: { path: '/login', method: 'post' },
	// 		signOut: { path: '/logout', method: 'post' },
	// 		signUp: { path: '/register', method: 'post' },
	// 		getSession: { path: '/session', method: 'get' },
	// 	},
	// 	token: {
	// 		signInResponseTokenPointer: '/token',
	// 		type: 'Bearer',
	// 		cookieName: 'auth.token',
	// 		headerName: 'Authorization',
	// 		maxAgeInSeconds: 1800,
	// 		sameSiteAttribute: 'lax',
	// 		cookieDomain: 'sidebase.io',
	// 		secureCookieAttribute: false,
	// 		httpOnlyCookieAttribute: false,
	// 	},
	// },
	// sessionRefresh: {
	//   enablePeriodically: true,
	//   enableOnWindowFocus: true,
	// }
	// },
	auth: {
		provider: {
			type: 'authjs',
			trustHost: false,
			defaultProvider: 'github',
			addDefaultCallbackUrl: true,
		},
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	css: ['~/assets/css/main.css'],
})
