'use client'
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock } from 'lucide-react';

type SafetyTip = {
  id: number;
  title: string;
  description: string;
};

async function fetchTips() {
  const response = await fetch('/data/safetyTips.json');
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

const icons = [Shield, Zap, Lock];

export default function SafetyTipsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['safetyTips'], queryFn: fetchTips });
  const items: SafetyTip[] = data?.tips ?? [];

  return (
    <section className="space-y-12 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-black text-slate-950">Советы по безопасности</h2>
        <p className="mt-3 text-lg text-slate-600">Практические советы, которые помогут вам защитить себя от мошенничества.</p>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-12">Загрузка советов...</div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 lg:grid-cols-3"
        >
          {items.map((tip, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.article
                key={tip.id}
                variants={itemVariants}
                className="group rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm transition hover:shadow-lg hover:border-green-300 hover:-translate-y-1"
              >
                <div className="rounded-2xl bg-green-100 p-3 w-fit text-green-600 group-hover:scale-110 transition-transform">
                  <Icon size={28} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{tip.title}</h3>
                <p className="mt-4 text-slate-700 leading-relaxed">{tip.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
