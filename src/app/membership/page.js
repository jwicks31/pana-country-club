'use client';
import { MenuBar } from '../components/MenuBar/MenuBar';
import styles from './page.module.css';
import Link from 'next/link';
import { IoCreateOutline, IoDocumentTextOutline, IoPersonOutline, IoPeopleOutline, IoSchoolOutline, IoCarOutline, IoLocationOutline } from 'react-icons/io5';

export default function MembershipPage() {
  return (
    <main className={styles.main}>
      <MenuBar openMenu={true} />

      {/* Hero Section with CTA */}
      <div className={styles.hero}>
        <h1>Become a Member</h1>
        <p className={styles.heroSubtitle}>
          Join our community and enjoy golf, dining, and social events with friends and family
        </p>
        <div className={styles.heroButtons}>
          <Link href="/membership/apply" className={styles.applicationButton}>
            <IoCreateOutline size={24} />
            <span>Apply Online</span>
          </Link>
          <a
            href="/Pana Country Club New Member Application 2026.pdf"
            className={styles.pdfButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoDocumentTextOutline size={20} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Membership Cards */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Membership Options</h2>
        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <IoPersonOutline size={32} />
            </div>
            <h3>Individual Membership</h3>
            <div className={styles.price}>$1,200<span>/year</span></div>
            <p>
              Perfect for individuals 18+ who want full access to the Clubhouse,
              Pro Shop, and Grounds. Green fees required for guests.
            </p>
          </div>

          <div className={`${styles.card} ${styles.cardFeatured}`}>
            <div className={styles.cardBadge}>Most Popular</div>
            <div className={styles.cardIcon}>
              <IoPeopleOutline size={32} />
            </div>
            <h3>Family Membership</h3>
            <div className={styles.price}>$1,476<span>/year</span></div>
            <p>
              Includes spouse and children up to 18 (or 24 if enrolled in school).
              Full privileges for the whole family.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <IoSchoolOutline size={32} />
            </div>
            <h3>Junior Membership</h3>
            <div className={styles.price}>$444<span>/year</span></div>
            <p>
              For family members aged 18-21 enrolled in an accredited degree program.
              Full access to all club facilities.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <IoLocationOutline size={32} />
            </div>
            <h3>Non-Resident Membership</h3>
            <div className={styles.price}>50% off<span> regular fees</span></div>
            <p>
              For members living 35+ miles from the club. Same privileges as your
              membership class at half the price.
            </p>
          </div>
        </div>

        <div className={styles.discountBanner}>
          <strong>Out-of-Town Discount:</strong> $50 off Family or Individual Membership
          for those living outside Pana or the Pana School District.
        </div>
      </div>

      {/* Golf Cart Options */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Golf Cart Options</h2>
        <div className={styles.cartGrid}>
          <div className={styles.cartOption}>
            <IoCarOutline size={28} />
            <div>
              <h4>Cart Storage</h4>
              <span className={styles.cartPrice}>$180/year</span>
              <p>Secure your cart in our locked storage shed year-round.</p>
            </div>
          </div>

          <div className={styles.cartOption}>
            <IoCarOutline size={28} />
            <div>
              <h4>Trail Fee</h4>
              <span className={styles.cartPrice}>$120/year</span>
              <p>Store at home and use your cart on our course.</p>
            </div>
          </div>

          <div className={styles.cartOption}>
            <IoCarOutline size={28} />
            <div>
              <h4>Unlimited Rental</h4>
              <span className={styles.cartPrice}>$324/year</span>
              <p>Unlimited access to rental carts for the entire season.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <h3>Ready to Join?</h3>
        <p>Apply online or contact us to learn more and schedule a tour.</p>
        <div className={styles.ctaButtons}>
          <Link href="/membership/apply" className={styles.ctaPrimary}>
            Apply Now
          </Link>
          <Link href="/contact" className={styles.ctaSecondary}>
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
