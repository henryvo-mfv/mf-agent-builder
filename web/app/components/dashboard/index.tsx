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
import { useMotionPreference } from '@/hooks/use-motion-preference'
import cn from '@/utils/classnames'
import type { DashboardData } from '@/service/dashboard'
import FloatingParticles from './floating-particles'
import {
  AfternoonIllustration,
  EveningIllustration,
  MorningIllustration,
  NightIllustration,
} from './time-illustrations'
import styles from './animations.module.css'

const Dashboard = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { userProfile } = useAppContext()
  const { systemFeatures } = useGlobalPublicStore()
  const prefersReducedMotion = useMotionPreference()

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
    router.push('/explore')
  }

  const handleAgentClick = (agentId: string, mode: string) => {
    const isWorkflow = mode === 'workflow' || mode === 'advanced-chat'
    const path = isWorkflow ? `/app/${agentId}/workflow` : `/app/${agentId}/configuration`
    router.push(path)
  }

  const getStatusColor = (status: 'active' | 'draft') => {
    return status === 'active' ? 'bg-state-success-solid' : 'bg-text-quaternary'
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

  // Time-based styling for hero banner
  const getTimeBasedStyling = () => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
      // Morning: Soft sunrise colors
      return {
        background: 'bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50',
        pattern: 'from-orange-200/20 via-yellow-200/20 to-pink-200/20',
        decorativeColor: 'from-orange-300 via-yellow-300 to-pink-300',
      }
    }
 else if (hour >= 12 && hour < 17) {
      // Afternoon: Bright blue sky colors
      return {
        background: 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50',
        pattern: 'from-blue-200/20 via-sky-200/20 to-cyan-200/20',
        decorativeColor: 'from-blue-300 via-sky-300 to-cyan-300',
      }
    }
 else if (hour >= 17 && hour < 21) {
      // Evening: Warm sunset colors
      return {
        background: 'bg-gradient-to-br from-orange-50 via-red-50 to-purple-50',
        pattern: 'from-orange-200/20 via-red-200/20 to-purple-200/20',
        decorativeColor: 'from-orange-300 via-red-300 to-purple-300',
      }
    }
 else {
      // Night: Deep cool colors
      return {
        background: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50',
        pattern: 'from-indigo-200/20 via-purple-200/20 to-blue-200/20',
        decorativeColor: 'from-indigo-300 via-purple-300 to-blue-300',
      }
    }
  }

  // Render appropriate time-based illustration
  const renderTimeIllustration = () => {
    const hour = new Date().getHours()
    const animated = !prefersReducedMotion
    const illustrationProps = {
      className: 'absolute inset-0 w-full h-full opacity-20',
      animated,
    }

    if (hour >= 5 && hour < 12)
      return <MorningIllustration {...illustrationProps} />
     else if (hour >= 12 && hour < 17)
      return <AfternoonIllustration {...illustrationProps} />
     else if (hour >= 17 && hour < 21)
      return <EveningIllustration {...illustrationProps} />
     else
      return <NightIllustration {...illustrationProps} />
  }

  // Render Recent Agents content based on loading and data state
  const renderRecentAgentsContent = () => {
    if (isLoading) {
      return (
        <div className='p-12 text-center'>
          <div className='text-lg font-medium text-text-tertiary'>{t('common.loading')}</div>
        </div>
      )
    }

    if (!dashboardData?.recentAgents.length) {
      return (
        <div className='p-12 text-center'>
          <RiApps2Line className='mx-auto mb-4 h-16 w-16 text-text-tertiary' />
          <p className='mb-2 text-lg font-medium text-text-tertiary'>{t('dashboard.noRecentAgents')}</p>
          <p className='text-sm font-medium text-text-quaternary'>{t('dashboard.createAgentToSee')}</p>
        </div>
      )
    }

    return (
      <div className='divide-y divide-components-panel-border-subtle'>
        {dashboardData.recentAgents.map(agent => (
          <div
            key={agent.id}
            onClick={() => handleAgentClick(agent.id, agent.mode)}
            className='group flex cursor-pointer items-center justify-between p-8 transition-all duration-200 hover:bg-gradient-to-r hover:from-background-default-hover hover:to-background-default hover:shadow-inner'
          >
            <div className='flex min-w-0 flex-1 items-center gap-6'>
              <div className='relative shrink-0 transition-transform duration-200 group-hover:scale-105'>
                <AppIcon
                  size="medium"
                  iconType={agent.iconType as AppIconType | null}
                  icon={agent.icon || undefined}
                  background={agent.iconBackground || undefined}
                  imageUrl={agent.iconUrl || undefined}
                />
                <div className={cn(
                  'border-3 absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-background-default-subtle shadow-sm',
                  getStatusColor(agent.status),
                )} />
              </div>
              <div className='min-w-0 flex-1'>
                <div className='mb-2 flex items-center gap-3'>
                  <h3 className='truncate text-lg font-bold text-text-primary transition-colors group-hover:text-text-accent'>{agent.name}</h3>
                  <span className={cn(
                    'inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold shadow-sm',
                    agent.status === 'active'
                      ? 'bg-state-success-bg text-state-success-text border-state-success-border border'
                      : 'bg-components-badge-gray-bg border-components-badge-gray-border border text-text-tertiary',
                  )}>
                    <div className={cn('h-2 w-2 rounded-full', getStatusColor(agent.status))} />
                    {agent.status === 'active' ? t('dashboard.active') : t('dashboard.draft')}
                  </span>
                </div>
                <p className='text-sm font-medium text-text-tertiary'>
                  {t('dashboard.lastEdited')}: {formatTime({ date: agent.lastEdited, dateFormat: 'MMM D, YYYY' })}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle menu action here
                }}
                className='rounded-xl p-3 text-text-quaternary transition-all duration-200 hover:bg-background-default-hover hover:text-text-tertiary hover:shadow-md group-hover:bg-background-default-subtle'
              >
                <RiMoreLine className='h-6 w-6' />
              </button>
              <RiArrowRightLine className='h-5 w-5 text-text-quaternary transition-all duration-200 group-hover:translate-x-1 group-hover:text-text-tertiary' />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const timeGreeting = getTimeBasedGreeting()
  const timeStyle = getTimeBasedStyling()

  if (error)
    console.error('Dashboard data error:', error)

  return (
    <div className='relative flex h-0 shrink-0 grow flex-col overflow-y-auto bg-background-body'>
      <div className='px-6 py-8'>
        {/* POLISHED HERO WELCOME SECTION */}
        <div className={`group relative mb-16 overflow-hidden rounded-3xl border border-components-panel-border-subtle ${timeStyle.background} px-8 py-12 text-center shadow-lg transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl`}>
          {/* Layer 3: Rich time-based illustrations */}
          {renderTimeIllustration()}

          {/* Time-based background pattern with Layer 2 animation */}
          <div className={`absolute inset-0 bg-gradient-to-r ${timeStyle.pattern} opacity-60 transition-opacity duration-500 group-hover:opacity-80 ${!prefersReducedMotion ? styles.animateGradientShift : ''}`}></div>

          {/* Layer 2: Floating particles for motion-tolerant users */}
          {!prefersReducedMotion && (
            <FloatingParticles count={6} className="opacity-40" />
          )}

          {/* Enhanced floating decorative elements */}
          <div className={`absolute right-4 top-4 opacity-30 transition-all duration-700 group-hover:translate-x-2 group-hover:opacity-50 ${!prefersReducedMotion ? styles.animateBreathe : ''}`}>
            <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${timeStyle.decorativeColor}`}></div>
          </div>
          <div className={`absolute bottom-4 left-4 opacity-20 transition-all duration-700 group-hover:-translate-x-1 group-hover:opacity-40 ${!prefersReducedMotion ? styles.animateBreathe : ''}`} style={!prefersReducedMotion ? { animationDelay: '2s' } : {}}>
            <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${timeStyle.decorativeColor}`}></div>
          </div>

          {/* Additional animated elements for motion-tolerant users */}
          {!prefersReducedMotion && (
            <>
              <div className={`absolute left-8 top-16 opacity-15 ${styles.animateBreathe}`} style={{ animationDelay: '4s' }}>
                <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${timeStyle.decorativeColor}`}></div>
              </div>
              <div className={`absolute bottom-16 right-8 opacity-25 ${styles.animateBreathe}`} style={{ animationDelay: '1s' }}>
                <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${timeStyle.decorativeColor}`}></div>
              </div>
            </>
          )}

          <div className='relative z-10'>
            <div className='mb-8 flex items-center justify-center gap-6'>
              <span className='text-7xl drop-shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 group-hover:drop-shadow-2xl'>{timeGreeting.emoji}</span>
                              <div className='text-left transition-all duration-500 group-hover:translate-x-2'>
                  <h1 className='mb-3 text-7xl font-black leading-none tracking-tight text-text-primary transition-all duration-500 group-hover:tracking-wide'>
                    {t(`dashboard.${timeGreeting.text}`)}
                  </h1>
                  <div className='text-6xl font-bold leading-none tracking-tight text-text-accent drop-shadow-sm transition-all duration-500 group-hover:text-text-primary'>
                    {userProfile?.name || 'User'}!
                  </div>
                </div>
            </div>
            <div className='mx-auto max-w-3xl transition-all duration-500 group-hover:scale-105'>
              <p className='text-2xl font-medium leading-relaxed text-text-secondary opacity-90 transition-all duration-500 group-hover:text-text-primary group-hover:opacity-100'>
                {t('dashboard.subheader')}
              </p>
            </div>
            <div className={`mx-auto mt-8 h-1.5 w-32 rounded-full bg-gradient-to-r ${timeStyle.decorativeColor} shadow-md transition-all duration-500 group-hover:h-2 group-hover:w-40`}></div>
          </div>
        </div>

        {/* 12-Column Grid Container */}
        <div className='grid grid-cols-12 gap-8'>

          {/* Quick Actions Banner - Full Width */}
          <div className='col-span-12'>
            <div className='rounded-2xl border border-components-panel-border-subtle bg-background-default-subtle p-8 shadow-md transition-shadow duration-300 hover:shadow-lg'>
              <div className='mb-8 flex items-center gap-4'>
                <div className='bg-text-accent/10 rounded-xl p-2'>
                  <RiRocketLine className='h-7 w-7 text-text-accent' />
                </div>
                <h2 className='text-3xl font-bold tracking-tight text-text-primary'>{t('dashboard.quickActions')}</h2>
              </div>
              <div className='flex gap-4'>
                <Button
                  variant='primary'
                  size='large'
                  onClick={handleCreateNewAgent}
                  className='flex items-center gap-3 px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl'
                >
                  <RiAddLine className='h-5 w-5' />
                  {t('dashboard.createNewAgent')}
                </Button>
                <Button
                  variant='secondary'
                  size='large'
                  onClick={handleBrowseTemplates}
                  className='flex items-center gap-3 px-8 py-4 text-lg font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg'
                >
                  <RiApps2Line className='h-5 w-5' />
                  {t('dashboard.browseTemplates')}
                </Button>
              </div>
            </div>
          </div>

          {/* Stats at a Glance - Four Cards */}
          <div className='col-span-12'>
            <div className='rounded-2xl border border-components-panel-border-subtle bg-background-default-subtle p-8 shadow-md'>
              <div className='mb-10 flex items-center gap-4'>
                <div className='bg-text-accent/10 rounded-xl p-2'>
                  <RiBarChart2Line className='h-7 w-7 text-text-accent' />
                </div>
                <h2 className='text-3xl font-bold tracking-tight text-text-primary'>{t('dashboard.statsAtGlance')}</h2>
              </div>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>

                {/* Card 1: Agents Overview - Unified Display */}
                <div className='hover:border-components-badge-blue-border group cursor-pointer rounded-2xl border border-components-panel-border-subtle bg-background-default p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                  <div className='mb-6 flex items-center justify-between'>
                    <div>
                      <p className='group-hover:text-components-badge-blue-text mb-2 text-xl font-bold text-text-primary transition-colors'>{t('dashboard.agentsOverview')}</p>
                      <p className='text-sm font-medium text-text-tertiary'>{t('dashboard.totalAgentsSubtext')}</p>
                    </div>
                    <div className='bg-components-badge-blue-bg rounded-2xl p-4 shadow-md transition-transform duration-300 group-hover:scale-110'>
                      <RiApps2Line className='text-components-badge-blue-text h-6 w-6' />
                    </div>
                  </div>
                  <div>
                    <div className='mb-3 text-5xl font-black leading-none text-text-primary'>
                      {isLoading ? '...' : totalAgents}
                    </div>
                    <p className='text-base font-semibold text-text-secondary'>
                      {isLoading
                        ? '...'
                        : `${dashboardData?.stats.activeAgents || 0} ${t('dashboard.active')} / ${dashboardData?.stats.drafts || 0} ${t('dashboard.drafts')}`
                      }
                    </p>
                  </div>
                </div>

                {/* Card 2: Recent Activity */}
                <div className='hover:border-components-badge-green-border group cursor-pointer rounded-2xl border border-components-panel-border-subtle bg-background-default p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                  <div className='mb-6 flex items-center justify-between'>
                    <div>
                      <p className='group-hover:text-components-badge-green-text mb-2 text-xl font-bold text-text-primary transition-colors'>{t('dashboard.recentActivity')}</p>
                      <p className='text-sm font-medium text-text-tertiary'>{t('dashboard.activitySubtext')}</p>
                    </div>
                    <div className='bg-components-badge-green-bg rounded-2xl p-4 shadow-md transition-transform duration-300 group-hover:scale-110'>
                      <RiGlobalLine className='text-components-badge-green-text h-6 w-6' />
                    </div>
                  </div>
                  <div>
                    <div className='mb-3 text-5xl font-black leading-none text-text-primary'>
                      {isLoading ? '...' : dashboardData?.stats.recentActivityTasks || 0}
                    </div>
                    <p className='text-sm font-semibold text-text-tertiary'>{t('dashboard.tasksLast24h')}</p>
                  </div>
                </div>

                {/* Card 3: Data Sources */}
                <div className='hover:border-components-badge-purple-border group cursor-pointer rounded-2xl border border-components-panel-border-subtle bg-background-default p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                  <div className='mb-6 flex items-center justify-between'>
                    <div>
                      <p className='group-hover:text-components-badge-purple-text mb-2 text-xl font-bold text-text-primary transition-colors'>{t('dashboard.dataSources')}</p>
                      <p className='text-sm font-medium text-text-tertiary'>{t('dashboard.dataSourcesSubtext')}</p>
                    </div>
                    <div className='bg-components-badge-purple-bg rounded-2xl p-4 shadow-md transition-transform duration-300 group-hover:scale-110'>
                      <RiDatabase2Line className='text-components-badge-purple-text h-6 w-6' />
                    </div>
                  </div>
                  <div>
                    <div className='mb-3 text-5xl font-black leading-none text-text-primary'>
                      {isLoading ? '...' : dashboardData?.stats.dataSources || 0}
                    </div>
                    <p className='text-sm font-semibold text-text-tertiary'>{t('dashboard.connectedSources')}</p>
                  </div>
                </div>

                {/* Card 4: What's New & Tips */}
                <div className='from-components-badge-orange-bg via-components-badge-orange-bg/80 to-components-badge-yellow-bg hover:from-components-badge-orange-bg/90 hover:to-components-badge-yellow-bg/90 group cursor-pointer rounded-2xl border border-components-panel-border-subtle bg-gradient-to-br p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                  <div className='mb-6 flex items-center justify-between'>
                    <div>
                      <p className='group-hover:text-components-badge-orange-text mb-2 text-xl font-bold text-text-primary transition-colors'>{t('dashboard.whatsNewTips')}</p>
                      <p className='text-sm font-medium text-text-tertiary'>{t('dashboard.tipsSubtext')}</p>
                    </div>
                    <div className='rounded-2xl bg-white/30 p-4 shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-110'>
                      <RiSparklingLine className='text-components-badge-orange-text h-6 w-6' />
                    </div>
                  </div>
                  <div>
                    <div className='mb-3 flex items-center gap-3'>
                      <RiLightbulbLine className='text-components-badge-orange-text h-5 w-5' />
                      <span className='text-lg font-bold text-text-primary'>{t('dashboard.proTip')}</span>
                    </div>
                    <p className='text-sm font-medium leading-relaxed text-text-secondary'>
                      {t('dashboard.webScraperTip')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Agents - Full Width */}
          <div className='col-span-12'>
            <div className='overflow-hidden rounded-2xl border border-components-panel-border-subtle bg-background-default-subtle shadow-md transition-shadow duration-300 hover:shadow-lg'>
              <div className='border-b border-components-panel-border-subtle bg-gradient-to-r from-background-default-subtle to-background-default p-8'>
                <div className='flex items-center gap-4'>
                  <div className='bg-text-accent/10 rounded-xl p-2'>
                    <RiGroupLine className='h-7 w-7 text-text-accent' />
                  </div>
                  <h2 className='text-3xl font-bold tracking-tight text-text-primary'>{t('dashboard.recentAgents')}</h2>
                </div>
              </div>
              {renderRecentAgentsContent()}
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
