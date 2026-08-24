'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGsapAnimations() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered section reveals
      const revealElements = gsap.utils.toArray<HTMLElement>('.gsap-reveal')
      revealElements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            y: 35,
            opacity: 0,
            filter: 'blur(4px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // 2. Staggered Grid Card Batches
      const staggerGroups = gsap.utils.toArray<HTMLElement>('.gsap-stagger-group')
      staggerGroups.forEach((group) => {
        const items = group.querySelectorAll('.gsap-stagger-item')
        if (items.length > 0) {
          gsap.fromTo(
            items,
            {
              y: 40,
              opacity: 0,
              scale: 0.96,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })

      // 3. Floating ambient badges / icons
      const floatItems = gsap.utils.toArray<HTMLElement>('.gsap-float')
      floatItems.forEach((el, index) => {
        gsap.to(el, {
          y: (index % 2 === 0 ? -8 : 8),
          duration: 2.5 + (index % 3) * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // 4. Parallax depth elements on scroll
      const parallaxItems = gsap.utils.toArray<HTMLElement>('.gsap-parallax')
      parallaxItems.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.15')
        gsap.to(el, {
          y: () => -(ScrollTrigger.maxScroll(window) * speed),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })

      // 5. Magnetic CTA buttons
      const magneticButtons = gsap.utils.toArray<HTMLElement>('.gsap-magnetic')
      magneticButtons.forEach((btn) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          gsap.to(btn, {
            x: x * 0.28,
            y: y * 0.28,
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        const handleMouseLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)',
          })
        }

        btn.addEventListener('mousemove', handleMouseMove)
        btn.addEventListener('mouseleave', handleMouseLeave)
      })

      // 6. Interactive Card 3D Tilt and Border Shine
      const interactiveCards = gsap.utils.toArray<HTMLElement>('.gsap-card')
      interactiveCards.forEach((card) => {
        const handleCardMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5

          gsap.to(card, {
            rotationY: x * 8,
            rotationX: -y * 8,
            transformPerspective: 900,
            duration: 0.35,
            ease: 'power1.out',
          })
        }

        const handleCardLeave = () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.7,
            ease: 'power2.out',
          })
        }

        card.addEventListener('mousemove', handleCardMove)
        card.addEventListener('mouseleave', handleCardLeave)
      })
    }, containerRef)

    // Refresh ScrollTrigger calculations after full rendering
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 400)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [])

  return { containerRef }
}
