'use client'

type EventProps = {
  action: string
  category: string
  label: string
  value?: number
}

export const pageview = (url: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Pageview: ${url}`)
  }
}

export const event = ({ action, category, label, value }: EventProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Event: ${action} - ${category} - ${label} ${value ? `- ${value}` : ''}`)
  }
}

