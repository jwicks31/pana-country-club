'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import className from 'classnames';

import styles from './MenuBar.module.css';

const MenuBar = ({ openMenu = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(openMenu);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (openMenu && window.matchMedia('(max-width: 875px)').matches) {
      setIsMenuOpen(false);
    }
  }, [openMenu]);

  const pathname = usePathname();
  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about' },
    { name: 'Membership', link: '/membership' },
    { name: 'Menu', link: '/menu' },
    { name: 'Club Calendar', link: 'https://calendar.google.com/calendar/u/0/embed?src=panacountryclub@gmail.com&ctz=America/Chicago' },
    { name: 'Contact Us', link: '/contact' },
  ];

  return (
    <nav className={className(styles.nav, { [styles.scrolled]: isScrolled })}>
      {/* Desktop menu bar */}
      <div className={styles.menubar}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/new-logo.png"
              alt="Pana Country Club Logo"
              width={68}
              height={50}
              priority
            />
          </Link>
        </div>
        <div className={styles.desktopMenu}>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={
                  pathname === item.link
                    ? styles.menuItemActive
                    : styles.menuItem
                }
              >
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/membership" className={styles.joinButton}>
          Join Now
        </Link>
      </div>

      {/* Mobile header */}
      <div className={styles.mobileLogoBar} />
      <div className={styles.mobileLogo}>
        <Link href="/">
          <Image
            src="/new-logo.png"
            alt="Pana Country Club Logo"
            width={68}
            height={50}
            priority
          />
        </Link>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div
          className={className(styles.line, {
            [styles.rotateDown]: isMenuOpen,
          })}
        ></div>
        <div
          className={className(styles.line, {
            [styles.hide]: isMenuOpen,
          })}
        ></div>
        <div
          className={className(styles.line, {
            [styles.rotateUp]: isMenuOpen,
          })}
        ></div>
      </div>

      {/* Mobile menu dropdown */}
      <div className={className(styles.mobileMenu, { [styles.open]: isMenuOpen })}>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={
                pathname === item.link
                  ? styles.menuItemActive
                  : styles.menuItem
              }
            >
              <Link href={item.link} onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}
          <li className={styles.mobileJoinItem}>
            <Link href="/membership" className={styles.mobileJoinButton} onClick={() => setIsMenuOpen(false)}>
              Join Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export { MenuBar };
