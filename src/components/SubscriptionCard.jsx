import { useLang } from '../i18n'
import SmartImg from './SmartImg'
import { CheckIcon } from './icons'

export default function SubscriptionCard({ item, onOpen }) {
  const { t, tx, money } = useLang()
  return (
    <article className="on-dark group relative flex flex-col rounded-[2rem] border border-leaf/30 bg-gradient-to-br from-[#0a3d27] via-[#0d5435] to-[#092d20] p-3 text-mint shadow-lg shadow-leaf-deep/10">
      <div className="aspect-[16/11] overflow-hidden rounded-[1.5rem] bg-surface">
        <SmartImg src={item.image} alt={tx(item.name)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <h3 className="text-2xl font-extrabold leading-tight text-white">{tx(item.name)}</h3>
        <p className="mt-1 text-sm text-mint/80">{tx(item.summary)}</p>
        <ul className="mt-5 space-y-2.5 text-sm">
          {tx(item.details).slice(0, 3).map((d) => (
            <li key={d} className="flex gap-2.5">
              <CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-white" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-3 pt-7">
          <div>
            <div className="text-3xl font-extrabold text-white">{money(item.price)}</div>
            <div className="text-xs text-mint/70">{t(item.period === 'week' ? 'perWeek' : item.period === '15days' ? 'per15Days' : 'perMonth')}</div>
          </div>
          <button
            onClick={() => onOpen({ type: 'subscription', item })}
            className="rounded-full bg-mint px-5 py-2.5 text-sm font-bold text-leaf-deep transition group-hover:bg-white after:absolute after:inset-0 after:rounded-[1.75rem] after:content-['']"
          >
            {t('details')}
          </button>
        </div>
      </div>
    </article>
  )
}
