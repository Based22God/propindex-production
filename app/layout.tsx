import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PropIndex - Professional Estate Agent Tool',
  description: 'AI-powered property data analysis tool for estate agents. Real-time market insights, sold property tracking, and lead generation.',
  keywords: 'estate agent, property data, real estate, market analysis, PropertyData API',
  authors: [{ name: 'PropIndex Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'PropIndex - Professional Estate Agent Tool',
    description: 'AI-powered property data analysis for estate agents',
    type: 'website',
    siteName: 'PropIndex',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-black text-white">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
