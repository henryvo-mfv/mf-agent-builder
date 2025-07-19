'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import {
  RiSparklingFill,
  RiSparklingLine,
} from '@remixicon/react'
import BaseNavItem from '../base-nav-item'

type ExploreNavProps = {
  className?: string
}

const ExploreNav = ({
  className,
}: ExploreNavProps) => {
  const selectedSegment = useSelectedLayoutSegment()
  const isActive = selectedSegment === 'explore'

  return (
    <BaseNavItem
      href="/explore/apps"
      icon={<RiSparklingLine className='h-4 w-4' />}
      activeIcon={<RiSparklingFill className='h-4 w-4' />}
      translationKey="common.menus.explore"
      isActive={isActive}
      className={className}
    />
  )
}

export default ExploreNav
