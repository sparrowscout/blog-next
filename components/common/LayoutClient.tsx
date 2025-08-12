'use client'

import React from 'react'
import Header from '@/components/header'
import Navigation from '@/components/Navigation'
import useNavigationStore from '@/store/useNavigationStore'

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const { isNavigationOpen } = useNavigationStore()

  return (
    <>
      <Header />
      {isNavigationOpen && <Navigation />}
      {children}
    </>
  )
}
