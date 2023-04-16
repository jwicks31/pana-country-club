'use client';
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { MenuBar } from '../components/MenuBar/MenuBar';
import styles from './page.module.css';

const stateOptions = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('IL');
  const [postalCode, setPostalCode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const validateForm = () => {
    if (!email && !phone) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: { firstName, lastName },
          address,
          city,
          state,
          postalCode,
          email,
          phone,
          message: comment,
        }),
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      router.push('/');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.contactForm}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.section}>
          <legend>Contact Information</legend>
          <div className={styles.inputWrapper}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={handleCityChange}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="state">State:</label>
            <select
              id="state"
              name="state"
              value={state}
              onChange={handleStateChange}
              required
            >
              {stateOptions.map((stateCode) => (
                <option key={stateCode} value={stateCode}>
                  {stateCode}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={postalCode}
              onChange={handlePostalCodeChange}
              required
            />
          </div>
        </fieldset>
        <fieldset className={styles.section}>
          <legend>How Should We Contact You</legend>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
        </fieldset>
        <fieldset className={styles.section}>
          <legend>Additional Information</legend>
          <div className={styles.inputWrapper}>
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={handleCommentChange}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!validateForm()}
          >
            Send
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <MenuBar useScroll={false} openMenu={true} />
      <ContactForm />
    </main>
  );
}
