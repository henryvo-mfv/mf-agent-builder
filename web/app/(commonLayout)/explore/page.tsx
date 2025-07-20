'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  RiApps2Line,
  RiPlugLine,
  RiToolsLine,
} from '@remixicon/react'
import cn from '@/utils/classnames'
import TemplatesTab from '@/app/components/explore/templates-tab'
import IntegrationsTab from '@/app/components/explore/integrations-tab'
import BuildingBlocksTab from '@/app/components/explore/building-blocks-tab'

enum TabType {
  TEMPLATES = 'templates',
  INTEGRATIONS = 'integrations',
  BUILDING_BLOCKS = 'building-blocks',
}

const ExplorePage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Default to Templates tab, or get from URL params
  const initialTab = searchParams.get('tab') as TabType || TabType.TEMPLATES
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)

  const tabs = [
    {
      key: TabType.TEMPLATES,
      label: t('explore.tabs.templates'),
      icon: RiApps2Line,
      content: <TemplatesTab />,
    },
    {
      key: TabType.INTEGRATIONS,
      label: t('explore.tabs.integrations'),
      icon: RiPlugLine,
      content: <IntegrationsTab />,
    },
    {
      key: TabType.BUILDING_BLOCKS,
      label: t('explore.tabs.buildingBlocks'),
      icon: RiToolsLine,
      content: <BuildingBlocksTab />,
    },
  ]

  const handleTabChange = (tabKey: TabType) => {
    setActiveTab(tabKey)
    // Update URL without page reload
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('tab', tabKey)
    router.replace(`/explore?${newSearchParams.toString()}`, { scroll: false })
  }

  return (
    <div className='flex h-full flex-col'>
      {/* Header Section */}
      <div className='shrink-0 px-12 pt-6'>
        <h1 className='mb-3 text-3xl font-bold tracking-tight text-text-primary'>
          {t('explore.title')}
        </h1>
        <p className='text-lg leading-relaxed text-text-secondary'>
          {t('explore.subheader')}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className='mt-8 px-12'>
        <div className='border-b border-components-panel-border-subtle'>
          <nav className='flex space-x-8' aria-label='Tabs'>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key
              const Icon = tab.icon

              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={cn(
                    'flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-semibold transition-colors',
                    isActive
                      ? 'border-text-accent text-text-accent'
                      : 'border-transparent text-text-tertiary hover:border-components-panel-border-subtle hover:text-text-secondary',
                  )}
                >
                  <Icon className='h-5 w-5' />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className='flex-1 overflow-hidden'>
        {tabs.find(tab => tab.key === activeTab)?.content}
      </div>
    </div>
  )
}

export default ExplorePage
