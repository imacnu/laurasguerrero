interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
}

export default function StatsCard({ title, value, subtitle, icon }: StatsCardProps) {
  return (
    <div className="border border-charcoal/10 p-6 bg-white">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-widest uppercase text-charcoal/50">{title}</p>
          <p className="mt-2 font-display text-3xl">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-charcoal/50">{subtitle}</p>}
        </div>
        {icon && <div className="text-charcoal/30">{icon}</div>}
      </div>
    </div>
  )
}
