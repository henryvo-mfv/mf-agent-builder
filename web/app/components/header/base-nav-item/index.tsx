'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import classNames from '@/utils/classnames'
import type { ReactNode } from 'react'

type BaseNavItemProps = {
  href: string
  icon: ReactNode
  activeIcon: ReactNode
  translationKey: string
  isActive: boolean
  className?: string
}

const BaseNavItem = ({
  href,
  icon,
  activeIcon,
  translationKey,
  isActive,
  className,
}: BaseNavItemProps) => {
  const { t } = useTranslation()

  return (
    <Link
      href={href}
      className={classNames(
        // Base styles
        'group relative flex h-9 items-center rounded-lg px-4',
        'cursor-pointer text-sm transition-all duration-200',
        // Default state
        'text-[#4A4A4A]',
        // Hover state
        'hover:bg-[#F5F5F5] hover:text-[#2A2A2A]',
        // Active state
        isActive && [
          'font-bold text-[#FF7A00]', // MoneyForward orange brand color
          'after:absolute after:bottom-0 after:left-0 after:right-0',
          'after:h-0.5 after:rounded-t-sm after:bg-[#FF7A00]',
        ],
        className,
      )}
    >
      {/* Icon */}
      <div className="mr-2 flex items-center">
        {isActive ? activeIcon : icon}
      </div>

      {/* Text - hidden on smaller screens */}
      <span className="max-[1024px]:hidden">
        {t(translationKey)}
      </span>
    </Link>
  )
}

export default BaseNavItem
