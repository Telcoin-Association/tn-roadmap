import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { LearnMore } from './components/LearnMore';
import { PhaseOverview } from './components/PhaseOverview';
import { ProgressBar } from './components/ProgressBar';
import { RoadToMainnet } from './components/RoadToMainnet';
import { SecurityAudits } from './components/SecurityAudits';
import { loadStatus, type Status } from './data/loadStatus';
import { SECTION_COPY } from './data/sectionCopy';
import { formatList } from './utils/formatList';

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

function SkeletonSection({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl border-2 border-border/60 bg-card p-6 shadow-glow backdrop-blur ${className ?? ''}`}
    >
      <div className="h-4 w-32 rounded-full bg-white/10" />
      <div className="mt-4 space-y-3">
        <div className="h-3 w-full rounded-full bg-white/20" />
        <div className="h-3 w-5/6 rounded-full bg-white/10" />
        <div className="h-3 w-2/3 rounded-full bg-white/5" />
      </div>
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-3xl border-2 border-border/60 bg-card p-10 text-center shadow-glow backdrop-blur">
      <div className="mx-auto h-7 w-56 rounded-full bg-white/15" />
      <div className="mx-auto h-4 w-64 rounded-full bg-white/10" />
      <div className="mx-auto h-3 w-48 rounded-full bg-white/5" />
    </div>
  );
}

export default function App() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const data = loadStatus();
    const timeout = window.setTimeout(() => {
      setStatus(data);
    }, 120);

    return () => window.clearTimeout(timeout);
  }, []);

  const formattedLastUpdated = useMemo(() => {
    if (!status) return '';
    try {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'UTC'
      }).format(new Date(status.meta.lastUpdated));
    } catch (error) {
      console.error('Failed to format last updated timestamp', error);
      return status.meta.lastUpdated;
    }
  }, [status]);

  const showSkeleton = status === null;
  const phaseTitles = status?.phases.map((phase) => phase.title) ?? [];
  const readablePhaseList = formatList(phaseTitles);
  const headerDescription = SECTION_COPY.header.descriptionTemplate(readablePhaseList);

  return (
    <div className="min-h-screen bg-bg bg-hero-ambient text-fg">
      <header className="border-b-2 border-border/60 bg-card backdrop-blur">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-8">
          {showSkeleton ? (
            <HeaderSkeleton />
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
                <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:gap-6 md:text-left">
                  <div className="logo-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-8 -8 112 112"
                      role="img"
                      aria-label="Telcoin Network (constant spin)"
                    >
                      <title>Telcoin Network (constant spin)</title>
                      <desc>Outer ring rotates at a constant speed around the centered logo.</desc>
                      <defs>
                        <linearGradient
                          id="paint0_linear_944_1088-4"
                          x1="95.56"
                          y1="-5.72145e-06"
                          x2="-16.9227"
                          y2="27.9947"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#37AEFF" />
                          <stop offset="1" stopColor="#5533FF" />
                        </linearGradient>
                        <clipPath id="clip0_944_1088-3">
                          <rect width="96" height="96" fill="white" />
                        </clipPath>
                      </defs>
                      <g id="outer-ring">
                        <path
                          d="M95.56 26.98L85.56 20.68L83.09 22.22C81.6147 20.1811 79.9615 18.277 78.15 16.53C76.8195 15.2497 75.4101 14.054 73.93 12.95V6.29L63.93 0L55.64 5.22C50.6271 4.39215 45.5067 4.46665 40.52 5.44L31.89 0L21.89 6.29V14.22C20.581 15.2791 19.3387 16.4179 18.17 17.63C16.5405 19.316 15.0553 21.1357 13.73 23.07L10 20.68L0 26.98V38.67L6.51 42.58C6.10959 46.3033 6.21049 50.0635 6.81 53.76L0 58.05V69.74L10 75.74L14.94 72.74C16.2445 74.4417 17.6753 76.0429 19.22 77.53C20.08 78.36 20.97 79.15 21.89 79.89V89.99L31.89 95.99L41.89 89.99V88.93C45.8589 89.5765 49.9 89.6506 53.89 89.15V89.99L63.89 95.99L73.89 89.99V81.16C75.7715 79.7649 77.5342 78.2162 79.16 76.53C80.0903 75.5754 80.9714 74.5741 81.8 73.53L85.52 75.77L95.52 69.77V58.05L90.4 54.8C91.2009 50.4314 91.3189 45.9649 90.75 41.56L95.56 38.67V26.98ZM81.89 27.72L85.28 25.59L85.56 25.41L89.89 28.14L87.31 29.5L85.52 30.44L82.63 29.05L81 28.27L81.89 27.72ZM83.56 33.95V38.82L79.56 36.41V32.02L83.56 33.95ZM61.12 6.5L63.93 4.73L68.27 7.45L66.34 8.45L63.89 9.76L59.38 7.59L61.12 6.5ZM69.93 11.09V15.73L65.93 18.13V13.22L66.4 12.96L69.93 11.09ZM57.93 11.33L61.93 13.26V18.13L57.93 15.73V11.33ZM31.93 4.73L35.22 6.82L36.22 7.45L31.84 9.76L30.11 8.92L27.34 7.59L31.93 4.73ZM37.93 11.09V15.73L33.93 18.13V13.22L37.93 11.09ZM25.93 11.28L29.93 13.21V18.08L26.22 15.85L25.93 15.68V11.28ZM10 25.41L11.62 26.41L14.33 28.12L10 30.45L9.7 30.32L5.45 28.32L10 25.41ZM16 31.78V36.41L12 38.82V33.89L12.75 33.49L16 31.78ZM4 36.41V32.02L8 33.95V38.82L7.18 38.32L4 36.41ZM8 69.89L4 67.48V63.08L8 65.01V69.89ZM10 61.51L8.61 60.84L5.45 59.35L7.68 57.94L10 56.48L11.75 57.58L14.33 59.22L12.57 60.14L10 61.51ZM16.05 67.51L12.73 69.51L12.05 69.92V64.96L14.18 63.83L16.05 62.83V67.51ZM29.89 90.13L25.89 87.73V83.33L29.89 85.26V90.13ZM31.84 81.76L27.34 79.59L27.78 79.31L31.89 76.73L36.23 79.45L32 81.68L31.84 81.76ZM37.89 87.76L37.48 88.01L33.89 90.16V85.22L36.89 83.65L37.89 83.11V87.76ZM61.89 90.16L58.81 88.22L57.93 87.69V83.29L59.32 83.96L61.93 85.22L61.89 90.16ZM63.89 81.79L59.38 79.62L63.93 76.76L68.27 79.48L63.89 81.79ZM69.89 87.79L65.89 90.19V85.22L69.89 83.1V87.79ZM78.34 71.5C77.69 72.29 77 73.06 76.28 73.81C75.052 75.0878 73.7354 76.2775 72.34 77.37L63.89 72.06L53.89 78.35V85.19C52.1497 85.4227 50.3958 85.5396 48.64 85.54C46.3633 85.5424 44.091 85.3416 41.85 84.94V78.29L31.85 72L24.28 76.76C23.48 76.12 22.71 75.42 21.96 74.7C20.6708 73.4498 19.468 72.1134 18.36 70.7L19.96 69.7V58.05L10.59 52.15C10.2488 49.5983 10.1617 47.019 10.33 44.45L20 38.67V26.98L17.12 25.22C18.2963 23.5151 19.6107 21.9097 21.05 20.42C21.65 19.8 22.26 19.21 22.89 18.64L31.89 24.05L41.89 18.05V9.22C44.1352 8.8263 46.4105 8.62889 48.69 8.63C50.4429 8.62871 52.1938 8.749 53.93 8.99V17.99L63.93 23.99L73.86 17.99C74.38 18.44 74.86 18.9 75.38 19.38C76.9554 20.9068 78.4004 22.5626 79.7 24.33L75.56 26.94V38.67L85.56 44.67L86.96 43.83C87.1919 46.7072 87.1081 49.6011 86.71 52.46L85.56 51.74L75.56 58.04V69.74L78.34 71.5ZM83.52 69.95L80.76 68.22L79.56 67.5V63.1L82.84 64.68L83.56 65.03L83.52 69.95ZM85.52 61.57L84.52 61.07L81 59.34L85.55 56.48L85.86 56.68L89.42 58.92L89.88 59.21L89.23 59.55L85.52 61.57ZM91.52 62.91V67.54L87.52 69.95V64.96L91.52 62.91ZM91.52 36.47L89.95 37.47L87.56 38.82V33.89L88.8 33.22L91.56 31.77L91.52 36.47Z"
                          fill="url(#paint0_linear_944_1088-4)"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          values="0.000000 48 48; 0.008889 48 48; 0.035556 48 48; 0.080000 48 48; 0.142222 48 48; 0.222222 48 48; 0.320000 48 48; 0.435556 48 48; 0.568889 48 48; 0.720000 48 48; 0.888889 48 48; 1.075556 48 48; 1.280000 48 48; 1.502222 48 48; 1.742222 48 48; 2.000000 48 48; 2.275556 48 48; 2.568889 48 48; 2.880000 48 48; 3.208889 48 48; 3.555556 48 48; 3.920000 48 48; 4.302222 48 48; 4.702222 48 48; 5.120000 48 48; 5.555556 48 48; 6.008889 48 48; 6.480000 48 48; 6.968889 48 48; 7.475556 48 48; 8.000000 48 48; 8.542222 48 48; 9.102222 48 48; 9.680000 48 48; 10.275556 48 48; 10.888889 48 48; 11.520000 48 48; 12.168889 48 48; 12.835556 48 48; 13.520000 48 48; 14.222222 48 48; 14.942222 48 48; 15.680000 48 48; 16.435556 48 48; 17.208889 48 48; 18.000000 48 48; 18.808889 48 48; 19.635556 48 48; 20.480000 48 48; 21.342222 48 48; 22.222222 48 48; 23.120000 48 48; 24.035556 48 48; 24.968889 48 48; 25.920000 48 48; 26.888889 48 48; 27.875556 48 48; 28.880000 48 48; 29.902222 48 48; 30.942222 48 48; 32.000000 48 48"
                          keyTimes="0;0.016667;0.033333;0.05;0.066667;0.083333;0.1;0.116667;0.133333;0.15;0.166667;0.183333;0.2;0.216667;0.233333;0.25;0.266667;0.283333;0.3;0.316667;0.333333;0.35;0.366667;0.383333;0.4;0.416667;0.433333;0.45;0.466667;0.483333;0.5;0.516667;0.533333;0.55;0.566667;0.583333;0.6;0.616667;0.633333;0.65;0.666667;0.683333;0.7;0.716667;0.733333;0.75;0.766667;0.783333;0.8;0.816667;0.833333;0.85;0.866667;0.883333;0.9;0.916667;0.933333;0.95;0.966667;0.983333;1"
                          calcMode="linear"
                          begin="2s"
                          dur="8s"
                          fill="freeze"
                          additive="sum"
                        />
                        <animateTransform
                          begin="10s"
                          additive="sum"
                          attributeName="transform"
                          type="rotate"
                          from="0 48.0 48.0"
                          to="360 48.0 48.0"
                          dur="45s"
                          repeatCount="indefinite"
                        />
                      </g>
                      <g clipPath="url(#clip0_944_1088-3)">
                        <path
                          d="M60.5505 43.33C60.3559 42.774 60.03 42.2731 59.6005 41.87L53.1805 36.46L52.6805 36.03L51.6805 35.22C51.2122 34.868 50.6674 34.6316 50.0905 34.53C49.9122 34.4985 49.7315 34.4818 49.5505 34.48C49.341 34.4601 49.13 34.4601 48.9205 34.48C48.73 34.4997 48.5423 34.54 48.3605 34.6L38.7005 38.12C38.1632 38.3531 37.688 38.7087 37.3129 39.1585C36.9378 39.6083 36.6733 40.1396 36.5405 40.71L34.8105 50.93C34.7517 51.3877 34.7788 51.8523 34.8905 52.3C34.8905 52.43 34.9605 52.54 35.0005 52.66C35.1489 53.0772 35.3726 53.4636 35.6605 53.8C35.7525 53.9139 35.8528 54.0208 35.9605 54.12L37.4805 55.4L38.7905 56.51L43.8405 60.77C44.3089 61.1254 44.8548 61.3651 45.4335 61.4693C46.0122 61.5736 46.6074 61.5396 47.1705 61.37L56.8205 57.84C57.3567 57.622 57.8333 57.2791 58.2105 56.84C58.5989 56.3706 58.8698 55.8152 59.0005 55.22L60.7605 45.03C60.8211 44.4548 60.7493 43.8732 60.5505 43.33ZM51.4605 46.05L51.3805 46.44H47.6805L47.3805 48.06L47.0205 50.06C46.8005 51.17 46.7405 51.8 47.8605 51.8H50.3405L50.1305 52.8L49.8205 54.15H46.8205C46.1798 54.136 45.5679 53.8814 45.1065 53.4366C44.6451 52.9919 44.368 52.3898 44.3305 51.75C44.2267 51.1814 44.2267 50.5987 44.3305 50.03C44.3305 49.91 44.3305 49.77 44.4105 49.62C44.6405 48.5 45.0705 46.52 45.0705 46.52H43.5105L43.5805 46.13L43.8405 44.73C44.4235 44.4932 44.9745 44.1841 45.4805 43.81C46.2538 43.2387 46.9121 42.5262 47.4205 41.71H48.6205L48.2705 43.53L48.0905 44.44H51.7905L51.4605 46.05Z"
                          fill="#14C8FF"
                        />
                        <path
                          d="M51.7898 44.38L51.4598 46.05L51.3798 46.44H47.6798L47.3798 48.06L47.0198 50.06C46.7998 51.17 46.7398 51.8 47.8598 51.8H50.3398L50.1298 52.8L49.8198 54.15H46.8198C46.1791 54.136 45.5672 53.8814 45.1058 53.4366C44.6444 52.9919 44.3673 52.3898 44.3298 51.75C44.226 51.1814 44.226 50.5987 44.3298 50.03C44.3298 49.91 44.3298 49.77 44.4098 49.62C44.6398 48.5 45.0698 46.52 45.0698 46.52H43.5098L43.5798 46.13L43.8398 44.73C44.4228 44.4932 44.9737 44.1841 45.4798 43.81C46.2531 43.2387 46.9114 42.5262 47.4198 41.71H48.6198L48.2698 43.53L48.0898 44.44L51.7898 44.38Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <h1 className="text-2xl font-extrabold text-fg md:text-3xl">{SECTION_COPY.header.title}</h1>
                    <p className="max-w-xl text-sm text-fg-muted md:text-base">{headerDescription}</p>
                  </div>
                </div>
                <div className="w-full max-w-sm rounded-3xl border-2 border-border/60 bg-card p-6 shadow-soft backdrop-blur">
                  <ProgressBar value={status.meta.overallTrajectoryPct} label="Overall trajectory" />
                  <p className="mt-4 text-sm text-fg-muted">
                    Last updated <time dateTime={status.meta.lastUpdated}>{formattedLastUpdated}</time>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </header>
      <main
        className="mx-auto max-w-5xl space-y-16 px-6 py-16 md:px-8"
        aria-busy={showSkeleton}
        aria-live="polite"
      >
        {showSkeleton || !status ? (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonSection key={index} />
              ))}
            </div>
            <SkeletonSection className="h-64" />
            <SkeletonSection className="h-72" />
          </>
        ) : (
          <>
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <PhaseOverview phases={status.phases} />
            </motion.section>

            <motion.section
              id="security-section"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            >
              <SecurityAudits
                notes={status.security.notes}
                publicFindings={status.security.publicFindings}
                afterPriorityFixes={status.security.afterPriorityFixes}
              />
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            >
              <RoadToMainnet steps={status.roadmap} />
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            >
              <LearnMore phases={status.phases} links={status.links} />
            </motion.section>
          </>
        )}
      </main>
      <footer className="border-t-2 border-border/60 bg-card py-8 text-sm text-fg-muted backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center md:flex-row md:justify-between md:px-8 md:text-left">
          <span>© 2025 Telcoin Network</span>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 font-semibold text-fg transition-transform transition-colors duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary focus-visible:-translate-y-0.5"
              href="https://x.com/TelcoinTAO"
              target="_blank"
              rel="noopener noreferrer"
            >
              TelcoinTAO on X
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 font-semibold text-fg transition-transform transition-colors duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary focus-visible:-translate-y-0.5"
              href="https://www.telcoin.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telcoin Association
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
