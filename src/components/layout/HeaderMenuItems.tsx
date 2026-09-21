export const menuItems = [
  { name: 'Faucet', href: 'https://faucet.telcoin.network' },
  { name: 'Documentation', href: 'https://docs.telcoin.network' },
  { name: 'TNIPs', href: 'https://tnips.telcoin.network' },
  { name: 'Telcoin Association', href: 'https://telcoin.org/?ref=telcoin.network' },
];

export function HeaderMenuItems() {
  return (
    <ul className="flex items-center">
      {menuItems.map((item) => (
        <li key={item.name}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-16 items-center rounded-md px-4 text-sm font-normal leading-4 text-white transition-colors hover:bg-white/5 hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
