'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {items.map((item, idx) => (
        <div key={idx}>
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="flex w-full items-center justify-between py-4 text-left"
          >
            <span className="text-xs tracking-widest uppercase">{item.title}</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-charcoal/50 transition-transform duration-200',
                open === idx && 'rotate-180'
              )}
            />
          </button>
          {open === idx && (
            <div className="pb-4 text-sm text-charcoal/70 leading-relaxed">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  )
}
