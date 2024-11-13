import type { Locales, Locale } from '~/types'

export const useLocale = (elements: Locales): Locale => {
	const language = useLanguage().current
	// возвращаем в соответствии с выбранным языком
	if ('id' in elements[language.value]) return elements[language.value]
	else {
		// возвращаем первую в списке
		for (const [_lg, localeEl] of Object.entries(elements)) {
			if ('id' in localeEl) return localeEl
		}
	}
	throw new Error('all locales empty')
}
