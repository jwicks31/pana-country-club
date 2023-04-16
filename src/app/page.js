'use client';
import { useEffect, useState, useRef } from 'react';
import { Transition } from 'react-transition-group';

import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import className from 'classnames';

import styles from './page.module.css';
import { MenuBar } from './components/MenuBar/MenuBar';
const inter = Inter({ subsets: ['latin'] });

const duration = 300;

export default function Home() {
  const [removeImage, setRemoveImage] = useState(false);
  const [membershipReady, setMembershipReady] = useState(false);
  const membershipContainerRef = useRef(null);
  const membershipCountryClubTextRef = useRef(null);
  const belongRef = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const membershipRefInstance = membershipContainerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = window.matchMedia('(min-width: 875px)').matches
          ? 0.85
          : 0.45;
        if (entry.intersectionRatio >= ratio) {
          setMembershipReady(true);
        } else {
          setMembershipReady(false);
        }
      },
      { threshold: [0, 0.05, 0.15, 0.25, 0.35, 0.5, 0.65, 0.75, 0.85, 0.95, 1] }
    );
    observer.observe(membershipRefInstance);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.unobserve(membershipRefInstance);
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
        <Image src="/hole-7.jpg" alt="Pana Country Club Hole 7" fill priority />
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

        {/* <p>
          Don&apos;t just take our word for it. Here&apos;s what some of our
          members have to say:{' '}
        </p> */}
      </div>
      <div ref={membershipContainerRef} className={styles.membershipContainer}>
        <div className={styles.membershipImages}>
          <div className={styles.membershipImage}>
            <Image
              src="/grill.jpg"
              alt="Pana Country Club Grill"
              fill
              priority
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
          <div className={styles.membershipImage}>
            <Image
              src="/menu.png"
              alt="Pana Country Club Menu Picture"
              fill
              priority
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
          <div className={styles.membershipImage}>
            <Image
              src="/banquet.jpg"
              alt="Pana Country Club Banquet Area"
              fill
              priority
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
        </div>
        <div className={styles.cloudImage}>
          <p>
            <Transition
              nodeRef={membershipCountryClubTextRef}
              in={membershipReady}
              timeout={duration}
            >
              {(state) => {
                const transitionStyles = {
                  entered: { right: '0px' },
                  exited: { right: '150%' },
                };
                return (
                  <span
                    className={styles.membershipCountryClub}
                    ref={membershipCountryClubTextRef}
                    style={transitionStyles[state]}
                  >
                    PANA COUNTRY CLUB
                  </span>
                );
              }}
            </Transition>
            <Transition
              nodeRef={belongRef}
              in={membershipReady}
              timeout={duration}
            >
              {(state) => {
                const transitionStyles = {
                  entered: { left: '0px' },
                  exited: { left: '150%' },
                };
                return (
                  <span
                    className={styles.belong}
                    ref={belongRef}
                    style={transitionStyles[state]}
                  >
                    You Belong Here
                  </span>
                );
              }}
            </Transition>
          </p>
          <Link className={styles.membershipButton} href="/membership">
            Learn more about Membership at Pana Country Club{' '}
            <MdKeyboardDoubleArrowRight />
          </Link>
        </div>
      </div>
    </main>
  );
}
