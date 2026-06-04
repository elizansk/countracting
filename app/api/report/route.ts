import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const reportFile = path.join(process.cwd(), 'data', 'reports.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.fraudType || !body.description || !body.reporterEmail) {
      return NextResponse.json({ error: 'Заполните обязательные поля.' }, { status: 400 });
    }

    const report = { ...body, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const list = fs.existsSync(reportFile) ? JSON.parse(fs.readFileSync(reportFile, 'utf-8')) : [];
    fs.mkdirSync(path.dirname(reportFile), { recursive: true });
    fs.writeFileSync(reportFile, JSON.stringify([...list, report], null, 2));
    return NextResponse.json({ message: 'Сообщение принято.', report }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Не удалось сохранить сообщение.' }, { status: 500 });
  }
}
