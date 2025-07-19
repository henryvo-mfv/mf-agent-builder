'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import {
  RiGridFill,
  RiGridLine,
} from '@remixicon/react'
import BaseNavItem from '../base-nav-item'

type DashboardNavProps = {
  className?: string
}

const DashboardNav = ({
  className,
}: DashboardNavProps) => {
  const selectedSegment = useSelectedLayoutSegment()
  const isActive = selectedSegment === 'dashboard'

  return (
    <BaseNavItem
      href="/dashboard"
      icon={<RiGridLine className='h-4 w-4' />}
      activeIcon={<RiGridFill className='h-4 w-4' />}
      translationKey="common.menus.dashboard"
      isActive={isActive}
      className={className}
    />
  )
}

export default DashboardNav
