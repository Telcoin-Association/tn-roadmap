import logoUrl from '@/assets/logos/telcoin-network-light.svg?url';
import { HeaderMenuItems } from './HeaderMenuItems';
import { MobileNavDrawer } from './MobileNavDrawer';

export function SiteHeader() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 w-full bg-card/95"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-[80rem] items-center justify-between px-4">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Telcoin Network home"
          className="flex focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <img src={logoUrl} alt="Telcoin Network" className="h-8 md:h-10" />
        </a>
        <div className="flex items-center">
          <div className="hidden lg:flex">
            <HeaderMenuItems />
          </div>
          <MobileNavDrawer />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </nav>
  );
}
