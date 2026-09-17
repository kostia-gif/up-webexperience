'use client'

import { Module } from '../primitives'
import { AcademicLeadContent } from './academic-lead'
import { CareerLadderContent } from './career-ladder'
import { usePostgrad } from './context'
import { Expander } from './expander'
import { PathwayLadderContent } from './pathway-ladder'
import { StudyRhythmContent } from './study-rhythm'

export function DigDeeper() {
  const { pg } = usePostgrad()
  const { studyRhythm, pathwayLadder, careerLadder, academicLead } = pg
  if (!studyRhythm && !pathwayLadder && !careerLadder && !academicLead) return null

  return (
    <Module id="deeper" eyebrow="Want the detail?" title="Dig deeper, only if you want to" wide>
      <p className="-mt-2 mb-6 max-w-[620px] text-[15px] leading-relaxed text-pretty text-muted-foreground">
        Everything above is enough to decide whether to talk to us. These four panels are for when you want to go further before you do.
      </p>
      <div className="flex flex-col gap-3">
        {studyRhythm && (
          <Expander id="deeper-rhythm" title={studyRhythm.title} summary={`${studyRhythm.weeks}-week trimesters · ${studyRhythm.perBlock} · one live evening a week`}>
            <StudyRhythmContent sr={studyRhythm} />
          </Expander>
        )}
        {pathwayLadder && (
          <Expander id="deeper-pathways" title={pathwayLadder.title} summary="Graduate Certificate, Graduate Diploma or the full Master. Every unit counts toward the next.">
            <PathwayLadderContent pl={pathwayLadder} />
          </Expander>
        )}
        {careerLadder && (
          <Expander id="deeper-trajectory" title={careerLadder.title} summary={`From ${careerLadder.tiers[0].band} on graduation to ${careerLadder.tiers[careerLadder.tiers.length - 1].band} later in your career`}>
            <CareerLadderContent cl={careerLadder} />
          </Expander>
        )}
        {academicLead && (
          <Expander id="deeper-academic" title={`Meet ${academicLead.name}, ${academicLead.role.toLowerCase()}`} summary={`${academicLead.years} years in practice, supervision and teaching`}>
            <AcademicLeadContent a={academicLead} />
          </Expander>
        )}
      </div>
    </Module>
  )
}
