const translation = {
  currentPlan: 'Current Plan',
  usagePage: {
    teamMembers: 'Team Members',
    buildApps: 'Build Apps',
    annotationQuota: 'Annotation Quota',
    documentsUploadQuota: 'Documents Upload Quota',
    vectorSpace: 'Knowledge Data Storage',
    vectorSpaceTooltip: 'Documents with the High Quality indexing mode will consume Knowledge Data Storage resources. When Knowledge Data Storage reaches the limit, new documents will not be uploaded.',
  },
  teamMembers: 'Team Members',
  upgradeBtn: {
    plain: 'View Plan',
    encourage: 'Upgrade Now',
    encourageShort: 'Upgrade',
  },
  viewBilling: 'Manage billing and subscriptions',
  buyPermissionDeniedTip: 'Please contact your enterprise administrator to subscribe',
  plansCommon: {
    title: 'Pricing that powers your AI journey',
    freeTrialTipPrefix: 'Sign up and get a ',
    freeTrialTip: 'free trial of 200 OpenAI calls. ',
    freeTrialTipSuffix: 'No credit card required',
    yearlyTip: 'Pay for 10 months, enjoy 1 Year!',
    mostPopular: 'Popular',
    cloud: 'Cloud Service',
    self: 'Self-Hosted',
    planRange: {
      monthly: 'Monthly',
      yearly: 'Yearly',
    },
    month: 'month',
    year: 'year',
    save: 'Save ',
    free: 'Free',
    annualBilling: 'Annual Billing',
    comparePlanAndFeatures: 'Compare plans & features',
    priceTip: 'per workspace/',
    currentPlan: 'Current Plan',
    contractSales: 'Contact sales',
    contractOwner: 'Contact team manager',
    startForFree: 'Start for Free',
    getStarted: 'Get Started',
    contactSales: 'Contact Sales',
    talkToSales: 'Talk to Sales',
    modelProviders: 'Support OpenAI/Anthropic/Llama2/Azure OpenAI/Hugging Face/Replicate',
    teamWorkspace: '{{count,number}} Team Workspace',
    teamMember_one: '{{count,number}} Team Member',
    teamMember_other: '{{count,number}} Team Members',
    annotationQuota: 'Annotation Quota',
    buildApps: '{{count,number}} Apps',
    documents: '{{count,number}} Knowledge Documents',
    documentsTooltip: 'Quota on the number of documents imported from the Knowledge Data Source.',
    vectorSpace: '{{size}} Knowledge Data Storage',
    vectorSpaceTooltip: 'Documents with the High Quality indexing mode will consume Knowledge Data Storage resources. When Knowledge Data Storage reaches the limit, new documents will not be uploaded.',
    documentsRequestQuota: '{{count,number}}/min Knowledge Request Rate Limit',
    documentsRequestQuotaTooltip: 'Specifies the total number of actions a workspace can perform per minute within the knowledge base, including dataset creation, deletion, updates, document uploads, modifications, archiving, and knowledge base queries. This metric is used to evaluate the performance of knowledge base requests. For example, if a Sandbox user performs 10 consecutive hit tests within one minute, their workspace will be temporarily restricted from performing the following actions for the next minute: dataset creation, deletion, updates, and document uploads or modifications. ',
    apiRateLimit: 'API Rate Limit',
    apiRateLimitUnit: '{{count,number}}/day',
    unlimitedApiRate: 'No API Rate Limit',
    apiRateLimitTooltip: 'API Rate Limit applies to all requests made through the MoneyForward Agent Builder API, including text generation, chat conversations, workflow executions, and document processing.',
    documentProcessingPriority: ' Document Processing',
    documentProcessingPriorityUpgrade: 'Process more data with higher accuracy at faster speeds.',
    priority: {
      'standard': 'Standard',
      'priority': 'Priority',
      'top-priority': 'Top Priority',
    },
    logsHistory: '{{days}} Log history',
    customTools: 'Custom Tools',
    unavailable: 'Unavailable',
    days: 'Days',
    unlimited: 'Unlimited',
    support: 'Support',
    supportItems: {
      communityForums: 'Community forums',
      emailSupport: 'Email support',
      priorityEmail: 'Priority email & chat support',
      logoChange: 'Logo change',
      SSOAuthentication: 'SSO authentication',
      personalizedSupport: 'Personalized support',
      dedicatedAPISupport: 'Dedicated API support',
      customIntegration: 'Custom integration and support',
      ragAPIRequest: 'RAG API Requests',
      bulkUpload: 'Bulk upload documents',
      agentMode: 'Agent Mode',
      workflow: 'Workflow',
      llmLoadingBalancing: 'LLM Load Balancing',
      llmLoadingBalancingTooltip: 'Add multiple API keys to models, effectively bypassing the API rate limits. ',
    },
    comingSoon: 'Coming soon',
    member: 'Member',
    memberAfter: 'Member',
    messageRequest: {
      title: '{{count,number}} message credits',
      titlePerMonth: '{{count,number}} message credits/month',
      tooltip: 'Message credits are provided to help you easily try out different OpenAI models in MoneyForward Agent Builder. Credits are consumed based on the model type. Once they\'re used up, you can switch to your own OpenAI API key.',
    },
    annotatedResponse: {
      title: '{{count,number}} Annotation Quota Limits',
      tooltip: 'Manual editing and annotation of responses provides customizable high-quality question-answering abilities for apps. (Applicable only in Chat apps)',
    },
    ragAPIRequestTooltip: 'Refers to the number of API calls invoking only the knowledge base processing capabilities of MoneyForward Agent Builder.',
    receiptInfo: 'Only team owner and team admin can subscribe and view billing information',
  },
  plans: {
    sandbox: {
      name: 'Sandbox',
      for: 'Free Trial of Core Capabilities',
      description: 'Free Trial of Core Capabilities',
    },
    professional: {
      name: 'Professional',
      for: 'For Independent Developers/Small Teams',
      description: 'For Independent Developers/Small Teams',
    },
    team: {
      name: 'Team',
      for: 'For Medium-sized Teams',
      description: 'For Medium-sized Teams',
    },
    community: {
      name: 'Community',
      for: 'For Individual Users, Small Teams, or Non-commercial Projects',
      description: 'For Individual Users, Small Teams, or Non-commercial Projects',
      price: 'Free',
      btnText: 'Get Started with Community',
      includesTitle: 'Free Features:',
      features: [
        'All Core Features Released Under the Public Repository',
        'Single Workspace',
        'Complies with MoneyForward Agent Builder Open Source License',
      ],
    },
    premium: {
      name: 'Premium',
      for: 'For Mid-sized Organizations and Teams',
      description: 'For Mid-sized Organizations and Teams',
      price: 'Scalable',
      priceTip: 'Based on Cloud Marketplace',
      btnText: 'Get Premium in',
      includesTitle: 'Everything from Community, plus:',
      comingSoon: 'Microsoft Azure & Google Cloud Support Coming Soon',
      features: [
        'Self-managed Reliability by Various Cloud Providers',
        'Single Workspace',
        'WebApp Logo & Branding Customization',
        'Priority Email & Chat Support',
      ],
    },
    enterprise: {
      name: 'Enterprise',
      for: 'For large-sized Teams',
      description: 'For Enterprise Require Organization-wide Security, Compliance, Scalability, Control and More Advanced Features',
      price: 'Custom',
      priceTip: 'Annual Billing Only',
      btnText: 'Contact Sales',
      includesTitle: 'Everything from Premium, plus:',
      features: [
        'Enterprise-grade Scalable Deployment Solutions',
        'Commercial License Authorization',
        'Exclusive Enterprise Features',
        'Multiple Workspaces & Enterprise Management',
        'SSO',
        'Negotiated SLAs by MoneyForward Partners',
        'Advanced Security & Controls',
        'Updates and Maintenance by MoneyForward Officially',
        'Professional Technical Support',
      ],
    },
  },
  vectorSpace: {
    fullTip: 'Vector Space is full.',
    fullSolution: 'Upgrade your plan to get more space.',
  },
  apps: {
    fullTip1: 'Upgrade to create more apps',
    fullTip1des: 'You\'ve reached the limit of build apps on this plan',
    fullTip2: 'Plan limit reached',
    fullTip2des: 'It is recommended to clean up inactive applications to free up usage, or contact us.',
    contactUs: 'Contact us',
  },
  annotatedResponse: {
    fullTipLine1: 'Upgrade your plan to',
    fullTipLine2: 'annotate more conversations.',
    quotaTitle: 'Annotation Reply Quota',
  },
}

export default translation
