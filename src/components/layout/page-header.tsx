import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  backLink?: {
    href: string
    label: string
  }
  navLink?: {
    href: string
    label: string
    icon?: ReactNode
  }
}

export function PageHeader({ 
  title, 
  subtitle, 
  icon, 
  backLink, 
  navLink 
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div className="flex-1">
        {backLink && (
          <Link 
            href={backLink.href}
            className="inline-flex items-center gap-2 mb-4 transition-all duration-300 hover:scale-105 dark:hover:text-glow"
            style={{ color: 'var(--foreground-muted)' }}
          >
            <ArrowLeft className="h-5 w-5" />
            {backLink.label}
          </Link>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold transition-colors duration-300" style={{ color: 'var(--foreground)' }}>
          {icon && (
            <span className="inline-block mr-3" style={{ color: 'var(--primary)' }}>
              {icon}
            </span>
          )}
          {title}
          {subtitle && (
            <span className="block text-2xl md:text-3xl font-light mt-2">
              <span className="text-glow" style={{ color: 'var(--primary)' }}>
                {subtitle}
              </span>
            </span>
          )}
        </h1>

        {navLink && (
          <Link 
            href={navLink.href}
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ 
              color: 'var(--foreground)',
              borderColor: 'var(--card-border)',
              backgroundColor: 'var(--card-bg)'
            }}
          >
            {navLink.icon}
            {navLink.label}
          </Link>
        )}
      </div>
    </div>
  )
}