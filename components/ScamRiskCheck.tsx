'use client'

import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, RotateCcw, ShieldAlert } from 'lucide-react';

const riskQuestions = [
  'Вас торопят и говорят, что времени почти нет',
  'Просят код из SMS, пароль, CVV или push-подтверждение',
  'Требуют не рассказывать близким или сотрудникам банка',
  'Просят перевести деньги на новый счет, карту или криптокошелек',
  'Дают ссылку, QR-код или просят установить приложение',
  'Обещают гарантированную прибыль, компенсацию или выигрыш',
];

export default function ScamRiskCheck() {
  const [selected, setSelected] = useState<string[]>([]);

  const result = useMemo(() => {
    if (selected.length >= 3) {
      return {
        level: 'Высокий риск',
        color: 'border-red-300 bg-red-50 text-red-950',
        icon: ShieldAlert,
        action: 'Остановитесь: не переводите деньги, не называйте коды, сохраните доказательства и проверьте источник официально.',
      };
    }

    if (selected.length >= 1) {
      return {
        level: 'Есть тревожные признаки',
        color: 'border-amber-300 bg-amber-50 text-amber-950',
        icon: AlertTriangle,
        action: 'Сделайте паузу, посоветуйтесь с близкими и свяжитесь с организацией по номеру с официального сайта.',
      };
    }

    return {
      level: 'Явных признаков не выбрано',
      color: 'border-green-300 bg-green-50 text-green-950',
      icon: CheckCircle2,
      action: 'Все равно проверяйте ссылки, реквизиты и не передавайте секретные данные незнакомым людям.',
    };
  }, [selected.length]);

  const ResultIcon = result.icon;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-sky-700">Мини-тест</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Проверьте риск за 30 секунд</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Отметьте, что есть в вашей ситуации. Тест не собирает данные и не отправляет ответы на сервер.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSelected([])}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
        >
          <RotateCcw size={16} />
          Сбросить
        </button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {riskQuestions.map((question) => {
          const active = selected.includes(question);
          return (
            <button
              key={question}
              type="button"
              onClick={() => {
                setSelected((current) =>
                  active ? current.filter((item) => item !== question) : [...current, question]
                );
              }}
              className={`flex min-h-16 items-start gap-3 rounded-lg border p-4 text-left text-sm font-semibold leading-6 transition ${
                active
                  ? 'border-red-300 bg-red-50 text-red-950'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-300 hover:bg-sky-50'
              }`}
            >
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${active ? 'border-red-500 bg-red-500 text-white' : 'border-slate-300 bg-white'}`}>
                {active && <CheckCircle2 size={14} />}
              </span>
              {question}
            </button>
          );
        })}
      </div>

      <div className={`mt-5 flex gap-3 rounded-lg border p-4 ${result.color}`}>
        <ResultIcon className="mt-0.5 shrink-0" size={22} />
        <div>
          <p className="font-black">{result.level}</p>
          <p className="mt-1 text-sm leading-6">{result.action}</p>
        </div>
      </div>
    </section>
  );
}
