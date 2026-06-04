import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-10 py-10">
      <div className="rounded-3xl bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 px-6 py-12 text-white shadow-xl shadow-sky-200/30 sm:px-10">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Защита от мошенников</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Сайт, который помогает защитить вас и ваших близких от мошенничества.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cyan-100/90">
            Актуальные виды мошенничества, черный список, советы, аналитика и удобная форма для быстрого сообщения о подозрительных схемах.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/report" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-md shadow-slate-950/10 transition hover:bg-slate-100">Сообщить о мошеннике</Link>
            <Link href="/blacklist" className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Чёрный список</Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { title: 'Типы мошенничества', description: 'Телефонные, инвестиции, кибер и другие схемы', href: '/types' },
          { title: 'Советы по безопасности', description: 'Как распознать и избежать обмана', href: '/safety-tips' },
          { title: 'Статистика', description: 'Аналитика обращений и угроз', href: '/analytics' }
        ].map((card) => (
          <Link key={card.href} href={card.href} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { headline: 'Реагируйте быстро', text: 'Сообщите о мошенничестве в службу и сохраните переписку.' },
          { headline: 'Используйте черный список', text: 'Проверяйте номера, сайты и боты перед переводом денег.' },
          { headline: 'Обучайте близких', text: 'Передайте эту страницу друзьям и родственникам.' }
        ].map((item) => (
          <div key={item.headline} className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{item.headline}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
