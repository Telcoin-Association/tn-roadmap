import networkLogoUrl from '@/assets/logos/telcoin-network-light.svg?url';
import associationLogoUrl from '@/assets/logos/telcoin-association.svg?url';

const footerLinks = [
  { label: 'Governance:', name: 'Telcoin Association', href: 'https://telcoin.org' },
  { label: 'Native Token:', name: 'TEL', href: 'https://www.telcoin.org/documentation/telcoin-platform/telcoin-tel-token' },
  { label: 'Blockchain:', name: 'Telcoin Network', href: 'https://www.telcoin.network/' },
  { label: 'DeFi Protocol:', name: 'TELx', href: 'https://www.telx.network/' },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#0a0f1e] text-fg-muted">
      <div className="mx-auto grid max-w-[80rem] px-4 py-20 md:grid-cols-2 lg:justify-center lg:space-x-16">
        <div className="mb-12 md:mb-0">
          <a href="/" className="mb-4 block">
            <img src={networkLogoUrl} alt="Telcoin Network" className="h-10" />
          </a>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-fg">Powered by</p>
            <a href="https://telcoin.org" target="_blank" rel="noreferrer">
              <img src={associationLogoUrl} alt="Telcoin Association" className="h-6" />
            </a>
          </div>
          <p className="mt-2 max-w-[320px] text-sm">
            The Telcoin Association is a non-profit Swiss Verein that governs the Telcoin Platform.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-fg-muted">Telcoin Association</p>
          <ul className="flex flex-col gap-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <span className="text-fg-muted">{link.label} </span>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-fg hover:text-primary"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
