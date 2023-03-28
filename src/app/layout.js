import './globals.css'

export const metadata = {
  title: 'Pana Country Club',
  description: 'Pana Country Club Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
