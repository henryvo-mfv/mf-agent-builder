'use client'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import {
  RiAddLine,
  RiApps2Line,
  RiArrowRightLine,
  RiBarChart2Line,
  RiDatabase2Line,
  RiGlobalLine,
  RiGroupLine,
  RiLightbulbLine,
  RiMoreLine,
  RiRocketLine,
  RiSparklingLine,
} from '@remixicon/react'
import Button from '@/app/components/base/button'
import AppIcon from '@/app/components/base/app-icon'
import type { AppIconType } from '@/types/app'
import { useAppContext } from '@/context/app-context'
import { useGlobalPublicStore } from '@/context/global-public-context'
import Footer from '@/app/components/apps/footer'
import { fetchDashboardData } from '@/service/dashboard'
import { formatTime } from '@/utils/time'
import useDocumentTitle from '@/hooks/use-document-title'
import { useEducationInit } from '@/app/education-apply/hooks'
import cn from '@/utils/classnames'
import type { DashboardData } from '@/service/dashboard'

const Dashboard = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { userProfile } = useAppContext()
  const { systemFeatures } = useGlobalPublicStore()

  useDocumentTitle(`${t('common.menus.dashboard')}`)
  useEducationInit()

  // Fetch dashboard data
  const { data: dashboardData, error, isLoading } = useSWR<DashboardData>(
    'dashboard-data',
    fetchDashboardData,
    { refreshInterval: 30000 }, // Refresh every 30 seconds
  )

  const handleCreateNewAgent = () => {
    router.push('/apps')
  }

  const handleBrowseTemplates = () => {
    router.push('/explore/apps')
  }

  const handleAgentClick = (agentId: string, mode: string) => {
    const isWorkflow = mode === 'workflow' || mode === 'advanced-chat'
    const path = isWorkflow ? `/app/${agentId}/workflow` : `/app/${agentId}/configuration`
    router.push(path)
  }

  const getStatusColor = (status: 'active' | 'draft') => {
    return status === 'active' ? 'bg-state-success-solid' : 'bg-components-badge-gray-bg'
  }

  // Calculate total agents for unified display
  const totalAgents = (dashboardData?.stats.activeAgents || 0) + (dashboardData?.stats.drafts || 0)

  // Time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: 'goodMorning', emoji: '🌅' }
    if (hour < 17) return { text: 'goodAfternoon', emoji: '☀️' }
    return { text: 'goodEvening', emoji: '🌙' }
  }

  const timeGreeting = getTimeBasedGreeting()

  if (error)
    console.error('Dashboard data error:', error)

  return (
    <div className='relative flex h-0 shrink-0 grow flex-col overflow-y-auto bg-background-body'>
      <div className='px-6 py-8'>
        {/* BOLD HERO WELCOME SECTION */}
        <div className='mb-12 py-8 text-center'>
          <div className='mb-6 flex items-center justify-center gap-4'>
            <span className='animate-pulse text-6xl'>{timeGreeting.emoji}</span>
            <div className='text-left'>
              <h1 className='mb-2 text-6xl font-black leading-tight text-text-primary'>
                {t(`dashboard.${timeGreeting.text}`)}
              </h1>
              <div className='text-5xl font-bold leading-tight text-text-accent'>
                {userProfile?.name || 'User'}!
              </div>
            </div>
          </div>
          <div className='mx-auto max-w-2xl'>
            <p className='text-2xl font-medium leading-relaxed text-text-secondary'>
              {t('dashboard.subheader')}
            </p>
          </div>
          <div className='to-text-accent/50 mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-text-accent'></div>
        </div>

        {/* 12-Column Grid Container */}
        <div className='grid grid-cols-12 gap-6'>

          {/* Quick Actions Banner - Full Width */}
          <div className='col-span-12'>
            <div className='rounded-xl border border-components-panel-border-subtle bg-background-default-subtle p-6 shadow-sm'>
              <div className='mb-6 flex items-center gap-3'>
                <RiRocketLine className='h-6 w-6 text-text-accent' />
                <h2 className='system-2xl-semibold tracking-tight text-text-primary'>{t('dashboard.quickActions')}</h2>
              </div>
              <div className='flex gap-3'>
                <Button
                  variant='primary'
                  size='large'
                  onClick={handleCreateNewAgent}
                  className='flex items-center gap-2'
                >
                  <RiAddLine className='h-4 w-4' />
                  {t('dashboard.createNewAgent')}
                </Button>
                <Button
                  variant='secondary'
                  size='large'
                  onClick={handleBrowseTemplates}
                  className='flex items-center gap-2'
                >
                  <RiApps2Line className='h-4 w-4' />
                  {t('dashboard.browseTemplates')}
                </Button>
              </div>
            </div>
          </div>

          {/* Stats at a Glance - Four Cards */}
          <div className='col-span-12'>
            <div className='rounded-xl border border-components-panel-border-subtle bg-background-default-subtle p-6 shadow-sm'>
              <div className='mb-8 flex items-center gap-3'>
                <RiBarChart2Line className='h-6 w-6 text-text-accent' />
                <h2 className='system-2xl-semibold tracking-tight text-text-primary'>{t('dashboard.statsAtGlance')}</h2>
              </div>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>

                {/* Card 1: Agents Overview - Unified Display */}
                <div className='group cursor-pointer rounded-xl border border-components-panel-border-subtle bg-background-default p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
                  <div className='mb-4 flex items-center justify-between'>
                    <div>
                      <p className='system-lg-semibold mb-1 text-text-primary'>{t('dashboard.agentsOverview')}</p>
                      <p className='system-xs-regular text-text-tertiary'>{t('dashboard.totalAgentsSubtext')}</p>
                    </div>
                    <div className='bg-components-badge-blue-bg rounded-lg p-3 transition-transform duration-200 group-hover:scale-105'>
                      <RiApps2Line className='text-components-badge-blue-text h-5 w-5' />
                    </div>
                  </div>
                  <div>
                    <div className='system-4xl-semibold mb-2 text-text-primary'>
                      {isLoading ? '...' : totalAgents}
                    </div>
                    <p className='system-sm-regular text-text-secondary'>
                      {isLoading
                        ? '...'
                        : `${dashboardData?.stats.activeAgents || 0} ${t('dashboard.active')} / ${dashboardData?.stats.drafts || 0} ${t('dashboard.drafts')}`
                      }
                    </p>
                  </div>
                </div>

                {/* Card 2: Recent Activity */}
                <div className='group cursor-pointer rounded-xl border border-components-panel-border-subtle bg-background-default p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
                  <div className='mb-4 flex items-center justify-between'>
                    <div>
                      <p className='system-lg-semibold mb-1 text-text-primary'>{t('dashboard.recentActivity')}</p>
                      <p className='system-xs-regular text-text-tertiary'>{t('dashboard.activitySubtext')}</p>
                    </div>
                    <div className='bg-components-badge-green-bg rounded-lg p-3 transition-transform duration-200 group-hover:scale-105'>
                      <RiGlobalLine className='text-components-badge-green-text h-5 w-5' />
                    </div>
                  </div>
                  <div>
                    <div className='system-4xl-semibold mb-2 text-text-primary'>
                      {isLoading ? '...' : dashboardData?.stats.recentActivityTasks || 0}
                    </div>
                    <p className='system-sm-regular text-text-tertiary'>{t('dashboard.tasksLast24h')}</p>
                  </div>
                </div>

                {/* Card 3: Data Sources */}
                <div className='group cursor-pointer rounded-xl border border-components-panel-border-subtle bg-background-default p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
                  <div className='mb-4 flex items-center justify-between'>
                    <div>
                      <p className='system-lg-semibold mb-1 text-text-primary'>{t('dashboard.dataSources')}</p>
                      <p className='system-xs-regular text-text-tertiary'>{t('dashboard.dataSourcesSubtext')}</p>
                    </div>
                    <div className='bg-components-badge-purple-bg rounded-lg p-3 transition-transform duration-200 group-hover:scale-105'>
                      <RiDatabase2Line className='text-components-badge-purple-text h-5 w-5' />
                    </div>
                  </div>
                  <div>
                    <div className='system-4xl-semibold mb-2 text-text-primary'>
                      {isLoading ? '...' : dashboardData?.stats.dataSources || 0}
                    </div>
                    <p className='system-sm-regular text-text-tertiary'>{t('dashboard.connectedSources')}</p>
                  </div>
                </div>

                {/* Card 4: What's New & Tips */}
                <div className='from-components-badge-orange-bg to-components-badge-yellow-bg group cursor-pointer rounded-xl border border-components-panel-border-subtle bg-gradient-to-br p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
                  <div className='mb-4 flex items-center justify-between'>
                    <div>
                      <p className='system-lg-semibold mb-1 text-text-primary'>{t('dashboard.whatsNewTips')}</p>
                      <p className='system-xs-regular text-text-tertiary'>{t('dashboard.tipsSubtext')}</p>
                    </div>
                    <div className='rounded-lg bg-white/20 p-3 transition-transform duration-200 group-hover:scale-105'>
                      <RiSparklingLine className='text-components-badge-orange-text h-5 w-5' />
                    </div>
                  </div>
                  <div>
                    <div className='mb-2 flex items-center gap-2'>
                      <RiLightbulbLine className='text-components-badge-orange-text h-4 w-4' />
                      <span className='system-sm-semibold text-text-primary'>{t('dashboard.proTip')}</span>
                    </div>
                    <p className='system-xs-regular leading-relaxed text-text-secondary'>
                      {t('dashboard.webScraperTip')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Agents - Full Width */}
          <div className='col-span-12'>
            <div className='overflow-hidden rounded-xl border border-components-panel-border-subtle bg-background-default-subtle shadow-sm'>
              <div className='border-b border-components-panel-border-subtle p-6'>
                <div className='flex items-center gap-3'>
                  <RiGroupLine className='h-6 w-6 text-text-accent' />
                  <h2 className='system-2xl-semibold tracking-tight text-text-primary'>{t('dashboard.recentAgents')}</h2>
                </div>
              </div>
              {isLoading && (
                <div className='p-8 text-center'>
                  <div className='system-sm-regular text-text-tertiary'>{t('common.loading')}</div>
                </div>
              )}
              {!isLoading && !dashboardData?.recentAgents.length && (
                <div className='p-8 text-center'>
                  <RiApps2Line className='mx-auto mb-3 h-12 w-12 text-text-tertiary' />
                  <p className='system-sm-regular text-text-tertiary'>{t('dashboard.noRecentAgents')}</p>
                  <p className='system-xs-regular mt-1 text-text-quaternary'>{t('dashboard.createAgentToSee')}</p>
                </div>
              )}
              {!isLoading && dashboardData?.recentAgents.length && (
                <div className='divide-y divide-components-panel-border-subtle'>
                  {dashboardData.recentAgents.map(agent => (
                    <div
                      key={agent.id}
                      onClick={() => handleAgentClick(agent.id, agent.mode)}
                      className='group flex cursor-pointer items-center justify-between p-6 transition-colors hover:bg-background-default-hover'
                    >
                      <div className='flex min-w-0 flex-1 items-center gap-4'>
                        <div className='relative shrink-0'>
                          <AppIcon
                            size="medium"
                            iconType={agent.iconType as AppIconType | null}
                            icon={agent.icon || undefined}
                            background={agent.iconBackground || undefined}
                            imageUrl={agent.iconUrl || undefined}
                          />
                          <div className={cn(
                            'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background-default-subtle',
                            getStatusColor(agent.status),
                          )} />
                        </div>
                        <div className='min-w-0 flex-1'>
                          <div className='mb-1 flex items-center gap-2'>
                            <h3 className='system-sm-semibold truncate text-text-primary transition-colors group-hover:text-text-accent'>{agent.name}</h3>
                            <span className={cn(
                              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                              agent.status === 'active'
                                ? 'bg-state-success-bg text-state-success-text'
                                : 'bg-components-badge-gray-bg text-components-badge-gray-text',
                            )}>
                              <div className={cn('h-1.5 w-1.5 rounded-full', getStatusColor(agent.status))} />
                              {agent.status === 'active' ? t('dashboard.active') : t('dashboard.draft')}
                            </span>
                          </div>
                          <p className='system-xs-regular text-text-tertiary'>
                            {t('dashboard.lastEdited')}: {formatTime({ date: agent.lastEdited, dateFormat: 'MMM D, YYYY' })}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle menu action here
                          }}
                          className='rounded-lg p-2 text-text-quaternary transition-colors hover:bg-background-default-hover hover:text-text-tertiary group-hover:bg-background-default-subtle'
                        >
                          <RiMoreLine className='h-5 w-5' />
                        </button>
                        <RiArrowRightLine className='h-4 w-4 text-text-quaternary transition-colors group-hover:text-text-tertiary' />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {!systemFeatures.branding.enabled && (
        <Footer />
      )}
    </div>
  )
}

export default Dashboard
