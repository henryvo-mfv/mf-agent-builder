'use client'
import { useTranslation } from 'react-i18next'
import DataSourcesContainer from './Container'
import useDocumentTitle from '@/hooks/use-document-title'

const DataSourcesPage = () => {
  const { t } = useTranslation()
  useDocumentTitle(t('common.menus.datasets'))
  return <DataSourcesContainer />
}

export default DataSourcesPage
