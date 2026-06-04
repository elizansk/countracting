'use client'
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, TrendingUp, MessageCircle, Database, BookOpen } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <section className="space-y-16 py-10 overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative rounded-4xl bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 px-6 py-16 text-white shadow-2xl shadow-red-500/20 overflow-hidden sm:px-12"
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-white blur-3xl"
          />
        </div>
        <div className="relative max-w-4xl z-10">
          <motion.p
            variants={itemVariants}
            className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-100"
          >
            🛡️ Защита от мошенников
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-5xl font-black tracking-tight sm:text-6xl leading-tight"
          >
            Защитите себя и близких от мошенничества
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl text-lg leading-8 text-yellow-50/95"
          >
            Полная информация о видах обмана, чёрный список мошенников, подробные советы по безопасности и удобная форма для сообщения об угрозах.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/report"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-red-600 shadow-lg shadow-black/20 transition hover:scale-105 hover:shadow-xl"
            >
              <AlertTriangle size={20} />
              Сообщить о мошеннике
            </Link>
            <Link
              href="/blacklist"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-8 py-4 text-base font-bold text-white transition hover:bg-white/10 hover:border-white"
            >
              <Database size={20} />
              Чёрный список
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 lg:grid-cols-3"
      >
        {[
          { title: 'Типы мошенничества', description: 'Телефонные, инвестиции, кибер и 6+ других реальных схем обмана', href: '/types', icon: AlertTriangle, color: 'from-red-500 to-orange-500' },
          { title: 'Советы по безопасности', description: 'Как распознать мошенника и защитить свои деньги', href: '/safety-tips', icon: Shield, color: 'from-blue-500 to-cyan-500' },
          { title: 'Статистика и аналитика', description: 'Анализ видов мошенничества и региональные данные', href: '/analytics', icon: TrendingUp, color: 'from-green-500 to-emerald-500' }
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.href} variants={itemVariants}>
              <Link
                href={card.href}
                className="group block h-full rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-xl hover:-translate-y-2 overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="relative z-10">
                  <Icon className="h-10 w-10 text-slate-700 group-hover:scale-110 transition-transform" />
                  <h2 className="mt-4 text-2xl font-bold text-slate-900">{card.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 lg:grid-cols-3"
      >
        {[
          { headline: '⚡ Реагируйте быстро', text: 'Заполните форму за 2 минуты и сообщите о мошеннике в органы власти' },
          { headline: '🔍 Проверяйте перед платежом', text: 'Используйте чёрный список для проверки номеров и сайтов' },
          { headline: '📚 Обучайте близких', text: 'Поделитесь советами с друзьями и родственниками, чтобы защитить их' }
        ].map((item, i) => (
          <motion.div
            key={item.headline}
            variants={itemVariants}
            className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg hover:border-sky-300"
          >
            <h3 className="text-xl font-bold text-slate-900">{item.headline}</h3>
            <p className="mt-4 text-slate-600 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Links */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { title: 'Ресурсы', href: '/resources', icon: BookOpen },
          { title: 'Чат-помощник', href: '/chatbot', icon: MessageCircle },
          { title: 'О проекте', href: '#', icon: Shield },
          { title: 'Контакты', href: '#', icon: AlertTriangle }
        ].map((link) => {
          const Icon = link.icon;
          return (
            <motion.div key={link.href} variants={itemVariants}>
              <Link
                href={link.href}
                className="flex items-center justify-center gap-2 rounded-2xl bg-slate-100 p-4 text-slate-700 font-semibold transition hover:bg-sky-600 hover:text-white"
              >
                <Icon size={20} />
                {link.title}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
