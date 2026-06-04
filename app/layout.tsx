import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import ChatBot from "@/components/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Против мошенников — Норильск",
  description: "Информационный сайт для защиты от мошенничества и современных технологий.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <header className="bg-white border-b border-slate-200 shadow-sm">
              <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Противодействие мошенникам</p>
                  <h1 className="text-xl font-semibold text-slate-950">Сайт защиты граждан Норильска</h1>
                </div>
                <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
                  <a href="/" className="hover:text-sky-600">Главная</a>
                  <a href="/types" className="hover:text-sky-600">Типы</a>
                  <a href="/blacklist" className="hover:text-sky-600">Чёрный список</a>
                  <a href="/report" className="hover:text-sky-600">Сообщить</a>
                  <a href="/safety-tips" className="hover:text-sky-600">Советы</a>
                  <a href="/resources" className="hover:text-sky-600">Ресурсы</a>
                  <a href="/analytics" className="hover:text-sky-600">Аналитика</a>
                  <a href="/chatbot" className="hover:text-sky-600">Чат-бот</a>
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="bg-slate-950 text-slate-200">
              <div className="mx-auto max-w-6xl px-4 py-6 text-sm sm:px-6">
                <p>Проект разработан в рамках конкурса школы ИСиТ совместно с Администрацией города Норильска.</p>
                <p className="mt-2 text-slate-400">Все материалы носят информационный характер и помогают защитить вас и близких.</p>
              </div>
            </footer>
          </div>
        </QueryProvider>
        <ChatBot />
      </body>
    </html>
  );
}
