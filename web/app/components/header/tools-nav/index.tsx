'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import {
  RiHammerFill,
  RiHammerLine,
} from '@remixicon/react'
import BaseNavItem from '../base-nav-item'

type ToolboxNavProps = {
  className?: string
}

const ToolboxNav = ({
  className,
}: ToolboxNavProps) => {
  const selectedSegment = useSelectedLayoutSegment()
  const isActive = selectedSegment === 'toolbox'

  return (
    <BaseNavItem
      href="/toolbox"
      icon={<RiHammerLine className='h-4 w-4' />}
      activeIcon={<RiHammerFill className='h-4 w-4' />}
      translationKey="common.menus.toolbox"
      isActive={isActive}
      className={className}
    />
  )
}

export default ToolboxNav
