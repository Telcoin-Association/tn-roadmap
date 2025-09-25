import { useMemo, type CSSProperties } from 'react';

type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const clampedValue = useMemo(() => Math.min(100, Math.max(0, Math.round(value))), [value]);
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
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>{label}</span>
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {clampedValue}%
          </span>
        </div>
      ) : null}
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        role="progressbar"
        aria-label={label ?? 'Overall progress'}
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full rounded-full bg-blue-500 animate-progress" style={style} />
      </div>
    </div>
  );
}
