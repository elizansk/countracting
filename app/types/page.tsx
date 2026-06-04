'use client'
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, HelpCircle, Search } from 'lucide-react';

type FraudType = {
  id: number;
  name: string;
  category?: string;
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
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-lg border border-slate-200 bg-white p-6"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-center">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-red-50 p-3 text-red-600">
              <Search size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Схемы мошенничества</h2>
              <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
                Выберите похожую ситуацию и сравните признаки. Если вас торопят, просят код или перевод, сначала остановитесь и проверьте информацию официально.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src="/images/phishing-check.png" alt="Проверка фишинговой страницы" fill sizes="18rem" className="object-cover" />
          </div>
        </div>
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
              className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-red-300 hover:shadow-md"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-full bg-red-100 p-2 text-red-600">
                  <AlertCircle size={24} />
                </div>
                <div>
                  {item.category && (
                    <p className="text-xs font-bold uppercase tracking-wider text-red-600">{item.category}</p>
                  )}
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">{item.name}</h3>
                </div>
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
                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0 text-red-500" />
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
                        <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-green-600" />
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
