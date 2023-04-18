'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import className from 'classnames';

import styles from './MenuBar.module.css';

const MenuBar = ({ openMenu = false, useScroll = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(openMenu);
  const toggledOffRef = useRef(false);

  const toggleMenu = useCallback(() => {
    if (isMenuOpen && window.pageYOffset !== 0) {
      toggledOffRef.current = true;
    }
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !toggledOffRef.current &&
        window.pageYOffset >= window.innerHeight / 14
      ) {
        toggleMenu();
      } else if (window.pageYOffset == 0) {
        setIsMenuOpen(false);
        toggledOffRef.current = false;
      }
    };
    if (useScroll && window.matchMedia('(min-width: 875px)').matches) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    if (openMenu && window.matchMedia('(max-width: 875px)').matches) {
      setIsMenuOpen(false);
    }
  }, [useScroll, openMenu]);

  const pathname = usePathname();
  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about' },
    { name: 'Membership', link: '/membership' },
    { name: 'Contact Us', link: '/contact' },
    // { name: 'Club House & Bar', link: '/clubhouse' },
    // { name: 'League Info', link: '/league' },
  ];

  return (
    <nav>
      <div
        className={className(styles.menubar, {
          [styles.fixed]: !isMenuOpen,
        })}
      >
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/logo-cropped.png"
              alt="Pana Country Club Logo"
              width={68}
              height={50}
              priority
            />
          </Link>
        </div>
        <div className={className(styles.menu, { [styles.open]: isMenuOpen })}>
          <ul>
            {menuItems.map((item, i) => (
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
            <li>
              <Link href="https://calendar.google.com/calendar/u/0/embed?src=panacountryclub@gmail.com&ctz=America/Chicago">
                Club Calendar
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.mobileLogoBar} />
      <div className={styles.mobileLogo}>
        <Image
          src="/logo-cropped.png"
          alt="Pana Country Club Logo"
          width={68}
          height={50}
          priority
        />
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
    </nav>
  );
};

export { MenuBar };
