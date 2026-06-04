import Image from 'next/image';
import { CheckCircle2, Shield, Zap, Lock } from 'lucide-react';
import ScamRiskCheck from '@/components/ScamRiskCheck';
import safetyTipsData from '@/public/data/safetyTips.json';
import { assetPath } from '@/lib/paths';

type SafetyTip = {
  id: number;
  title: string;
  category: string;
  description: string;
  steps?: string[];
};

const icons = [Shield, Zap, Lock];
const items = safetyTipsData.tips as SafetyTip[];

export default function SafetyTipsPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <div className="ice-panel rounded-lg p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-cyan-800">Статичные памятки</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Памятки безопасности</h2>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
              Короткие правила для повседневной защиты. Их можно обсудить с родителями, детьми и коллегами.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src={assetPath("/images/family-safety.png")} alt="Семья обсуждает правила цифровой безопасности" fill sizes="18rem" className="object-cover" />
          </div>
        </div>
      </div>

      <ScamRiskCheck />

      <div className="grid gap-6 lg:grid-cols-3">
        {items.map((tip, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article
              key={tip.id}
              className="signal-card group rounded-lg border border-slate-200 bg-white p-6 pt-8 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
            >
              <div className="w-fit rounded-lg bg-green-100 p-3 text-green-700 transition-transform group-hover:scale-110">
                <Icon size={28} />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-green-700">{tip.category}</p>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{tip.title}</h3>
              <p className="mt-4 leading-relaxed text-slate-700">{tip.description}</p>
              {tip.steps && (
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {tip.steps.map((step) => (
                    <li key={step} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={16} />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
