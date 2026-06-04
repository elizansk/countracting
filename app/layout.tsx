import type { Metadata } from "next";
import "./globals.css";
import ChatBot from "@/components/ChatBot";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Норильск против мошенников — защита от обмана",
  description: "Практичный сайт для жителей Норильска о противодействии телефонному, интернет- и финансовому мошенничеству.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="polar-page min-h-full flex min-h-screen flex-col text-slate-900">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b border-cyan-100/80 bg-white/86 shadow-sm backdrop-blur-xl">
            <div className="aurora-band diagonal-safety">
              <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white sm:px-6">
                <span>Норильск против мошенников</span>
                <span className="hidden sm:inline">Коды, пароли и переводы проверяем только официально</span>
              </div>
            </div>
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div>
                <Link href="/" className="group flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#071827] text-lg font-black text-cyan-100 shadow-md shadow-cyan-950/10 transition group-hover:bg-cyan-900">
                    Н
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Северный навигатор</span>
                    <span className="block text-lg font-black text-slate-950">Норильск против мошенников</span>
                  </span>
                </Link>
              </div>
              <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
                <Link href="/types" className="rounded-lg border border-transparent px-3 py-2 font-semibold hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-800">Виды мошенничества</Link>
                <Link href="/safety-tips" className="rounded-lg border border-transparent px-3 py-2 font-semibold hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-800">Как защититься</Link>
                <Link href="/resources" className="rounded-lg bg-[#071827] px-3 py-2 font-bold text-white shadow-sm hover:bg-cyan-900">Куда обращаться</Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="bg-[#071827] text-slate-200">
            <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 text-sm sm:px-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="font-semibold">Северный навигатор безопасности для жителей Норильска. Материалы не заменяют обращение в банк, полицию или другой официальный орган.</p>
                <p className="mt-2 text-cyan-100/70">Главное правило: не сообщайте коды, не переводите деньги под давлением и проверяйте информацию через официальный канал.</p>
              </div>
              <Link href="/resources" className="h-fit rounded-lg border border-white/20 px-4 py-2 font-semibold text-white hover:bg-white/10">
                Официальные ресурсы
              </Link>
            </div>
          </footer>
        </div>
        <ChatBot />
      </body>
    </html>
  );
}
