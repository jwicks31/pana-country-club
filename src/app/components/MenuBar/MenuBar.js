'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MenuBar.module.css';

const MenuBar = () => {
  const pathname = usePathname();
  const menuItems = [
    { name: 'Home', link: '/' },
    // { name: 'Membership', link: '/membership' },
    { name: 'About Us', link: '/about' },
    { name: 'Contact Us', link: '/contact' },
    // { name: 'Club House & Bar', link: '/clubhouse' },
    // { name: 'League Info', link: '/league' },
  ];

  return (
    <nav className={styles.menuBar}>
      <ul className={styles.menuItems}>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={
              pathname === item.link ? styles.menuItemActive : styles.menuItem
            }
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { MenuBar };
