'use client'
import type { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ToolProviderList from '@/app/components/tools/provider-list'
import { useAppContext } from '@/context/app-context'
import useDocumentTitle from '@/hooks/use-document-title'

const ToolsList: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isCurrentWorkspaceDatasetOperator } = useAppContext()
  const { t } = useTranslation()
  useDocumentTitle(t('common.menus.tools'))

  useEffect(() => {
    if (isCurrentWorkspaceDatasetOperator)
      return router.replace('/datasets')

    // Only redirect to toolbox if there are no query parameters
    // This allows existing tool creation flows (like /tools?category=api) to continue working
    if (!searchParams.toString())
      return router.replace('/toolbox')
  }, [isCurrentWorkspaceDatasetOperator, router, searchParams])

  // If there are query parameters, show the original tools interface
  return <ToolProviderList />
}

export default React.memo(ToolsList)
