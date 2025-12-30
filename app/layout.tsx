import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Department Management System',
  description: 'Java-inspired Department Management Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
