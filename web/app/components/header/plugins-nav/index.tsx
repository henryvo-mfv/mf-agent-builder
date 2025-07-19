'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import {
  RiPuzzleFill,
  RiPuzzleLine,
} from '@remixicon/react'
import BaseNavItem from '../base-nav-item'
import { usePluginTaskStatus } from '@/app/components/plugins/plugin-page/plugin-tasks/hooks'
import Indicator from '@/app/components/header/indicator'
import DownloadingIcon from './downloading-icon'

type PluginsNavProps = {
  className?: string
}

const PluginsNav = ({
  className,
}: PluginsNavProps) => {
  const selectedSegment = useSelectedLayoutSegment()
  const isActive = selectedSegment === 'plugins'
  const {
    isInstalling,
    isInstallingWithError,
    isFailed,
  } = usePluginTaskStatus()

  // Create custom icon element with status indicators
  const createIcon = (filled: boolean) => (
    <div className="relative">
      {/* Status indicator */}
      {(isFailed || isInstallingWithError) && !isActive && (
        <Indicator
          color='red'
          className='absolute -left-1 -top-1 z-10'
        />
      )}

      {/* Main icon */}
      {(!(isInstalling || isInstallingWithError) || isActive) && (
        filled ? <RiPuzzleFill className='h-4 w-4' /> : <RiPuzzleLine className='h-4 w-4' />
      )}

      {/* Downloading icon */}
      {(isInstalling || isInstallingWithError) && !isActive && (
        <DownloadingIcon />
      )}
    </div>
  )

  return (
    <BaseNavItem
      href="/plugins"
      icon={createIcon(false)}
      activeIcon={createIcon(true)}
      translationKey="common.menus.plugins"
      isActive={isActive}
      className={`${className} plugins-nav-button`} // preserve the plugins-nav-button class for animations
    />
  )
}

export default PluginsNav
