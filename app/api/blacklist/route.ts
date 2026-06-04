import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'blacklist.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const entries = type ? data.entries.filter((entry:any) => entry.type === type) : data.entries;
  return NextResponse.json({ entries, total: entries.length });
}
