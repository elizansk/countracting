'use client'
import { useQuery } from '@tanstack/react-query';

async function fetchTips() {
  const response = await fetch('/data/safetyTips.json');
  return response.json();
}

export default function SafetyTipsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['safetyTips'], queryFn: fetchTips });
  const tips = data?.tips ?? [];

  return (
    <section className="space-y-8 py-10">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">Советы по безопасности</h2>
        <p className="mt-3 text-slate-600">Практические рекомендации, которые можно применять каждый день.</p>
      </div>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {tips.map((tip:any) => (
            <article key={tip.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{tip.title}</h3>
              <p className="mt-3 text-slate-600">{tip.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
