'use client'
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Zap, Lock } from 'lucide-react';
import ScamRiskCheck from '@/components/ScamRiskCheck';

type SafetyTip = {
  id: number;
  title: string;
  category: string;
  description: string;
  steps?: string[];
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
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-lg border border-slate-200 bg-white p-6"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Памятки безопасности</h2>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
              Короткие правила для повседневной защиты. Их можно обсудить с родителями, детьми и коллегами.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src="/images/family-safety.png" alt="Семья обсуждает правила цифровой безопасности" fill sizes="18rem" className="object-cover" />
          </div>
        </div>
      </motion.div>

      <ScamRiskCheck />

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
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
              >
                <div className="rounded-lg bg-green-100 p-3 w-fit text-green-700 group-hover:scale-110 transition-transform">
                  <Icon size={28} />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-green-700">{tip.category}</p>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{tip.title}</h3>
                <p className="mt-4 text-slate-700 leading-relaxed">{tip.description}</p>
                {tip.steps && (
                  <ul className="mt-5 space-y-2 text-sm text-slate-700">
                    {tip.steps.map((step) => (
                      <li key={step} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={16} />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
