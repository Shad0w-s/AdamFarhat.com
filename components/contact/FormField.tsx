import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  textarea?: boolean
  name?: string
  type?: string
  placeholder?: string
  required?: boolean
  rows?: number
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function FormField({
  label,
  error,
  textarea = false,
  name,
  type = 'text',
  placeholder,
  required,
  rows,
  value,
  onChange,
}: FormFieldProps) {
  const Component = textarea ? 'textarea' : 'input'
      const baseProps = {
        name,
        placeholder,
        required,
        value,
        onChange,
        className: `w-full px-6 py-4 rounded-xl border bg-background focus:ring-2 focus:ring-foreground focus:border-transparent outline-none transition-all ${
          error
            ? 'border-red-500'
            : 'border-foreground/10 focus:border-foreground/20'
        }`,
      }
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground/70 mb-3">
        {label}
      </label>
      {textarea ? (
        <textarea {...baseProps} rows={rows} />
      ) : (
        <input {...baseProps} type={type} />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

