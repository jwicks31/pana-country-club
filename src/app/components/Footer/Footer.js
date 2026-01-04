'use client';
import Link from 'next/link';
import WeatherWidget from '../WeatherWidget/WeatherWidget';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Contact Banner */}
      <div className={styles.contactBanner}>
        <div className={styles.bannerContent}>
          <Link href="/contact">
            <h2>
              Contact <span>Us</span>
            </h2>
          </Link>
          <p>
            (217) 562-2641 | panacountryclub@gmail.com | 411 East 9th Street, Pana, IL 62557
          </p>
        </div>
      </div>

      {/* Main Footer with Columns */}
      <div className={styles.footerMain}>
        <div className={styles.footerColumns}>
          {/* Column 1: Quick Links */}
          <div className={styles.footerColumn}>
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/membership">Membership</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 2: For Members */}
          <div className={styles.footerColumn}>
            <h3>For Members</h3>
            <ul>
              <li><Link href="/menu">Restaurant Menu</Link></li>
              <li>
                <Link href="https://calendar.google.com/calendar/u/0/embed?src=panacountryclub@gmail.com&ctz=America/Chicago">
                  Club Calendar
                </Link>
              </li>
              {/* <li>
                <Link href="https://golf-outings.vercel.app/league/0a4edb35-4e00-4c6e-b672-c0028acda121">
                  Men&apos;s League Info
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className={styles.footerColumn}>
            <h3>Contact Info</h3>
            <div className={styles.contactInfo}>
              <p>411 E 9th St</p>
              <p>Pana, IL 62557</p>
              <p className={styles.phone}>(217) 562-2641</p>
              <p className={styles.email}>panacountryclub@gmail.com</p>
            </div>
          </div>

          {/* Column 4: Weather Widget */}
          <div className={styles.footerColumn}>
            <h3>Current Weather</h3>
            <WeatherWidget
              apiKey={process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}
              geo={{ lat: '39.3787', long: '-89.0766' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={styles.bottomBar}
        itemScope
        itemType="//schema.org/LocalBusiness"
      >
        <a itemProp="url" href="//www.panacountryclub.com/"></a>
        <span itemProp="name">Pana Country Club</span>
        <span className={styles.separator}>|</span>
        <span
          itemProp="address"
          itemScope
          itemType="//schema.org/PostalAddress"
        >
          <span itemProp="streetAddress">411 E 9th St</span>,{' '}
          <span itemProp="addressLocality">Pana</span>,{' '}
          <span itemProp="addressRegion">IL</span>{' '}
          <span itemProp="postalCode">62557</span>
        </span>
        <span className={styles.separator}>|</span>
        <span itemProp="telephone">(217) 562-2641</span>
        <div itemProp="geo" itemType="//schema.org/GeoCoordinates">
          <meta itemProp="latitude" content="39.3787" />
          <meta itemProp="longitude" content="89.0766" />
          <meta itemProp="elevation" content="213m" />
        </div>
      </div>
    </footer>
  );
};

export { Footer };
