'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  fraudType: string;
  description: string;
  reporterEmail: string;
  contactInfo: string;
  evidence: string;
};

export default function ReportPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>();
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (values: FormData) => {
    setStatus(null);
    const response = await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      setStatus('Спасибо! Ваше сообщение принято.');
      reset();
    } else {
      setStatus('Ошибка при отправке. Попробуйте позже.');
    }
  };

  return (
    <section className="space-y-8 py-10">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">Сообщить о мошеннике</h2>
        <p className="mt-3 text-slate-600">Заполните форму — это поможет защитить себя и других.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 rounded-3xl bg-white p-6 shadow-sm md:p-10">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Тип мошенничества
            <input {...register('fraudType', { required: 'Укажите тип мошенничества' })} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500" />
            {errors.fraudType && <p className="text-xs text-red-600">{errors.fraudType.message}</p>}
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Ваш email
            <input {...register('reporterEmail', { required: 'Укажите email' })} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500" />
            {errors.reporterEmail && <p className="text-xs text-red-600">{errors.reporterEmail.message}</p>}
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-700">
          Описание ситуации
          <textarea {...register('description', { required: 'Опишите ситуацию' })} rows={5} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500" />
          {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          Контакты мошенника или ссылка
          <input {...register('contactInfo')} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500" />
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          Дополнительные доказательства
          <textarea {...register('evidence')} rows={3} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500" />
        </label>
        <div className="flex items-center justify-between gap-4">
          <button type="submit" disabled={isSubmitting} className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60">Отправить сообщение</button>
          {status && <span className="text-sm text-slate-600">{status}</span>}
        </div>
      </form>
    </section>
  );
}
