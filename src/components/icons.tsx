import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const baseClasses = 'h-6 w-6 text-primary';

export function NetworkIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.5 7.5L15 18m-6 0-1.5 1.5M15 6l1.5-1.5M9 6L7.5 4.5"
      />
      <circle cx={12} cy={12} r={3.25} />
    </svg>
  );
}

export function LaunchIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.5 2.5l-4 4 2 2 4-4c.6-.6.17-2-.83-2h-1.17zM12 9l-6 6 3 3 6-6m-8.5 1.5L3 21l4.5-1.5L6 18l1.5-1.5"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9l3 3" />
    </svg>
  );
}

export function TestnetIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7h16M4 12h16M4 17h16M8 7V5a2 2 0 00-2-2H4m12 0h2a2 2 0 012 2v2"
      />
      <circle cx={8} cy={12} r={1.5} />
      <circle cx={16} cy={17} r={1.5} />
    </svg>
  );
}

export function MainnetIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l6.928 4v8L12 19l-6.928-4V7z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7l4 2.309v4.382L12 16l-4-2.309V9.309z" />
    </svg>
  );
}

export function ShieldIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7 3v5c0 5.25-3.5 9.75-7 10-3.5-.25-7-4.75-7-10V6l7-3z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.5l1.75 1.75L15 10.5" />
    </svg>
  );
}

export function CompassIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <circle cx={12} cy={12} r={9} />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 8.5L13.5 13l-4.5 2 2-4.5z" />
    </svg>
  );
}

export function TimelineIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h9m-9 6h16" />
      <circle cx={13} cy={12} r={1.5} />
    </svg>
  );
}

export function InfoIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <circle cx={12} cy={12} r={9} />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0-8.5a.75.75 0 11-.001-1.5.75.75 0 01.001 1.5z" />
    </svg>
  );
}

export function ExternalLinkIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 3h7v7m0-7l-9 9M5 5h4M5 5v14h14v-4"
      />
    </svg>
  );
}

export function ChevronIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l6 7-6 7" />
    </svg>
  );
}

export function DotIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx={12} cy={12} r={6} />
    </svg>
  );
}

export function SparkIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.3}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l1.75 4.75L18 9l-4.25 1.25L12 15l-1.75-4.75L6 9l4.25-1.25z"
      />
    </svg>
  );
}
