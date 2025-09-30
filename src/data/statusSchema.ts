import { z } from 'zod';

const iso8601 = z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
  message: 'lastUpdated must be a valid ISO-8601 timestamp',
});

const nonNegativeInt = z.number().int().min(0);

export const phaseStatusSchema = z.enum(['in_progress', 'upcoming', 'complete']);
export const roadmapStateSchema = z.enum([
  'in_progress',
  'up_next',
  'planned',
  'complete',
]);

export const statusSchema = z.object({
  meta: z.object({
    lastUpdated: iso8601,
    overallTrajectoryPct: z.number().min(0).max(100),
  }),
  phases: z
    .array(
      z.object({
        key: z.enum(['devnet', 'testnet', 'mainnet']),
        title: z.string().min(1),
        status: phaseStatusSchema,
        summary: z.string().min(1),
      })
    )
    .length(3),
  security: z.object({
    notes: z.array(z.string().min(1)).nonempty(),
    publicFindings: z.object({
      high: nonNegativeInt,
      medium: nonNegativeInt,
      low: nonNegativeInt,
      info: nonNegativeInt,
    }),
    afterPriorityFixes: z.object({
      high: nonNegativeInt,
      medium: nonNegativeInt,
      low: nonNegativeInt,
      info: nonNegativeInt,
    }),
  }),
  roadmap: z.array(
    z.object({
      title: z.string().min(1),
      state: roadmapStateSchema,
    })
  ),
  links: z.object({
    governanceForum: z.string().min(1),
    technicalDocs: z.string().min(1),
    auditReports: z.string().min(1),
  }),
});

export type Status = z.infer<typeof statusSchema>;
export type Phase = Status['phases'][number];
export type RoadmapItem = Status['roadmap'][number];
