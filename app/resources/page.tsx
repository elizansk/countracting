'use client'
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

type Resource = {
  id: number;
  name: string;
  url: string;
  description: string;
};

async function fetchResources() {
  const response = await fetch('/data/resources.json');
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

export default function ResourcesPage() {
  const { data, isLoading } = useQuery({ queryKey: ['resources'], queryFn: fetchResources });
  const resources: Resource[] = data?.resources ?? [];

  return (
    <section className="space-y-12 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-black text-slate-950">Официальные ресурсы</h2>
        <p className="mt-3 text-lg text-slate-600">Ссылки на проверенные государственные и общественные организации для защиты прав граждан.</p>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-12">Загрузка ресурсов...</div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 lg:grid-cols-2"
        >
          {resources.map((resource) => (
            <motion.a
              key={resource.id}
              variants={itemVariants}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm transition hover:shadow-lg hover:border-sky-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900">{resource.name}</h3>
                  <p className="mt-3 text-slate-700 leading-relaxed">{resource.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sky-600 font-semibold group-hover:translate-x-1 transition-transform">
                    Посетить сайт <ExternalLink size={18} />
                  </div>
                </div>
                <div className="rounded-full bg-sky-100 p-3 text-sky-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <ExternalLink size={24} />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}
    </section>
  );
}
