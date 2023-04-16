'use client';
import WeatherWidget from '../WeatherWidget/WeatherWidget';
import Link from 'next/link';

import styles from './Footer.module.css';

const Footer = (props) => {
  return (
    <footer>
      <div className={styles.contactContainer}>
        <div className={styles.churchImage}>
          <Link href="/contact">
            <h2>
              Contact <span>Us</span>
            </h2>
          </Link>
          <p>
            (217) 562-2641 | ​panacountryclub@gmail.com | 411 East 9th Street
            ​PO Box 16 Pana, IL 62557
          </p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.main}>
          <WeatherWidget
            apiKey={process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}
            geo={{ lat: '39.3787', long: '-89.0766' }}
          />
          <ul>
            <li>
              <Link href="/about">About Pana Country Club</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="https://calendar.google.com/calendar/u/0/embed?src=panacountryclub@gmail.com&ctz=America/Chicago">
                Club Calendar
              </Link>
            </li>
            <li>
              <Link href="/membership">Membership</Link>
            </li>
          </ul>
        </div>
        <div className={styles.address}>
          <a itemProp="url" href="//www.panacountryclub.com/"></a>
          <span itemProp="name">Pana Country Club</span>&nbsp;|&nbsp;
          <span
            itemProp="address"
            itemScope=""
            itemType="//schema.org/PostalAddress"
          >
            <span itemProp="streetAddress">411 E 9th St</span>,&nbsp;
            <span itemProp="addressLocality">Pana</span>,&nbsp;
            <span itemProp="addressRegion">IL</span>&nbsp;
            <span itemProp="postalCode">62557</span> |&nbsp;
            <span itemProp="telephone">(217) 562-2641</span>
          </span>
          <div itemProp="geo" itemType="//schema.org/GeoCoordinates">
            <meta itemProp="latitude" content="39.3787" />
            <meta itemProp="longitude" content="89.0766" />
            <meta itemProp="elevation" content="213m" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
