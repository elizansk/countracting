'use client'
import { useQuery } from '@tanstack/react-query';

async function fetchBlacklist() {
  const response = await fetch('/data/blacklist.json');
  return response.json();
}

export default function BlacklistPage() {
  const { data, isLoading } = useQuery({ queryKey: ['blacklist'], queryFn: fetchBlacklist });
  const entries = data?.entries ?? [];
  const [filter, setFilter] = React.useState('');

  const filtered = entries.filter((e:any) => {
    if (!filter) return true;
    const f = filter.toLowerCase();
    return String(e.value).toLowerCase().includes(f) || String(e.description).toLowerCase().includes(f) || String(e.type).toLowerCase().includes(f);
  });

  return (
    <section className="space-y-8 py-10">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">Чёрный список</h2>
        <p className="mt-3 text-slate-600">Проверяйте подозрительные номера, сайты и аккаунты перед переводом денег.</p>
      </div>

      <div className="flex w-full max-w-xl items-center gap-3">
        <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Поиск по номеру, сайту или описанию" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none" />
        <button onClick={()=>setFilter('')} className="rounded-2xl bg-sky-600 px-4 py-2 text-white">Сброс</button>
      </div>

      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((entry:any) => (
            <div key={entry.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex sm:justify-between sm:items-center">
              <div>
                <p className="text-sm uppercase text-sky-600">{entry.type}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{entry.value}</h3>
                <p className="mt-2 text-sm text-slate-600">{entry.description}</p>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 sm:mt-0">
                <span>Репортов: {entry.reports}</span>
                <span>{entry.dateAdded}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="text-slate-500">Ничего не найдено по запросу.</div>}
        </div>
      )}
    </section>
  );
}
