'use client'

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScamRiskCheck from "@/components/ScamRiskCheck";
import { assetPath } from "@/lib/paths";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  HeartHandshake,
  Lock,
  PhoneOff,
  Shield,
} from "lucide-react";

const steps = [
  {
    icon: PhoneOff,
    title: "Прервите контакт",
    text: "Положите трубку, закройте чат, не нажимайте ссылки и не открывайте вложения.",
  },
  {
    icon: Lock,
    title: "Защитите деньги",
    text: "Позвоните в банк по номеру на карте, заблокируйте карту и смените пароли.",
  },
  {
    icon: FileText,
    title: "Сохраните доказательства",
    text: "Скриншоты, чеки, номера, ссылки, имена аккаунтов и время контакта помогут при заявлении.",
  },
  {
    icon: Shield,
    title: "Сообщите официально",
    text: "Подайте заявление в МВД, обратитесь в банк, а по финансовым схемам проверьте данные в Банке России.",
  },
];

const checks = [
  "Просят код, пароль, CVV или слово из SMS",
  "Обещают гарантированный доход без риска",
  "Требуют перевести деньги на «безопасный счет»",
  "Запрещают советоваться с близкими",
  "Просят установить приложение удаленного доступа",
  "Ссылка ведет на странный домен или QR-код",
];

const quickLinks = [
  { title: "Виды мошенничества", text: "12 популярных схем с признаками и действиями", href: "/types", icon: AlertTriangle },
  { title: "Первые действия", text: "Пошаговый план, если звонят, списали деньги или взломали аккаунт", href: "/safety-tips", icon: Clock },
  { title: "Советы семье", text: "Памятки для родителей, подростков и пожилых родственников", href: "/safety-tips", icon: HeartHandshake },
  { title: "Официальные ресурсы", text: "Куда обращаться и где проверять информацию", href: "/resources", icon: BookOpen },
];

const visualGuides = [
  {
    title: "Телефонный звонок",
    text: "Если звонящий просит код или перевод, кладите трубку и звоните в банк сами.",
    image: assetPath("/images/phone-scam.png"),
  },
  {
    title: "Фишинговая ссылка",
    text: "Проверяйте домен, отправителя и не вводите данные по ссылке из сообщения.",
    image: assetPath("/images/phishing-check.png"),
  },
  {
    title: "Семейная защита",
    text: "Договоритесь с близкими о проверочном звонке перед любым переводом.",
    image: assetPath("/images/family-safety.png"),
  },
];

const workflow = [
  {
    title: "Распознать",
    text: "Сравните ситуацию с признаками: давление, секретность, коды, ссылка, перевод или обещание сверхприбыли.",
  },
  {
    title: "Остановить",
    text: "Прервите разговор, не нажимайте ссылки, не устанавливайте приложения и не переводите деньги.",
  },
  {
    title: "Защитить",
    text: "Позвоните в банк, смените пароли, завершите сессии, включите двухфакторную защиту.",
  },
  {
    title: "Собрать",
    text: "Сохраните скриншоты, чеки, ссылки, номера, никнеймы, время звонка и записи операций.",
  },
  {
    title: "Обратиться официально",
    text: "Подайте заявление в МВД, обратитесь в банк, по финансовым схемам проверьте данные в Банке России.",
  },
  {
    title: "Предупредить",
    text: "Расскажите близким простыми словами, какую легенду использовали мошенники и как её распознать.",
  },
];

const moneyLossPlan = [
  "Сразу позвоните в банк по номеру на карте и заблокируйте карту или счет.",
  "Попросите банк проверить возможность отмены операции или оспаривания платежа.",
  "Сохраните выписку, чек, переписку, ссылку, номер телефона и данные получателя.",
  "Подайте заявление в полицию и получите талон-уведомление.",
  "Если речь о кредитах или финансовой организации, направьте обращение в Банк России.",
];

const audienceCards = [
  {
    title: "Для родителей",
    text: "Объясните детям, что нельзя отправлять фото документов, коды и геолокацию незнакомым людям, даже если это «розыгрыш» или «подработка».",
  },
  {
    title: "Для старших родственников",
    text: "Запишите на бумаге официальные номера банка и семьи. Любые звонки про деньги, кредиты и курьеров проверяются вторым звонком.",
  },
  {
    title: "Для подростков",
    text: "Опасны не только звонки: мошенники используют игры, скины, фейковые вакансии, конкурсы, донаты и просьбы «помочь другу».",
  },
  {
    title: "Для сотрудников",
    text: "Не открывайте вложения из неожиданных писем, не согласовывайте платежи только в мессенджере и проверяйте руководителя другим каналом.",
  },
];

const safePhrases = [
  "Я не обсуждаю деньги по телефону. Перезвоню в банк сам.",
  "Я не называю коды и пароли. Если вопрос официальный, пришлите обращение через личный кабинет.",
  "Я должен посоветоваться с семьей. Срочность не является причиной переводить деньги.",
  "Я проверю ссылку через официальный сайт, а не через сообщение.",
];

export default function Home() {
  return (
    <main className="bg-cyan-50">
      <section className="relative min-h-[calc(100vh-84px)] overflow-hidden border-b border-cyan-100 bg-[#071827]">
        <Image
          src={assetPath("/images/norilsk-anti-fraud-hero.png")}
          alt="Семья в Норильске проверяет подозрительное сообщение на телефоне"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071827] via-[#071827]/82 to-[#071827]/18" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cyan-50 to-transparent" />
        <div className="relative mx-auto grid min-h-[calc(100vh-84px)] max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
              <Shield size={16} />
              Северный антифрод-навигатор
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
              Норильск против мошенников: защита для себя и близких
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
              Арктический город живёт в своём ритме, но мошенники используют одни и те же приёмы: срочность, страх, коды, ссылки и давление. Здесь собраны понятные сценарии, первые действия и официальные ресурсы.
            </p>
            <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
              {['Норильск', 'семья', 'цифровая защита'].map((item) => (
                <div key={item} className="rounded-lg border border-cyan-200/30 bg-cyan-100/10 px-3 py-2 text-center text-sm font-bold text-cyan-50 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/safety-tips"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-red-700"
              >
                Что делать прямо сейчас
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/types"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Проверить признаки
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="my-auto rounded-lg border border-cyan-200/20 bg-[#071827]/86 p-5 text-white shadow-2xl shadow-black/30 backdrop-blur"
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Clock className="text-red-300" size={24} />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-red-200">Первые 5 минут</p>
                <h2 className="text-2xl font-black">Экстренный план</h2>
              </div>
            </div>
            <ol className="mt-5 space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-red-200">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold">{index + 1}. {step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <ScamRiskCheck />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-cyan-800">Живые сценарии</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Смотрите на ситуацию, а не только на текст</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            Картинки не содержат реальных номеров, логотипов или ссылок: они нужны только для обучения и ориентира.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {visualGuides.map((guide) => (
            <article key={guide.title} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-square">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-slate-950">{guide.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{guide.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-md"
              >
                <Icon className="text-sky-700" size={26} />
                <h2 className="mt-4 text-lg font-black text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-5 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-sky-700">Для разных людей</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Защита работает лучше, когда она понятна каждому</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Мошенники подстраиваются под возраст, привычки и роли человека. Поэтому на сайте есть не только общие советы, но и сценарии для семьи, учебы и работы.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {audienceCards.map((card) => (
            <article key={card.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black text-slate-950">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-red-700">Как работает защита</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Не просто прочитать, а пройти весь путь безопасности</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Сайт устроен как антифрод-навигатор: сначала помогает распознать давление, затем дает короткий план действий и отправляет к официальным каналам.
            </p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map((item, index) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-sky-700">Быстрая самопроверка</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Если совпало хотя бы одно, остановитесь</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Мошенники редко используют одну технику. Обычно они соединяют давление, страх, секретность и технические детали, которые выглядят правдоподобно.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {checks.map((check) => (
              <div key={check} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={20} />
                <p className="text-sm font-semibold leading-6 text-slate-800">{check}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-red-700">Готовые фразы</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Что сказать, когда давят</h2>
            <p className="mt-4 leading-7 text-slate-600">
              В стрессовой ситуации сложно придумать ответ. Эти фразы помогают остановить разговор без объяснений и споров.
            </p>
          </div>
          <div className="grid gap-3">
            {safePhrases.map((phrase) => (
              <div key={phrase} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-lg font-bold leading-8 text-slate-900">
                «{phrase}»
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-red-200">Если деньги уже списали</p>
            <h2 className="mt-2 text-3xl font-black">Действуйте быстро и по порядку</h2>
            <p className="mt-4 leading-7 text-slate-300">
              В первые минуты важнее не искать виноватых, а ограничить ущерб: банк, доказательства, заявление, официальные обращения.
            </p>
          </div>
          <ol className="space-y-3">
            {moneyLossPlan.map((item, index) => (
              <li key={item} className="grid grid-cols-[2.25rem_1fr] gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 font-black">{index + 1}</span>
                <span className="leading-7 text-slate-100">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-2xl font-black text-slate-950">Семейное правило безопасности</h2>
          <p className="mt-3 max-w-4xl leading-7 text-slate-700">
            Договоритесь с близкими: любые просьбы о деньгах, кредитах, кодах, переводах и «срочной помощи» сначала проверяются вторым каналом связи. Один звонок родственнику часто спасает деньги и нервы.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/safety-tips" className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-bold text-white hover:bg-slate-800">
              Как защититься
            </Link>
            <Link href="/report" className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-300 bg-white px-5 py-3 font-bold text-slate-800 hover:border-amber-500">
              Черновик обращения
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
