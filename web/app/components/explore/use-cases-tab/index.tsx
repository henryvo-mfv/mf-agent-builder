'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  RiArrowRightLine,
  RiCalendarLine,
  RiFileTextLine,
  RiMoneyDollarCircleLine,
  RiPercentLine,
  RiTeamLine,
  RiTimeLine,
} from '@remixicon/react'

// Mock data for use cases based on MoneyForward's business focus
const useCases = [
  {
    id: 'invoice-processing-automation',
    title: 'How the Finance Team Cut Invoice Processing Time by 75%',
    summary: 'MoneyForward\'s finance department automated their invoice processing workflow, reducing manual work from 4 hours to 1 hour per day while improving accuracy.',
    department: 'Finance',
    timeToImplement: '2 weeks',
    timeSaved: '75%',
    teamSize: '5 people',
    roi: '300%',
    bannerImage: '/case-studies/invoice-automation.jpg',
    tags: ['Automation', 'Invoice Processing', 'Finance'],
    metrics: [
      { label: 'Time Saved', value: '3 hours/day', icon: RiTimeLine },
      { label: 'Accuracy Improvement', value: '95%', icon: RiPercentLine },
      { label: 'Team Impact', value: '5 members', icon: RiTeamLine },
    ],
  },
  {
    id: 'expense-report-assistant',
    title: 'Expense Report Assistant Saves HR 20 Hours Per Week',
    summary: 'An intelligent agent automatically processes expense reports, validates receipts, and handles approval workflows, dramatically reducing HR administrative burden.',
    department: 'HR',
    timeToImplement: '1 week',
    timeSaved: '80%',
    teamSize: '3 people',
    roi: '250%',
    bannerImage: '/case-studies/expense-automation.jpg',
    tags: ['HR', 'Expense Management', 'Workflow'],
    metrics: [
      { label: 'Weekly Time Saved', value: '20 hours', icon: RiTimeLine },
      { label: 'Processing Speed', value: '80% faster', icon: RiPercentLine },
      { label: 'Error Reduction', value: '90%', icon: RiFileTextLine },
    ],
  },
  {
    id: 'payroll-data-validation',
    title: 'Automated Payroll Validation Prevents Costly Errors',
    summary: 'A validation agent cross-checks payroll data against attendance records and employment contracts, catching errors before payment processing.',
    department: 'Payroll',
    timeToImplement: '3 weeks',
    timeSaved: '60%',
    teamSize: '4 people',
    roi: '400%',
    bannerImage: '/case-studies/payroll-validation.jpg',
    tags: ['Payroll', 'Data Validation', 'Compliance'],
    metrics: [
      { label: 'Error Detection', value: '99%', icon: RiPercentLine },
      { label: 'Cost Savings', value: '¥500K/month', icon: RiMoneyDollarCircleLine },
      { label: 'Processing Time', value: '60% faster', icon: RiTimeLine },
    ],
  },
  {
    id: 'contract-analysis-agent',
    title: 'Legal Team Accelerates Contract Review by 10x',
    summary: 'An AI agent analyzes contracts for key terms, compliance issues, and potential risks, allowing legal teams to focus on strategic decision-making.',
    department: 'Legal',
    timeToImplement: '4 weeks',
    timeSaved: '90%',
    teamSize: '2 people',
    roi: '600%',
    bannerImage: '/case-studies/contract-analysis.jpg',
    tags: ['Legal', 'Contract Review', 'Compliance'],
    metrics: [
      { label: 'Review Speed', value: '10x faster', icon: RiTimeLine },
      { label: 'Risk Detection', value: '95%', icon: RiPercentLine },
      { label: 'Compliance Score', value: '98%', icon: RiFileTextLine },
    ],
  },
  {
    id: 'attendance-scheduling-optimizer',
    title: 'Smart Scheduling Reduces Overtime Costs by 40%',
    summary: 'An intelligent scheduling agent optimizes staff allocation based on historical data and business needs, significantly reducing overtime expenses.',
    department: 'Operations',
    timeToImplement: '2 weeks',
    timeSaved: '40%',
    teamSize: '8 people',
    roi: '200%',
    bannerImage: '/case-studies/scheduling-optimization.jpg',
    tags: ['Operations', 'Scheduling', 'Cost Optimization'],
    metrics: [
      { label: 'Overtime Reduction', value: '40%', icon: RiPercentLine },
      { label: 'Cost Savings', value: '¥800K/month', icon: RiMoneyDollarCircleLine },
      { label: 'Schedule Efficiency', value: '85%', icon: RiCalendarLine },
    ],
  },
  {
    id: 'customer-support-automation',
    title: 'Customer Support Agent Handles 70% of Inquiries Automatically',
    summary: 'A customer service agent automatically resolves common inquiries, escalates complex issues, and maintains detailed interaction logs.',
    department: 'Customer Support',
    timeToImplement: '3 weeks',
    timeSaved: '70%',
    teamSize: '12 people',
    roi: '350%',
    bannerImage: '/case-studies/support-automation.jpg',
    tags: ['Customer Support', 'Automation', 'Service Quality'],
    metrics: [
      { label: 'Auto-Resolution', value: '70%', icon: RiPercentLine },
      { label: 'Response Time', value: '90% faster', icon: RiTimeLine },
      { label: 'Satisfaction Score', value: '4.8/5', icon: RiTeamLine },
    ],
  },
]

type UseCaseCardProps = {
  useCase: typeof useCases[0]
  onReadMore: (id: string) => void
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ useCase, onReadMore }) => {
  const { t } = useTranslation()

  return (
    <div className='group relative overflow-hidden rounded-2xl border border-components-panel-border bg-components-panel-on-panel-item-bg shadow-xs transition-all duration-300 hover:border-components-panel-border-subtle hover:shadow-xl'>
      {/* Banner Image Area */}
      <div className='from-text-accent/10 via-text-accent/5 relative h-48 overflow-hidden bg-gradient-to-br to-background-default-subtle'>
        {/* TODO: Replace with actual banner images */}
        <div className='from-text-accent/20 absolute inset-0 bg-gradient-to-br to-transparent'></div>
        <div className='absolute left-4 top-4'>
          <span className='bg-background-default/90 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-text-accent backdrop-blur-sm'>
            {useCase.department}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='p-6'>
        <h3 className='mb-3 line-clamp-2 text-xl font-bold leading-7 text-text-primary transition-colors group-hover:text-text-accent'>
          {useCase.title}
        </h3>

        <p className='mb-6 line-clamp-3 leading-6 text-text-tertiary'>
          {useCase.summary}
        </p>

        {/* Metrics */}
        <div className='mb-6 grid grid-cols-3 gap-4'>
          {useCase.metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className='text-center'>
                <div className='mb-2 flex items-center justify-center'>
                  <Icon className='h-5 w-5 text-text-accent' />
                </div>
                <div className='mb-1 text-lg font-bold text-text-primary'>
                  {metric.value}
                </div>
                <div className='text-xs text-text-quaternary'>
                  {metric.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Tags */}
        <div className='mb-6 flex flex-wrap gap-2'>
          {useCase.tags.map(tag => (
            <span
              key={tag}
              className='bg-components-badge-gray-bg text-components-badge-gray-text border-components-badge-gray-border inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium'
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <button
          onClick={() => onReadMore(useCase.id)}
          className='group/btn flex w-full items-center justify-center gap-2 rounded-lg border border-components-button-secondary-border bg-components-button-secondary-bg px-4 py-3 text-sm font-semibold text-components-button-secondary-text transition-all hover:border-components-button-secondary-border-hover hover:bg-components-button-secondary-bg-hover'
        >
          <span>{t('explore.useCases.readMore')}</span>
          <RiArrowRightLine className='h-4 w-4 transition-transform group-hover/btn:translate-x-0.5' />
        </button>
      </div>
    </div>
  )
}

const UseCasesTab = () => {
  const { t } = useTranslation()

  const handleReadMore = (id: string) => {
    // TODO: Implement detailed case study view or navigate to detailed page
    console.log('Read more about use case:', id)
  }

  return (
    <div className='flex h-full flex-col overflow-auto'>
      <div className='px-12 py-8'>
        {/* Introduction */}
        <div className='mx-auto mb-12 max-w-4xl text-center'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight text-text-primary'>
            {t('explore.useCases.title')}
          </h2>
          <p className='text-lg leading-relaxed text-text-secondary'>
            {t('explore.useCases.description')}
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
          {useCases.map(useCase => (
            <UseCaseCard
              key={useCase.id}
              useCase={useCase}
              onReadMore={handleReadMore}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className='mt-16 rounded-2xl border border-components-panel-border-subtle bg-gradient-to-r from-background-default-subtle via-background-default to-background-default-subtle p-8 text-center'>
          <div className='mx-auto max-w-2xl'>
            <h3 className='mb-4 text-2xl font-bold text-text-primary'>
              {t('explore.useCases.cta.title')}
            </h3>
            <p className='mb-6 leading-relaxed text-text-secondary'>
              {t('explore.useCases.cta.description')}
            </p>
            <button className='inline-flex items-center gap-2 rounded-lg bg-components-button-primary-bg px-6 py-3 text-sm font-semibold text-components-button-primary-text shadow transition-colors hover:bg-components-button-primary-bg-hover'>
              <span>{t('explore.useCases.cta.button')}</span>
              <RiArrowRightLine className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UseCasesTab
