'use client'
import type { FC } from 'react'
import classNames from '@/utils/classnames'
import useTheme from '@/hooks/use-theme'
import { basePath } from '@/utils/var'

export type LogoStyle = 'default' | 'monochromeWhite'

export const logoPathMap: Record<LogoStyle, string> = {
  default: '/logo/logo.png',
  monochromeWhite: '/logo/logo.png',
}

export type LogoSize = 'large' | 'medium' | 'small'

export const logoSizeMap: Record<LogoSize, string> = {
  large: 'w-12 h-12',
  medium: 'w-10 h-10',
  small: 'w-8 h-8',
}

type DifyLogoProps = {
  style?: LogoStyle
  size?: LogoSize
  className?: string
}

const DifyLogo: FC<DifyLogoProps> = ({
  style = 'default',
  size = 'medium',
  className,
}) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={classNames('flex items-center', className)}>
      {/* MoneyForward Logo Image */}
      <img
        src={`${basePath}${logoPathMap[style]}`}
        alt="MoneyForward"
        className={classNames(
          'mr-3 object-contain',
          logoSizeMap[size],
        )}
      />

      {/* MoneyForward Text and AI Agent Builder */}
      <div className="flex flex-col">
        <div className={classNames(
          'font-bold leading-tight',
          isDark ? 'text-white' : 'text-text-primary',
          (() => {
            if (size === 'large') return 'text-lg'
            if (size === 'medium') return 'text-base'
            return 'text-sm'
          })(),
        )}>
          MoneyForward
        </div>
        <div className={classNames(
          'font-medium leading-tight',
          isDark ? 'text-gray-300' : 'text-text-secondary',
          size === 'large' ? 'text-sm' : 'text-xs',
        )}>
          AI Agent Builder
        </div>
      </div>
    </div>
  )
}

export default DifyLogo
