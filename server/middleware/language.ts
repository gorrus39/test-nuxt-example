export default defineEventHandler((event) => {
	const availableLanguages = useRuntimeConfig(event).public.availableLanguages
	const cookieLanguage = getCookie(event, 'language')
	if (cookieLanguage) return

	let language = 'en'
	const headerLanguage = event.node.req.headers['accept-language']?.split(',')[0].split('-')[0]
	if (headerLanguage && availableLanguages.includes(headerLanguage)) language = headerLanguage
	setCookie(event, 'language', language)
})
