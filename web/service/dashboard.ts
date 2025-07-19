// Dashboard specific types
export type DashboardStats = {
  activeAgents: number
  drafts: number
  recentActivityTasks: number
  dataSources: number
}

export type RecentAgent = {
  id: string
  name: string
  mode: string
  status: 'active' | 'draft'
  lastEdited: string
  iconType?: string | null
  icon?: string | null
  iconBackground?: string | null
  iconUrl?: string | null
}

export type DashboardData = {
  stats: DashboardStats
  recentAgents: RecentAgent[]
}

// Mock data for dashboard - using dummy data as requested
const MOCK_DASHBOARD_DATA: DashboardData = {
  stats: {
    activeAgents: 12,
    drafts: 5,
    recentActivityTasks: 142,
    dataSources: 8,
  },
  recentAgents: [
    {
      id: '1',
      name: 'Invoice Processing Assistant',
      mode: 'workflow',
      status: 'active',
      lastEdited: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      iconType: 'emoji',
      icon: '📄',
      iconBackground: '#F3F4F6',
      iconUrl: null,
    },
    {
      id: '2',
      name: 'Customer Support Bot',
      mode: 'chat',
      status: 'active',
      lastEdited: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      iconType: 'emoji',
      icon: '🤖',
      iconBackground: '#EEF2FF',
      iconUrl: null,
    },
    {
      id: '3',
      name: 'HR Onboarding Agent',
      mode: 'advanced-chat',
      status: 'draft',
      lastEdited: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      iconType: 'emoji',
      icon: '👥',
      iconBackground: '#F0FDF4',
      iconUrl: null,
    },
    {
      id: '4',
      name: 'Document Analyzer',
      mode: 'completion',
      status: 'active',
      lastEdited: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      iconType: 'emoji',
      icon: '🔍',
      iconBackground: '#FEF3C7',
      iconUrl: null,
    },
    {
      id: '5',
      name: 'Email Assistant',
      mode: 'chat',
      status: 'draft',
      lastEdited: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      iconType: 'emoji',
      icon: '✉️',
      iconBackground: '#F0F9FF',
      iconUrl: null,
    },
  ],
}

// Fetch dashboard statistics (using mock data)
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return MOCK_DASHBOARD_DATA.stats
}

// Fetch recent agents (using mock data)
export const fetchRecentAgents = async (): Promise<RecentAgent[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  return MOCK_DASHBOARD_DATA.recentAgents
}

// Fetch all dashboard data in one call (using mock data)
export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600))

  return MOCK_DASHBOARD_DATA
}
