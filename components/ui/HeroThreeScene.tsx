'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 28

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    container.appendChild(renderer.domElement)

    // Groups for organized layered rotation
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    const particlesGroup = new THREE.Group()
    mainGroup.add(particlesGroup)

    // 1. Interactive Neural / Cryptographic Particle Nodes
    const particleCount = 140
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const particleVelocities: { x: number; y: number; z: number }[] = []

    const colorPalette = [
      new THREE.Color('#F5820D'), // Nexora Orange
      new THREE.Color('#2DE8C8'), // Teal
      new THREE.Color('#3B82F6'), // Cyber Blue
      new THREE.Color('#818CF8'), // Indigo / Violet
      new THREE.Color('#60A5FA'), // Sky
    ]

    for (let i = 0; i < particleCount; i++) {
      const radius = 16 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = (radius * Math.sin(phi) * Math.sin(theta)) * 0.75
      const z = (radius * Math.cos(phi)) * 0.8

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.015,
      })

      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = chosenColor.r
      colors[i * 3 + 1] = chosenColor.g
      colors[i * 3 + 2] = chosenColor.b
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Crisp glowing circular point texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)')
        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 64, 64)
      }
      return new THREE.CanvasTexture(canvas)
    }

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      map: createCircleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const pointCloud = new THREE.Points(particleGeometry, particleMaterial)
    particlesGroup.add(pointCloud)

    // 2. Dynamic Connecting Lines Mesh (Cryptographic Mesh)
    const maxConnections = 350
    const linePositions = new Float32Array(maxConnections * 6)
    const lineColors = new Float32Array(maxConnections * 6)

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage))
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage))

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
    particlesGroup.add(lineMesh)

    // 3. Central Cryptographic Polyhedron (Icosahedron Wireframe & Inner Core)
    const icoGeometry = new THREE.IcosahedronGeometry(7.5, 1)
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x2DE8C8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    })
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial)
    mainGroup.add(icoMesh)

    const innerCoreGeometry = new THREE.OctahedronGeometry(4.2, 0)
    const innerCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xF5820D,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    })
    const innerCoreMesh = new THREE.Mesh(innerCoreGeometry, innerCoreMaterial)
    mainGroup.add(innerCoreMesh)

    // Floating cryptographic orbit rings
    const ringGeometry = new THREE.TorusGeometry(12.5, 0.05, 16, 100)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    })
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial)
    ringMesh.rotation.x = Math.PI / 3
    mainGroup.add(ringMesh)

    const ring2Geometry = new THREE.TorusGeometry(14.5, 0.04, 16, 100)
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0xF5820D,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
    })
    const ring2Mesh = new THREE.Mesh(ring2Geometry, ring2Material)
    ring2Mesh.rotation.x = -Math.PI / 4
    ring2Mesh.rotation.y = Math.PI / 6
    mainGroup.add(ring2Mesh)

    // Mouse Interaction
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX = (e.clientX / innerWidth - 0.5) * 2
      mouseY = -(e.clientY / innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Pause rendering when element is not visible in viewport
    let isVisible = true
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    // Animation Loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!isVisible) return

      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse interpolation (inertia)
      targetX += (mouseX * 0.45 - targetX) * 0.05
      targetY += (mouseY * 0.3 - targetY) * 0.05

      // Rotate groups
      mainGroup.rotation.y = elapsedTime * 0.05 + targetX
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.04) * 0.1 + targetY
      mainGroup.rotation.z = Math.cos(elapsedTime * 0.03) * 0.05

      icoMesh.rotation.y = -elapsedTime * 0.08
      icoMesh.rotation.x = elapsedTime * 0.05

      innerCoreMesh.rotation.y = elapsedTime * 0.12
      innerCoreMesh.rotation.z = -elapsedTime * 0.07

      ringMesh.rotation.z = elapsedTime * 0.04
      ring2Mesh.rotation.z = -elapsedTime * 0.03

      // Update particle positions and compute dynamic distance-based network lines
      const posAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute
      const pArray = posAttr.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        pArray[i * 3] += particleVelocities[i].x
        pArray[i * 3 + 1] += particleVelocities[i].y
        pArray[i * 3 + 2] += particleVelocities[i].z

        // Bounce back inside sphere boundaries
        const dist = Math.sqrt(
          pArray[i * 3] ** 2 + pArray[i * 3 + 1] ** 2 + pArray[i * 3 + 2] ** 2
        )
        if (dist > 22 || dist < 6) {
          particleVelocities[i].x *= -1
          particleVelocities[i].y *= -1
          particleVelocities[i].z *= -1
        }
      }
      posAttr.needsUpdate = true

      // Recompute connections
      let lineIndex = 0
      let colorIndex = 0
      const connectDistance = 5.5

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = pArray[i * 3] - pArray[j * 3]
          const dy = pArray[i * 3 + 1] - pArray[j * 3 + 1]
          const dz = pArray[i * 3 + 2] - pArray[j * 3 + 2]
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < connectDistance && lineIndex < maxConnections) {
            linePositions[lineIndex * 6] = pArray[i * 3]
            linePositions[lineIndex * 6 + 1] = pArray[i * 3 + 1]
            linePositions[lineIndex * 6 + 2] = pArray[i * 3 + 2]

            linePositions[lineIndex * 6 + 3] = pArray[j * 3]
            linePositions[lineIndex * 6 + 4] = pArray[j * 3 + 1]
            linePositions[lineIndex * 6 + 5] = pArray[j * 3 + 2]

            const alpha = 1.0 - distance / connectDistance
            lineColors[colorIndex * 6] = 0.95 * alpha
            lineColors[colorIndex * 6 + 1] = 0.5 * alpha
            lineColors[colorIndex * 6 + 2] = 0.05 * alpha

            lineColors[colorIndex * 6 + 3] = 0.17 * alpha
            lineColors[colorIndex * 6 + 4] = 0.91 * alpha
            lineColors[colorIndex * 6 + 5] = 0.78 * alpha

            lineIndex++
            colorIndex++
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex * 2)
      lineGeometry.getAttribute('position').needsUpdate = true
      lineGeometry.getAttribute('color').needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }

      particleGeometry.dispose()
      particleMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      icoGeometry.dispose()
      icoMaterial.dispose()
      innerCoreGeometry.dispose()
      innerCoreMaterial.dispose()
      ringGeometry.dispose()
      ringMaterial.dispose()
      ring2Geometry.dispose()
      ring2Material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  )
}
