'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Users, Tv, Search, Heart } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const featureCardsRef = useRef<HTMLDivElement[]>([])
  const particlesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Portal smooth floating animation
    gsap.set(portalRef.current, { scale: 1 })
    
    // Create a timeline for smooth coordinated animation
    const tl = gsap.timeline({ repeat: -1 })
    
    tl.to(portalRef.current, {
      y: -15,
      scale: 1.1,
      duration: 3,
      ease: "sine.inOut"
    })
    .to(portalRef.current, {
      y: 15,
      scale: 0.95,
      duration: 3,
      ease: "sine.inOut"
    })
    .to(portalRef.current, {
      y: 0,
      scale: 1,
      duration: 3,
      ease: "sine.inOut"
    })

    // Animate background particles
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        // Different movement for each particle
        gsap.to(particle, {
          y: index % 2 === 0 ? -20 : 20,
          x: index % 3 === 0 ? 15 : -15,
          duration: 3 + index,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true
        })
        
        // Opacity pulse
        gsap.to(particle, {
          opacity: 0.8,
          duration: 2 + index * 0.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true
        })
      }
    })

    // Feature boxes animation
    if (featureCardsRef.current.length > 0) {
      gsap.set(featureCardsRef.current, { 
        opacity: 0, 
        y: 50, 
        scale: 0.8 
      })
      
      gsap.to(featureCardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    }
  }, [])

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Character Explorer",
      description: "Browse through 800+ characters from the Rick and Morty universe with detailed information."
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Advanced Filters",
      description: "Search by name, filter by status, species, gender, and save your favorite characters."
    },
    {
      icon: <Tv className="h-8 w-8" />,
      title: "Episode Guide", 
      description: "Explore all episodes with character appearances and detailed information."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Favorites System",
      description: "Save your favorite characters and access them quickly with persistent storage."
    }
  ]

  const particles = [
    { top: '20%', left: '10%', size: 'w-4 h-4' },
    { top: '40%', right: '20%', size: 'w-2 h-2' },
    { bottom: '40%', left: '20%', size: 'w-3 h-3' },
    { bottom: '20%', right: '10%', size: 'w-5 h-5' },
    { top: '32%', left: '33%', size: 'w-3 h-3' },
    { top: '60%', right: '25%', size: 'w-2 h-2' },
    { bottom: '60%', left: '25%', size: 'w-4 h-4' },
    { bottom: '32%', right: '33%', size: 'w-3 h-3' },
    { top: '33%', left: '16%', size: 'w-2 h-2' },
    { top: '66%', right: '16%', size: 'w-5 h-5' },
    { bottom: '33%', left: '32%', size: 'w-3 h-3' },
    { bottom: '66%', right: '32%', size: 'w-2 h-2' },
  ]

  return (
    <div ref={containerRef} className="min-h-screen transition-colors duration-500" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Animation - Floating particles */}
        <div className="absolute inset-0 opacity-20">
          {particles.map((particle, index) => (
            <div
              key={index}
              ref={(el) => { if (el) particlesRef.current[index] = el }}
              className={`absolute ${particle.size} rounded-full`}
              style={{
                backgroundColor: 'var(--primary)',
                filter: 'blur(1px)',
                ...particle
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Portal Animation */}
          <div ref={portalRef} className="w-40 h-40 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full" style={{ 
              background: 'conic-gradient(from 0deg, var(--primary), transparent, var(--primary))',
              filter: 'blur(4px)'
            }}></div>
            <div className="absolute inset-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
              <span className="text-4xl font-bold dark:text-glow" style={{ color: 'var(--primary)' }}>R&M</span>
            </div>
          </div>

          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 dark:text-glow" style={{ color: 'var(--foreground)' }}>
            Rick & Morty
            <br />
            <span style={{ color: 'var(--primary)' }}>Explorer</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ color: 'var(--foreground-muted)' }}>
            Dive into the multiverse and explore characters, episodes, and dimensions from the Rick and Morty universe, powered by science!
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/character"
              className="group flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Explore Characters
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/episodes"
              className="flex items-center gap-3 px-8 py-4 rounded-lg border font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                color: 'var(--foreground)'
              }}
            >
              <Tv className="h-6 w-6" />
              Browse Episodes
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 dark:text-glow" style={{ color: 'var(--foreground)' }}>
            Features from Another <span style={{ color: 'var(--primary)' }}>Dimension</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                ref={(el) => {
                  if (el && !featureCardsRef.current.includes(el)) {
                    featureCardsRef.current[index] = el
                  }
                }}
                className="feature-card glow-card rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105" 
                style={{ backgroundColor: 'var(--card-bg)' }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)20', color: 'var(--primary)' }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 dark:text-glow" style={{ color: 'var(--foreground)' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--foreground-muted)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="glow-card rounded-3xl p-12 max-w-4xl mx-auto" style={{ backgroundColor: 'var(--card-bg)' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-glow" style={{ color: 'var(--foreground)' }}>
              Ready to Explore the Multiverse?
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--foreground-muted)' }}>
              Join millions of fans discovering characters, episodes, and Easter eggs from the Rick and Morty universe.
            </p>
            <Link
              href="/character"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-lg font-semibold text-xl transition-all duration-300 hover:scale-105 text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Start Exploring Now
              <ArrowRight className="h-7 w-7" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}