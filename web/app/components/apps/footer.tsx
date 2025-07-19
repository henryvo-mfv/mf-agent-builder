import React from 'react'
import Link from 'next/link'
import { RiExternalLinkLine, RiGlobalLine } from '@remixicon/react'
import { useTranslation } from 'react-i18next'

type CustomLinkProps = {
  href: string
  children: React.ReactNode
  text?: string
}

const CustomLink = React.memo(({
  href,
  children,
  text,
}: CustomLinkProps) => {
  return (
    <Link
      className='flex cursor-pointer items-center gap-2 text-text-secondary transition-opacity duration-200 ease-in-out hover:text-text-primary hover:opacity-80'
      target='_blank'
      rel='noopener noreferrer'
      href={href}
    >
      <div className='flex h-8 w-8 items-center justify-center'>
        {children}
      </div>
      {text && <span className='system-sm-medium'>{text}</span>}
    </Link>
  )
})

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className='shrink-0 grow-0 px-12 py-6'>
      <h3 className='text-gradient text-xl font-semibold leading-tight'>{t('app.join')}</h3>
      <p className='system-sm-regular mt-1 text-text-tertiary'>{t('app.communityIntro')}</p>
      <div className='mt-4 flex items-center gap-6'>
        <CustomLink href='https://corp.moneyforward.com/en/' text='MoneyForward Corporate'>
          <RiGlobalLine className='h-5 w-5' />
        </CustomLink>
        <CustomLink href='https://corp.moneyforward.com/en/service/' text='Our Services'>
          <RiExternalLinkLine className='h-5 w-5' />
        </CustomLink>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
