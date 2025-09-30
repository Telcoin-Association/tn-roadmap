import { useLayoutEffect } from 'react';

export function useEqualizeMinHeight(
  container: React.RefObject<HTMLElement>,
  targetSelector: string
) {
  useLayoutEffect(() => {
    const el = container.current;
    if (!el) return;

    const targets = Array.from(el.querySelectorAll<HTMLElement>(targetSelector));
    if (!targets.length) return;

    const compute = () => {
      let max = 0;
      targets.forEach((t) => {
        t.style.minHeight = '0px';
      });
      targets.forEach((t) => {
        max = Math.max(max, Math.ceil(t.getBoundingClientRect().height));
      });
      targets.forEach((t) => {
        t.style.minHeight = `${max}px`;
      });
    };

    const ro = new ResizeObserver(compute);
    targets.forEach((t) => ro.observe(t));

    window.addEventListener('resize', compute);
    compute();

    return () => {
      window.removeEventListener('resize', compute);
      ro.disconnect();
    };
  }, [container, targetSelector]);
}
