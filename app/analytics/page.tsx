'use client'
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { useQuery } from '@tanstack/react-query';

async function fetchAnalytics() {
  const response = await fetch('/api/analytics');
  return response.json();
}

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['analytics'], queryFn: fetchAnalytics });
  if (isLoading) return <div className="py-10">Загрузка...</div>;

  const chartData = {
    labels: data.typesDistribution.map((item:any) => item.name),
    datasets: [{ data: data.typesDistribution.map((item:any) => item.value), backgroundColor: data.typesDistribution.map((item:any) => item.color) }],
  };

  return (
    <section className="space-y-8 py-10">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">Аналитика угроз</h2>
        <p className="mt-3 text-slate-600">Обзор основных направлений мошенничества и динамика обращений.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Распределение по типам</h3>
          <div className="mt-6">
            <Pie data={chartData} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Обращений всего</h3>
            <p className="mt-3 text-4xl font-bold text-slate-900">{data.totalReports}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Топ регионов</h3>
            <ul className="mt-3 space-y-2 text-slate-600">
              {data.topRegions.map((region:any) => (
                <li key={region.name} className="flex justify-between">
                  <span>{region.name}</span>
                  <span>{region.reports}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
