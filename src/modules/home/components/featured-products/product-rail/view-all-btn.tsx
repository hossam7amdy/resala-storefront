'use client'

import React from 'react'

import { useTranslations } from 'next-intl'
import InteractiveLink from '@modules/common/components/interactive-link'

const ViewAllButton: React.FC<{ handle: string }> = ({ handle }) => {
  const t = useTranslations()

  return (
    <InteractiveLink href={`/collections/${handle}`}>
      {t('VIEW_ALL')}
    </InteractiveLink>
  )
}

export default ViewAllButton
