import { defineRouting } from 'next-intl/routing'

export const fallbackLng = 'ar'
export const languages = [fallbackLng, 'en']
export const localePrefix = 'never'
export const LOCALE_COOKIE = 'NEXT_LOCALE'

export const routing = defineRouting({
  locales: languages,
  defaultLocale: fallbackLng,
  localeDetection: true,
  localePrefix,
  localeCookie: {
    name: LOCALE_COOKIE,
    maxAge: 60 * 60 * 24 * 365,
  },
})
