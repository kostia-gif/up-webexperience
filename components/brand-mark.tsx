import { Clover, MessageCircleHeart } from 'lucide-react'
import type { Brand } from '@/lib/course'
import { cn } from '@/lib/utils'

const ICONS = { clover: Clover, speech: MessageCircleHeart }

export function BrandMark({ brand, className }: { brand: Brand; className?: string }) {
  const mark = brand.wordmark ?? { title: brand.name, sub: '' }
  const Icon = ICONS[brand.mark ?? 'clover']
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Icon className="size-6 shrink-0 text-coral sm:size-7" aria-hidden />
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-bold leading-none tracking-tight sm:text-3xl">{mark.title}</span>
        {mark.sub && (
          <span className="mt-0.5 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.14em] opacity-80 sm:text-[10px] sm:tracking-[0.18em]">
            {mark.sub}
          </span>
        )}
      </span>
    </span>
  )
}
