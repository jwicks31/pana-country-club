import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        src="/logo.png"
        alt="Pana Country Club Logo"
        width={172}
        height={127}
        priority
      />
      <div className={styles.description}>
        <p>
          Organized in 1943, the Pana Country Club is a private 9-hole, par 35
          golf club located in Pana, Illinois. The golf course is designed for
          players of all skill levels with varied tee locations and multiple
          angles to the green. Mature trees line the manicured fairway providing
          a cozy, yet challenging, setting for both novice and experienced
          golfers alike. Bunkers surround several of the greens at the PCC, with
          occasional water hazards and sloped greens mixed throughout. ​The Pana
          Country Club facility also allows golfers to fine tune their game with
          a chipping and putting green. Not a golfer? Not a problem! Become a
          social member and enjoy the Club's dining options, social activities,
          and entertainment opportunities.
        </p>
      </div>

      <div className={styles.center}></div>

      <div className={styles.grid}></div>
    </main>
  );
}
