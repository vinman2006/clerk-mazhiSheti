'use client'

import React, { useState } from 'react'
import { MapPin, ExternalLink, Navigation } from 'lucide-react'

interface OpenStreetMapProps {
  lat?: number
  lng?: number
  zoom?: number
  title?: string
  address?: string
  className?: string
}

export function OpenStreetMap({
  lat = 21.0504,
  lng = 79.0531,
  zoom = 15,
  title = 'St. Vincent Pallotti College of Engineering & Technology',
  address = 'Gavsi Manapur, Wardha Road, Nagpur, Maharashtra 441108',
  className = ''
}: OpenStreetMapProps) {
  // Bounding box for OpenStreetMap embed
  const delta = 0.008
  const bbox = `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`
  const osmDirectUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

  return (
    <div className={`rounded-xl bg-[#0D1322] border border-white/10 overflow-hidden shadow-xl ${className}`}>
      {/* Map Header */}
      <div className="p-4 bg-[#141B2D] border-b border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-nexora-orange-500/15 border border-nexora-orange-500/30 flex items-center justify-center text-nexora-orange-400 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-white flex items-center gap-2">
              <span>{title}</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono text-neutral-300">
                Demo Token Location
              </span>
            </h4>
            <p className="text-[11px] font-sans text-neutral-400 mt-0.5">
              {address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={osmDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all"
          >
            <span>OpenStreetMap</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Map Iframe */}
      <div className="relative w-full h-64 sm:h-72 bg-[#090D18]">
        <iframe
          title="OpenStreetMap Location"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={osmEmbedUrl}
          className="w-full h-full filter contrast-[1.05]"
        />

        {/* Overlay Disclaimer Pill */}
        <div className="absolute bottom-2 left-2 z-10 px-2.5 py-1 rounded-md bg-[#070A10]/90 backdrop-blur-md border border-white/15 text-[10px] font-mono text-neutral-300 shadow-md">
          © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-nexora-orange-400 hover:underline">OpenStreetMap</a> contributors
        </div>
      </div>
    </div>
  )
}
