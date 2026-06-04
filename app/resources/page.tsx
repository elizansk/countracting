import Image from 'next/image';
import { ExternalLink, Landmark, ShieldCheck } from 'lucide-react';
import resourcesData from '@/public/data/resources.json';

type Resource = {
  id: number;
  name: string;
  url: string;
  description: string;
};

const resources = resourcesData.resources as Resource[];

export default function ResourcesPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <div className="rounded-lg border border-cyan-100 bg-white p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-cyan-800">Проверенные каналы</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Куда обращаться и где проверять</h2>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
              Статичная подборка официальных и общественных ресурсов: банк, МВД, Госуслуги, Роспотребнадзор, Роскомнадзор, Норильск и Мошеловка.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src="/images/norilsk-anti-fraud-hero.png" alt="Защита семьи от мошенничества в Норильске" fill sizes="18rem" className="object-cover" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-cyan-50 p-2 text-cyan-800">
                    {resource.name.includes('Норильск') ? <Landmark size={22} /> : <ShieldCheck size={22} />}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{resource.name}</h3>
                </div>
                <p className="mt-4 leading-relaxed text-slate-700">{resource.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 font-semibold text-cyan-800 transition-transform group-hover:translate-x-1">
                  Открыть ресурс <ExternalLink size={18} />
                </div>
              </div>
              <ExternalLink className="shrink-0 text-slate-300 group-hover:text-cyan-700" size={24} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
