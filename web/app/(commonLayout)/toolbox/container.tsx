'use client'

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  RiAddLine,
  RiApps2Line,
  RiCodeLine,
  RiFileTextLine,
  RiServerLine,
  RiWebhookLine,
} from '@remixicon/react'
import Button from '@/app/components/base/button'

// Mock data for core capabilities
const coreCapabilities = [
  {
    id: 'code-interpreter',
    icon: RiCodeLine,
    titleKey: 'common.toolbox.coreCapabilities.codeInterpreter.title',
    descriptionKey: 'common.toolbox.coreCapabilities.codeInterpreter.description',
    useCaseKey: 'common.toolbox.coreCapabilities.codeInterpreter.useCase',
  },
  {
    id: 'web-scraper',
    icon: RiWebhookLine,
    titleKey: 'common.toolbox.coreCapabilities.webScraper.title',
    descriptionKey: 'common.toolbox.coreCapabilities.webScraper.description',
    useCaseKey: 'common.toolbox.coreCapabilities.webScraper.useCase',
  },
  {
    id: 'document-processor',
    icon: RiFileTextLine,
    titleKey: 'common.toolbox.coreCapabilities.documentProcessor.title',
    descriptionKey: 'common.toolbox.coreCapabilities.documentProcessor.description',
    useCaseKey: 'common.toolbox.coreCapabilities.documentProcessor.useCase',
  },
  {
    id: 'api-connector',
    icon: RiServerLine,
    titleKey: 'common.toolbox.coreCapabilities.apiConnector.title',
    descriptionKey: 'common.toolbox.coreCapabilities.apiConnector.description',
    useCaseKey: 'common.toolbox.coreCapabilities.apiConnector.useCase',
  },
]

// Mock data for third-party integrations
const thirdPartyIntegrations = [
  {
    id: 'slack',
    titleKey: 'common.toolbox.thirdPartyIntegrations.slack.title',
    descriptionKey: 'common.toolbox.thirdPartyIntegrations.slack.description',
    logo: '/logo/slack.png',
    installed: false,
  },
  {
    id: 'google-sheets',
    titleKey: 'common.toolbox.thirdPartyIntegrations.googleSheets.title',
    descriptionKey: 'common.toolbox.thirdPartyIntegrations.googleSheets.description',
    logo: '/logo/google-sheets.png',
    installed: true,
  },
  {
    id: 'gmail',
    titleKey: 'common.toolbox.thirdPartyIntegrations.gmail.title',
    descriptionKey: 'common.toolbox.thirdPartyIntegrations.gmail.description',
    logo: '/logo/gmail.png',
    installed: false,
  },
  {
    id: 'teams',
    titleKey: 'common.toolbox.thirdPartyIntegrations.teams.title',
    descriptionKey: 'common.toolbox.thirdPartyIntegrations.teams.description',
    logo: '/logo/teams.png',
    installed: true,
  },
]

const ToolboxContainer = () => {
  const { t } = useTranslation()
  const [customTools] = useState([]) // Empty for now to show empty state

  const handleLearnMore = (toolId: string) => {
    // TODO: Implement navigation to tool documentation
    console.log(`Learn more about ${toolId}`)
  }

  const handleInstallIntegration = (integrationId: string) => {
    // TODO: Implement installation flow
    console.log(`Installing ${integrationId}`)
  }

  const handleVisitMarketplace = () => {
    // TODO: Open marketplace in new tab
    window.open('https://marketplace.moneyforward.com/tools', '_blank', 'noopener,noreferrer')
  }

  const handleAddCustomTool = () => {
    // Navigate to the existing custom tool creation interface
    window.location.href = '/tools?category=api'
  }

  return (
    <div className="scroll-container relative flex grow flex-col overflow-y-auto bg-background-body">
      {/* Main content container with max-width and centered */}
      <div className="mx-auto w-full max-w-[1280px] space-y-16 px-8 py-12">

        {/* Section 1: Page Header */}
        <section>
          <h1 className="text-3xl font-bold leading-tight text-text-primary">
            {t('common.toolbox.title')}
          </h1>
          <p className="mt-2 text-base text-text-secondary">
            {t('common.toolbox.subtitle')}
          </p>
        </section>

        {/* Section 2: Core Capabilities */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary">
              {t('common.toolbox.coreCapabilities.title')}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              {t('common.toolbox.coreCapabilities.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {coreCapabilities.map((capability) => {
              const IconComponent = capability.icon
              return (
                                 <div
                   key={capability.id}
                   className="group cursor-pointer rounded-xl border border-components-panel-border bg-components-panel-on-panel-item-bg p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                 >
                  <div className="mb-4">
                                       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-components-icon-bg-orange-soft">
                     <IconComponent className="h-5 w-5 text-text-accent" />
                   </div>
                  </div>

                                     <h3 className="mb-3 text-lg font-semibold text-text-primary">
                     {t(capability.titleKey)}
                   </h3>

                   <p className="mb-3 text-sm leading-relaxed text-text-secondary">
                     {t(capability.descriptionKey)}
                   </p>

                   <p className="mb-4 text-xs italic text-text-tertiary">
                     {t(capability.useCaseKey)}
                   </p>

                  <button
                    onClick={() => handleLearnMore(capability.id)}
                    className="text-sm font-semibold text-[#3B82F6] hover:text-[#2563EB]"
                  >
                    {t('common.toolbox.coreCapabilities.codeInterpreter.learnMore')}
                  </button>
                </div>
              )
            })}
          </div>
        </section>

                  {/* Section 3: Third-Party Integrations */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary">
              {t('common.toolbox.thirdPartyIntegrations.title')}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              {t('common.toolbox.thirdPartyIntegrations.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {thirdPartyIntegrations.map(integration => (
                             <div
                 key={integration.id}
                 className="group cursor-pointer rounded-xl border border-components-panel-border bg-components-panel-on-panel-item-bg p-6 shadow-xs transition-all duration-200 hover:shadow-lg"
               >
                <div className="mb-4">
                  <img
                    src={integration.logo}
                    alt={t(integration.titleKey)}
                    className="h-8 w-8 rounded object-contain"
                    onError={(e) => {
                      const target = e.currentTarget
                      target.style.display = 'none'
                      const fallback = target.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = 'flex'
                    }}
                  />
                  <div className="hidden h-8 w-8 items-center justify-center rounded bg-[#F3F4F6]">
                    <RiApps2Line className="h-4 w-4 text-[#6B7280]" />
                  </div>
                </div>

                               <h3 className="mb-3 text-lg font-semibold text-text-primary">
                 {t(integration.titleKey)}
               </h3>

               <p className="mb-6 text-sm text-text-secondary">
                 {t(integration.descriptionKey)}
               </p>

                                 <Button
                   variant={integration.installed ? 'secondary' : 'primary'}
                   className="w-full"
                   onClick={() => handleInstallIntegration(integration.id)}
                   disabled={integration.installed}
                 >
                  {integration.installed
                    ? t('common.toolbox.thirdPartyIntegrations.configured')
                    : t('common.toolbox.thirdPartyIntegrations.install')
                  }
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Marketplace CTA */}
        <section>
                     <div
             className="flex items-center justify-between rounded-xl border border-components-panel-border bg-components-icon-bg-orange-soft p-8"
           >
                         <div>
               <h3 className="text-lg font-semibold text-text-primary">
                 {t('common.toolbox.marketplace.title')}
               </h3>
               <p className="mt-1 text-sm text-text-secondary">
                 {t('common.toolbox.marketplace.description')}
               </p>
             </div>
                         <Button
               variant="primary"
               onClick={handleVisitMarketplace}
             >
              {t('common.toolbox.marketplace.visitButton')}
            </Button>
          </div>
        </section>

        {/* Section 5: Custom Tools */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary">
              {t('common.toolbox.customTools.title')}
            </h2>
          </div>

          {customTools.length === 0 ? (
            // Empty State
                         <div
               className="rounded-xl border-2 border-dashed border-components-panel-border p-12 text-center"
             >
               <div className="mb-4 flex justify-center">
                 <RiAddLine className="h-12 w-12 text-text-tertiary" />
               </div>
               <h3 className="mb-2 text-lg font-semibold text-text-primary">
                 {t('common.toolbox.customTools.emptyState.title')}
               </h3>
               <p className="mb-6 text-sm text-text-secondary">
                 {t('common.toolbox.customTools.emptyState.description')}
               </p>
                             <Button
                 variant="primary"
                 onClick={handleAddCustomTool}
               >
                {t('common.toolbox.customTools.emptyState.addButton')}
              </Button>
            </div>
          ) : (
            // Populated State - TODO: Implement when custom tools exist
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Custom tools would be rendered here */}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

export default ToolboxContainer
