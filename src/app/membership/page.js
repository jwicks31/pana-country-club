'use client';
import { useState, useMemo } from 'react';
import { MenuBar } from '../components/MenuBar/MenuBar';
import styles from './page.module.css';
import Link from 'next/link';
import { IoCreateOutline, IoDocumentTextOutline, IoPersonOutline, IoPeopleOutline, IoSchoolOutline, IoCarOutline, IoLocationOutline, IoCheckmarkCircle, IoCloseCircleOutline } from 'react-icons/io5';
import { calculatePriceBreakdown, MEMBERSHIP_PRICES, CART_OPTIONS, OUT_OF_TOWN_DISCOUNT } from './pricingConfig';

export default function MembershipPage() {
  const [selections, setSelections] = useState({
    membershipType: '',
    householdType: '',
    outOfTown: false,
    introductoryDiscount: false,
    nonResidentDiscount: false,
    cartStorage: false,
    cartTrailFee: false,
    cartUnlimitedRental: false,
  });

  const priceBreakdown = useMemo(() => calculatePriceBreakdown(selections), [selections]);

  // Handle clicking a membership card
  const selectMembership = (type, household) => {
    setSelections((prev) => ({
      ...prev,
      membershipType: type,
      householdType: household,
    }));
  };

  // Handle clicking a cart option (only one allowed at a time)
  const selectCartOption = (optionKey) => {
    const fieldMap = {
      storage: 'cartStorage',
      trailFee: 'cartTrailFee',
      unlimitedRental: 'cartUnlimitedRental',
    };
    const field = fieldMap[optionKey];
    setSelections((prev) => ({
      ...prev,
      // Clear all cart options, then toggle the selected one
      cartStorage: false,
      cartTrailFee: false,
      cartUnlimitedRental: false,
      [field]: !prev[field],
    }));
  };

  // Handle discount toggles
  const toggleDiscount = (discountType) => {
    if (discountType === 'outOfTown') {
      setSelections((prev) => ({ ...prev, outOfTown: !prev.outOfTown }));
    } else if (discountType === 'introductory') {
      setSelections((prev) => ({
        ...prev,
        introductoryDiscount: !prev.introductoryDiscount,
        nonResidentDiscount: false,
      }));
    } else if (discountType === 'nonResident') {
      setSelections((prev) => ({
        ...prev,
        nonResidentDiscount: !prev.nonResidentDiscount,
        introductoryDiscount: false,
      }));
    }
  };

  // Clear all selections
  const clearSelections = () => {
    setSelections({
      membershipType: '',
      householdType: '',
      outOfTown: false,
      introductoryDiscount: false,
      nonResidentDiscount: false,
      cartStorage: false,
      cartTrailFee: false,
      cartUnlimitedRental: false,
    });
  };

  // Build the URL params for the apply page
  const getApplyUrl = () => {
    const params = new URLSearchParams();
    if (selections.membershipType) params.set('type', selections.membershipType);
    if (selections.householdType) params.set('household', selections.householdType);
    if (selections.outOfTown) params.set('outOfTown', 'true');
    if (selections.introductoryDiscount) params.set('intro', 'true');
    if (selections.nonResidentDiscount) params.set('nonResident', 'true');
    if (selections.cartStorage) params.set('cartStorage', 'true');
    if (selections.cartTrailFee) params.set('cartTrailFee', 'true');
    if (selections.cartUnlimitedRental) params.set('cartUnlimitedRental', 'true');
    const queryString = params.toString();
    return queryString ? `/membership/apply?${queryString}` : '/membership/apply';
  };

  const isCardSelected = (type, household) =>
    selections.membershipType === type && selections.householdType === household;

  const hasSelections = selections.membershipType || selections.cartStorage || selections.cartTrailFee || selections.cartUnlimitedRental;

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
          <Link href={getApplyUrl()} className={styles.applicationButton}>
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
        <p className={styles.sectionHint}>Click a card to add it to your estimate</p>
        <div className={styles.cardsGrid}>
          <button
            type="button"
            className={`${styles.card} ${isCardSelected('full', 'single') ? styles.cardSelected : ''}`}
            onClick={() => selectMembership('full', 'single')}
          >
            {isCardSelected('full', 'single') && <IoCheckmarkCircle className={styles.cardCheck} size={24} />}
            <div className={styles.cardIcon}>
              <IoPersonOutline size={32} />
            </div>
            <h3>Individual Membership</h3>
            <div className={styles.price}>${MEMBERSHIP_PRICES.full.single.toLocaleString()}<span>/year</span></div>
            <p>
              Perfect for individuals 18+ who want full access to the Clubhouse,
              Pro Shop, and Grounds. Green fees required for guests.
            </p>
          </button>

          <button
            type="button"
            className={`${styles.card} ${styles.cardFeatured} ${isCardSelected('full', 'family') ? styles.cardSelected : ''}`}
            onClick={() => selectMembership('full', 'family')}
          >
            {isCardSelected('full', 'family') && <IoCheckmarkCircle className={styles.cardCheck} size={24} />}
            <div className={styles.cardBadge}>Most Popular</div>
            <div className={styles.cardIcon}>
              <IoPeopleOutline size={32} />
            </div>
            <h3>Family Membership</h3>
            <div className={styles.price}>${MEMBERSHIP_PRICES.full.family.toLocaleString()}<span>/year</span></div>
            <p>
              Includes spouse and children up to 18 (or 24 if enrolled in school).
              Full privileges for the whole family.
            </p>
          </button>

          <button
            type="button"
            className={`${styles.card} ${isCardSelected('junior', 'single') ? styles.cardSelected : ''}`}
            onClick={() => selectMembership('junior', 'single')}
          >
            {isCardSelected('junior', 'single') && <IoCheckmarkCircle className={styles.cardCheck} size={24} />}
            <div className={styles.cardIcon}>
              <IoSchoolOutline size={32} />
            </div>
            <h3>Junior Membership</h3>
            <div className={styles.price}>${MEMBERSHIP_PRICES.junior.single.toLocaleString()}<span>/year</span></div>
            <p>
              For family members aged 18-21 enrolled in an accredited degree program.
              Full access to all club facilities.
            </p>
          </button>

          <button
            type="button"
            className={`${styles.card} ${selections.nonResidentDiscount ? styles.cardSelected : ''}`}
            onClick={() => toggleDiscount('nonResident')}
          >
            {selections.nonResidentDiscount && <IoCheckmarkCircle className={styles.cardCheck} size={24} />}
            <div className={styles.cardIcon}>
              <IoLocationOutline size={32} />
            </div>
            <h3>Non-Resident Membership</h3>
            <div className={styles.price}>50% off<span> regular fees</span></div>
            <p>
              For members living 35+ miles from the club. Same privileges as your
              membership class at half the price.
            </p>
          </button>
        </div>

        <button
          type="button"
          className={`${styles.discountBanner} ${selections.outOfTown ? styles.discountBannerActive : ''}`}
          onClick={() => toggleDiscount('outOfTown')}
        >
          {selections.outOfTown && <IoCheckmarkCircle size={20} />}
          <span><strong>Out-of-Town Discount:</strong> ${OUT_OF_TOWN_DISCOUNT} off Family or Individual Membership
          for those living outside Pana or the Pana School District.</span>
        </button>
      </div>

      {/* Golf Cart Options */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Golf Cart Options</h2>
        <div className={styles.cartGrid}>
          <button
            type="button"
            className={`${styles.cartOption} ${selections.cartStorage ? styles.cartOptionSelected : ''}`}
            onClick={() => selectCartOption('storage')}
          >
            {selections.cartStorage && <IoCheckmarkCircle className={styles.cartCheck} size={20} />}
            <IoCarOutline size={28} />
            <div>
              <h4>{CART_OPTIONS.storage.label}</h4>
              <span className={styles.cartPrice}>${CART_OPTIONS.storage.price}/year</span>
              <p>{CART_OPTIONS.storage.description}</p>
            </div>
          </button>

          <button
            type="button"
            className={`${styles.cartOption} ${selections.cartTrailFee ? styles.cartOptionSelected : ''}`}
            onClick={() => selectCartOption('trailFee')}
          >
            {selections.cartTrailFee && <IoCheckmarkCircle className={styles.cartCheck} size={20} />}
            <IoCarOutline size={28} />
            <div>
              <h4>{CART_OPTIONS.trailFee.label}</h4>
              <span className={styles.cartPrice}>${CART_OPTIONS.trailFee.price}/year</span>
              <p>{CART_OPTIONS.trailFee.description}</p>
            </div>
          </button>

          <button
            type="button"
            className={`${styles.cartOption} ${selections.cartUnlimitedRental ? styles.cartOptionSelected : ''}`}
            onClick={() => selectCartOption('unlimitedRental')}
          >
            {selections.cartUnlimitedRental && <IoCheckmarkCircle className={styles.cartCheck} size={20} />}
            <IoCarOutline size={28} />
            <div>
              <h4>{CART_OPTIONS.unlimitedRental.label}</h4>
              <span className={styles.cartPrice}>${CART_OPTIONS.unlimitedRental.price}/year</span>
              <p>{CART_OPTIONS.unlimitedRental.description}</p>
            </div>
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <h3>Ready to Join?</h3>
        <p>Apply online or contact us to learn more and schedule a tour.</p>
        <div className={styles.ctaButtons}>
          <Link href={getApplyUrl()} className={styles.ctaPrimary}>
            Apply Now
          </Link>
          <Link href="/contact" className={styles.ctaSecondary}>
            Contact Us
          </Link>
        </div>
      </div>

      {/* Estimate Flyout */}
      {hasSelections && (
        <div className={styles.estimateFlyout}>
          <div className={styles.estimateHeader}>
            <span className={styles.estimateTitle}>Your Estimate</span>
            <button type="button" className={styles.estimateClear} onClick={clearSelections}>
              <IoCloseCircleOutline size={20} />
            </button>
          </div>
          <div className={styles.estimateContent}>
            {priceBreakdown ? (
              <>
                <div className={styles.estimateRow}>
                  <span>{priceBreakdown.membershipLabel} {priceBreakdown.householdLabel}</span>
                  <span>${priceBreakdown.basePrice.toLocaleString()}</span>
                </div>
                {priceBreakdown.outOfTownDiscount > 0 && (
                  <div className={`${styles.estimateRow} ${styles.estimateDiscount}`}>
                    <span>Out of Town</span>
                    <span>-${priceBreakdown.outOfTownDiscount}</span>
                  </div>
                )}
                {priceBreakdown.selectedCarts.map((cart) => (
                  <div key={cart.key} className={styles.estimateRow}>
                    <span>{cart.label}</span>
                    <span>${cart.price}</span>
                  </div>
                ))}
                {priceBreakdown.introDiscount > 0 && (
                  <div className={`${styles.estimateRow} ${styles.estimateDiscount}`}>
                    <span>Introductory (50%)</span>
                    <span>-${priceBreakdown.introDiscount.toLocaleString()}</span>
                  </div>
                )}
                {priceBreakdown.nonResDiscount > 0 && (
                  <div className={`${styles.estimateRow} ${styles.estimateDiscount}`}>
                    <span>Non-Resident (50%)</span>
                    <span>-${priceBreakdown.nonResDiscount.toLocaleString()}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                {selections.cartStorage && (
                  <div className={styles.estimateRow}>
                    <span>{CART_OPTIONS.storage.label}</span>
                    <span>${CART_OPTIONS.storage.price}</span>
                  </div>
                )}
                {selections.cartTrailFee && (
                  <div className={styles.estimateRow}>
                    <span>{CART_OPTIONS.trailFee.label}</span>
                    <span>${CART_OPTIONS.trailFee.price}</span>
                  </div>
                )}
                {selections.cartUnlimitedRental && (
                  <div className={styles.estimateRow}>
                    <span>{CART_OPTIONS.unlimitedRental.label}</span>
                    <span>${CART_OPTIONS.unlimitedRental.price}</span>
                  </div>
                )}
                <p className={styles.estimateHint}>Select a membership to see full estimate</p>
              </>
            )}
          </div>
          {priceBreakdown && (
            <div className={styles.estimateTotal}>
              <span>Annual Total</span>
              <span>${priceBreakdown.annualTotal.toLocaleString()}</span>
            </div>
          )}
          <Link href={getApplyUrl()} className={styles.estimateApplyBtn}>
            <IoCreateOutline size={18} />
            Apply with Selections
          </Link>
        </div>
      )}
    </main>
  );
}
