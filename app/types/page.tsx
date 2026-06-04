'use client'
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

type FraudType = {
  id: number;
  name: string;
  description: string;
  signs?: string[];
  whatToDo?: string[];
};

async function fetchTypes() {
  const response = await fetch('/data/fraudTypes.json');
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

export default function TypesPage() {
  const { data, isLoading } = useQuery({ queryKey: ['fraudTypes'], queryFn: fetchTypes });
  const items: FraudType[] = data?.types ?? [];

  return (
    <section className="space-y-12 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-black text-slate-950">Типы мошенничества</h2>
        <p className="mt-3 text-lg text-slate-600">Реальные сценарии обмана и признаки, которые помогут распознать мошенничество и защитить себя.</p>
      </motion.div>
      {isLoading ? (
        <div className="text-center py-12">Загрузка информации...</div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 lg:grid-cols-2"
        >
          {items.map((item) => (
            <motion.article
              key={item.id}
              variants={itemVariants}
              className="group rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm transition hover:shadow-lg hover:border-red-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-full bg-red-100 p-2 text-red-600">
                  <AlertCircle size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{item.name}</h3>
              </div>
              <p className="text-slate-700 leading-relaxed mb-6">{item.description}</p>
              
              {item.signs && (
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <HelpCircle size={18} className="text-orange-500" />
                    Как распознать:
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {item.signs.map((sign, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-red-500 font-bold flex-shrink-0">⚠</span>
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {item.whatToDo && (
                <div>
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <CheckCircle2 size={18} className="text-green-500" />
                    Что делать:
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {item.whatToDo.map((action, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
}
