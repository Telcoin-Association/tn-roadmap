import { useMemo, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const clampedValue = useMemo(() => {
    const normalizedValue = Number.isFinite(value) ? value : 0;
    const boundedValue = Math.min(100, Math.max(0, normalizedValue));
    return Number.parseFloat(boundedValue.toFixed(2));
  }, [value]);
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
        <div className="text-sm font-medium text-fg-muted">
          <span>{label}</span>
        </div>
      ) : null}
      <div
        className="relative h-3 w-full overflow-hidden rounded-full border border-white/30 bg-border/40"
        role="progressbar"
        aria-label={label ?? 'Overall progress'}
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="relative h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary-600 shadow-[0_6px_18px_rgba(59,130,246,0.25)]"
          style={style}
          initial={{ width: 0, opacity: 1 }}
          animate={
            reduceMotion
              ? { width: `${clampedValue}%`, opacity: 1 }
              : { width: `${clampedValue}%`, opacity: [1, 0.65, 1] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  width: { duration: 1.1, ease: 'easeOut' },
                  opacity: { duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                }
          }
        />
      </div>
    </div>
  );
}
