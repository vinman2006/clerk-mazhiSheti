'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  Plus, 
  Wifi, 
  BatteryCharging, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Radio,
  RefreshCw,
  Sliders
} from 'lucide-react'

export default function SmartDevicesPage() {
  const [devices, setDevices] = useState([
    {
      id: 'd1',
      deviceCode: 'MS-SOIL-PROBE-042',
      name: 'Baramati Soil Multi-Depth Probe #01',
      deviceType: 'SOIL_MOISTURE',
      field: 'Field 02 (Soybean & Wheat Rotation)',
      status: 'ONLINE',
      batteryLevel: 96.0,
      firmwareVersion: 'v2.4.2',
      lastHeartbeat: '18 seconds ago',
      lastReading: 'Moisture: 42.0%, Temp: 24.2°C, EC: 0.38 dS/m',
      gateway: 'LoRaWAN Gateway Node Baramati-North',
    },
    {
      id: 'd2',
      deviceCode: 'MS-SPRINKLER-CTL-108',
      name: 'Smart Sprinkler Solenoid Valve #02',
      deviceType: 'SPRINKLER_CONTROLLER',
      field: 'Field 02 (Soybean & Wheat Rotation)',
      status: 'ONLINE',
      batteryLevel: 98.0,
      firmwareVersion: 'v1.8.0',
      lastHeartbeat: '45 seconds ago',
      lastReading: 'Valve State: Closed / Automation Primed',
      gateway: 'Cellular 4G IoT Gateway',
    },
    {
      id: 'd3',
      deviceCode: 'MS-WEATHER-STN-009',
      name: 'Micro-Climate Agro Weather Station',
      deviceType: 'WEATHER_STATION',
      field: 'Central Farm Hub',
      status: 'ONLINE',
      batteryLevel: 89.0,
      firmwareVersion: 'v3.1.2',
      lastHeartbeat: '2 minutes ago',
      lastReading: 'Air: 28°C, Humidity: 54%, Wind: 9 km/h NE',
      gateway: 'LoRaWAN Gateway Node Baramati-North',
    },
  ])

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>CONNECTED AGRITECH ECOSYSTEM</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            IoT Devices & Hardware Gateways
          </h1>
          <p className="text-xs sm:text-sm font-sans text-blue-200/70">
            3 Active IoT nodes transmitting cryptographic telemetry into the time-series ingestion buffer
          </p>
        </div>

        <button
          onClick={() => alert('Device Provisioning: Connect device QR code scanner or enter unique 16-character Hardware EUI to pair a new sensor node.')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-blue-950/50 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Pair New IoT Sensor</span>
        </button>
      </div>

      {/* Ingestion Architecture Topology Banner */}
      <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-base text-white">Ingestion Pipeline Health</h2>
          <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Zero Packet Loss (100% Delivery)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-blue-200/60 text-[10px]">1. Field Sensors</span>
            <span className="font-bold text-white block">3 Hardware Nodes</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-blue-200/60 text-[10px]">2. Protocol Gateway</span>
            <span className="font-bold text-white block">LoRaWAN + 4G</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-blue-200/60 text-[10px]">3. Ingestion API</span>
            <span className="font-bold text-emerald-400 block">Authenticated ✓</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-blue-200/60 text-[10px]">4. Time-Series Buffer</span>
            <span className="font-bold text-white block">Aggregated</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-blue-200/60 text-[10px]">5. Automation Engine</span>
            <span className="font-bold text-emerald-400 block">Armed & Ready</span>
          </div>
        </div>
      </div>

      {/* Device Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {devices.map((d) => (
          <div
            key={d.id}
            className="rounded-2xl bg-[#0B152E]/90 border border-white/10 hover:border-blue-500/40 p-6 backdrop-blur-xl shadow-xl transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 text-blue-200 border border-white/10">
                  {d.deviceType}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {d.status}
                </span>
              </div>

              <div>
                <h3 className="font-sans font-bold text-base text-white">{d.name}</h3>
                <span className="text-xs font-mono text-blue-300/70">{d.deviceCode}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs font-mono">
                <div className="text-blue-200/60">
                  <span>Location: </span>
                  <strong className="text-white block font-sans">{d.field}</strong>
                </div>
                <div className="text-blue-200/60">
                  <span>Latest Telemetry: </span>
                  <strong className="text-blue-300 block">{d.lastReading}</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-blue-200/60">
              <span>Battery: <strong className="text-white">{d.batteryLevel}%</strong></span>
              <span>Beat: {d.lastHeartbeat}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
