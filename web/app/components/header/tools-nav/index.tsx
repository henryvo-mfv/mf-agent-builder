'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import {
  RiHammerFill,
  RiHammerLine,
} from '@remixicon/react'
import BaseNavItem from '../base-nav-item'

type ToolsNavProps = {
  className?: string
}

const ToolsNav = ({
  className,
}: ToolsNavProps) => {
  const selectedSegment = useSelectedLayoutSegment()
  const isActive = selectedSegment === 'tools'

  return (
    <BaseNavItem
      href="/tools"
      icon={<RiHammerLine className='h-4 w-4' />}
      activeIcon={<RiHammerFill className='h-4 w-4' />}
      translationKey="common.menus.tools"
      isActive={isActive}
      className={className}
    />
  )
}

export default ToolsNav
