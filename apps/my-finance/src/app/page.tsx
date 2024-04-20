import Image from 'next/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import accountImg from '../../public/landing/account.png'
import snapshotsImg from '../../public/landing/snapshots.png'
import { BarChart } from './(pages)/app/savings/components/bar-chart'
import { Button } from './components/button'
import { Routes } from './routes'

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-4xl p-4 mt-6 space-y-14">
      <h2 className="text-center">💸 Ever wondered how much you saved last month?</h2>

      <div className="text-center sm:px-10 space-y-4">
        <p className="font-medium">
          <i>Or maybe last year?</i>
        </p>

        <p>My Finance let&apos;s you to effortlessly track your accounts and achieve your savings goals.</p>

        <p>
          In a few steps you can create and monitor <b>multiple accounts</b>, add <b>monthly statements</b>, and visualize your <b>progress</b> with
          insightful graphs.
        </p>
      </div>

      <div className="text-center">
        <Button as={Link} href={Routes.app.accounts.index} variant="fill" className="inline-block px-16 py-4 font-medium shadow-lg hover:shadow-lg">
          Launch App
        </Button>
      </div>

      <div className="space-y-20">
        <ResponsiveContainer>
          <div className="space-y-4">
            <h2>⚙️ Set up your accounts</h2>
            <p>Add as many accounts as you need, from savings and checking to cash holdings.</p>
            <p>
              You can also customize your accounts with unique names and emojis to easily identify them. And know at avery moment all your balances at
              a glance.
            </p>
          </div>
          <Image src={accountImg} width={400} alt="Accounts" className="object-contain mx-auto max-w-full sm:max-w-xl" />
        </ResponsiveContainer>

        <ResponsiveContainer rowReverse>
          <div className="space-y-4">
            <h2>⏱️ Track your balances</h2>
            <p>
              Keep track of each account balance over time. Add monthly snapshots to see how your accounts are performing and make better financial
              decisions.
            </p>
          </div>
          <Image src={snapshotsImg} width={400} alt="Balances" className="object-contain mx-auto max-w-full sm:max-w-xl" />
        </ResponsiveContainer>

        <h2 className="text-center">🚀 Watch your savings blast off</h2>

        <div className="mx-auto max-w-full sm:max-w-xl">
          <SampleSavingsChart />
        </div>
      </div>
    </div>
  )
}

const ResponsiveContainer = ({
  className,
  rowReverse = false,
  colReverse = false,
  ...rest
}: ComponentPropsWithoutRef<'div'> & { rowReverse?: boolean; colReverse?: boolean }) => (
  <div
    className={twMerge(
      'flex flex-col sm:flex-row',
      colReverse && 'flex-col-reverse',
      rowReverse && 'sm:flex-row-reverse',
      'gap-x-8 gap-y-4',
      className,
    )}
    {...rest}
  />
)

const SampleSavingsChart = () => {
  const savingsByPeriod = new Map([
    ['Jan 23', 1000],
    ['Feb 23', -1000],
    ['Mar 23', 300],
    ['Apr 23', 2500],
    ['May 23', -500],
    ['Jun 23', 1000],
    ['Jul 23', 900],
    ['Ago 23', 600],
    ['Sep 23', 960],
    ['Oct 23', 1000],
    ['Nov 23', -700],
    ['Dec 23', 200],
    ['Jan 24', 1500],
  ])

  const label = 'Savings'
  const data = Array.from(savingsByPeriod).map(([period, balance]) => ({ x: period, y: balance }))

  return <BarChart datasets={[{ label, data }]} />
}
