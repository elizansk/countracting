import Image from 'next/image';
import { BarChart3, TrendingUp } from 'lucide-react';
import analyticsData from '@/public/data/analytics.json';
import { assetPath } from '@/lib/paths';

const maxType = Math.max(...analyticsData.typesDistribution.map((item) => item.value));
const maxRegion = Math.max(...analyticsData.topRegions.map((item) => item.reports));

export default function AnalyticsPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <div className="rounded-lg border border-cyan-100 bg-white p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-cyan-800">Статичная витрина</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Статистика</h2>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
              Демонстрационная аналитика проекта: показывает, какие схемы стоит объяснять в первую очередь.
            </p>
            <p className="mt-3 text-sm text-slate-500">Обновлено: {new Date(analyticsData.lastUpdated).toLocaleDateString('ru-RU')}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src={assetPath("/images/phishing-check.png")} alt="Анализ признаков мошенничества" fill sizes="18rem" className="object-cover" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="w-fit rounded-lg bg-cyan-700 p-3 text-white">
            <TrendingUp size={24} />
          </div>
          <p className="mt-4 text-sm text-slate-600">Всего обращений</p>
          <p className="mt-1 text-4xl font-black text-slate-950">{analyticsData.totalReports.toLocaleString('ru-RU')}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="w-fit rounded-lg bg-amber-500 p-3 text-white">
            <BarChart3 size={24} />
          </div>
          <p className="mt-4 text-sm text-slate-600">Типов мошенничества</p>
          <p className="mt-1 text-4xl font-black text-slate-950">{analyticsData.typesDistribution.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="w-fit rounded-lg bg-red-600 p-3 text-white">
            <TrendingUp size={24} />
          </div>
          <p className="mt-4 text-sm text-slate-600">Локальных зон</p>
          <p className="mt-1 text-4xl font-black text-slate-950">{analyticsData.topRegions.length}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-black text-slate-950">Распределение по типам</h3>
          <div className="mt-6 space-y-4">
            {analyticsData.typesDistribution.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between gap-4 text-sm font-semibold text-slate-700">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${(item.value / maxType) * 100}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-black text-slate-950">Локальная витрина</h3>
          <div className="mt-6 space-y-4">
            {analyticsData.topRegions.map((region, index) => (
              <div key={region.name}>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-slate-700">{index + 1}. {region.name}</span>
                  <span className="font-black text-slate-950">{region.reports}</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-cyan-50">
                  <div className="h-full rounded-full bg-cyan-700" style={{ width: `${(region.reports / maxRegion) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
