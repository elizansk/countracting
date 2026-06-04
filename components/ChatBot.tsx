'use client'
import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [log, setLog] = useState<string[]>(['Бот: Опишите ситуацию коротко: звонок, ссылка, инвестиции, Госуслуги, магазин или перевод.']);

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
        className="flex w-full items-center justify-between rounded-lg bg-slate-950 px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
      >
        <span className="font-semibold">Быстрая подсказка</span>
        {open ? <X size={18} /> : <MessageCircle size={18} />}
      </button>
      {open && (
        <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
          <div className="max-h-72 space-y-3 overflow-y-auto text-sm text-slate-700">
            {log.map((item, index) => (
              <div key={index} className={item.startsWith('Бот:') ? 'rounded-lg bg-slate-100 p-3' : 'rounded-lg bg-sky-50 p-3'}>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500"
              placeholder="Напишите ситуацию"
            />
            <button type="button" onClick={sendMessage} className="rounded-lg bg-sky-700 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-800" aria-label="Отправить сообщение">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
