import './globals.css'
import { Footer } from './components/Footer/Footer';

export const metadata = {
  title: 'Pana Country Club',
  description: 'Pana Country Club Website',
  authors: [{ name: 'Jesse Wicks' }],
  publisher: 'Jesse Wicks',
  assets: ['https://nextjs.org/assets'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
