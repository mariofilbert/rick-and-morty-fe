'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'var(--background)' }}>
      <div className="text-center max-w-md mx-auto px-6">
        <div className="glow-card rounded-2xl p-8 mb-8" style={{ backgroundColor: 'var(--card-bg)' }}>
          {/* Portal-like animation */}
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full animate-spin" style={{ 
              background: 'conic-gradient(from 0deg, var(--primary), transparent, var(--primary))',
              filter: 'blur(2px)'
            }}></div>
            <div className="absolute inset-2 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
              <span className="text-6xl font-bold" style={{ color: 'var(--primary)' }}>404</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 dark:text-glow" style={{ color: 'var(--foreground)' }}>
            Dimension Not Found
          </h1>
          
          <p className="text-lg mb-6" style={{ color: 'var(--foreground-muted)' }}>
            Looks like you&apos;ve wandered into the wrong dimension! This page doesn&apos;t exist in any timeline.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <Home className="h-5 w-5" />
              Back to Characters
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border font-medium transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                color: 'var(--foreground)'
              }}
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </button>
          </div>
        </div>
        
        <p className="text-sm" style={{ color: 'var(--foreground-subtle)' }}>
          &ldquo;Sometimes science is more art than science, Morty.&rdquo; - Rick Sanchez
        </p>
      </div>
    </div>
  )
}