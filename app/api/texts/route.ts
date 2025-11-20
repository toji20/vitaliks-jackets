import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { prisma } from '@/prisma/prisma-client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const texts = await prisma.textContent.findMany()
    return NextResponse.json(texts)
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка загрузки' }, { status: 500 })
  }
}

