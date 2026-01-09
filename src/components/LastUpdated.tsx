import { formatLastUpdated } from '@/utils/formatDate';

type LastUpdatedProps = {
  lastUpdated: string;
};

export default function LastUpdated({ lastUpdated }: LastUpdatedProps) {
  const lastUpdatedDate = new Date(lastUpdated);
  const displayDate = Number.isNaN(lastUpdatedDate.valueOf()) ? new Date() : lastUpdatedDate;

  return (
    <div
      className="text-xs text-white/70 md:text-sm md:text-right"
      data-last-updated={lastUpdated}
    >
      Last Updated {formatLastUpdated(displayDate)}
    </div>
  );
}
