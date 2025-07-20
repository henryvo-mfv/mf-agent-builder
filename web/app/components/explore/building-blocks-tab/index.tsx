'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  RiAccountCircleLine,
  RiArrowRightLine,
  RiCalendarLine,
  RiCodeLine,
  RiEqualizer2Line,
  RiFileList3Line,
  RiFileTextLine,
  RiGlobalLine,
  RiImageLine,
  RiMicLine,
  RiMoneyDollarCircleLine,
  RiShieldUserLine,
  RiTeamLine,
} from '@remixicon/react'

// Mock data for core tools
const coreTools = [
  {
    id: 'code-interpreter',
    name: 'Code Interpreter',
    description: 'Execute Python code with access to data science libraries and file processing capabilities',
    icon: RiCodeLine,
    category: 'computation',
  },
  {
    id: 'web-scraper',
    name: 'Web Scraper',
    description: 'Extract data from websites and online sources with intelligent parsing',
    icon: RiGlobalLine,
    category: 'data-extraction',
  },
  {
    id: 'text-processor',
    name: 'Text Processor',
    description: 'Advanced text analysis, summarization, and content generation capabilities',
    icon: RiFileTextLine,
    category: 'text-processing',
  },
  {
    id: 'image-analyzer',
    name: 'Image Analyzer',
    description: 'Analyze, process, and extract information from images and documents',
    icon: RiImageLine,
    category: 'media-processing',
  },
  {
    id: 'speech-processor',
    name: 'Speech Processor',
    description: 'Convert speech to text and text to speech with multiple language support',
    icon: RiMicLine,
    category: 'media-processing',
  },
  {
    id: 'workflow-engine',
    name: 'Workflow Engine',
    description: 'Create complex automated workflows with conditional logic and branching',
    icon: RiEqualizer2Line,
    category: 'automation',
  },
]

// Mock data for MoneyForward data connectors
const dataConnectors = [
  {
    id: 'mf-cloud-accounting',
    name: 'MF Cloud Accounting',
    description: 'Access accounting data, transactions, and financial reports from MoneyForward Cloud Accounting',
    icon: RiAccountCircleLine,
    logoUrl: '/logo/mf-cloud-accounting.png',
    dataTypes: ['Transactions', 'Account Balances', 'Financial Reports', 'Tax Documents'],
  },
  {
    id: 'mf-cloud-expense',
    name: 'MF Cloud Expense',
    description: 'Retrieve expense reports, receipts, and reimbursement data for automated processing',
    icon: RiMoneyDollarCircleLine,
    logoUrl: '/logo/mf-cloud-expense.png',
    dataTypes: ['Expense Reports', 'Receipt Images', 'Approval Status', 'Reimbursements'],
  },
  {
    id: 'mf-cloud-hr',
    name: 'MF Cloud HRIS',
    description: 'Access employee information, organizational data, and HR management records',
    icon: RiTeamLine,
    logoUrl: '/logo/mf-cloud-hr.png',
    dataTypes: ['Employee Profiles', 'Organization Chart', 'Job Descriptions', 'Performance Data'],
  },
  {
    id: 'mf-cloud-payroll',
    name: 'MF Cloud Payroll',
    description: 'Integrate with payroll calculations, salary data, and tax information',
    icon: RiFileList3Line,
    logoUrl: '/logo/mf-cloud-payroll.png',
    dataTypes: ['Salary Data', 'Tax Calculations', 'Benefits', 'Payslips'],
  },
  {
    id: 'mf-cloud-attendance',
    name: 'MF Cloud Attendance',
    description: 'Monitor attendance records, working hours, and time tracking data',
    icon: RiCalendarLine,
    logoUrl: '/logo/mf-cloud-attendance.png',
    dataTypes: ['Time Records', 'Overtime Hours', 'Leave Requests', 'Schedule Data'],
  },
  {
    id: 'mf-cloud-contract',
    name: 'MF Cloud Contract',
    description: 'Handle contract management, approvals, and compliance tracking',
    icon: RiShieldUserLine,
    logoUrl: '/logo/mf-cloud-contract.png',
    dataTypes: ['Contract Documents', 'Approval Status', 'Compliance Reports', 'Legal Data'],
  },
]

type ToolCardProps = {
  tool: typeof coreTools[0]
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const Icon = tool.icon

  return (
    <div className='group relative overflow-hidden rounded-xl border border-components-panel-border bg-components-panel-on-panel-item-bg p-6 shadow-xs transition-all duration-200 hover:border-components-panel-border-subtle hover:shadow-lg'>
      <div className='flex items-start gap-4'>
        <div className='bg-text-accent/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg'>
          <Icon className='h-6 w-6 text-text-accent' />
        </div>
        <div className='min-w-0 flex-1'>
          <h3 className='system-md-semibold mb-2 leading-5 text-text-primary'>
            {tool.name}
          </h3>
          <p className='system-sm-regular line-clamp-3 leading-5 text-text-tertiary'>
            {tool.description}
          </p>
        </div>
      </div>
    </div>
  )
}

type DataConnectorCardProps = {
  connector: typeof dataConnectors[0]
}

const DataConnectorCard: React.FC<DataConnectorCardProps> = ({ connector }) => {
  const Icon = connector.icon

  return (
    <div className='group relative overflow-hidden rounded-xl border border-components-panel-border bg-components-panel-on-panel-item-bg shadow-xs transition-all duration-200 hover:border-components-panel-border-subtle hover:shadow-lg'>
      {/* Logo Header Section */}
      <div className='flex items-center gap-4 border-b border-components-panel-border-subtle bg-gradient-to-r from-orange-50/50 to-orange-100/30 p-6 pb-4'>
        <div className='flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-orange-200/50 bg-white shadow-sm transition-transform duration-200 group-hover:scale-105'>
          <img
            src={connector.logoUrl}
            alt={`${connector.name} logo`}
            className='h-12 w-12 object-contain'
            onError={(e) => {
              // Fallback to icon if image fails to load
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling?.removeAttribute('style')
            }}
          />
          <Icon className='h-8 w-8 text-orange-600' style={{ display: 'none' }} />
        </div>
        <div className='min-w-0 flex-1'>
          <h3 className='system-lg-semibold mb-1 leading-6 text-text-primary'>
            {connector.name}
          </h3>
          <div className='inline-flex items-center rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700'>
            MoneyForward Cloud
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='p-6 pt-4'>
        <p className='system-sm-regular mb-4 line-clamp-2 leading-5 text-text-tertiary'>
          {connector.description}
        </p>
        <div className='space-y-3'>
          <p className='system-xs-medium uppercase tracking-wide text-text-quaternary'>
            Available Data Types
          </p>
          <div className='flex flex-wrap gap-1.5'>
            {connector.dataTypes.map(dataType => (
              <span
                key={dataType}
                className='inline-flex items-center rounded-md border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700'
              >
                {dataType}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const BuildingBlocksTab = () => {
  const { t } = useTranslation()

  return (
    <div className='flex h-full flex-col overflow-auto'>
      <div className='space-y-12 px-12 py-8'>
        {/* Core Tools Section */}
        <section>
          <div className='mb-8'>
            <h2 className='mb-3 text-2xl font-bold tracking-tight text-text-primary'>
              {t('explore.buildingBlocks.coreTools.title')}
            </h2>
            <p className='leading-relaxed text-text-secondary'>
              {t('explore.buildingBlocks.coreTools.description')}
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
            {coreTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Data Connectors Section */}
        <section>
          <div className='mb-8'>
            <h2 className='mb-3 text-2xl font-bold tracking-tight text-text-primary'>
              {t('explore.buildingBlocks.dataConnectors.title')}
            </h2>
            <p className='leading-relaxed text-text-secondary'>
              {t('explore.buildingBlocks.dataConnectors.description')}
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
            {dataConnectors.map(connector => (
              <DataConnectorCard key={connector.id} connector={connector} />
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className='rounded-2xl border border-components-panel-border-subtle bg-background-default-subtle p-8'>
          <div className='mb-6 flex items-center gap-4'>
            <div className='bg-text-accent/10 flex h-12 w-12 items-center justify-center rounded-lg'>
              <RiEqualizer2Line className='h-6 w-6 text-text-accent' />
            </div>
            <div>
              <h3 className='mb-1 text-xl font-bold text-text-primary'>
                {t('explore.buildingBlocks.gettingStarted.title')}
              </h3>
              <p className='text-text-secondary'>
                {t('explore.buildingBlocks.gettingStarted.description')}
              </p>
            </div>
          </div>
          <div className='hover:text-text-accent-hover flex cursor-pointer items-center gap-2 text-text-accent transition-colors'>
            <span className='system-sm-semibold'>
              {t('explore.buildingBlocks.gettingStarted.learnMore')}
            </span>
            <RiArrowRightLine className='h-4 w-4' />
          </div>
        </section>
      </div>
    </div>
  )
}

export default BuildingBlocksTab
