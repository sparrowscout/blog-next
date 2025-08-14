'use client'

import React from 'react'
import Header from '@/components/header'
import Navigation from '@/components/Navigation'
import useNavigationStore from '@/store/useNavigationStore'
import useSearchStore from '@/store/useSearchStore'
import SearchBox from '../SearchBox'

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const { isNavigationOpen } = useNavigationStore()
  const { isSearching } = useSearchStore()

  return (
    <>
      {isSearching ? <SearchBox /> : <Header />}
      {isNavigationOpen && <Navigation />}
      {children}
    </>
  )
}
