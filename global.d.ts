import arMessages from './messages/ar.json'
import { FormatsType } from './src/lib/i18n/request'

type Messages = typeof arMessages

declare module 'next-intl' {
  type DefaultLocale = 'ar'
  type SupportedLocales = DefaultLocale | 'en'

  type MessageSchema = Messages

  interface IntlConfig {
    locale: SupportedLocales
    messages: MessageSchema
    formats: FormatsType
  }
}
