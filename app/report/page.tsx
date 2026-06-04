'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

type FormData = {
  fraudType: string;
  description: string;
  reporterEmail: string;
  contactInfo?: string;
  evidence?: string;
};

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

export default function ReportPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-12 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-black text-slate-950">Сообщить о мошеннике</h2>
        <p className="mt-3 text-lg text-slate-600">Помогите нам защитить других граждан, заполнив форму с информацией о мошеннике.</p>
      </motion.div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 flex items-start gap-4"
        >
          <CheckCircle2 className="text-green-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-green-900">Спасибо! Ваше сообщение принято.</h3>
            <p className="mt-1 text-sm text-green-800">Ваша информация поможет защитить других людей от мошенничества.</p>
          </div>
        </motion.div>
      )}

      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl space-y-6 rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm"
      >
        {/* Fraud Type */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900">Тип мошенничества *</label>
          <select
            {...register('fraudType', { required: 'Выберите тип мошенничества' })}
            className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          >
            <option value="">-- Выберите тип --</option>
            <option value="phone">Телефонное мошенничество</option>
            <option value="investment">Инвестиционные схемы</option>
            <option value="cyber">Кибер-мошенничество</option>
            <option value="romance">Романтические аферы</option>
            <option value="fake_shop">Поддельные магазины</option>
            <option value="other">Другое</option>
          </select>
          {errors.fraudType && <p className="text-sm text-red-600">{errors.fraudType.message}</p>}
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900">Описание происшедшего *</label>
          <textarea
            {...register('description', { required: 'Опишите ситуацию' })}
            placeholder="Расскажите в деталях, что произошло..."
            className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 min-h-32 resize-none"
          />
          {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900">Ваш email *</label>
          <input
            type="email"
            {...register('reporterEmail', { required: 'Укажите email' })}
            placeholder="your@email.com"
            className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          />
          {errors.reporterEmail && <p className="text-sm text-red-600">{errors.reporterEmail.message}</p>}
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900">Контактная информация мошенника</label>
          <input
            type="text"
            {...register('contactInfo')}
            placeholder="Телефон, email, ник в соцсети..."
            className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          />
        </motion.div>

        {/* Evidence */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900">Доказательства (ссылки, скриншоты)</label>
          <textarea
            {...register('evidence')}
            placeholder="Скопируйте ссылки на сайты, номера счетов или другие доказательства..."
            className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 min-h-24 resize-none"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          variants={itemVariants}
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-red-500/30 transition hover:shadow-xl hover:scale-105 disabled:opacity-50"
        >
          <Send size={20} />
          {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
        </motion.button>
      </motion.form>
    </section>
  );
}
