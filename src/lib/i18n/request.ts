import { getRequestConfig } from 'next-intl/server'
import { LOCALE_COOKIE, routing } from './settings'
import type { Formats } from 'next-intl'
import { cookies } from 'next/headers'

export const formats: Formats = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
  },
  list: {
    enumeration: {
      style: 'long',
      type: 'conjunction',
    },
  },
} satisfies Formats

export type FormatsType = typeof formats

const getI18NRequestConfig = getRequestConfig(async () => {
  const store = await cookies()
  const locale = store.get(LOCALE_COOKIE)?.value || routing.defaultLocale
  const messages = (await import(`../../../messages/${locale}.json`)).default

  return {
    locale,
    messages,
    formats,
  }
})

export default getI18NRequestConfig
