interface TagPillProps {
  label: string
  className?: string
}

export default function TagPill({ label, className = '' }: TagPillProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-foreground/5 text-foreground/70 border border-foreground/10 ${className}`}
    >
      {label}
    </span>
  )
}

