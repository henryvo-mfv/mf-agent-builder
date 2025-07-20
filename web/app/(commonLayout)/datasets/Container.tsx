'use client'

// Libraries
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'
import {
  RiAlertLine,
  RiArrowRightLine,
  RiCheckLine,
  RiCloseLine,
  RiDatabase2Line,
  RiDeleteBinLine,
  RiFileUploadLine,
  RiGlobalLine,
  RiMoreLine,
  RiRefreshLine,
  RiShieldCheckLine,
} from '@remixicon/react'

// Components
import ExternalAPIPanel from '../../components/datasets/external-api/external-api-panel'

import ApiServer from '../../components/develop/ApiServer'
import Doc from './Doc'
import TabSliderNew from '@/app/components/base/tab-slider-new'

import Button from '@/app/components/base/button'
import Modal from '@/app/components/base/modal'
import { ApiConnectionMod } from '@/app/components/base/icons/src/vender/solid/development'

// Services
import { fetchDatasetApiBaseUrl } from '@/service/datasets'

// Hooks
import { useTabSearchParams } from '@/hooks/use-tab-searchparams'
import { useAppContext } from '@/context/app-context'
import { useExternalApiPanel } from '@/context/external-api-panel-context'
import { useGlobalPublicStore } from '@/context/global-public-context'
import useDocumentTitle from '@/hooks/use-document-title'

// Mock data for connected sources - replace with real API calls
const mockConnectedSources = [
  {
    id: '1',
    name: 'MF Cloud Accounting',
    status: 'connected',
    lastSync: '2024-01-15 14:30',
    agentsUsing: 2,
    logo: '/logo/mf-cloud-accounting.png',
  },
  {
    id: '2',
    name: 'MF Cloud Expense',
    status: 'connected',
    lastSync: '2024-01-15 12:45',
    agentsUsing: 5,
    logo: '/logo/mf-cloud-expense.png',
  },
]

const moneyForwardServices = [
  {
    id: 'accounting',
    name: 'MF Cloud Accounting',
    description: 'Access accounting data for financial analysis and reporting',
    logo: '/logo/mf-cloud-accounting.png',
    connected: true,
  },
  {
    id: 'expense',
    name: 'MF Cloud Expense',
    description: 'Connect expense reports and approval workflows',
    logo: '/logo/mf-cloud-expense.png',
    connected: true,
  },
  {
    id: 'payroll',
    name: 'MF Cloud Payroll',
    description: 'Integrate payroll data for HR operations',
    logo: '/logo/mf-cloud-payroll.png',
    connected: false,
  },
  {
    id: 'attendance',
    name: 'MF Cloud Attendance',
    description: 'Sync attendance records and workforce analytics',
    logo: '/logo/mf-cloud-attendance.png',
    connected: false,
  },
  {
    id: 'contract',
    name: 'MF Cloud Contract',
    description: 'Access contract documents and compliance data',
    logo: '/logo/mf-cloud-contract.png',
    connected: false,
  },
  {
    id: 'hr',
    name: 'MF Cloud HR',
    description: 'Comprehensive HR management and employee data',
    logo: '/logo/mf-cloud-hr.png',
    connected: false,
  },
]

const DataSourcesContainer = () => {
  const { t } = useTranslation()
  const { systemFeatures } = useGlobalPublicStore()
  const router = useRouter()
  const { currentWorkspace } = useAppContext()
  const { showExternalApiPanel, setShowExternalApiPanel } = useExternalApiPanel()
  useDocumentTitle(t('dataset.knowledge'))

  const options = useMemo(() => {
    return [
      { value: 'datasources', text: t('dataset.datasets') },
      ...(currentWorkspace.role === 'dataset_operator' ? [] : [{ value: 'api', text: t('dataset.datasetsApi') }]),
    ]
  }, [currentWorkspace.role, t])

  const [activeTab, setActiveTab] = useTabSearchParams({
    defaultTab: 'datasources',
  })

  const { data } = useQuery(
    {
      queryKey: ['datasetApiBaseInfo'],
      queryFn: () => fetchDatasetApiBaseUrl('/datasets/api-base-info'),
      enabled: activeTab !== 'datasources',
    },
  )

  // Disconnect modal state
  const [showDisconnectModal, setShowDisconnectModal] = useState(false)
  const [selectedSource, setSelectedSource] = useState<typeof mockConnectedSources[0] | null>(null)

  const handleConnectService = async (serviceId: string) => {
    // TODO: Implement OAuth flow for MoneyForward services
    console.log(`Connecting to ${serviceId}`)
    // Simulate OAuth redirect
    // window.location.href = `/oauth/moneyforward/${serviceId}`
  }

  const handleDisconnectClick = (source: typeof mockConnectedSources[0]) => {
    setSelectedSource(source)
    setShowDisconnectModal(true)
  }

  const handleDisconnectConfirm = async () => {
    if (selectedSource) {
      // TODO: Implement actual disconnect logic
      console.log(`Disconnecting source ${selectedSource.id}`)
      setShowDisconnectModal(false)
      setSelectedSource(null)
    }
  }

  const handleRefreshSync = async (sourceId: string) => {
    // TODO: Implement refresh sync logic
    console.log(`Refreshing sync for source ${sourceId}`)
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'connected':
        return <div className="h-2 w-2 rounded-full bg-state-success-solid" />
      case 'syncing':
        return <div className="h-2 w-2 animate-pulse rounded-full bg-text-accent" />
      case 'error':
        return <div className="h-2 w-2 rounded-full bg-state-destructive-solid" />
      default:
        return <div className="h-2 w-2 rounded-full bg-text-quaternary" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected'
      case 'syncing':
        return 'Syncing'
      case 'error':
        return 'Connection Error'
      default:
        return 'Not Connected'
    }
  }

  useEffect(() => {
    if (currentWorkspace.role === 'normal')
      return router.replace('/apps')
  }, [currentWorkspace, router])

  return (
    <div className='scroll-container relative flex grow flex-col overflow-y-auto bg-background-body'>
      <div className='sticky top-0 z-10 flex h-[80px] shrink-0 flex-wrap items-center justify-between gap-y-2 bg-background-body px-12 pb-2 pt-4 leading-[56px]'>
        <TabSliderNew
          value={activeTab}
          onChange={newActiveTab => setActiveTab(newActiveTab)}
          options={options}
        />
        {activeTab === 'datasources' && (
          <div className='flex items-center justify-center gap-2'>
            <Button
              className='shadows-shadow-xs gap-0.5'
              onClick={() => setShowExternalApiPanel(true)}
            >
              <ApiConnectionMod className='h-4 w-4 text-components-button-secondary-text' />
              <div className='system-sm-medium flex items-center justify-center gap-1 px-0.5 text-components-button-secondary-text'>{t('dataset.externalAPIPanelTitle')}</div>
            </Button>
          </div>
        )}
        {activeTab === 'api' && data && <ApiServer apiBaseUrl={data.api_base_url || ''} />}
      </div>

      {activeTab === 'datasources' && (
        <div className='px-12 pb-8'>
          {/* MoneyForward Services Integration - Primary Section */}
          <div className='mb-12'>
            <div className='mb-6'>
              <h2 className='mb-2 text-2xl font-bold text-text-primary'>
                {t('dataset.moneyForwardIntegration.title')}
              </h2>
              <p className='max-w-3xl leading-relaxed text-text-tertiary'>
                {t('dataset.moneyForwardIntegration.description')}
              </p>
            </div>

            {/* Services Grid */}
            <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {moneyForwardServices.map(service => (
                <div
                  key={service.id}
                  className='group relative flex h-full flex-col overflow-hidden rounded-xl border border-components-panel-border bg-components-panel-on-panel-item-bg shadow-xs transition-all duration-200 hover:border-components-panel-border-subtle hover:shadow-lg'
                >
                  <div className='flex flex-1 flex-col p-6'>
                    <div className='mb-4 flex items-start gap-4'>
                      <div className='shrink-0'>
                        <img
                          src={service.logo}
                          alt={service.name}
                          className='h-12 w-12 rounded-lg object-contain'
                          onError={(e) => {
                            // Fallback to icon if logo fails to load
                            e.currentTarget.style.display = 'none'
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement
                            if (fallback) fallback.style.display = 'flex'
                          }}
                        />
                        <div className='hidden h-12 w-12 items-center justify-center rounded-lg bg-background-default-subtle'>
                          <RiDatabase2Line className='h-6 w-6 text-text-quaternary' />
                        </div>
                      </div>
                      <div className='min-w-0 flex-1'>
                        <h3 className='mb-1 text-lg font-semibold text-text-primary'>
                          {service.name}
                        </h3>
                        <div className='mb-2 flex items-center gap-2'>
                          {service.connected ? (
                            <span className='bg-state-success-bg text-state-success-text border-state-success-border inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium'>
                              <RiCheckLine className='h-3 w-3' />
                              {t('dataset.moneyForwardIntegration.connectedStatus')}
                            </span>
                          ) : (
                            <span className='inline-flex items-center gap-1 rounded-full border border-components-panel-border bg-background-default-subtle px-2 py-1 text-xs font-medium text-text-quaternary'>
                              <RiCloseLine className='h-3 w-3' />
                              {t('dataset.moneyForwardIntegration.disconnectedStatus')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description - flexible content area */}
                    <div className='mb-6 flex-1'>
                      <p className='text-sm leading-relaxed text-text-tertiary'>
                        {service.description}
                      </p>
                    </div>

                    {/* Button - always at bottom */}
                    <Button
                      variant={service.connected ? 'secondary' : 'primary'}
                      className='mt-auto w-full'
                      onClick={() => handleConnectService(service.id)}
                      disabled={service.connected}
                    >
                      {service.connected ? (
                        <>
                          <RiShieldCheckLine className='mr-2 h-4 w-4' />
                          Connected
                        </>
                      ) : (
                        <>
                          <RiArrowRightLine className='mr-2 h-4 w-4' />
                          {t('dataset.moneyForwardIntegration.connectButton')}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Sources Management Hub */}
          <div className='mb-12'>
            <div className='mb-6'>
              <h3 className='mb-2 text-xl font-semibold text-text-primary'>
                {t('dataset.connectedSources.title')}
              </h3>
            </div>

            {/* Card-based Connected Sources List */}
            <div className='space-y-4'>
              {mockConnectedSources.map(source => (
                <div
                  key={source.id}
                  className='group relative rounded-xl border border-components-panel-border bg-components-panel-on-panel-item-bg p-6 shadow-xs transition-all duration-200 hover:bg-background-default-hover hover:shadow-md'
                >
                  {/* Header Row - Logo and Name */}
                  <div className='mb-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <img
                        src={source.logo}
                        alt={source.name}
                        className='h-10 w-10 rounded-lg object-contain'
                        onError={(e) => {
                          // Fallback to icon if logo fails to load
                          e.currentTarget.style.display = 'none'
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement
                          if (fallback) fallback.style.display = 'flex'
                        }}
                      />
                      <div className='hidden h-10 w-10 items-center justify-center rounded-lg bg-background-default-subtle'>
                        <RiDatabase2Line className='h-5 w-5 text-text-quaternary' />
                      </div>
                      <h4 className='text-lg font-semibold text-text-primary'>{source.name}</h4>
                    </div>

                    {/* Actions Menu */}
                    <div className='group/menu relative'>
                      <button className='rounded-lg p-2 opacity-0 transition-colors hover:bg-background-default-hover group-hover:opacity-100'>
                        <RiMoreLine className='h-5 w-5 text-text-quaternary' />
                      </button>
                      <div className='invisible absolute right-0 top-12 z-10 w-48 rounded-lg border border-components-panel-border bg-components-panel-bg-blur py-2 opacity-0 shadow-lg transition-all duration-200 group-hover/menu:visible group-hover/menu:opacity-100'>
                        <button
                          onClick={() => handleRefreshSync(source.id)}
                          className='flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-text-secondary transition-colors hover:bg-background-default-hover hover:text-text-primary'
                        >
                          <RiRefreshLine className='h-4 w-4' />
                          Refresh Sync
                        </button>
                        <button
                          onClick={() => handleDisconnectClick(source)}
                          className='text-state-destructive-text hover:bg-state-destructive-bg hover:text-state-destructive-text-hover flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors'
                        >
                          <RiDeleteBinLine className='h-4 w-4' />
                          Disconnect
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content Body - Three Column Layout */}
                  <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
                    {/* Status Column */}
                    <div className='flex flex-col gap-1'>
                      <span className='text-xs font-medium uppercase tracking-wide text-text-quaternary'>
                        Status
                      </span>
                      <div className='flex items-center gap-2'>
                        {getStatusDot(source.status)}
                        <span className='font-medium text-text-primary'>{getStatusText(source.status)}</span>
                      </div>
                    </div>

                    {/* Last Sync Column */}
                    <div className='flex flex-col gap-1'>
                      <span className='text-xs font-medium uppercase tracking-wide text-text-quaternary'>
                        Last Sync
                      </span>
                      <span className='font-medium text-text-primary'>{source.lastSync}</span>
                    </div>

                    {/* Agents Using Column */}
                    <div className='flex flex-col gap-1'>
                      <span className='text-xs font-medium uppercase tracking-wide text-text-quaternary'>
                        Agents Using
                      </span>
                      <span className='font-medium text-text-primary'>{source.agentsUsing} Agents</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {mockConnectedSources.length === 0 && (
              <div className='rounded-xl border border-components-panel-border bg-components-panel-on-panel-item-bg p-12 text-center'>
                <RiDatabase2Line className='mx-auto mb-4 h-12 w-12 text-text-quaternary' />
                <h4 className='mb-2 text-lg font-semibold text-text-tertiary'>
                  No Connected Sources
                </h4>
                <p className='text-text-quaternary'>
                  Connect your MoneyForward services above to get started.
                </p>
              </div>
            )}
          </div>

          {/* Add Custom Data - Simplified Section */}
          <div className='mb-8'>
            <div className='mb-6'>
              <h3 className='mb-2 text-xl font-semibold text-text-primary'>
                Add Custom Data
              </h3>
              <p className='text-text-tertiary'>
                Upload files or connect other data sources for your agents
              </p>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='group cursor-pointer rounded-xl border border-components-panel-border bg-components-panel-on-panel-item-bg p-6 transition-all hover:shadow-md'>
                <div className='flex items-start gap-4'>
                  <div className='group-hover:bg-text-accent/10 shrink-0 rounded-lg bg-background-default-subtle p-3 transition-colors'>
                    <RiFileUploadLine className='h-6 w-6 text-text-accent' />
                  </div>
                  <div className='flex-1'>
                    <h4 className='mb-2 text-lg font-semibold text-text-primary'>
                      Upload File(s)
                    </h4>
                    <p className='mb-4 text-text-tertiary'>
                      Upload local documents like PDF, DOCX, or CSV to use as context.
                    </p>
                    <Button variant='secondary' size='small'>
                      <RiFileUploadLine className='mr-2 h-4 w-4' />
                      Upload from Computer
                    </Button>
                  </div>
                </div>
              </div>

              <div className='group cursor-pointer rounded-xl border border-components-panel-border bg-components-panel-on-panel-item-bg p-6 transition-all hover:shadow-md'>
                <div className='flex items-start gap-4'>
                  <div className='group-hover:bg-text-accent/10 shrink-0 rounded-lg bg-background-default-subtle p-3 transition-colors'>
                    <RiGlobalLine className='h-6 w-6 text-text-accent' />
                  </div>
                  <div className='flex-1'>
                    <h4 className='mb-2 text-lg font-semibold text-text-primary'>
                      Import from Web
                    </h4>
                    <p className='mb-4 text-text-tertiary'>
                      Connect a website URL to scrape its content as a data source.
                    </p>
                    <Button variant='secondary' size='small'>
                      <RiGlobalLine className='mr-2 h-4 w-4' />
                      Import URL
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'api' && data && <Doc apiBaseUrl={data.api_base_url || ''} />}

      {showExternalApiPanel && <ExternalAPIPanel onClose={() => setShowExternalApiPanel(false)} />}

      {/* Disconnect Confirmation Modal */}
      {showDisconnectModal && selectedSource && (
        <Modal
          isShow={showDisconnectModal}
          onClose={() => setShowDisconnectModal(false)}
          title={`Disconnect ${selectedSource.name}?`}
          className='w-[480px]'
        >
          <div className='mb-6'>
            <div className='bg-components-badge-orange-bg border-components-badge-orange-border mb-4 flex items-center gap-3 rounded-lg border p-3'>
              <RiAlertLine className='text-components-badge-orange-text h-5 w-5 shrink-0' />
              <div>
                <p className='text-components-badge-orange-text text-sm font-medium'>
                  Are you sure? <strong>{selectedSource.agentsUsing} agents</strong> are currently using this data source and may stop working correctly.
                </p>
              </div>
            </div>
            <p className='text-sm text-text-tertiary'>
              Disconnecting this data source will remove access to {selectedSource.name} for all agents that depend on it.
            </p>
          </div>
          <div className='flex justify-end gap-3'>
            <Button
              variant='secondary'
              onClick={() => setShowDisconnectModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant='primary'
              className='hover:bg-state-destructive-solid-hover text-state-destructive-text-on-solid bg-state-destructive-solid'
              onClick={handleDisconnectConfirm}
            >
              Disconnect
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default DataSourcesContainer
