import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import './prism-one-light.css'
import LayoutClient from '@/components/common/LayoutClient'

const geistSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: '500',
})

export const metadata: Metadata = {
  title: 'my-cabinet',
  description:
    '공부했던 내용, 작업했던 내용, 트러블 슈팅 기록용 블로그',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`h-dvh w-full ${geistSans.className}  bg-[repeating-linear-gradient(to_bottom,_#f8f8f8,_#f8f8f8_30px,_#000000_31px)] antialiased`}
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
