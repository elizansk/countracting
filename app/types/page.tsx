import Image from 'next/image';
import { AlertCircle, CheckCircle2, HelpCircle, Search, ShieldAlert } from 'lucide-react';
import fraudTypesData from '@/public/data/fraudTypes.json';
import { assetPath } from '@/lib/paths';

type FraudType = {
  id: number;
  name: string;
  category?: string;
  description: string;
  signs?: string[];
  whatToDo?: string[];
};

const items = fraudTypesData.types as FraudType[];
const categories = Array.from(new Set(items.map((item) => item.category).filter(Boolean)));

export default function TypesPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <div className="overflow-hidden rounded-lg border border-cyan-100 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1fr_22rem]">
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-red-50 p-3 text-red-600">
                <Search size={24} />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-cyan-800">Каталог угроз</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Виды мошенничества</h2>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
                  Статичный справочник с самыми важными сценариями: признаки, красные флаги и первые действия без выдуманных номеров и сомнительных баз.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span key={category} className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-bold text-cyan-900">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="relative min-h-64">
            <Image src={assetPath("/images/phishing-check.png")} alt="Проверка фишинговой страницы" fill sizes="(max-width: 1024px) 100vw, 22rem" className="object-cover" />
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg"
          >
            <div className="border-b border-slate-100 bg-gradient-to-br from-[#071827] to-cyan-900 p-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {item.category && (
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-100">{item.category}</p>
                  )}
                  <h3 className="mt-2 text-xl font-black leading-7">{item.name}</h3>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-black text-cyan-50">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <p className="leading-7 text-slate-700">{item.description}</p>

              {item.signs && (
                <div className="mt-5">
                  <h4 className="flex items-center gap-2 font-black text-slate-950">
                    <ShieldAlert size={18} className="text-red-600" />
                    Красные флаги
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-650">
                    {item.signs.map((sign) => (
                      <li key={sign} className="flex gap-2">
                        <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.whatToDo && (
                <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4">
                  <h4 className="flex items-center gap-2 font-black text-green-950">
                    <HelpCircle size={18} className="text-green-700" />
                    Что сделать
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-green-950">
                    {item.whatToDo.map((action) => (
                      <li key={action} className="flex gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-700" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
