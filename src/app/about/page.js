'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import styles from './page.module.css';
import { MenuBar } from '../components/MenuBar/MenuBar';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <MenuBar />
      <p>
        Welcome to the Pana Country Club, nestled in the heart of Central
        Illinois. Our challenging 9-hole, par 35 course is beloved by advanced
        players for its narrow, tree-lined fairways, while beginners and
        intermediates find it a great place to learn and grow their game. As a
        non-profit corporation, the Pana Country Club is committed to providing
        a welcoming, community-focused environment for our approximately 125
        active members. Our Board of Directors and committees work tirelessly to
        ensure that our members have access to a top-notch golf experience, as
        well as a wide range of social events and activities. We&apos;re proud to be
        a part of this tight-knit community of golf enthusiasts, and we welcome
        you to come see for yourself what makes the Pana Country Club such a
        special place.
      </p>
    </main>
  );
}
