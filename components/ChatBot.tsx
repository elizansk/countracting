'use client'
import { useState } from 'react';

const cannedResponses: Record<string, string> = {
  phone: 'Звонки от якобы банка часто требуют код. Никогда не сообщайте его.',
  investment: 'Обещания гарантированной прибыли — признак мошенничества.',
  cyber: 'Проверяйте ссылку перед переходом и включайте двухфакторную аутентификацию.',
  report: 'Если вы столкнулись с мошенничеством, заполните форму сообщения на сайте.',
  help: 'Я помогу вам распознать мошенника. Напишите, что вас беспокоит.',
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [log, setLog] = useState<string[]>(['Привет! Я помощник по мошенничеству. Задайте вопрос.']);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLog((prev) => [...prev, `Вы: ${message}`]);
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setLog((prev) => [...prev, `Бот: ${data.reply}`]);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-full bg-sky-600 px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition hover:bg-sky-700"
      >
        <span className="font-semibold">Чат-бот</span>
        <span>{open ? '✕' : '💬'}</span>
      </button>
      {open && (
        <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="max-h-72 space-y-3 overflow-y-auto text-sm text-slate-700">
            {log.map((item, index) => (
              <div key={index} className={item.startsWith('Бот:') ? 'rounded-2xl bg-slate-100 p-3' : 'rounded-2xl bg-sky-50 p-3'}>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500"
              placeholder="Напишите сообщение"
            />
            <button type="button" onClick={sendMessage} className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700">
              Отправить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
