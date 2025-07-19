'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RiApps2AddLine, RiBuilding2Line, RiRocket2Line, RiStarLine } from '@remixicon/react'

const Home = () => {
  const router = useRouter()

  // Redirect authenticated users to dashboard
  useEffect(() => {
    const consoleToken = localStorage?.getItem('console_token')
    const refreshToken = localStorage?.getItem('refresh_token')

    if (consoleToken && refreshToken)
      router.replace('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen bg-background-default-subtle">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background-default-subtle to-background-body px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
            AI Agent Builder for Back Office Operations
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
            MoneyForward AI Agent Builder is a no-code platform for businesses which automates and streamlines accounting, HR, and back office operations through intelligent AI agents.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/dashboard"
              className="rounded-lg bg-components-button-primary-bg px-8 py-4 text-base font-semibold text-components-button-primary-text shadow-md transition-all duration-200 hover:bg-components-button-primary-bg-hover hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-components-button-primary-bg"
            >
              Start Building AI Agents
            </Link>
            <Link href="/signin" className="px-4 py-2 text-base font-semibold leading-6 text-text-primary transition-colors hover:text-text-accent">
              Sign in <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-background-body py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#ff7a00] sm:text-4xl">AI Agent Solutions for Business Operations</h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* MoneyForward AI Apps - Personal/Team Service */}
            <div className="group flex flex-col rounded-2xl border border-components-panel-border-subtle bg-background-default-subtle p-8 shadow-sm transition-all duration-200 hover:border-components-button-primary-bg hover:shadow-md">
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-xl bg-components-button-primary-bg p-3 shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <RiApps2AddLine className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">MoneyForward AI Apps</h3>
                  <p className="text-sm text-text-secondary">Personal AI Agent Development</p>
                </div>
              </div>
              <p className="grow leading-7 text-text-secondary">
                A Personal AI Management (PIM) service that visualizes in real-time the current state of and issues concerning AI applications and workflows, with an aim to resolve identified issues.
              </p>
              <div className="mt-8">
                <Link
                  href="/apps"
                  className="inline-flex items-center gap-2 rounded-lg bg-components-button-primary-bg px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-components-button-primary-bg-hover hover:shadow-md"
                >
                  Get Started
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* MoneyForward AI Enterprise - Business Service */}
            <div className="group flex flex-col rounded-2xl border border-components-panel-border-subtle bg-background-default-subtle p-8 shadow-sm transition-all duration-200 hover:border-components-button-primary-bg hover:shadow-md">
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-xl bg-components-button-primary-bg p-3 shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <RiBuilding2Line className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">MoneyForward AI Enterprise</h3>
                  <p className="text-sm text-text-secondary">Enterprise AI Agent Solutions</p>
                </div>
              </div>
              <p className="grow leading-7 text-text-secondary">
                A cloud service for businesses that visualizes in real-time the current state of and issues tied to companies' AI operations, with an aim to resolve identified issues.
              </p>
              <div className="mt-8">
                <Link
                  href="/apps?tab=explore"
                  className="inline-flex items-center gap-2 rounded-lg border border-components-button-secondary-border bg-components-button-secondary-bg px-4 py-2 font-medium text-components-button-secondary-text shadow-sm transition-all duration-200 hover:border-components-button-secondary-border-hover hover:bg-components-button-secondary-bg-hover hover:shadow-md"
                >
                  Learn More
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background-default-subtle py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-[#ff7a00]">Platform Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Everything you need to automate your business operations
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
              <div className="group flex flex-col items-start rounded-xl border border-components-panel-border-subtle bg-background-default-subtle p-6 shadow-sm transition-all duration-200 hover:border-components-button-primary-bg hover:shadow-md">
                <div className="rounded-lg bg-components-button-primary-bg p-3 shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <RiRocket2Line className="h-6 w-6 text-white" />
                </div>
                <dt className="mt-4 text-lg font-semibold text-text-primary">Rapid Development</dt>
                <dd className="mt-2 leading-7 text-text-secondary">
                  Build AI agents quickly with visual workflow designer and pre-built MoneyForward service integrations.
                </dd>
              </div>
              <div className="group flex flex-col items-start rounded-xl border border-components-panel-border-subtle bg-background-default-subtle p-6 shadow-sm transition-all duration-200 hover:border-components-button-primary-bg hover:shadow-md">
                <div className="rounded-lg bg-components-button-primary-bg p-3 shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <RiStarLine className="h-6 w-6 text-white" />
                </div>
                <dt className="mt-4 text-lg font-semibold text-text-primary">Enterprise Ready</dt>
                <dd className="mt-2 leading-7 text-text-secondary">
                  Scale your AI agents with enterprise-grade security, monitoring, and seamless deployment across MoneyForward Cloud services.
                </dd>
              </div>
              <div className="group flex flex-col items-start rounded-xl border border-components-panel-border-subtle bg-background-default-subtle p-6 shadow-sm transition-all duration-200 hover:border-components-button-primary-bg hover:shadow-md">
                <div className="rounded-lg bg-components-button-primary-bg p-3 shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <RiApps2AddLine className="h-6 w-6 text-white" />
                </div>
                <dt className="mt-4 text-lg font-semibold text-text-primary">MoneyForward Integration</dt>
                <dd className="mt-2 leading-7 text-text-secondary">
                  Connect seamlessly with MoneyForward Cloud Accounting, HR, Expense Management, and all 20+ business services.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background-body">
        <div className="px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Ready to automate your back office operations?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-text-secondary">
              Join thousands of businesses streamlining their operations with MoneyForward AI agents.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/apps"
                className="rounded-lg bg-components-button-primary-bg px-8 py-4 text-base font-semibold text-components-button-primary-text shadow-md transition-all duration-200 hover:bg-components-button-primary-bg-hover hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-components-button-primary-bg"
              >
                Start Building Now
              </Link>
              <Link href="/apps?tab=explore" className="px-4 py-2 text-base font-semibold leading-6 text-text-primary transition-colors hover:text-text-accent">
                Explore Templates <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t border-components-panel-border-subtle bg-background-default-subtle">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-text-primary">MoneyForward AI Agent Builder</h3>
              <p className="text-sm text-text-secondary">
                Build intelligent automation agents that integrate seamlessly with MoneyForward's comprehensive business platform.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-text-primary">Accounting and Tax</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Cloud Accounting</li>
                <li>• Cloud Accounting Plus</li>
                <li>• Cloud Tax Return</li>
                <li>• Invoice Processing</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-text-primary">AI Agent Templates</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Invoice Processing Automation</li>
                <li>• Employee Onboarding Workflows</li>
                <li>• Expense Approval Systems</li>
                <li>• Financial Reporting Agents</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-components-panel-border-subtle pt-8 text-center">
            <p className="text-sm text-text-secondary">
              Powered by MoneyForward's trusted financial technology platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
