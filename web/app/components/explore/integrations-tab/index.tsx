'use client'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounceFn } from 'ahooks'
import {
  RiAppsLine,
  RiBellLine,
  RiCheckLine,
  RiDatabaseLine,
  RiDownloadLine,
  RiFileTextLine,
} from '@remixicon/react'
import cn from '@/utils/classnames'
import Input from '@/app/components/base/input'
import Button from '@/app/components/base/button'

// Mock data for integrations - TODO: Replace with real data
const mockIntegrations = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send notifications and messages to Slack channels',
    category: 'notification',
    logoUrl: '/logo/slack.png',
    installed: false,
    verified: true,
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Send and manage emails through Gmail',
    category: 'productivity',
    logoUrl: '/logo/gmail.png',
    installed: true,
    verified: true,
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Read and write data to Google Sheets',
    category: 'data-storage',
    logoUrl: '/logo/google-sheets.png',
    installed: false,
    verified: true,
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Send messages and notifications to Teams channels',
    category: 'notification',
    logoUrl: '/logo/teams.png',
    installed: false,
    verified: true,
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Upload and manage files in Dropbox',
    category: 'data-storage',
    logoUrl: '/logo/dropbox.png',
    installed: false,
    verified: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Create issues, pull requests, and manage repositories',
    category: 'productivity',
    logoUrl: '/logo/github.png',
    installed: false,
    verified: true,
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Create and manage pages, databases, and knowledge bases',
    category: 'productivity',
    logoUrl: '/logo/notion.png',
    installed: false,
    verified: true,
  },
  {
    id: 'kibela',
    name: 'Kibela',
    description: 'Team knowledge sharing and collaboration platform',
    category: 'productivity',
    logoUrl: '/logo/kibela.png',
    installed: false,
    verified: true,
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Store, access, and share files in Google Drive',
    category: 'data-storage',
    logoUrl: '/logo/google-drive.png',
    installed: false,
    verified: true,
  },
  {
    id: 'outlook',
    name: 'Outlook',
    description: 'Send emails and manage calendar events through Outlook',
    category: 'productivity',
    logoUrl: '/logo/outlook.png',
    installed: false,
    verified: true,
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    description: 'Store and sync files with Microsoft OneDrive',
    category: 'data-storage',
    logoUrl: '/logo/onedrive.png',
    installed: false,
    verified: true,
  },
]

const categories = [
  { value: 'all', label: 'All', icon: RiAppsLine },
  { value: 'notification', label: 'Notification', icon: RiBellLine },
  { value: 'productivity', label: 'Productivity', icon: RiFileTextLine },
  { value: 'data-storage', label: 'Data Storage', icon: RiDatabaseLine },
]

type IntegrationCardProps = {
  integration: typeof mockIntegrations[0]
  onInstall: (id: string) => void
  onConfigure: (id: string) => void
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  onInstall,
  onConfigure,
}) => {
  const { t } = useTranslation()

  return (
    <div className='group relative col-span-1 flex flex-col overflow-hidden rounded-xl border-[0.5px] border-components-panel-border bg-components-panel-on-panel-item-bg shadow-xs transition-all duration-200 hover:shadow-lg'>
      <div className='flex h-[66px] shrink-0 grow-0 items-center gap-3 px-[14px] pb-3 pt-[14px]'>
        <div className='relative shrink-0'>
          <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-components-panel-border-subtle bg-background-default-subtle'>
            <img
              src={integration.logoUrl}
              alt={`${integration.name} logo`}
              className='h-8 w-8 object-contain'
              onError={(e) => {
                // Fallback to icon if image fails to load
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.removeAttribute('style')
              }}
            />
            <RiAppsLine className='h-6 w-6 text-text-accent' style={{ display: 'none' }} />
          </div>
          {integration.verified && (
            <div className='absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background-default bg-state-success-solid'>
              <RiCheckLine className='h-2.5 w-2.5 text-white' />
            </div>
          )}
        </div>
        <div className='w-0 grow py-[1px]'>
          <div className='flex items-center gap-2 text-sm font-semibold leading-5 text-text-secondary'>
            <div className='truncate' title={integration.name}>{integration.name}</div>
            {integration.installed && (
              <span className='bg-state-success-bg text-state-success-text border-state-success-border inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium'>
                <RiCheckLine className='mr-1 h-3 w-3' />
                {t('explore.integrations.installed')}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className='h-[90px] px-[14px] text-text-tertiary'>
        <div className='system-xs-regular line-clamp-4 group-hover:line-clamp-2'>
          {integration.description}
        </div>
      </div>

      <div className={cn('absolute bottom-0 left-0 right-0 hidden bg-gradient-to-t from-components-panel-gradient-2 from-[60.27%] to-transparent p-4 pt-8 group-hover:flex')}>
        <div className={cn('flex h-8 w-full items-center space-x-2')}>
          {integration.installed ? (
            <Button
              variant='secondary'
              className='h-7 grow'
              onClick={() => onConfigure(integration.id)}
            >
              <span className='text-xs'>{t('explore.integrations.configure')}</span>
            </Button>
          ) : (
            <Button
              variant='primary'
              className='h-7 grow'
              onClick={() => onInstall(integration.id)}
            >
              <RiDownloadLine className='mr-1 h-4 w-4' />
              <span className='text-xs'>{t('explore.integrations.install')}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const IntegrationsTab = () => {
  const { t } = useTranslation()
  const [searchKeywords, setSearchKeywords] = useState('')
  const [keywords, setKeywords] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const { run: handleSearch } = useDebounceFn(() => {
    setSearchKeywords(keywords)
  }, { wait: 500 })

  const handleKeywordsChange = (value: string) => {
    setKeywords(value)
    handleSearch()
  }

  const filteredIntegrations = useMemo(() => {
    let filtered = mockIntegrations

    // Filter by category
    if (selectedCategory !== 'all')
      filtered = filtered.filter(integration => integration.category === selectedCategory)

    // Filter by search keywords
    if (searchKeywords) {
      const lowerKeywords = searchKeywords.toLowerCase()
      filtered = filtered.filter(integration =>
        integration.name.toLowerCase().includes(lowerKeywords)
        || integration.description.toLowerCase().includes(lowerKeywords),
      )
    }

    return filtered
  }, [selectedCategory, searchKeywords])

  const handleInstall = (id: string) => {
    // TODO: Implement actual installation logic
    console.log('Installing integration:', id)
  }

  const handleConfigure = (id: string) => {
    // TODO: Implement actual configuration logic
    console.log('Configuring integration:', id)
  }

  return (
    <div className='flex h-full flex-col overflow-hidden'>
      {/* Search and Filter Bar */}
      <div className='shrink-0 px-12 pt-6'>
        <div className='flex items-center justify-between gap-4'>
          {/* Category Filter */}
          <div className='flex items-center gap-2'>
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.value

              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border-[0.5px] px-3 py-2 text-sm font-medium transition-all',
                    isSelected
                      ? 'border-components-main-nav-nav-button-border bg-components-main-nav-nav-button-bg-active text-components-main-nav-nav-button-text-active shadow-xs'
                      : 'border-transparent text-text-tertiary hover:bg-components-main-nav-nav-button-bg-active hover:text-text-secondary',
                  )}
                >
                  <Icon className='h-4 w-4' />
                  {category.label}
                </button>
              )
            })}
          </div>

          {/* Search Input */}
          <Input
            showLeftIcon
            showClearIcon
            wrapperClassName='w-[300px]'
            placeholder={t('explore.integrations.searchPlaceholder')}
            value={keywords}
            onChange={e => handleKeywordsChange(e.target.value)}
            onClear={() => handleKeywordsChange('')}
          />
        </div>
      </div>

      {/* Integration Grid */}
      <div className='flex-1 overflow-auto p-6 sm:px-12'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredIntegrations.map(integration => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onInstall={handleInstall}
              onConfigure={handleConfigure}
            />
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <div className='flex h-64 flex-col items-center justify-center text-center'>
            <RiAppsLine className='mb-4 h-12 w-12 text-text-quaternary' />
            <h3 className='mb-2 text-lg font-medium text-text-tertiary'>
              {t('explore.integrations.noResults')}
            </h3>
            <p className='text-sm text-text-quaternary'>
              {t('explore.integrations.noResultsDesc')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default IntegrationsTab
