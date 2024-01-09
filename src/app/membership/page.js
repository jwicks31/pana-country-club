'use client';
import { useState } from 'react';
import Head from 'next/head';
import { MenuBar } from '../components/MenuBar/MenuBar';
import styles from './page.module.css';

export default function MembershipPage() {
  return (
    <main className={styles.main}>
      <MenuBar useScroll={false} openMenu={true} />
      <a
        href="/pcc_auth_form_ach.pdf"
        alt="ACH Form"
        target="_blank"
        rel="noopener noreferrer"
      >
        ACH Form
      </a>
      <a
        href="/2024_membership_application.pdf"
        alt="ACH Form"
        target="_blank"
        rel="noopener noreferrer"
      >
        2024 Membership Application
      </a>
      <div className={styles.membershipOptions}>
        <h2>Memberships</h2>
        <p>
          <span>
            <span className={styles.bold}>Individual Membership</span> - $1200
            per year
          </span>
          Enjoy the privileges of the Clubhouse, Pro Shop, and Grounds with our
          Individual Membership. This membership is perfect for those who have
          attained the age of eighteen and wish to enjoy the benefits of the
          Pana Country Club. Green fees are required for family members or
          guests who play golf.
        </p>
        <p>
          <span>
            <span className={styles.bold}>Family Membership</span> - $1476 per
            year
          </span>
          Our Family Membership is perfect for married couples and their
          children who want to enjoy the benefits of the Pana Country Club. This
          membership includes the immediate family, including spouse and
          children up to the age of 18 &#40;or 24 if they are enrolled in
          school&#41;. Family members and their immediate family may also enjoy
          the privileges of the clubhouse, Pro Shop, and the Grounds. Green fees
          are required for family members or guests who play golf.
        </p>
        <p>
          <span>
            <span className={styles.bold}>Junior Membership</span> - $444 per
            year
          </span>{' '}
          Our Junior Membership is available to immediate family members of
          family membership holders who have attained the age of eighteen but
          not exceeding twenty-one years of age if said persons are enrolled in
          a program seeking an academic degree at an accredited post-secondary,
          degree-granting institution. Junior members may enjoy the privileges
          of the Clubhouse, Pro Shop, and the Grounds.
        </p>
        <p>
          <span>
            <span className={styles.bold}>Out-of-Town Discount</span> - $50 off
            a Family or Individual Membership
          </span>
          This discount is available to any member who lives outside of Pana or
          the Pana School District.
        </p>
        <p>
          <span>
            <span className={styles.bold}>Non-Resident Membership</span> - 50%
            of Regular Fee &#40;Membership Only -- Not Storage&#41;
          </span>
          Our Non-Resident Membership is available to single or married persons
          &#40;and their immediate family&#41; living thirty-five miles or more
          from the Pana Country Club. Non-resident members will have the same
          privileges of the membership class for which they purchase/qualify.
          For example, a single non-resident member may enjoy the privileges of
          the clubhouse, Pro Shop, and the Grounds. A social non-resident member
          may only enjoy the privileges of the Clubhouse and the Pro Shop. We
          hope you&apos;ll consider becoming a member of the Pana Country Club,
          where you can enjoy golf, dining, and social events with friends and
          family. Contact us today to learn more about our membership options
          and to schedule a tour of our facilities.
        </p>
      </div>
      <div className={styles.cartOptions}>
        <h2>Golf Cart Options</h2>
        <p>
          <span className={styles.bold}>
            Secure Your Cart for the Year - Only $180!
          </span>
          Keep your golf cart safe and protected all year long with our locked
          storage shed option.
        </p>
        <p>
          <span className={styles.bold}>Trail Fee - Only $120 Per Year!</span>
          If you prefer to store your cart at home, you can still enjoy the
          convenience of using it on our course with our trail fee.
        </p>
        <p>
          <span className={styles.bold}>
            Unlimited Rental Cart Access - Only $324!
          </span>
          Upgrade your game with our unlimited rental cart option for the entire
          season. No need to worry about bringing your own cart.
        </p>
      </div>
    </main>
  );
}
