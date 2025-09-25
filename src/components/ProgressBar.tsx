import { useMemo, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const clampedValue = useMemo(() => Math.min(100, Math.max(0, Math.round(value))), [value]);
  const reduceMotion = useReducedMotion();
  const style = useMemo(
    () => ({
      width: `${clampedValue}%`,
      '--progress-width': `${clampedValue}%`
    }),
    [clampedValue]
  ) as CSSProperties & { '--progress-width': string };

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-sm text-fg-muted">
          <span>{label}</span>
          <span className="font-medium text-fg">
            {clampedValue}%
          </span>
        </div>
      ) : null}
      <div
        className="relative h-3 w-full overflow-hidden rounded-full bg-bg-elev"
        role="progressbar"
        aria-label={label ?? 'Overall progress'}
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="relative h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary-600 shadow-[0_0_15px_hsl(201_92%_56%/0.45)]"
          style={style}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 1.1, ease: 'easeOut' }}
        >
          {!reduceMotion ? (
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[var(--shimmer)] opacity-70 mix-blend-screen animate-shimmer" />
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
