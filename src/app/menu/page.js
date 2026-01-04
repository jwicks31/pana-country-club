'use client';
import Image from 'next/image';
import { IoLogoFacebook } from 'react-icons/io5';
import { MenuBar } from '../components/MenuBar/MenuBar';
import styles from './page.module.css';

export default function MenuPage() {
  return (
    <main className={styles.main}>
      <MenuBar openMenu={true} />
      <div className={styles.header}>
        <h1>Restaurant Menu</h1>
        <p className={styles.subtitle}>
          Enjoy delicious food and drinks at the Pana Country Club
        </p>
      </div>

      <div className={styles.menuInfo}>
        <div className={styles.infoCard}>
          <h3>Hours</h3>
          <p>Open during regular club hours - hours vary seasonally</p>
          <a
            href="https://www.facebook.com/pccpana"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.facebookLink}
          >
            <IoLogoFacebook size={20} />
            <span>Check Facebook for current hours</span>
          </a>
        </div>
        <div className={styles.infoCard}>
          <h3>Contact</h3>
          <p>(217) 562-2641</p>
          <p>panacountryclub@gmail.com</p>
        </div>
      </div>

      <div className={styles.menuContainer}>
        <Image
          src="/pana_country_club_menu.png"
          alt="Pana Country Club Menu"
          width={800}
          height={1000}
          className={styles.menuImage}
          priority
        />
      </div>

      <div className={styles.cta}>
        <p>Questions about dining or private events?</p>
        <a href="/contact" className={styles.ctaButton}>
          Contact Us
        </a>
      </div>
    </main>
  );
}
