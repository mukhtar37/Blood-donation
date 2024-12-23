import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const bloodGroups = searchParams.get('bloodGroups')?.split(',') || []
  const location = searchParams.get('location') || ''

  try {
    const donors = await prisma.user.findMany({
      where: {
        userType: 'donor',
        bloodGroup: { in: bloodGroups },
        address: { contains: location, mode: 'insensitive' },
      },
      select: {
        id: true,
        name: true,
        bloodGroup: true,
        address: true,
      },
    })

    return NextResponse.json({ donors })
  } catch (error) {
    console.error('Error searching donors:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

