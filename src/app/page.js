import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import styles from './page.module.css';
import MenuBar from './components/MenuBar/MenuBar';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={styles.main}>
      <MenuBar />
      <Image
        src="/logo.png"
        alt="Pana Country Club Logo"
        width={172}
        height={127}
        priority
      />
      <div className={styles.description}>
        <h1>Welcome to Pana Country Club</h1>
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
          Don't just take our word for it. Here's what some of our members have
          to say:{' '}
        </p>
        <ul>
          <li>
            "I've been a member of Pana Country Club for years and I always
            enjoy playing on the beautiful course." - John D.
          </li>
          <li>
            "The staff at PCC are always friendly and welcoming. It's truly a
            great community." - Jane S.
          </li>
        </ul>
      </div>
    </main>
  );
}
