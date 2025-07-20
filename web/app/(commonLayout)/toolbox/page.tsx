'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAppContext } from '@/context/app-context'
import useDocumentTitle from '@/hooks/use-document-title'
import ToolboxContainer from './container'

const ToolboxPage = () => {
  const router = useRouter()
  const { isCurrentWorkspaceDatasetOperator } = useAppContext()
  const { t } = useTranslation()
  useDocumentTitle(t('common.menus.toolbox'))

  useEffect(() => {
    if (isCurrentWorkspaceDatasetOperator)
      return router.replace('/datasets')
  }, [isCurrentWorkspaceDatasetOperator, router])

  return <ToolboxContainer />
}

export default ToolboxPage
