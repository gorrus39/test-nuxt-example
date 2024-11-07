import type { Lg } from '~/types-src'

export const useLanguage = () => {
	const config = useRuntimeConfig()

	const current = useCookie('language')
	current.value = current.value ?? (config.public.defaultLanguage as Lg)
	const currentString: Ref<Lg> = current as unknown as Ref<Lg>

	const available = ref(config.public.availableLanguages as Lg[])

	return { current: currentString, available }
}
