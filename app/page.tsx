import Link from 'next/link'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-red-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-red-600 mb-8">Blood Donation Matcher</h1>
        {session ? (
          <div>
            <p className="mb-4">Welcome, {session.user.name}!</p>
            <Link href="/dashboard" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div>
            <p className="mb-4">Connect blood donors with recipients in real-time.</p>
            <Link href="/auth/register" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mr-4">
              Register
            </Link>
            <Link href="/auth/login" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Login
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

