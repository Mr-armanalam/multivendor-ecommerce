
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const Footer = () => {
  return (
    <footer className=' border-t font-medium bg-white'>
      <div className="max-w-(--breackpoint-xl) mx-auto flex gap-2 items-center h-full px-4 lg:px-12 py-6">
        <p className="text-xl">Powered by</p>
        <Link href={'/'}>
          <span className={cn('text-2xl font-semibold', poppins.className)}>funroad</span>
        </Link>
      </div>
    </footer>
  )
}

export default Footer