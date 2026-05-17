import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'gold' | 'outline'
}

const variants = {
  default: 'bg-charcoal text-cream',
  gold: 'bg-gold text-charcoal',
  outline: 'border border-charcoal text-charcoal bg-transparent',
}

export default function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs tracking-widest uppercase',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
