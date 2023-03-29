'use client';
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { MenuBar } from '../components/MenuBar/MenuBar';
import styles from './page.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <MenuBar useScroll={false} openMenu={true} />
      <h1>Contact Us</h1>
      <ContactForm />
    </main>
  );
}
