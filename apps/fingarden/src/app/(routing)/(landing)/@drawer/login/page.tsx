'use client'

import { useRouter } from 'next/navigation'

import { Routes } from '@/routes'

import { Drawer } from '@/components/drawer'

import { Login } from '@/pages/login'

export default function Page() {
  const router = useRouter()

  return (
    <Drawer onClose={() => router.push(Routes.home.index)}>
      <Login />
    </Drawer>
  )
}
