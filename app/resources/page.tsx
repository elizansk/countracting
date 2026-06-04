import { useQuery } from '@tanstack/react-query';

async function fetchResources() {
  const res = await fetch('/data/resources.json');
  return res.json();
}

export default function ResourcesPage() {
  const { data, isLoading } = useQuery({ queryKey: ['resources'], queryFn: fetchResources });
  const items = data?.resources ?? [];

  return (
    <section className="space-y-8 py-10">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">Полезные ресурсы и контакты</h2>
        <p className="mt-3 text-slate-600">Собранные официальные источники и сервисы, куда можно обратиться при мошенничестве.</p>
      </div>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <div className="grid gap-4">
          {items.map((r:any) => (
            <a key={r.id} href={r.url} target="_blank" rel="noreferrer" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md">
              <h3 className="text-lg font-semibold text-slate-900">{r.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{r.description}</p>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
