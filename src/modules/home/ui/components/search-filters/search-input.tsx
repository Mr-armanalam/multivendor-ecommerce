'use client'
import { Input } from '@/components/ui/input';
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from 'lucide-react';
import React from 'react'
import CategorySidebar from './category-sidebar';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface Props {
  disabled?: boolean;
}

const SearchInput = ({disabled}:Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  return (
    <div className='flex items-center gap-2 w-full'>
      <CategorySidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
     <div className="relative w-full">
        <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500' />
        <Input className='pl-8' placeholder='Search products' disabled={disabled} />
      </div> 
      <Button
        variant={'elevated'}
        className='size-12 shrink-0 flex lg:hidden'
        onClick={() => setIsSidebarOpen(true)}
        >
          <ListFilterIcon />
        </Button>
      {session.data?.user && (
        <Button
        asChild //flex property
        variant={'elevated'}
        >
          <Link href={'/library'}>
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
    </div>
  )
}

export default SearchInput