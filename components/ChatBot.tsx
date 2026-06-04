'use client'

import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

const replies: Array<{ keys: string[]; reply: string }> = [
  {
    keys: ['телефон', 'звонок', 'банк'],
    reply: 'Положите трубку. Банк и госорганы не просят коды и не переводят разговор на «безопасный счет». Перезвоните по официальному номеру.',
  },
  {
    keys: ['госуслуг', 'почта', 'аккаунт'],
    reply: 'Смените пароль, завершите активные сессии, включите двухфакторную защиту и проверьте заявки в личном кабинете.',
  },
  {
    keys: ['ссылка', 'фишинг', 'qr', 'сайт'],
    reply: 'Не переходите по ссылке из сообщения. Введите адрес вручную и проверьте домен. Если ввели данные, смените пароль и заблокируйте карту.',
  },
  {
    keys: ['инвести', 'крипто', 'пирамида'],
    reply: 'Гарантированная прибыль без риска — тревожный признак. Проверьте компанию в реестрах Банка России и не переводите деньги на личные карты.',
  },
  {
    keys: ['магазин', 'доставка', 'предоплата'],
    reply: 'Не уходите из официального чата площадки, проверьте продавца и не оплачивайте заказ по сторонней ссылке.',
  },
  {
    keys: ['голос', 'родствен', 'курьер'],
    reply: 'Даже похожий голос можно подделать. Перезвоните человеку по сохраненному номеру и задайте проверочный вопрос.',
  },
  {
    keys: ['работа', 'вакансия', 'подработка'],
    reply: 'Если «работодатель» просит оплатить доступ, принять чужие деньги или дать карту, остановитесь и проверьте компанию.',
  },
  {
    keys: ['помощь', 'деньги ушли', 'списали'],
    reply: 'Позвоните в банк, заблокируйте карту, сохраните доказательства и подайте заявление в МВД.',
  },
  {
    keys: ['самозапрет', 'кредит', 'заем', 'займ'],
    reply: 'Проверяйте самозапрет на кредиты только через официальный сайт Госуслуг или Банк России. Не переходите по ссылкам из сообщений и проверьте кредитную историю после подозрительного звонка.',
  },
  {
    keys: ['sim', 'сим', 'esim', 'связь', 'номер'],
    reply: 'Если внезапно пропала связь или пришел код от оператора, срочно свяжитесь с оператором по официальному каналу и проверьте банк, почту, Госуслуги и мессенджеры.',
  },
  {
    keys: ['файл', 'архив', 'документ', 'вложение'],
    reply: 'Не открывайте неожиданные файлы и архивы. Проверьте отправителя другим каналом, не включайте макросы и не отключайте защиту устройства.',
  },
];

function getReply(message: string) {
  const text = message.toLowerCase();
  return replies.find((item) => item.keys.some((key) => text.includes(key)))?.reply
    ?? 'Не переводите деньги, не сообщайте коды, сохраните доказательства и откройте разделы «Виды мошенничества» или «Как защититься».';
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [log, setLog] = useState<string[]>(['Бот: Опишите ситуацию коротко: звонок, ссылка, инвестиции, Госуслуги, магазин или перевод.']);

  const sendMessage = () => {
    if (!message.trim()) return;
    const reply = getReply(message);
    setLog((prev) => [...prev, `Вы: ${message}`, `Бот: ${reply}`]);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-lg bg-[#071827] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition hover:bg-cyan-950"
      >
        <span className="font-semibold">Быстрая подсказка</span>
        {open ? <X size={18} /> : <MessageCircle size={18} />}
      </button>
      {open && (
        <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
          <div className="max-h-72 space-y-3 overflow-y-auto text-sm text-slate-700">
            {log.map((item, index) => (
              <div key={`${item}-${index}`} className={item.startsWith('Бот:') ? 'rounded-lg bg-slate-100 p-3' : 'rounded-lg bg-cyan-50 p-3'}>
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
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-600"
              placeholder="Напишите ситуацию"
            />
            <button type="button" onClick={sendMessage} className="rounded-lg bg-cyan-800 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-900" aria-label="Отправить сообщение">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
