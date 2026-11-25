import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Placeholder } from './ui'

export type Clip = { id: string; name: string; employer: string; caption: string; tone: string }

/** Vertical, swipeable clips with names and employers. Placeholders until UP supplies video. */
export function VideoReel({ clips, id }: { clips: Clip[]; id?: string }) {
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-3">
      <ul className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
        {clips.map((c) => (
          <li key={c.id} className="w-[62vw] max-w-[240px] shrink-0 snap-start sm:w-56">
            <button
              type="button"
              className={cn('relative flex aspect-[9/16] w-full flex-col justify-end overflow-hidden rounded-xl p-3 text-left text-primary-foreground', c.tone)}
              aria-label={`Play ${c.name}, ${c.employer} (placeholder video)`}
            >
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-background/90 text-foreground">
                  <Play className="ml-0.5 size-5" aria-hidden />
                </span>
              </span>
              <span className="relative flex flex-col gap-0.5 rounded-md bg-foreground/70 p-2 text-xs backdrop-blur-sm">
                <span className="font-medium">{c.name}</span>
                <span className="opacity-80">{c.employer}</span>
                <span className="mt-1 leading-snug opacity-90">{c.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground">
        <Placeholder /> Graduate names, airlines and clips are placeholders.
      </p>
    </div>
  )
}
