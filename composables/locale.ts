import type { LocaleElements, Locale } from '~/types-src'

export const useLocale = (elements: LocaleElements): Locale | {} => {
	const language = useLanguage().current
	let locale = {}
	// возвращаем в соответствии с выбранным языком
	if ('id' in elements[language.value]) locale = elements[language.value]
	else {
		// возвращаем первую в списке
		for (const [_lg, elLocale] of Object.entries(elements)) {
			if ('id' in elLocale) {
				locale = elLocale
				break
			}
		}
	}
	return locale
}
