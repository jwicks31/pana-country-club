'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AiOutlineArrowDown } from 'react-icons/ai';
import className from 'classnames';

import styles from './page.module.css';
import { MenuBar } from './components/MenuBar/MenuBar';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [removeImage, setRemoveImage] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.pageYOffset >= window.innerHeight / 5) {
      setRemoveImage(true);
    } else {
      setRemoveImage(false);
    }
  };
  return (
    <main className={styles.main}>
      <MenuBar />
      <div className={styles.imageContainer}>
        <Image
          className={className(styles.imageLogo, {
            [styles.imageHidden]: removeImage,
          })}
          src="/logo-cropped.png"
          alt="Pana Country Club Logo"
          height={200}
          width={400}
          priority
        />
        <Image
          className={className(styles.imageText, {
            [styles.imageHidden]: removeImage,
          })}
          src="/home-text.png"
          alt="Pana Country Club Logo"
          height={178}
          width={1274}
          priority
        />
        <Image
          className={styles.image}
          src="/hole-7.jpg"
          alt="Pana Country Club Hole 7"
          fill
          priority
        />
        <div className={styles.scollText}>
          Scoll To Explore <AiOutlineArrowDown size={50} />
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <p>
          Our private 9-hole, par 35 golf course is designed for players of all
          skill levels with varied tee locations and multiple angles to the
          green. Mature trees line the manicured fairway providing a cozy, yet
          challenging, setting for both novice and experienced golfers alike.
          Bunkers surround several of the greens at the PCC, with occasional
          water hazards and sloped greens mixed throughout. The Pana Country
          Club facility also includes a chipping and putting green.
        </p>
        <h2>Membership</h2>
        <p>
          Interested in becoming a member? We offer a variety of membership
          options to suit your needs and budget.{' '}
          <Link href="/membership">Learn more</Link>
        </p>
        <h2>Contact Us</h2>
        <p>
          Have questions or want to book a tee time? Contact us today. <br />
          Phone: (217) 562-2641 <br />
          Email: ​panacountryclub@gmail.com <br />
          Address: 411 East 9th Street ​PO Box 16 Pana, IL 62557
        </p>
        <h2>Testimonials</h2>
        <p>
          Don&apos;t just take our word for it. Here&apos;s what some of our
          members have to say:{' '}
        </p>
        <ul>
          <li>
            &quot;I&apos;ve been a member of Pana Country Club for years and I
            always enjoy playing on the beautiful course.&quot; - John D.
          </li>
          <li>
            &quot;The staff at PCC are always friendly and welcoming. It&apos;s
            truly a great community.&quot; - Jane S.
          </li>
        </ul>
      </div>
    </main>
  );
}
