import React from 'react'

export interface Project {
  id: string
  name: string
  permissions: string
  owner: string
  group: string
  size: string
  date: string
  tagline: string
  synopsis: string
  description: string
  architecture: string[]
  stack: string[]
  period: string
  role: string
  status: 'ACTIVE' | 'PRODUCTION' | 'MAINTENANCE' | 'ARCHIVED'
  metrics?: string[]
  notes?: string
  repoUrl?: string
  liveUrl?: string
  flags?: { flag: string; description: string }[]
}

export interface OpenSourceRepo {
  name: string
  fullName: string
  stars: number
  forks: number
  language: string
  description: string
  url: string
  topics: string[]
  commitsBadge?: string
}

export interface JourneyMilestone {
  hash: string
  date: string
  tag?: string
  role: string
  company: string
  location: string
  description: string
  highlights: string[]
}

export interface StackCategory {
  title: string
  level: string
  items: {
    name: string
    description: string
    tag?: string
    years?: string
  }[]
}

export interface SystemProfilerSection {
  category: string
  items: {
    label: string
    value: string
    detail?: string
  }[]
}

export interface PhotoFrame {
  id: number
  title: string
  category: string
  location?: string
  date?: string
  exif?: {
    camera: string
    lens: string
    iso: string
    aperture: string
    shutter: string
  }
  storageKey: string
}

export interface TerminalOutputItem {
  id: string
  type: 'command' | 'output' | 'error' | 'success' | 'system'
  content: string | React.ReactNode
  timestamp?: string
}
