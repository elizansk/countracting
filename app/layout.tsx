import type { Metadata } from "next";
import "./globals.css";
import ChatBot from "@/components/ChatBot";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Антифрод Норильск — защита от мошенников",
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
      <body className="min-h-full flex min-h-screen flex-col bg-cyan-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 bg-white/90 border-b border-cyan-100 shadow-sm backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div>
                <Link href="/" className="block">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Норильск против мошенников</p>
                  <h1 className="text-lg font-black text-slate-950">Антифрод Норильск</h1>
                </Link>
              </div>
              <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
                <Link href="/types" className="rounded-md px-2 py-1 hover:bg-cyan-50 hover:text-cyan-800">Виды мошенничества</Link>
                <Link href="/safety-tips" className="rounded-md px-2 py-1 hover:bg-cyan-50 hover:text-cyan-800">Как защититься</Link>
                <Link href="/resources" className="rounded-md px-2 py-1 hover:bg-cyan-50 hover:text-cyan-800">Куда обращаться</Link>
                <Link href="/analytics" className="rounded-md px-2 py-1 hover:bg-cyan-50 hover:text-cyan-800">Статистика</Link>
                <Link href="/report" className="rounded-md bg-red-600 px-3 py-2 font-bold text-white hover:bg-red-700">Черновик обращения</Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="bg-[#071827] text-slate-200">
            <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 text-sm sm:px-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="font-semibold">Северный антифрод-навигатор для жителей Норильска. Материалы не заменяют обращение в банк, полицию или другой официальный орган.</p>
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
