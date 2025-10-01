import enMessages from '../messages/en/index.json'
import { FormatsType } from './src/lib/i18n/request'

type Messages = typeof en

declare module 'next-intl' {
  type DefaultLocale = 'en'
  type SupportedLocales = DefaultLocale | 'ar'

  type MessageSchema = typeof enMessages

  interface IntlConfig {
    locale: SupportedLocales
    messages: MessageSchema
    formats: FormatsType
  }
}
