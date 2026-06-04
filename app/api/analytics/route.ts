import { NextResponse } from 'next/server';

export async function GET() {
  const analytics = {
    totalReports: 2847,
    typesDistribution: [
      { name: 'Телефонное', value: 623, color: '#ef4444' },
      { name: 'Инвестиции', value: 512, color: '#f97316' },
      { name: 'Кибер', value: 456, color: '#3b82f6' },
      { name: 'Романтика', value: 378, color: '#ec4899' }
    ],
    topRegions: [
      { name: 'Москва', reports: 456 },
      { name: 'Санкт-Петербург', reports: 234 },
      { name: 'Новосибирск', reports: 145 }
    ]
  };
  return NextResponse.json(analytics);
}
