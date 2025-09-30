import { formatLastUpdated } from '@/utils/formatDate';

export default function LastUpdated() {
  const today = new Date();
  return (
    <div className="text-xs text-white/70 md:text-sm md:text-right" data-last-updated="">
      Last Updated {formatLastUpdated(today)}
    </div>
  );
}
