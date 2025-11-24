import { ReactNode } from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import SkipLink from '../common/SkipLink'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <SiteHeader />
      <main id="main-content" className="flex-grow" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
