import Link from 'next/link'

export default function Page() {
  return (
    <div className="bg-white">
      <h1>New Account Form</h1>
      <Link href="/accounts">Create</Link>
    </div>
  )
}
