'use client'

import Image from 'next/image';
import { type FormEvent, useState } from 'react';
import { CheckCircle2, Copy, Info, Send } from 'lucide-react';
import { assetPath } from '@/lib/paths';

type FormData = {
  fraudType: string;
  description: string;
  reporterEmail: string;
  contactInfo: string;
  evidence: string;
};

const initialForm: FormData = {
  fraudType: '',
  description: '',
  reporterEmail: '',
  contactInfo: '',
  evidence: '',
};

export default function ReportPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const summary = [
    `Тип: ${form.fraudType || 'не указан'}`,
    `Описание: ${form.description || 'не заполнено'}`,
    `Контакт для обратной связи: ${form.reporterEmail || 'не указан'}`,
    `Данные мошенника: ${form.contactInfo || 'не указаны'}`,
    `Доказательства: ${form.evidence || 'не указаны'}`,
  ].join('\n');

  const updateField = (field: keyof FormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.fraudType) nextErrors.fraudType = 'Выберите тип мошенничества';
    if (!form.description.trim()) nextErrors.description = 'Опишите ситуацию';
    if (!form.reporterEmail.trim()) nextErrors.reporterEmail = 'Укажите email';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <div className="rounded-lg border border-cyan-100 bg-white p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-cyan-800">Статичная памятка</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Черновик обращения</h2>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
              Эта форма ничего не отправляет на сервер. Она помогает аккуратно собрать факты, которые можно передать в банк, МВД или официальный канал обращения.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src={assetPath("/images/phone-scam.png")} alt="Остановка подозрительного звонка" fill sizes="18rem" className="object-cover" />
          </div>
        </div>
      </div>

      <div className="flex max-w-2xl gap-3 rounded-lg border border-cyan-200 bg-cyan-50 p-4 text-sm leading-6 text-cyan-950">
        <Info className="mt-0.5 shrink-0" size={18} />
        <p>Не указывайте пароли, коды из SMS, полные данные карты и другие секретные сведения. Для официального расследования обращайтесь в банк и МВД.</p>
      </div>

      {success && (
        <div className="flex items-start gap-4 rounded-lg border border-green-200 bg-green-50 p-6">
          <CheckCircle2 className="shrink-0 text-green-600" size={24} />
          <div>
            <h3 className="font-bold text-green-900">Черновик собран.</h3>
            <p className="mt-1 text-sm text-green-800">Проверьте текст справа и передайте его через официальный канал.</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <form onSubmit={onSubmit} className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">Тип мошенничества *</label>
            <select
              value={form.fraudType}
              onChange={(event) => updateField('fraudType', event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            >
              <option value="">-- Выберите тип --</option>
              <option value="Телефонное мошенничество">Телефонное мошенничество</option>
              <option value="Инвестиционная схема">Инвестиционная схема</option>
              <option value="Фишинг или поддельный сайт">Фишинг или поддельный сайт</option>
              <option value="Взлом аккаунта">Взлом аккаунта</option>
              <option value="Поддельный магазин">Поддельный магазин</option>
              <option value="Другое">Другое</option>
            </select>
            {errors.fraudType && <p className="text-sm text-red-600">{errors.fraudType}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">Описание ситуации *</label>
            <textarea
              value={form.description}
              onChange={(event) => updateField('description', event.target.value)}
              placeholder="Что произошло, когда, кто связался, что просили сделать..."
              className="min-h-32 w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            />
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">Контакт для обратной связи *</label>
            <input
              type="email"
              value={form.reporterEmail}
              onChange={(event) => updateField('reporterEmail', event.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            />
            {errors.reporterEmail && <p className="text-sm text-red-600">{errors.reporterEmail}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">Контакты или реквизиты мошенника</label>
            <input
              type="text"
              value={form.contactInfo}
              onChange={(event) => updateField('contactInfo', event.target.value)}
              placeholder="Телефон, email, ссылка, ник, счет..."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">Доказательства</label>
            <textarea
              value={form.evidence}
              onChange={(event) => updateField('evidence', event.target.value)}
              placeholder="Ссылки, чеки, скриншоты, номера операций..."
              className="min-h-24 w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-red-700">
            <Send size={20} />
            Сформировать черновик
          </button>
        </form>

        <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-black text-slate-950">Черновик обращения</h3>
          <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">{summary}</pre>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(summary)}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-3 font-bold text-slate-800 hover:border-cyan-500 hover:text-cyan-800"
          >
            <Copy size={18} />
            Скопировать
          </button>
          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setErrors({});
              setSuccess(false);
            }}
            className="ml-3 mt-4 inline-flex items-center rounded-lg bg-slate-100 px-4 py-3 font-bold text-slate-700 hover:bg-slate-200"
          >
            Очистить
          </button>
        </aside>
      </div>
    </section>
  );
}
