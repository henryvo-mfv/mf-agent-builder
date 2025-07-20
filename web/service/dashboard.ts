import { get } from './base'

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

// Default empty data structures
const EMPTY_DASHBOARD_STATS: DashboardStats = {
  activeAgents: 0,
  drafts: 0,
  recentActivityTasks: 0,
  dataSources: 0,
}

const EMPTY_DASHBOARD_DATA: DashboardData = {
  stats: EMPTY_DASHBOARD_STATS,
  recentAgents: [],
}

// Fetch dashboard statistics
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await get('/dashboard/stats') as DashboardStats
    return response
  }
 catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    return EMPTY_DASHBOARD_STATS
  }
}

// Fetch recent agents
export const fetchRecentAgents = async (limit?: number): Promise<RecentAgent[]> => {
  try {
    const url = limit ? `/dashboard/recent-agents?limit=${limit}` : '/dashboard/recent-agents'
    const response = await get(url) as RecentAgent[]
    return response
  }
 catch (error) {
    console.error('Failed to fetch recent agents:', error)
    return []
  }
}

// Fetch all dashboard data in one call
export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    // Fetch both stats and recent agents
    const [stats, recentAgents] = await Promise.all([
      fetchDashboardStats(),
      fetchRecentAgents(),
    ])

    return {
      stats,
      recentAgents,
    }
  }
 catch (error) {
    console.error('Failed to fetch dashboard data:', error)
    return EMPTY_DASHBOARD_DATA
  }
}
