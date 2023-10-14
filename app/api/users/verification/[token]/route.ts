import db  from '@/app/libs/prismadb'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: { token: string }
  }
) {
  const { token } = params

  const user = await db.user.findFirst({
    where: {
      activationTokens: {
        some: {
          AND: [
            {
              activatedAt: null,
            },
            {
              createdAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
              },
            },
            {
              token
            },
          ],
        },
      },
    },
  })

  if (!user) {
    throw new Error('Token is invalid or expired')
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      accountActivated: true,
    },
  })

  await db.activationToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  })

  redirect('/')
}