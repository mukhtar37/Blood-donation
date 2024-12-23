import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
  })

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="min-h-screen bg-red-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="mb-2"><strong>Age:</strong> {user.age}</p>
        <p className="mb-2"><strong>Gender:</strong> {user.gender}</p>
        <p className="mb-2"><strong>Phone:</strong> {user.phone}</p>
        <p className="mb-2"><strong>Address:</strong> {user.address}</p>
        <p className="mb-2"><strong>Blood Group:</strong> {user.bloodGroup}</p>
        <p className="mb-2"><strong>User Type:</strong> {user.userType}</p>
        {user.userType === 'donor' && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Donor Options</h3>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mr-2">
              Update Availability
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              View Requests
            </button>
          </div>
        )}
        {user.userType === 'recipient' && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Recipient Options</h3>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mr-2">
              Search Donors
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Post Urgent Request
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

