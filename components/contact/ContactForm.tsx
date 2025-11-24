'use client'

import { useState, FormEvent } from 'react'
import FormField from './FormField'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!data.name) newErrors.name = 'Name is required'
    if (!data.email) newErrors.email = 'Email is required'
    if (!data.message) newErrors.message = 'Message is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setStatus('idle')
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to send message')

      setStatus('success')
      e.currentTarget.reset()
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 bg-green-50 dark:bg-green-900/20 rounded-lg text-center"
      >
        <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">
          Message Sent!
        </h3>
        <p className="text-green-700 dark:text-green-300">
          Thanks for reaching out. I'll get back to you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <FormField
        label="Name"
        name="name"
        placeholder="John Doe"
        error={errors.name}
        required
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="john@example.com"
        error={errors.email}
        required
      />
      <FormField
        label="Message"
        name="message"
        textarea
        rows={6}
        placeholder="Tell me about your project..."
        error={errors.message}
        required
      />
      
      <div className="mt-8">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      
      {status === 'error' && (
        <div className="mt-4 text-center text-red-500">
          Something went wrong. Please try again.
        </div>
      )}
    </form>
  )
}

