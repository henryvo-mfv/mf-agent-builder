'use client'
import React from 'react'
import cn from 'classnames'
import { useSearchParams } from 'next/navigation'
import Header from '../signin/_header'
import ForgotPasswordForm from './ForgotPasswordForm'
import ChangePasswordForm from '@/app/forgot-password/ChangePasswordForm'
import useDocumentTitle from '@/hooks/use-document-title'
import { useGlobalPublicStore } from '@/context/global-public-context'

const ForgotPassword = () => {
  useDocumentTitle('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { systemFeatures } = useGlobalPublicStore()

  return (
    <div className={cn('flex min-h-screen w-full justify-center bg-background-default-burn p-6')}>
      <div className={cn('flex w-full shrink-0 flex-col rounded-2xl border border-effects-highlight bg-background-default-subtle')}>
        <Header />
        {token ? <ChangePasswordForm /> : <ForgotPasswordForm />}
        {!systemFeatures.branding.enabled && <div className='px-8 py-6 text-sm font-normal text-text-tertiary'>
          © {new Date().getFullYear()} Money Forward, Corp. All rights reserved.
        </div>}
      </div>
    </div>
  )
}

export default ForgotPassword
