import { createNavigation } from 'next-intl/navigation'
import { routing } from './settings'

const {
  Link,
  redirect: intlRedirect,
  usePathname,
  useRouter,
} = createNavigation(routing)

const redirect = (path: string): never => {
  return intlRedirect({
    href: path,
    locale: '',
  })
}

export { redirect, Link, usePathname, useRouter }
