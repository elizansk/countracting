export default function ChatbotPage() {
  return (
    <section className="space-y-8 py-10">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">Интерактивный чат-бот</h2>
        <p className="mt-3 text-slate-600">Чат-бот доступен в правом нижнем углу на любой странице. Он подскажет, как распознать мошенничество и что делать дальше.</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">Советы от помощника</h3>
        <ul className="mt-4 space-y-3 text-slate-600">
          <li>Напишите: телефон, инвестиции, кибер, romance, помощь.</li>
          <li>Чат-бот ответит, как распознать попытку обмана.</li>
          <li>Он предложит разделы сайта с практической информацией.</li>
        </ul>
      </div>
    </section>
  );
}
