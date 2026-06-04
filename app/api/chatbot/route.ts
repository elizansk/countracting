import { NextResponse } from 'next/server';

const replies: Record<string, string> = {
  phone: 'Банк не просит пароли и коды подтверждения по телефону. Перезвоните в официальный номер.',
  investment: 'Гарантированная прибыль — это мошенничество. Проверяйте лицензию брокера.',
  cyber: 'Не переходите по подозрительным ссылкам и используйте двухфакторную аутентификацию.',
  romance: 'Не переводите деньги незнакомому человеку, даже если он обещает любовь.',
  help: 'Расскажите подробно, с каким мошенничеством вы столкнулись.',
};

export async function POST(request: Request) {
  const { message } = await request.json();
  const text = String(message ?? '').toLowerCase();
  if (!text.trim()) return NextResponse.json({ reply: 'Опишите вашу ситуацию, пожалуйста.' });

  for (const key of Object.keys(replies)) {
    if (text.includes(key)) {
      return NextResponse.json({ reply: replies[key] });
    }
  }
  return NextResponse.json({ reply: 'См. разделы сайта: Типы мошенничества, Чёрный список и Советы.' });
}
