'use client'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, AlertTriangle } from 'lucide-react';

async function fetchBlacklist() {
  const response = await fetch('/data/blacklist.json');
  return response.json();
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function BlacklistPage() {
  const { data, isLoading } = useQuery({ queryKey: ['blacklist'], queryFn: fetchBlacklist });
  const entries = data?.entries ?? [];
  const [filter, setFilter] = useState('');

  const filtered = entries.filter((e:any) => {
    if (!filter) return true;
    const f = filter.toLowerCase();
    return String(e.value).toLowerCase().includes(f) || String(e.description).toLowerCase().includes(f) || String(e.type).toLowerCase().includes(f);
  });

  return (
    <section className="space-y-12 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-black text-slate-950">Чёрный список</h2>
        <p className="mt-3 text-lg text-slate-600">Проверяйте подозрительные номера, сайты и аккаунты перед переводом денег.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Поиск по номеру, сайту или описанию..."
            className="w-full rounded-2xl border-2 border-slate-300 bg-white pl-12 pr-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <button
          onClick={() => setFilter('')}
          className="rounded-2xl bg-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-300"
        >
          Сброс
        </button>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-12">Загрузка чёрного списка...</div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-600">Не найдено результатов для "{filter}"</div>
          ) : (
            filtered.map((entry:any) => (
              <motion.div
                key={entry.id}
                variants={itemVariants}
                className="group rounded-3xl border-2 border-slate-200 bg-gradient-to-r from-white to-slate-50 p-6 shadow-sm transition hover:shadow-lg hover:border-red-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-red-100 p-3 text-red-600 flex-shrink-0">
                    <AlertTriangle size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold uppercase text-red-600">{entry.type}</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-950 break-all">{entry.value}</h3>
                    <p className="mt-2 text-slate-600">{entry.description}</p>
                    <div className="mt-4 flex gap-6 text-sm">
                      <span className="text-slate-500">📊 Жалоб: <strong className="text-slate-900">{entry.reports}</strong></span>
                      <span className="text-slate-500">📅 Добавлено: <strong className="text-slate-900">{new Date(entry.dateAdded).toLocaleDateString('ru-RU')}</strong></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </section>
  );
}
