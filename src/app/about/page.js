'use client';
import Image from 'next/image';
import Link from 'next/link';
import { IoGolfOutline, IoPeopleOutline, IoLeafOutline, IoTrophyOutline } from 'react-icons/io5';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import styles from './page.module.css';
import { MenuBar } from '../components/MenuBar/MenuBar';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <MenuBar openMenu={true} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <Image
          src="/course-overview.jpg"
          alt="Pana Country Club Course Overview"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <h1>About Pana Country Club</h1>
          <p>A Central Illinois Golf Tradition</p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h2>Welcome to Our Club</h2>
          <p>
            Nestled in the heart of Central Illinois, Pana Country Club has been
            a cornerstone of our community for generations. Our challenging 9-hole,
            par 35 course is beloved by advanced players for its narrow, tree-lined
            fairways, while beginners and intermediates find it a great place to
            learn and grow their game.
          </p>
          <p>
            As a non-profit corporation, the Pana Country Club is committed to
            providing a welcoming, community-focused environment for our
            approximately 125 active members. Our Board of Directors and committees
            work tirelessly to ensure that our members have access to a top-notch
            golf experience, as well as a wide range of social events and activities.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <IoGolfOutline className={styles.featureIcon} />
            <h3>9-Hole Course</h3>
            <p>Par 35 layout with varied tee locations and multiple angles to challenge every skill level.</p>
          </div>
          <div className={styles.featureCard}>
            <IoLeafOutline className={styles.featureIcon} />
            <h3>Natural Beauty</h3>
            <p>Mature trees line manicured fairways, creating a serene and picturesque setting.</p>
          </div>
          <div className={styles.featureCard}>
            <IoPeopleOutline className={styles.featureIcon} />
            <h3>Welcoming Community</h3>
            <p>A tight-knit group of golf enthusiasts who make everyone feel at home.</p>
          </div>
          <div className={styles.featureCard}>
            <IoTrophyOutline className={styles.featureIcon} />
            <h3>Events & Leagues</h3>
            <p>Regular tournaments, leagues, and social events for members throughout the season.</p>
          </div>
        </div>
      </section>

      {/* Course Details Section */}
      <section className={styles.courseSection}>
        <div className={styles.courseContent}>
          <div className={styles.courseText}>
            <h2>The Course</h2>
            <p>
              Our private course is designed for players of all skill levels with
              varied tee locations and multiple angles to the green. Bunkers surround
              several of the greens at the PCC, with occasional water hazards and
              sloped greens mixed throughout.
            </p>
            <p>
              The Pana Country Club facility also includes a chipping and putting
              green, perfect for honing your short game before heading out to play.
            </p>
          </div>
          <div className={styles.courseImageWrapper}>
            <Image
              src="/hole-7.jpg"
              alt="Hole 7 at Pana Country Club"
              fill
              className={styles.courseImage}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to Join Our Community?</h2>
        <p>We&apos;re proud to be a part of this tight-knit community of golf enthusiasts, and we welcome you to come see for yourself what makes Pana Country Club such a special place.</p>
        <Link href="/membership" className={styles.ctaButton}>
          Explore Membership <MdKeyboardDoubleArrowRight />
        </Link>
      </section>
    </main>
  );
}
