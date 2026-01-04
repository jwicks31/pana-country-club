'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { IoSendOutline, IoArrowBackOutline, IoChevronUpOutline, IoChevronDownOutline } from 'react-icons/io5';
import { MenuBar } from '../../components/MenuBar/MenuBar';
import styles from './page.module.css';

const currentYear = new Date().getFullYear();

// Membership pricing
const MEMBERSHIP_PRICES = {
  full: {
    single: 1200,
    family: 1476,
  },
  junior: {
    single: 444,
    family: 444,
  },
};

const OUT_OF_TOWN_DISCOUNT = 50;
const INTRODUCTORY_DISCOUNT = 0.5; // 50% off
const NON_RESIDENT_DISCOUNT = 0.5; // 50% off for those living 35+ miles away

// Cart options pricing
const CART_OPTIONS = {
  storage: { label: 'Cart Storage', price: 180, description: 'Secure your cart in our locked storage shed year-round' },
  trailFee: { label: 'Trail Fee', price: 120, description: 'Store at home and use your cart on our course' },
  unlimitedRental: { label: 'Unlimited Rental', price: 324, description: 'Unlimited access to rental carts for the entire season' },
};

export default function MembershipApplicationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const [formData, setFormData] = useState({
    // Membership Type
    membershipType: '',
    householdType: '',
    outOfTown: false,
    introductoryDiscount: false,
    nonResidentDiscount: false,

    // Applicant Info
    applicantName: '',
    applicantDOB: '',
    applicantMaritalStatus: '',
    primaryResidence: '',
    applicantPhone: '',
    applicantEmail: '',
    applicantEmployer: '',

    // Co-Applicant Info
    coApplicantName: '',
    coApplicantDOB: '',
    coApplicantMaritalStatus: '',
    secondaryResidence: '',
    coApplicantPhone: '',
    coApplicantEmail: '',
    coApplicantEmployer: '',

    // Children (up to 4)
    children: [
      { name: '', dob: '', schoolEnrollment: '' },
      { name: '', dob: '', schoolEnrollment: '' },
      { name: '', dob: '', schoolEnrollment: '' },
      { name: '', dob: '', schoolEnrollment: '' },
    ],

    // Additional Questions
    yearsInArea: '',
    previousMember: '',
    previousMembershipDetails: '',

    // Relatives who are members (up to 3)
    relatives: [
      { name: '', relationship: '' },
      { name: '', relationship: '' },
      { name: '', relationship: '' },
    ],

    // Sponsor
    sponsorName: '',
    sponsorRelationship: '',

    // Cart Options
    cartStorage: false,
    cartTrailFee: false,
    cartUnlimitedRental: false,

    // Payment Info
    paymentFrequency: '',

    // Monthly Payment Info (if applicable)
    bankName: '',
    bankAddress: '',
    routingNumber: '',
    accountNumber: '',
    accountType: '',

    // Agreement
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleChildChange = (index, field, value) => {
    setFormData((prev) => {
      const newChildren = [...prev.children];
      newChildren[index] = { ...newChildren[index], [field]: value };
      return { ...prev, children: newChildren };
    });
  };

  const handleRelativeChange = (index, field, value) => {
    setFormData((prev) => {
      const newRelatives = [...prev.relatives];
      newRelatives[index] = { ...newRelatives[index], [field]: value };
      return { ...prev, relatives: newRelatives };
    });
  };

  // Calculate membership cost
  const priceBreakdown = useMemo(() => {
    const { membershipType, householdType, outOfTown, introductoryDiscount, nonResidentDiscount, paymentFrequency, cartStorage, cartTrailFee, cartUnlimitedRental } = formData;

    if (!membershipType || !householdType) {
      return null;
    }

    const basePrice = MEMBERSHIP_PRICES[membershipType]?.[householdType] || 0;
    const outOfTownDiscount = outOfTown ? OUT_OF_TOWN_DISCOUNT : 0;
    const membershipAfterOutOfTown = basePrice - outOfTownDiscount;

    // Calculate cart options total
    let cartTotal = 0;
    const selectedCarts = [];
    if (cartStorage) {
      cartTotal += CART_OPTIONS.storage.price;
      selectedCarts.push({ ...CART_OPTIONS.storage, key: 'storage' });
    }
    if (cartTrailFee) {
      cartTotal += CART_OPTIONS.trailFee.price;
      selectedCarts.push({ ...CART_OPTIONS.trailFee, key: 'trailFee' });
    }
    if (cartUnlimitedRental) {
      cartTotal += CART_OPTIONS.unlimitedRental.price;
      selectedCarts.push({ ...CART_OPTIONS.unlimitedRental, key: 'unlimitedRental' });
    }

    const subtotal = membershipAfterOutOfTown + cartTotal;

    // Apply either introductory or non-resident discount (mutually exclusive, both 50%)
    // Introductory applies to membership + cart options
    // Non-Resident only applies to membership (not cart options)
    const introDiscount = introductoryDiscount ? subtotal * INTRODUCTORY_DISCOUNT : 0;
    const nonResDiscount = nonResidentDiscount ? membershipAfterOutOfTown * NON_RESIDENT_DISCOUNT : 0;
    const annualTotal = subtotal - introDiscount - nonResDiscount;

    let breakdown = {
      basePrice,
      outOfTownDiscount,
      membershipAfterOutOfTown,
      cartTotal,
      selectedCarts,
      subtotal,
      introDiscount,
      introductoryDiscount,
      nonResDiscount,
      nonResidentDiscount,
      annualTotal,
      membershipLabel: membershipType === 'full' ? 'Full' : 'Junior',
      householdLabel: householdType === 'single' ? 'Individual' : 'Family',
    };

    if (paymentFrequency === 'annually') {
      breakdown.paymentAmount = annualTotal;
      breakdown.paymentLabel = 'Annual Payment';
      breakdown.paymentNote = 'Due by March 1st';
    } else if (paymentFrequency === 'semi-annually') {
      breakdown.paymentAmount = annualTotal / 2;
      breakdown.paymentLabel = 'Semi-Annual Payment';
      breakdown.paymentNote = '2 payments of';
      breakdown.numberOfPayments = 2;
    } else if (paymentFrequency === 'monthly') {
      breakdown.paymentAmount = annualTotal / 12;
      breakdown.paymentLabel = 'Monthly Payment';
      breakdown.paymentNote = '12 payments of';
      breakdown.numberOfPayments = 12;
    }

    return breakdown;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <main className={styles.main}>
        <MenuBar openMenu={true} />
        <div className={styles.successContainer}>
          <h1>Application Submitted!</h1>
          <p>
            Thank you for your interest in joining Pana Country Club. We have received your
            membership application and will review it shortly.
          </p>
          <p>
            A member of our board will contact you within a few business days to discuss
            the next steps.
          </p>
          <Link href="/membership" className={styles.backButton}>
            <IoArrowBackOutline size={20} />
            <span>Back to Membership</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <MenuBar openMenu={true} />

      {/* Header */}
      <div className={styles.header}>
        <Link href="/membership" className={styles.backLink}>
          <IoArrowBackOutline size={18} />
          <span>Back to Membership Options</span>
        </Link>
        <h1>Membership Application</h1>
        <p className={styles.subtitle}>
          Full, Introductory, Family, &amp; Junior - {currentYear}
        </p>
        <p className={styles.intro}>
          The Pana Country Club was established to provide its members with the opportunity to play
          golf, dine, and socialize in the comfortable ambience of a private club. Membership is granted
          per the approval of the Board of Directors.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Membership Type Section */}
        <div className={styles.formSection}>
          <h2>Membership Type</h2>
          <div className={styles.checkboxGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="membershipType"
                value="full"
                checked={formData.membershipType === 'full'}
                onChange={handleChange}
                required
              />
              <span>Full Membership</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="membershipType"
                value="junior"
                checked={formData.membershipType === 'junior'}
                onChange={handleChange}
              />
              <span>Junior Membership</span>
            </label>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="householdType"
                value="single"
                checked={formData.householdType === 'single'}
                onChange={handleChange}
                required
              />
              <span>Single</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="householdType"
                value="family"
                checked={formData.householdType === 'family'}
                onChange={handleChange}
              />
              <span>Family</span>
            </label>
          </div>

          <h3>Discounts</h3>
          <div className={styles.discountOptions}>
            <label className={styles.discountOption}>
              <input
                type="checkbox"
                name="outOfTown"
                checked={formData.outOfTown}
                onChange={handleChange}
              />
              <div className={styles.discountContent}>
                <span className={styles.discountName}>Out of Town</span>
                <span className={styles.discountValue}>$50 off</span>
                <p className={styles.discountDesc}>For those living outside Pana or the Pana School District</p>
              </div>
            </label>
            <label className={styles.discountOption}>
              <input
                type="checkbox"
                name="introductoryDiscount"
                checked={formData.introductoryDiscount}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.checked) {
                    setFormData(prev => ({ ...prev, nonResidentDiscount: false }));
                  }
                }}
                disabled={formData.nonResidentDiscount}
              />
              <div className={styles.discountContent}>
                <span className={styles.discountName}>Introductory Membership</span>
                <span className={styles.discountValue}>50% off</span>
                <p className={styles.discountDesc}>For first-time members (subject to approval)</p>
              </div>
            </label>
            <label className={styles.discountOption}>
              <input
                type="checkbox"
                name="nonResidentDiscount"
                checked={formData.nonResidentDiscount}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.checked) {
                    setFormData(prev => ({ ...prev, introductoryDiscount: false }));
                  }
                }}
                disabled={formData.introductoryDiscount}
              />
              <div className={styles.discountContent}>
                <span className={styles.discountName}>Non-Resident Membership</span>
                <span className={styles.discountValue}>50% off</span>
                <p className={styles.discountDesc}>For members living 35+ miles from the club (subject to approval)</p>
              </div>
            </label>
          </div>
        </div>

        {/* Applicant Information */}
        <div className={styles.formSection}>
          <h2>Applicant Information</h2>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="applicantName">Name of Applicant *</label>
              <input
                type="text"
                id="applicantName"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
                required
                placeholder="Full Name"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="applicantDOB">Date of Birth</label>
              <input
                type="date"
                id="applicantDOB"
                name="applicantDOB"
                value={formData.applicantDOB}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Marital Status</label>
              <div className={styles.inlineRadio}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="applicantMaritalStatus"
                    value="married"
                    checked={formData.applicantMaritalStatus === 'married'}
                    onChange={handleChange}
                  />
                  <span>Married</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="applicantMaritalStatus"
                    value="single"
                    checked={formData.applicantMaritalStatus === 'single'}
                    onChange={handleChange}
                  />
                  <span>Single</span>
                </label>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="primaryResidence">Primary Residence *</label>
              <input
                type="text"
                id="primaryResidence"
                name="primaryResidence"
                value={formData.primaryResidence}
                onChange={handleChange}
                required
                placeholder="Full Address"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="applicantPhone">Phone *</label>
              <input
                type="tel"
                id="applicantPhone"
                name="applicantPhone"
                value={formData.applicantPhone}
                onChange={handleChange}
                required
                placeholder="(217) 555-1234"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="applicantEmail">Email *</label>
              <input
                type="email"
                id="applicantEmail"
                name="applicantEmail"
                value={formData.applicantEmail}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="applicantEmployer">Employer</label>
              <input
                type="text"
                id="applicantEmployer"
                name="applicantEmployer"
                value={formData.applicantEmployer}
                onChange={handleChange}
                placeholder="Company Name"
              />
            </div>
          </div>
        </div>

        {/* Co-Applicant Information */}
        <div className={styles.formSection}>
          <h2>Spouse or Co-Applicant Information</h2>
          <p className={styles.sectionHint}>Complete if applying for Family membership</p>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="coApplicantName">Name</label>
              <input
                type="text"
                id="coApplicantName"
                name="coApplicantName"
                value={formData.coApplicantName}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="coApplicantDOB">Date of Birth</label>
              <input
                type="date"
                id="coApplicantDOB"
                name="coApplicantDOB"
                value={formData.coApplicantDOB}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Marital Status</label>
              <div className={styles.inlineRadio}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="coApplicantMaritalStatus"
                    value="married"
                    checked={formData.coApplicantMaritalStatus === 'married'}
                    onChange={handleChange}
                  />
                  <span>Married</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="coApplicantMaritalStatus"
                    value="single"
                    checked={formData.coApplicantMaritalStatus === 'single'}
                    onChange={handleChange}
                  />
                  <span>Single</span>
                </label>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="secondaryResidence">Secondary Residence</label>
              <input
                type="text"
                id="secondaryResidence"
                name="secondaryResidence"
                value={formData.secondaryResidence}
                onChange={handleChange}
                placeholder="If different from primary"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="coApplicantPhone">Phone</label>
              <input
                type="tel"
                id="coApplicantPhone"
                name="coApplicantPhone"
                value={formData.coApplicantPhone}
                onChange={handleChange}
                placeholder="(217) 555-1234"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="coApplicantEmail">Email</label>
              <input
                type="email"
                id="coApplicantEmail"
                name="coApplicantEmail"
                value={formData.coApplicantEmail}
                onChange={handleChange}
                placeholder="spouse@example.com"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="coApplicantEmployer">Employer</label>
              <input
                type="text"
                id="coApplicantEmployer"
                name="coApplicantEmployer"
                value={formData.coApplicantEmployer}
                onChange={handleChange}
                placeholder="Company Name"
              />
            </div>
          </div>
        </div>

        {/* Children Information */}
        <div className={styles.formSection}>
          <h2>Children Under Age 21</h2>
          <p className={styles.sectionHint}>Covered under the family membership application</p>
          <div className={styles.childrenGrid}>
            {formData.children.map((child, index) => (
              <div key={index} className={styles.childRow}>
                <div className={styles.inputGroup}>
                  <label>Name</label>
                  <input
                    type="text"
                    value={child.name}
                    onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                    placeholder={`Child ${index + 1} Name`}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={child.dob}
                    onChange={(e) => handleChildChange(index, 'dob', e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>School Enrollment</label>
                  <input
                    type="text"
                    value={child.schoolEnrollment}
                    onChange={(e) => handleChildChange(index, 'schoolEnrollment', e.target.value)}
                    placeholder="School Name"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Questions */}
        <div className={styles.formSection}>
          <h2>Additional Information</h2>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="yearsInArea">How long have you lived in the area?</label>
              <input
                type="text"
                id="yearsInArea"
                name="yearsInArea"
                value={formData.yearsInArea}
                onChange={handleChange}
                placeholder="e.g., 5 years"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Have you ever been a member of Pana Country Club?</label>
              <div className={styles.inlineRadio}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="previousMember"
                    value="yes"
                    checked={formData.previousMember === 'yes'}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="previousMember"
                    value="no"
                    checked={formData.previousMember === 'no'}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
            {formData.previousMember === 'yes' && (
              <div className={styles.inputGroup}>
                <label htmlFor="previousMembershipDetails">
                  Type of membership held and period
                </label>
                <input
                  type="text"
                  id="previousMembershipDetails"
                  name="previousMembershipDetails"
                  value={formData.previousMembershipDetails}
                  onChange={handleChange}
                  placeholder="e.g., Full membership, 2015-2020"
                />
              </div>
            )}
          </div>
        </div>

        {/* Relatives */}
        <div className={styles.formSection}>
          <h2>Relatives Who Are or Have Been Members</h2>
          <div className={styles.relativesGrid}>
            {formData.relatives.map((relative, index) => (
              <div key={index} className={styles.relativeRow}>
                <div className={styles.inputGroup}>
                  <label>Name</label>
                  <input
                    type="text"
                    value={relative.name}
                    onChange={(e) => handleRelativeChange(index, 'name', e.target.value)}
                    placeholder="Relative Name"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Relationship</label>
                  <input
                    type="text"
                    value={relative.relationship}
                    onChange={(e) => handleRelativeChange(index, 'relationship', e.target.value)}
                    placeholder="e.g., Uncle, Parent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor */}
        <div className={styles.formSection}>
          <h2>Membership Sponsor</h2>
          <p className={styles.sectionHint}>Please name who is sponsoring you for membership</p>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="sponsorName">Sponsor Name</label>
              <input
                type="text"
                id="sponsorName"
                name="sponsorName"
                value={formData.sponsorName}
                onChange={handleChange}
                placeholder="Current Member Name"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="sponsorRelationship">Relationship</label>
              <input
                type="text"
                id="sponsorRelationship"
                name="sponsorRelationship"
                value={formData.sponsorRelationship}
                onChange={handleChange}
                placeholder="e.g., Friend, Colleague"
              />
            </div>
          </div>
        </div>

        {/* Golf Cart Options */}
        <div className={styles.formSection}>
          <h2>Golf Cart Options</h2>
          <p className={styles.sectionHint}>Select any cart options you would like to add to your membership</p>
          <div className={styles.cartOptionsGrid}>
            <label className={styles.cartOptionLabel}>
              <input
                type="checkbox"
                name="cartStorage"
                checked={formData.cartStorage}
                onChange={handleChange}
              />
              <div className={styles.cartOptionContent}>
                <div className={styles.cartOptionHeader}>
                  <span className={styles.cartOptionName}>Cart Storage</span>
                  <span className={styles.cartOptionPrice}>$180/year</span>
                </div>
                <p className={styles.cartOptionDesc}>Secure your cart in our locked storage shed year-round</p>
              </div>
            </label>
            <label className={styles.cartOptionLabel}>
              <input
                type="checkbox"
                name="cartTrailFee"
                checked={formData.cartTrailFee}
                onChange={handleChange}
              />
              <div className={styles.cartOptionContent}>
                <div className={styles.cartOptionHeader}>
                  <span className={styles.cartOptionName}>Trail Fee</span>
                  <span className={styles.cartOptionPrice}>$120/year</span>
                </div>
                <p className={styles.cartOptionDesc}>Store at home and use your cart on our course</p>
              </div>
            </label>
            <label className={styles.cartOptionLabel}>
              <input
                type="checkbox"
                name="cartUnlimitedRental"
                checked={formData.cartUnlimitedRental}
                onChange={handleChange}
              />
              <div className={styles.cartOptionContent}>
                <div className={styles.cartOptionHeader}>
                  <span className={styles.cartOptionName}>Unlimited Rental</span>
                  <span className={styles.cartOptionPrice}>$324/year</span>
                </div>
                <p className={styles.cartOptionDesc}>Unlimited access to rental carts for the entire season</p>
              </div>
            </label>
          </div>
        </div>

        {/* Payment Information */}
        <div className={styles.formSection}>
          <h2>Payment Information</h2>
          <div className={styles.checkboxGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="paymentFrequency"
                value="annually"
                checked={formData.paymentFrequency === 'annually'}
                onChange={handleChange}
                required
              />
              <span>Annually</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="paymentFrequency"
                value="semi-annually"
                checked={formData.paymentFrequency === 'semi-annually'}
                onChange={handleChange}
              />
              <span>Semi-Annually</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="paymentFrequency"
                value="monthly"
                checked={formData.paymentFrequency === 'monthly'}
                onChange={handleChange}
              />
              <span>Monthly</span>
            </label>
          </div>

          <p className={styles.hint}>
            Annual and semi-annual (first half) must be received by March 1st of each calendar year
          </p>

          {/* Payment Breakdown */}
          {priceBreakdown && formData.paymentFrequency && (
            <div className={styles.paymentBreakdown}>
              <h3>Payment Summary</h3>
              <div className={styles.paymentDetails}>
                {formData.paymentFrequency === 'annually' ? (
                  <>
                    <div className={styles.paymentAmount}>
                      <span className={styles.amount}>${priceBreakdown.annualTotal.toLocaleString()}</span>
                      <span className={styles.paymentPeriod}>one-time annual payment</span>
                    </div>
                    <p className={styles.paymentDue}>Due by March 1st, {currentYear}</p>
                  </>
                ) : formData.paymentFrequency === 'semi-annually' ? (
                  <>
                    <div className={styles.paymentAmount}>
                      <span className={styles.amount}>${(priceBreakdown.annualTotal / 2).toLocaleString()}</span>
                      <span className={styles.paymentPeriod}>per payment (2 payments/year)</span>
                    </div>
                    <div className={styles.paymentSchedule}>
                      <p>1st payment: ${(priceBreakdown.annualTotal / 2).toLocaleString()} due March 1st</p>
                      <p>2nd payment: ${(priceBreakdown.annualTotal / 2).toLocaleString()} due July 1st</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.paymentAmount}>
                      <span className={styles.amount}>${(priceBreakdown.annualTotal / 12).toFixed(2)}</span>
                      <span className={styles.paymentPeriod}>per month (12 payments/year)</span>
                    </div>
                    <p className={styles.paymentDue}>Debited at the end of each month (30th or 31st)</p>
                  </>
                )}
                <div className={styles.annualNote}>
                  Annual total: ${priceBreakdown.annualTotal.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {formData.paymentFrequency === 'monthly' && (
            <div className={styles.monthlyPaymentSection}>
              <h3>Monthly Payment Bank Information</h3>
              <p className={styles.sectionHint}>
                All monthly debits occur at the end of each month (30th or 31st)
              </p>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="bankName">Name of Bank</label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="Bank Name"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="bankAddress">Bank Address</label>
                  <input
                    type="text"
                    id="bankAddress"
                    name="bankAddress"
                    value={formData.bankAddress}
                    onChange={handleChange}
                    placeholder="Bank Address"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="routingNumber">Bank Routing Number</label>
                  <input
                    type="text"
                    id="routingNumber"
                    name="routingNumber"
                    value={formData.routingNumber}
                    onChange={handleChange}
                    placeholder="9-digit routing number"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="accountNumber">Account Number</label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="Account Number"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Account Type</label>
                  <div className={styles.inlineRadio}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="accountType"
                        value="checking"
                        checked={formData.accountType === 'checking'}
                        onChange={handleChange}
                      />
                      <span>Checking</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="accountType"
                        value="savings"
                        checked={formData.accountType === 'savings'}
                        onChange={handleChange}
                      />
                      <span>Savings</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Terms and Agreement */}
        <div className={styles.formSection}>
          <h2>Terms &amp; Agreement</h2>
          <div className={styles.termsBox}>
            <p>
              By submitting this application, I/we certify that:
            </p>
            <ul>
              <li>
                If accepted, I/we agree to meet our financial obligations to the Club per the terms
                established by the Club.
              </li>
              <li>
                I/we understand that charges incurred during a calendar month are to be fully paid
                by the last of the month following the month in which the charge was incurred.
              </li>
              <li>
                I/we understand that the privilege of participation is based on adherence to the
                club rules and policies as outlined in the Club&apos;s Constitution and By-Laws.
              </li>
              <li>
                I/we certify the accuracy of all information provided as part of this application.
              </li>
            </ul>
            <p className={styles.disclosure}>
              Pana Country Club admits members without regard to religion, race, gender, or national
              origin. Pana Country Club, Inc. is a private member-owned equity club operated under
              the Internal Revenue Service codes as a 501(c) not-for-profit corporation.
            </p>
          </div>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            <span>I have read and agree to the terms and conditions above *</span>
          </label>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!formData.agreeToTerms || isLoading}
        >
          {isLoading ? (
            'Submitting Application...'
          ) : (
            <>
              <IoSendOutline size={20} />
              <span>Submit Application</span>
            </>
          )}
        </button>
      </form>

      {/* Price Flyout */}
      {priceBreakdown && (
        <div className={`${styles.priceFlyout} ${isPricingOpen ? styles.priceFlyoutOpen : ''}`}>
          <button
            type="button"
            className={styles.priceFlyoutToggle}
            onClick={() => setIsPricingOpen(!isPricingOpen)}
            aria-expanded={isPricingOpen}
          >
            <div className={styles.priceFlyoutHeader}>
              <span className={styles.priceFlyoutTitle}>Membership Cost</span>
              <span className={styles.priceFlyoutTotal}>${priceBreakdown.annualTotal.toLocaleString()}/yr</span>
            </div>
            {isPricingOpen ? <IoChevronDownOutline size={20} /> : <IoChevronUpOutline size={20} />}
          </button>
          <div className={styles.priceFlyoutContent}>
            <div className={styles.priceDetails}>
              <div className={styles.priceRow}>
                <span>{priceBreakdown.membershipLabel} {priceBreakdown.householdLabel} Membership</span>
                <span>${priceBreakdown.basePrice.toLocaleString()}</span>
              </div>
              {priceBreakdown.outOfTownDiscount > 0 && (
                <div className={`${styles.priceRow} ${styles.discountRow}`}>
                  <span>Out of Town Discount</span>
                  <span>-${priceBreakdown.outOfTownDiscount}</span>
                </div>
              )}
              {priceBreakdown.selectedCarts.map((cart) => (
                <div key={cart.key} className={styles.priceRow}>
                  <span>{cart.label}</span>
                  <span>${cart.price.toLocaleString()}</span>
                </div>
              ))}
              {(priceBreakdown.introDiscount > 0 || priceBreakdown.nonResDiscount > 0) && (
                <>
                  <div className={styles.priceRow}>
                    <span>Subtotal</span>
                    <span>${priceBreakdown.subtotal.toLocaleString()}</span>
                  </div>
                  {priceBreakdown.introDiscount > 0 && (
                    <div className={`${styles.priceRow} ${styles.discountRow}`}>
                      <span>Introductory (50%)</span>
                      <span>-${priceBreakdown.introDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  {priceBreakdown.nonResDiscount > 0 && (
                    <div className={`${styles.priceRow} ${styles.discountRow}`}>
                      <span>Non-Resident (50%)</span>
                      <span>-${priceBreakdown.nonResDiscount.toLocaleString()}</span>
                    </div>
                  )}
                </>
              )}
              <div className={`${styles.priceRow} ${styles.totalRow}`}>
                <span>Annual Total</span>
                <span>${priceBreakdown.annualTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
