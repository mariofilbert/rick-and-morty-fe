'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Characters' },
    { href: '/episodes', label: 'Episodes' },
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300" 
         style={{ 
           backgroundColor: 'rgba(var(--background-rgb), 0.8)',
           borderColor: 'var(--card-border)' 
         }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="text-xl font-bold transition-all duration-300 hover:scale-105"
            style={{ color: 'var(--foreground)' }}
          >
            <span className="text-glow" style={{ color: 'var(--primary)' }}>
              Rick & Morty
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        px-3 py-2 text-sm font-medium transition-all duration-300
                        hover:scale-105 relative
                        ${isActive 
                          ? 'text-glow' 
                          : 'hover:text-glow'
                        }
                      `}
                      style={{ 
                        color: isActive ? 'var(--primary)' : 'var(--foreground-muted)' 
                      }}
                    >
                      {item.label}
                      {isActive && (
                        <span 
                          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                          style={{ backgroundColor: 'var(--primary)' }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}