'use client'
import { useQuery } from '@tanstack/react-query';

type FraudType = {
  id: number;
  name: string;
  description: string;
  signs?: string[];
};

async function fetchTypes() {
  const response = await fetch('/data/fraudTypes.json');
  return response.json();
}

export default function TypesPage() {
  const { data, isLoading } = useQuery({ queryKey: ['fraudTypes'], queryFn: fetchTypes });
  const items: FraudType[] = data?.types ?? [];

  return (
    <section className="space-y-8 py-10">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">Типы мошенничества</h2>
        <p className="mt-3 text-slate-600">Реальные сценарии обмана и признаки, которые помогут распознать мошенничество.</p>
      </div>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-3 text-slate-600">{item.description}</p>
              {item.signs && (
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {item.signs.map((sign, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-sky-600">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
