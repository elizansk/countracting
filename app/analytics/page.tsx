'use client'
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { BarChart3, TrendingUp } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

type AnalyticsData = {
  totalReports: number;
  typesDistribution: Array<{ name: string; value: number; color: string }>;
  topRegions: Array<{ name: string; reports: number }>;
};

async function fetchAnalytics() {
  const response = await fetch('/data/analytics.json');
  return response.json();
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['analytics'], queryFn: fetchAnalytics });
  const analytics: AnalyticsData = data || { totalReports: 0, typesDistribution: [], topRegions: [] };

  const chartData = {
    labels: analytics.typesDistribution.map(d => d.name),
    datasets: [
      {
        data: analytics.typesDistribution.map(d => d.value),
        backgroundColor: analytics.typesDistribution.map(d => d.color),
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <section className="space-y-12 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-black text-slate-950">Статистика и аналитика</h2>
        <p className="mt-3 text-lg text-slate-600">Анализ обращений и распределение типов мошенничества.</p>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-12">Загрузка данных...</div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Key Metrics */}
          <motion.div
            variants={itemVariants}
            className="grid gap-6 md:grid-cols-3"
          >
            <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-blue-50 to-blue-100 p-8 shadow-sm">
              <div className="rounded-full bg-blue-500 p-3 w-fit text-white">
                <TrendingUp size={24} />
              </div>
              <p className="mt-4 text-sm text-slate-600">Всего обращений</p>
              <p className="mt-1 text-4xl font-black text-slate-950">{analytics.totalReports.toLocaleString('ru-RU')}</p>
            </div>
            <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-orange-50 to-orange-100 p-8 shadow-sm">
              <div className="rounded-full bg-orange-500 p-3 w-fit text-white">
                <BarChart3 size={24} />
              </div>
              <p className="mt-4 text-sm text-slate-600">Типов мошенничества</p>
              <p className="mt-1 text-4xl font-black text-slate-950">{analytics.typesDistribution.length}</p>
            </div>
            <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-red-50 to-red-100 p-8 shadow-sm">
              <div className="rounded-full bg-red-500 p-3 w-fit text-white">
                <TrendingUp size={24} />
              </div>
              <p className="mt-4 text-sm text-slate-600">Уникальные регионы</p>
              <p className="mt-1 text-4xl font-black text-slate-950">{analytics.topRegions.length}</p>
            </div>
          </motion.div>

          {/* Distribution Chart */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Распределение по типам</h3>
            <div className="max-w-sm mx-auto">
              <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>
          </motion.div>

          {/* Top Regions */}
          {analytics.topRegions.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Топ регионов</h3>
              <div className="space-y-4">
                {analytics.topRegions.map((region, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-xl font-bold text-slate-400 min-w-8">{index + 1}.</span>
                    <span className="flex-1 text-slate-700 font-semibold">{region.name}</span>
                    <span className="text-lg font-bold text-slate-900">{region.reports}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </section>
  );
}
