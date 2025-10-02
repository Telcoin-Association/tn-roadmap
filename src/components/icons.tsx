import type { ComponentPropsWithoutRef, SVGProps } from 'react';
import { useId } from 'react';

import HorizonLogoSvg from '../../IMG/Horizon logo.svg?react';

type IconProps = SVGProps<SVGSVGElement>;
type ImageIconProps = ComponentPropsWithoutRef<'img'>;

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

export function AdiriLogoIcon({ className, ...props }: IconProps) {
  const clipPathId = useId();
  const gradientId = useId();

  return (
    <svg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      viewBox="0 0 254.29 248"
      {...props}
    >
      <defs>
        <clipPath id={clipPathId}>
          <path
            clipRule="evenodd"
            d="M171.46 185.36l-11.89-20.73c-1.27-2.21-3.44-3.46-5.98-3.46l-85.28.25c-1.28 0-2.38-.63-3.01-1.74-.64-1.11-.63-2.38 0-3.49l14.02-24.28 55.36-.15c1.28 0 2.37-.65 3.02-1.76.65-1.11.65-2.38.01-3.49l-12.87-22.45c-.64-1.11-1.73-1.74-3.01-1.74l-19.44.05c-1.27 0-2.37-.62-3-1.73-.64-1.11-.63-2.38.01-3.49l24.8-42.95c.64-1.11 1.74-1.75 3.02-1.75 1.28 0 2.37.63 3 1.73l75.17 131.06c.64 1.11 1.73 1.74 3 1.73 1.28 0 2.37-.64 3.01-1.75l12.01-20.79c1.28-2.21 1.29-4.74.02-6.94L146.25 22.92c-1.27-2.2-3.45-3.46-5.99-3.46l-25.93.08c-2.54 0-4.73 1.27-6 3.49L64.46 99.02c-1.28 2.21-1.28 4.73-.02 6.94l14.88 25.95-29.92.09c-2.54 0-4.72 1.28-6 3.49l-13.02 22.56c-1.28 2.22-1.29 4.74-.02 6.94l12.9 22.5c1.27 2.21 3.45 3.47 5.98 3.46l119.19-.35c1.27 0 2.37-.65 3.01-1.75s.65-2.39.01-3.49"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id={gradientId}
          x1="230.94"
          y1="171.76"
          x2="82.92"
          y2="137.42"
          gradientTransform="translate(-18.71 293.89) rotate(-90) scale(1.04)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#4066de" />
          <stop offset="0.2" stopColor="#3e68de" />
          <stop offset="0.34" stopColor="#3a72e2" />
          <stop offset="0.47" stopColor="#3382e7" />
          <stop offset="0.59" stopColor="#2a98ef" />
          <stop offset="0.69" stopColor="#1db5f8" />
          <stop offset="0.75" stopColor="#16c8ff" />
        </linearGradient>
      </defs>
      <path
        fill="#4066de"
        fillRule="evenodd"
        d="M127.14 0A127.14 124 0 1 1 127.14 248A127.14 124 0 1 1 127.14 0Z M127.24 11.43A114.57 112.57 0 1 0 127.24 236.57A114.57 112.57 0 1 0 127.24 11.43Z"
        clipRule="evenodd"
      />
      <g clipPath={`url(#${clipPathId})`}>
        <rect
          width="196.58"
          height="170.36"
          x="44.83"
          y="47.95"
          fill={`url(#${gradientId})`}
          transform="translate(-43.74 190.51) rotate(-60)"
        />
      </g>
    </svg>
  );
}

export function HorizonLogoIcon({ className, ...props }: IconProps) {
  return (
    <HorizonLogoSvg
      aria-hidden="true"
      className={`${baseClasses} ${className ?? ''}`}
      {...props}
    />
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

export function MainnetIcon({ className, alt = 'Mainnet Logo', ...props }: ImageIconProps) {
  return (
    <img
      src="/IMG/Mainnet.svg"
      alt={alt}
      className={`h-auto w-full ${className ?? ''}`}
      {...props}
    />
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

export function TimerIcon({ className, ...props }: IconProps) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 2h4" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6a8 8 0 108 8h0a8 8 0 10-8-8zm0 4v4l2.5 2.5"
      />
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
