export default function ChatbotPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-3xl font-black text-slate-950">Быстрая подсказка</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Помощник доступен в правом нижнем углу на любой странице. Он не заменяет официальную консультацию, но подсказывает первый безопасный шаг.
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">Советы от помощника</h3>
        <ul className="mt-4 space-y-3 text-slate-600">
          <li>Напишите: телефон, банк, Госуслуги, ссылка, инвестиции, магазин, родственник, голос, работа, выигрыш, помощь.</li>
          <li>Не отправляйте в чат пароли, коды, полные номера карт и персональные документы.</li>
          <li>Если деньги списали, сразу звоните в банк и сохраняйте доказательства.</li>
        </ul>
      </div>
    </section>
  );
}
