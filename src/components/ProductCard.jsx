import { useLang } from '../i18n'
import SmartImg from './SmartImg'
import { PlusIcon } from './icons'

export default function ProductCard({ item, onOpen }) {
  const { t, tx, list, money } = useLang()
  const ingredients = tx(item.ingredients)
  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-surface">
        <SmartImg src={item.image} alt={tx(item.name)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute bottom-3 end-3 rounded-full bg-ink px-4 py-2 text-sm font-bold text-paper">{money(item.price)}</span>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug">{tx(item.name)}</h3>
      {ingredients?.length > 0 && (
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{list(ingredients)}</p>
      )}
      <button
        onClick={() => onOpen({ type: 'meal', item })}
        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-leaf after:absolute after:inset-0 after:rounded-[1.75rem] after:content-['']"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-mint transition group-hover:bg-leaf group-hover:text-white">
          <PlusIcon width={14} height={14} />
        </span>
        {t('details')}
      </button>
    </article>
  )
}
