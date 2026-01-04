'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoLocationOutline, IoCallOutline, IoMailOutline, IoLogoFacebook, IoSendOutline } from 'react-icons/io5';
import { MenuBar } from '../components/MenuBar/MenuBar';
import styles from './page.module.css';

const stateOptions = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: 'IL',
    postalCode: '',
    email: '',
    phone: '',
    comment: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return formData.email || formData.phone;
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
          name: { firstName: formData.firstName, lastName: formData.lastName },
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          email: formData.email,
          phone: formData.phone,
          message: formData.comment,
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Your Information</h3>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="John"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Smith"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="address">Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="123 Main Street"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Pana"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="state">State *</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              {stateOptions.map((stateCode) => (
                <option key={stateCode} value={stateCode}>
                  {stateCode}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="postalCode">Postal Code *</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              placeholder="62557"
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Contact Method</h3>
        <p className={styles.sectionHint}>Please provide at least one contact method</p>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(217) 555-1234"
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Your Message</h3>
        <div className={styles.inputGroup}>
          <label htmlFor="comment">Message *</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            rows={5}
            placeholder="How can we help you? Tell us about your interest in the club, questions about membership, or anything else..."
          />
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={!validateForm() || isLoading}
      >
        {isLoading ? (
          'Sending...'
        ) : (
          <>
            <IoSendOutline size={20} />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <MenuBar openMenu={true} />

      {/* Header */}
      <div className={styles.header}>
        <h1>Contact Us</h1>
        <p className={styles.subtitle}>
          We&apos;d love to hear from you. Reach out with questions or to schedule a visit.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className={styles.contactInfo}>
        <div className={styles.infoCard}>
          <IoLocationOutline size={28} />
          <div>
            <h3>Visit Us</h3>
            <p>411 E 9th St</p>
            <p>Pana, IL 62557</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <IoCallOutline size={28} />
          <div>
            <h3>Call Us</h3>
            <p>(217) 562-2641</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <IoMailOutline size={28} />
          <div>
            <h3>Email Us</h3>
            <p>panacountryclub@gmail.com</p>
          </div>
        </div>
        <a
          href="https://www.facebook.com/pccpana"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.infoCard}
        >
          <IoLogoFacebook size={28} />
          <div>
            <h3>Follow Us</h3>
            <p>@pccpana</p>
          </div>
        </a>
      </div>

      {/* Contact Form */}
      <div className={styles.formContainer}>
        <h2>Send Us a Message</h2>
        <ContactForm />
      </div>
    </main>
  );
}
