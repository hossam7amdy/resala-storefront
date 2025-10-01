'use client'

import { useTranslations } from 'next-intl'

import { useActionState } from 'react'
import Input from '@modules/common/components/input'
import { LOGIN_VIEW } from '@modules/account/templates/login-template'
import ErrorMessage from '@modules/checkout/components/error-message'
import { SubmitButton } from '@modules/checkout/components/submit-button'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { signup } from '@lib/data/customer'
import GoogleLoginButton from '../google-login-button'

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  const t = useTranslations()

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6">
        {t('BECOME_A_RESALA_STORE_MEMBER')}
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        {t('CREATE_YOUR_RESALA_STORE_MEMBE')}
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={t('FIRST_NAME')}
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label={t('LAST_NAME')}
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label={t('EMAIL')}
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label={t('PHONE')}
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label={t('PASS')}
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          {t('BY_CREATING_AN_ACCOUNT_YOU_AG')}{' '}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            {t('PRIVACY_POLICY')}
          </LocalizedClientLink>{' '}
          {t('AND')}{' '}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            {t('TERMS_OF_USE')}
          </LocalizedClientLink>
          {t('_')}
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          {t('JOIN')}
        </SubmitButton>
      </form>

      <div className="w-full mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              {t('Or continue with')}
            </span>
          </div>
        </div>
        <div className="mt-6">
          <GoogleLoginButton />
        </div>
      </div>

      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        {t('ALREADY_A_MEMBER')}{' '}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          {t('SIGN_IN')}
        </button>
        {t('_')}
      </span>
    </div>
  )
}

export default Register
