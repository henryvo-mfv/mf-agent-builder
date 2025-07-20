'use client'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounceFn } from 'ahooks'
import {
  RiAddLine,
  RiApps2Line,
  RiArrowDownSLine,
  RiCheckLine,
  RiCloseLine,
  RiExchange2Line,
  RiEyeLine,
  RiFileTextLine,
  RiMoneyDollarCircleLine,
  RiRobot2Line,
  RiShieldUserLine,
  RiTeamLine,
  RiToolsLine,
} from '@remixicon/react'
import cn from '@/utils/classnames'
import Input from '@/app/components/base/input'
import Button from '@/app/components/base/button'
import AppIcon from '@/app/components/base/app-icon'
import type { AppIconType } from '@/types/app'

// Enhanced mock data for MoneyForward-specific templates
const moneyForwardTemplates = [
  {
    id: 'mf-invoice-processor',
    name: 'Invoice Processing Assistant',
    description: 'Automatically extract data from invoices, validate information, and route for approval using MF Cloud Accounting integration.',
    category: 'accounting',
    mfProduct: 'MF Cloud Accounting',
    icon: '📄',
    iconType: 'emoji' as AppIconType,
    iconBackground: '#F3F4F6',
    mode: 'workflow',
    tags: ['Automation', 'Invoice', 'Approval Workflow'],
    features: ['OCR Text Extraction', 'Data Validation', 'Approval Routing', 'MF Cloud Integration'],
    timeSaved: '75%',
    successRate: '95%',
    useCase: 'Finance teams processing 50+ invoices per day',
    complexity: 'Beginner',
  },
  {
    id: 'mf-expense-chatbot',
    name: 'Expense Report Q&A Bot',
    description: 'Answer employee questions about expense policies, help with expense submissions, and provide real-time expense status updates.',
    category: 'hr',
    mfProduct: 'MF Cloud Expense',
    icon: '💰',
    iconType: 'emoji' as AppIconType,
    iconBackground: '#EEF2FF',
    mode: 'chat',
    tags: ['Q&A Bot', 'Employee Support', 'Expense Management'],
    features: ['Policy Guidance', 'Status Tracking', 'Receipt Validation', 'Multi-language Support'],
    timeSaved: '60%',
    successRate: '92%',
    useCase: 'HR teams supporting 100+ employees',
    complexity: 'Beginner',
  },
  {
    id: 'mf-payroll-validator',
    name: 'Payroll Data Validator',
    description: 'Cross-check payroll calculations against attendance records and employment contracts to prevent costly errors.',
    category: 'hr',
    mfProduct: 'MF Cloud Payroll',
    icon: '💼',
    iconType: 'emoji' as AppIconType,
    iconBackground: '#F0FDF4',
    mode: 'workflow',
    tags: ['Data Validation', 'Payroll', 'Compliance'],
    features: ['Cross-validation', 'Error Detection', 'Compliance Checks', 'Automated Reports'],
    timeSaved: '80%',
    successRate: '98%',
    useCase: 'Payroll teams managing 200+ employees',
    complexity: 'Intermediate',
  },
  {
    id: 'mf-attendance-analyzer',
    name: 'Attendance Pattern Analyzer',
    description: 'Analyze attendance patterns, detect anomalies, and provide insights for workforce optimization.',
    category: 'hr',
    mfProduct: 'MF Cloud Attendance',
    icon: '📊',
    iconType: 'emoji' as AppIconType,
    iconBackground: '#FFF7ED',
    mode: 'completion',
    tags: ['Analytics', 'Workforce Management', 'Reporting'],
    features: ['Pattern Recognition', 'Anomaly Detection', 'Custom Reports', 'Trend Analysis'],
    timeSaved: '70%',
    successRate: '89%',
    useCase: 'HR managers analyzing workforce trends',
    complexity: 'Advanced',
  },
  {
    id: 'mf-contract-reviewer',
    name: 'Contract Analysis Agent',
    description: 'Review contracts for compliance, extract key terms, and flag potential risks using AI-powered analysis.',
    category: 'legal',
    mfProduct: 'MF Cloud Contract',
    icon: '📋',
    iconType: 'emoji' as AppIconType,
    iconBackground: '#FAF5FF',
    mode: 'agent-chat',
    tags: ['Legal Review', 'Risk Assessment', 'Compliance'],
    features: ['Contract Parsing', 'Risk Flagging', 'Compliance Scoring', 'Term Extraction'],
    timeSaved: '85%',
    successRate: '94%',
    useCase: 'Legal teams reviewing 20+ contracts monthly',
    complexity: 'Advanced',
  },
  {
    id: 'mf-hr-onboarding',
    name: 'Employee Onboarding Assistant',
    description: 'Guide new hires through the complete onboarding process with automated document collection and progress tracking.',
    category: 'hr',
    mfProduct: 'MF Cloud HR',
    icon: '👥',
    iconType: 'emoji' as AppIconType,
    iconBackground: '#EFF6FF',
    mode: 'workflow',
    tags: ['Onboarding', 'Document Management', 'Progress Tracking'],
    features: ['Document Collection', 'Task Automation', 'Progress Dashboards', 'Integration Hub'],
    timeSaved: '65%',
    successRate: '96%',
    useCase: 'HR teams onboarding 10+ employees monthly',
    complexity: 'Intermediate',
  },
  {
    id: 'mf-financial-reporter',
    name: 'Financial Report Generator',
    description: 'Generate comprehensive financial reports with automated data collection, analysis, and formatting.',
    category: 'accounting',
    mfProduct: 'MF Cloud Accounting Plus',
    icon: '📈',
    iconType: 'emoji' as AppIconType,
    iconBackground: '#F0F9FF',
    mode: 'completion',
    tags: ['Financial Reporting', 'Data Analysis', 'Automation'],
    features: ['Multi-source Data', 'Custom Templates', 'Automated Formatting', 'Schedule Reports'],
    timeSaved: '90%',
    successRate: '97%',
    useCase: 'Finance teams creating monthly/quarterly reports',
    complexity: 'Intermediate',
  },
  {
    id: 'mf-compliance-monitor',
    name: 'Compliance Monitoring Bot',
    description: 'Monitor regulatory compliance across all MF Cloud products and alert teams to potential issues.',
    category: 'legal',
    mfProduct: 'All MF Products',
    icon: '🛡️',
    iconType: 'emoji' as AppIconType,
    iconBackground: '#FEF7F0',
    mode: 'chat',
    tags: ['Compliance', 'Monitoring', 'Alerts'],
    features: ['Real-time Monitoring', 'Alert System', 'Compliance Scoring', 'Audit Trails'],
    timeSaved: '55%',
    successRate: '93%',
    useCase: 'Compliance teams monitoring regulatory requirements',
    complexity: 'Advanced',
  },
  {
    id: 'mf-hr-agent',
    name: 'HR Agent',
    description: 'Comprehensive HR management agent that integrates attendance tracking, employee data, and HR workflows into one intelligent assistant.',
    category: 'hr',
    mfProduct: 'MF Cloud HR',
    icon: '/logo/hr_agent.png',
    iconType: 'image' as AppIconType,
    iconBackground: '#F0F9FF',
    mode: 'agent-chat',
    tags: ['HR Management', 'Employee Support', 'Attendance Tracking'],
    features: ['Multi-system Integration', 'Employee Self-service', 'Automated Workflows', 'Real-time Analytics'],
    timeSaved: '85%',
    successRate: '96%',
    useCase: 'HR departments managing comprehensive employee lifecycle',
    complexity: 'Advanced',
  },
  {
    id: 'mf-accounting-agent',
    name: 'Accounting Agent',
    description: 'Advanced accounting assistant that connects financial data with payroll systems for comprehensive business financial management.',
    category: 'accounting',
    mfProduct: 'MF Cloud Accounting',
    icon: '/logo/accounting_agent.png',
    iconType: 'image' as AppIconType,
    iconBackground: '#F0FDF4',
    mode: 'agent-chat',
    tags: ['Financial Management', 'Payroll Integration', 'Automated Reporting'],
    features: ['Cross-system Data Sync', 'Financial Analysis', 'Payroll Reconciliation', 'Custom Reports'],
    timeSaved: '90%',
    successRate: '98%',
    useCase: 'Finance teams managing integrated accounting and payroll operations',
    complexity: 'Advanced',
  },
  {
    id: 'mf-accounting-firm-agent',
    name: 'Accounting Firm Agent',
    description: 'Specialized agent for accounting firms that handles advanced accounting tasks, contract management, and client services for professional practices.',
    category: 'accounting',
    mfProduct: 'MF Cloud Accounting Plus',
    icon: '/logo/accounting_firm_agent.png',
    iconType: 'image' as AppIconType,
    iconBackground: '#FFFBEB',
    mode: 'agent-chat',
    tags: ['Professional Services', 'Client Management', 'Contract Analysis'],
    features: ['Multi-client Management', 'Advanced Analytics', 'Contract Integration', 'Compliance Automation'],
    timeSaved: '80%',
    successRate: '97%',
    useCase: 'Accounting firms serving multiple clients with complex requirements',
    complexity: 'Advanced',
  },
  {
    id: 'mf-expense-agent',
    name: 'Expense Agent',
    description: 'Intelligent expense management agent that streamlines expense reporting, approval workflows, and policy compliance for organizations.',
    category: 'accounting',
    mfProduct: 'MF Cloud Expense',
    icon: '/logo/expense_agent.png',
    iconType: 'image' as AppIconType,
    iconBackground: '#FEF2F2',
    mode: 'agent-chat',
    tags: ['Expense Management', 'Workflow Automation', 'Policy Compliance'],
    features: ['Smart Receipt Processing', 'Approval Workflows', 'Policy Enforcement', 'Expense Analytics'],
    timeSaved: '75%',
    successRate: '94%',
    useCase: 'Organizations with complex expense approval and compliance requirements',
    complexity: 'Intermediate',
  },
]

type TemplateCardProps = {
  template: typeof moneyForwardTemplates[0]
  onUseTemplate: (id: string) => void
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onUseTemplate }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  const getAgentTypeIcon = (mode: string) => {
    switch (mode) {
      case 'chat': return RiRobot2Line
      case 'workflow': return RiExchange2Line
      case 'agent-chat': return RiToolsLine
      default: return RiFileTextLine
    }
  }

  const getAgentTypeLabel = (mode: string) => {
    switch (mode) {
      case 'chat': return 'Q&A Bot'
      case 'workflow': return 'Workflow'
      case 'agent-chat': return 'Agent'
      case 'completion': return 'Text Generation'
      default: return 'Assistant'
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'bg-state-success-bg text-state-success-text border-state-success-border'
      case 'Intermediate': return 'bg-components-badge-orange-bg text-components-badge-orange-text border-components-badge-orange-border'
      case 'Advanced': return 'bg-components-badge-red-bg text-components-badge-red-text border-components-badge-red-border'
      default: return 'bg-components-badge-gray-bg text-components-badge-gray-text border-components-badge-gray-border'
    }
  }

  const AgentIcon = getAgentTypeIcon(template.mode)

  return (
    <div className='group relative flex h-full flex-col overflow-hidden rounded-xl border border-components-panel-border bg-components-panel-on-panel-item-bg shadow-xs transition-all duration-200 hover:border-components-panel-border-subtle hover:shadow-lg'>
      <div className='flex flex-1 flex-col p-6'>
        {/* Header */}
        <div className='mb-4 flex items-start gap-4'>
          <div className='relative shrink-0'>
            <AppIcon
              size='large'
              iconType={template.iconType}
              icon={template.iconType === 'image' ? undefined : template.icon}
              imageUrl={template.iconType === 'image' ? template.icon : undefined}
              background={template.iconBackground}
            />
            <div className='absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-components-panel-border-subtle bg-background-default'>
              <AgentIcon className='h-3 w-3 text-text-accent' />
            </div>
          </div>
          <div className='min-w-0 flex-1'>
            <div className='mb-2 flex items-start justify-between gap-2'>
              <h3 className='line-clamp-2 text-lg font-bold leading-6 text-text-primary transition-colors group-hover:text-text-accent'>
                {template.name}
              </h3>
              <span className={cn('inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium', getComplexityColor(template.complexity))}>
                {template.complexity}
              </span>
            </div>
            <div className='mb-2 flex items-center gap-2'>
              <span className='bg-components-badge-blue-bg text-components-badge-blue-text border-components-badge-blue-border inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium'>
                {getAgentTypeLabel(template.mode)}
              </span>
            </div>
          </div>
        </div>

        {/* Description - Fixed Height to Ensure Consistent Card Heights */}
        <div className='mb-4 flex-1'>
          <p className='line-clamp-3 leading-5 text-text-tertiary'>
            {template.description}
          </p>
        </div>

        {/* Best For Section - Always Visible */}
        <div className='mb-4'>
          <p className='mb-1 text-xs font-medium uppercase tracking-wide text-text-quaternary'>
            Best For
          </p>
          <p className='line-clamp-2 text-sm text-text-tertiary'>
            {template.useCase}
          </p>
        </div>

        {/* Progressive Disclosure - Expanded Content */}
        {isExpanded && (
          <div className='animate-in slide-in-from-top-2 mb-4 duration-200'>
            {/* Success Metrics */}
            <div className='mb-4 grid grid-cols-2 gap-4 rounded-lg bg-background-default-subtle p-3'>
              <div className='text-center'>
                <div className='mb-1 text-lg font-bold text-text-accent'>
                  📈 {template.successRate}
                </div>
                <div className='text-xs text-text-quaternary'>
                  Success Rate
                </div>
              </div>
              <div className='text-center'>
                <div className='mb-1 text-lg font-bold text-text-accent'>
                  ⚡ {template.timeSaved}
                </div>
                <div className='text-xs text-text-quaternary'>
                  Time Saved
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className='mb-4'>
              <p className='mb-2 text-xs font-medium uppercase tracking-wide text-text-quaternary'>
                Key Features
              </p>
              <div className='flex flex-wrap gap-1.5'>
                {template.features.map(feature => (
                  <span
                    key={feature}
                    className='bg-components-badge-gray-bg text-components-badge-gray-text border-components-badge-gray-border inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium'
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* MF Product Integration */}
            <div className='mb-4'>
              <p className='mb-2 text-xs font-medium uppercase tracking-wide text-text-quaternary'>
                Integrates With
              </p>
              <span className='bg-components-badge-purple-bg text-components-badge-purple-text border-components-badge-purple-border inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium'>
                {template.mfProduct}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons - Always at Bottom */}
        <div className='mt-auto space-y-2'>
          {!isExpanded ? (
            <Button
              variant='secondary'
              className='w-full'
              onClick={() => setIsExpanded(true)}
            >
              <RiEyeLine className='mr-2 h-4 w-4' />
              View Details
            </Button>
          ) : (
            <Button
              variant='secondary'
              className='w-full'
              onClick={() => setIsExpanded(false)}
            >
              <RiArrowDownSLine className='mr-2 h-4 w-4 rotate-180' />
              Show Less
            </Button>
          )}

          <Button
            variant='primary'
            className='w-full'
            onClick={() => onUseTemplate(template.id)}
          >
            <RiAddLine className='mr-2 h-4 w-4' />
            Use Template
          </Button>
        </div>
      </div>
    </div>
  )
}

const TemplatesTab = () => {
  const { t } = useTranslation()
  const [searchKeywords, setSearchKeywords] = useState('')
  const [keywords, setKeywords] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMfProducts, setSelectedMfProducts] = useState<string[]>([])
  const [selectedAgentTypes, setSelectedAgentTypes] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const templatesPerPage = 12

  const { run: handleSearch } = useDebounceFn(() => {
    setSearchKeywords(keywords)
  }, { wait: 500 })

  const handleKeywordsChange = (value: string) => {
    setKeywords(value)
    handleSearch()
  }

  const categories = [
    { value: 'accounting', label: 'Accounting & Finance', icon: RiMoneyDollarCircleLine },
    { value: 'hr', label: 'Human Resources', icon: RiTeamLine },
    { value: 'legal', label: 'Legal & Compliance', icon: RiShieldUserLine },
  ]

  const mfProducts = [
    { value: 'MF Cloud Accounting', label: 'MF Cloud Accounting' },
    { value: 'MF Cloud Expense', label: 'MF Cloud Expense' },
    { value: 'MF Cloud Payroll', label: 'MF Cloud Payroll' },
    { value: 'MF Cloud Attendance', label: 'MF Cloud Attendance' },
    { value: 'MF Cloud Contract', label: 'MF Cloud Contract' },
    { value: 'MF Cloud HR', label: 'MF Cloud HR' },
    { value: 'MF Cloud Accounting Plus', label: 'MF Cloud Accounting Plus' },
    { value: 'All MF Products', label: 'All MF Products' },
  ]

  const agentTypes = [
    { value: 'chat', label: 'Q&A Bot' },
    { value: 'workflow', label: 'Workflow Agent' },
    { value: 'agent-chat', label: 'Advanced Agent' },
    { value: 'completion', label: 'Text Generation' },
  ]

  // Multi-select filter handlers
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category],
    )
  }

  const toggleMfProduct = (product: string) => {
    setSelectedMfProducts(prev =>
      prev.includes(product)
        ? prev.filter(p => p !== product)
        : [...prev, product],
    )
  }

  const toggleAgentType = (type: string) => {
    setSelectedAgentTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type],
    )
  }

  const getCategoryCount = (category: string) => {
    return moneyForwardTemplates.filter(template =>
      template.category === category,
    ).length
  }

  const getProductCount = (product: string) => {
    return moneyForwardTemplates.filter(template =>
      template.mfProduct === product,
    ).length
  }

  const getTypeCount = (type: string) => {
    return moneyForwardTemplates.filter(template =>
      template.mode === type,
    ).length
  }

  const filteredTemplates = useMemo(() => {
    let filtered = moneyForwardTemplates

    // Apply search filter
    if (searchKeywords) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchKeywords.toLowerCase())
        || template.description.toLowerCase().includes(searchKeywords.toLowerCase())
        || template.tags.some(tag => tag.toLowerCase().includes(searchKeywords.toLowerCase()))
        || template.features.some(feature => feature.toLowerCase().includes(searchKeywords.toLowerCase())),
      )
    }

    // Apply category filters (multi-select)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(template =>
        selectedCategories.includes(template.category),
      )
    }

    // Apply MF product filters (multi-select)
    if (selectedMfProducts.length > 0) {
      filtered = filtered.filter(template =>
        selectedMfProducts.includes(template.mfProduct),
      )
    }

    // Apply agent type filters (multi-select)
    if (selectedAgentTypes.length > 0) {
      filtered = filtered.filter(template =>
        selectedAgentTypes.includes(template.mode),
      )
    }

    return filtered
  }, [searchKeywords, selectedCategories, selectedMfProducts, selectedAgentTypes])

  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage)
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * templatesPerPage,
    currentPage * templatesPerPage,
  )

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories, selectedMfProducts, selectedAgentTypes, searchKeywords])

  const handleUseTemplate = (id: string) => {
    // TODO: Implement actual template usage logic
    console.log('Using template:', id)
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedMfProducts([])
    setSelectedAgentTypes([])
    setKeywords('')
    setSearchKeywords('')
  }

  const removeFilter = (type: 'category' | 'product' | 'type', value: string) => {
    switch (type) {
      case 'category':
        setSelectedCategories(prev => prev.filter(c => c !== value))
        break
      case 'product':
        setSelectedMfProducts(prev => prev.filter(p => p !== value))
        break
      case 'type':
        setSelectedAgentTypes(prev => prev.filter(t => t !== value))
        break
    }
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedMfProducts.length > 0 || selectedAgentTypes.length > 0 || searchKeywords

  const getActiveFilterCount = () => {
    return selectedCategories.length + selectedMfProducts.length + selectedAgentTypes.length + (searchKeywords ? 1 : 0)
  }

  return (
    <div className='flex h-full overflow-hidden'>
      {/* Left Sidebar - Filters */}
      <div className='w-80 shrink-0 overflow-y-auto border-r border-components-panel-border-subtle bg-background-default-subtle'>
        <div className='space-y-6 p-6'>
          {/* Search in Sidebar */}
          <div>
            <h3 className='mb-3 text-sm font-semibold text-text-secondary'>{t('explore.templates.filterSections.search')}</h3>
            <Input
              showLeftIcon
              showClearIcon
              placeholder={t('explore.templates.searchPlaceholder')}
              value={keywords}
              onChange={e => handleKeywordsChange(e.target.value)}
              onClear={() => handleKeywordsChange('')}
            />
          </div>

          {/* Function Filter - Multi-select */}
          <div>
            <h3 className='mb-3 text-sm font-semibold text-text-secondary'>{t('explore.templates.filterSections.function')}</h3>
            <div className='space-y-2'>
              {categories.map((category) => {
                const Icon = category.icon
                const isSelected = selectedCategories.includes(category.value)
                const count = getCategoryCount(category.value)

                return (
                  <button
                    key={category.value}
                    onClick={() => toggleCategory(category.value)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg border p-3 text-left text-sm font-medium transition-all',
                      isSelected
                        ? 'bg-text-accent/5 border-text-accent text-text-accent'
                        : 'border-transparent text-text-tertiary hover:bg-background-default-hover hover:text-text-secondary',
                    )}
                  >
                    <div className='flex items-center gap-2'>
                      <div className={cn(
                        'flex h-4 w-4 items-center justify-center rounded border',
                        isSelected
                          ? 'border-text-accent bg-text-accent text-white'
                          : 'border-components-panel-border',
                      )}>
                        {isSelected && <RiCheckLine className='h-3 w-3' />}
                      </div>
                      <Icon className='h-4 w-4' />
                      <span>{category.label}</span>
                    </div>
                    <span className='text-xs text-text-quaternary'>{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* MF Product Filter - Multi-select */}
          <div>
            <h3 className='mb-3 text-sm font-semibold text-text-secondary'>{t('explore.templates.filterSections.product')}</h3>
            <div className='space-y-2'>
              {mfProducts.map((product) => {
                const isSelected = selectedMfProducts.includes(product.value)
                const count = getProductCount(product.value)

                return (
                  <button
                    key={product.value}
                    onClick={() => toggleMfProduct(product.value)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg border p-3 text-left text-sm font-medium transition-all',
                      isSelected
                        ? 'bg-text-accent/5 border-text-accent text-text-accent'
                        : 'border-transparent text-text-tertiary hover:bg-background-default-hover hover:text-text-secondary',
                    )}
                  >
                    <div className='flex items-center gap-2'>
                      <div className={cn(
                        'flex h-4 w-4 items-center justify-center rounded border',
                        isSelected
                          ? 'border-text-accent bg-text-accent text-white'
                          : 'border-components-panel-border',
                      )}>
                        {isSelected && <RiCheckLine className='h-3 w-3' />}
                      </div>
                      <span className='truncate'>{product.label}</span>
                    </div>
                    <span className='text-xs text-text-quaternary'>{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Agent Type Filter - Multi-select */}
          <div>
            <h3 className='mb-3 text-sm font-semibold text-text-secondary'>{t('explore.templates.filterSections.agentType')}</h3>
            <div className='space-y-2'>
              {agentTypes.map((type) => {
                const isSelected = selectedAgentTypes.includes(type.value)
                const count = getTypeCount(type.value)

                return (
                  <button
                    key={type.value}
                    onClick={() => toggleAgentType(type.value)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg border p-3 text-left text-sm font-medium transition-all',
                      isSelected
                        ? 'bg-text-accent/5 border-text-accent text-text-accent'
                        : 'border-transparent text-text-tertiary hover:bg-background-default-hover hover:text-text-secondary',
                    )}
                  >
                    <div className='flex items-center gap-2'>
                      <div className={cn(
                        'flex h-4 w-4 items-center justify-center rounded border',
                        isSelected
                          ? 'border-text-accent bg-text-accent text-white'
                          : 'border-components-panel-border',
                      )}>
                        {isSelected && <RiCheckLine className='h-3 w-3' />}
                      </div>
                      <span>{type.label}</span>
                    </div>
                    <span className='text-xs text-text-quaternary'>{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Clear All Filters */}
          {hasActiveFilters && (
            <Button
              variant='secondary'
              className='w-full'
              onClick={clearAllFilters}
            >
              {t('explore.templates.clearAllFilters')} ({getActiveFilterCount()})
            </Button>
          )}
        </div>
      </div>

      {/* Right Main Content Area */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        {/* Content Header with Search and Sort */}
        <div className='shrink-0 border-b border-components-panel-border-subtle bg-background-default px-8 pb-4 pt-6'>
          <div className='mb-4 flex items-center justify-between gap-4'>
            {/* Results Summary */}
            <div className='flex items-center gap-4'>
              <p className='text-sm text-text-tertiary'>
                <span className='font-semibold text-text-primary'>{filteredTemplates.length}</span> {t('explore.templates.templatesFound')}
              </p>
              {hasActiveFilters && (
                <span className='text-xs text-text-quaternary'>
                  • {getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} applied
                </span>
              )}
            </div>

            {/* Sort Options */}
            <div className='flex items-center gap-2'>
              <span className='text-sm text-text-quaternary'>{t('explore.templates.sortBy')}</span>
              <div className='relative'>
                <select className='cursor-pointer appearance-none rounded-lg border border-components-panel-border bg-background-default px-3 py-1.5 pr-8 text-sm text-text-primary transition-colors hover:border-components-panel-border-subtle'>
                  <option>{t('explore.templates.sortOptions.relevance')}</option>
                  <option>{t('explore.templates.sortOptions.popularity')}</option>
                  <option>{t('explore.templates.sortOptions.newest')}</option>
                  <option>{t('explore.templates.sortOptions.name')}</option>
                </select>
                <RiArrowDownSLine className='pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-text-quaternary' />
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className='flex flex-wrap gap-2'>
              {searchKeywords && (
                <div className='bg-text-accent/10 border-text-accent/20 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-text-accent'>
                  <span className='text-sm font-medium'>Search: "{searchKeywords}"</span>
                  <button
                    onClick={() => handleKeywordsChange('')}
                    className='hover:bg-text-accent/20 ml-1 rounded-full p-0.5 transition-colors'
                  >
                    <RiCloseLine className='h-3 w-3' />
                  </button>
                </div>
              )}
              {selectedCategories.map((category) => {
                const categoryData = categories.find(c => c.value === category)
                return (
                  <div key={category} className='bg-text-accent/10 border-text-accent/20 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-text-accent'>
                    <span className='text-sm font-medium'>{categoryData?.label}</span>
                    <button
                      onClick={() => removeFilter('category', category)}
                      className='hover:bg-text-accent/20 ml-1 rounded-full p-0.5 transition-colors'
                    >
                      <RiCloseLine className='h-3 w-3' />
                    </button>
                  </div>
                )
              })}
              {selectedMfProducts.map(product => (
                <div key={product} className='bg-text-accent/10 border-text-accent/20 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-text-accent'>
                  <span className='text-sm font-medium'>{product}</span>
                  <button
                    onClick={() => removeFilter('product', product)}
                    className='hover:bg-text-accent/20 ml-1 rounded-full p-0.5 transition-colors'
                  >
                    <RiCloseLine className='h-3 w-3' />
                  </button>
                </div>
              ))}
              {selectedAgentTypes.map((type) => {
                const typeData = agentTypes.find(t => t.value === type)
                return (
                  <div key={type} className='bg-text-accent/10 border-text-accent/20 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-text-accent'>
                    <span className='text-sm font-medium'>{typeData?.label}</span>
                    <button
                      onClick={() => removeFilter('type', type)}
                      className='hover:bg-text-accent/20 ml-1 rounded-full p-0.5 transition-colors'
                    >
                      <RiCloseLine className='h-3 w-3' />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Templates Grid - Hero Content */}
        <div className='flex-1 overflow-auto'>
          <div className='p-8'>
            {filteredTemplates.length > 0 ? (
              <>
                {/* Templates Grid - Equal height cards with aligned buttons */}
                <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
                  {paginatedTemplates.map(template => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onUseTemplate={handleUseTemplate}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className='flex items-center justify-between border-t border-components-panel-border-subtle py-6'>
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className='flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-text-tertiary transition-colors hover:bg-background-default-hover hover:text-text-secondary disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      ← Previous
                    </button>

                    <div className='flex items-center gap-3'>
                      <span className='text-sm text-text-tertiary'>
                        Page <span className='font-medium text-text-primary'>{currentPage}</span> of <span className='font-medium text-text-primary'>{totalPages}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className='flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-text-tertiary transition-colors hover:bg-background-default-hover hover:text-text-secondary disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Enhanced Empty State */
              <div className='flex h-96 flex-col items-center justify-center text-center'>
                <RiApps2Line className='mb-6 h-16 w-16 text-text-quaternary' />
                <h3 className='mb-3 text-xl font-semibold text-text-tertiary'>
                  No templates match your criteria
                </h3>
                <p className='mb-6 max-w-md text-text-quaternary'>
                  Try adjusting your search or removing some filters to discover more templates.
                </p>
                {hasActiveFilters && (
                  <Button variant='secondary' onClick={clearAllFilters}>
                    {t('explore.templates.clearAllFilters')}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplatesTab
