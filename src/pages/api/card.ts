// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

interface RequestPayload {
  number: string
  name: string
  CVV: string
  expires_in: string
}

interface Data extends RequestPayload {
  id: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { number, name, CVV, expires_in } = req.body as RequestPayload

  if (![number, name, CVV, expires_in].every(Boolean)) res.status(400).end()

  try {
    const card = await prisma.card.create({
      data: {
        CVV,
        expires_in,
        name,
        number,
      },
    })

    res.status(201).json(card)
  } catch (error) {
    res.status(500).end()
  }
}
