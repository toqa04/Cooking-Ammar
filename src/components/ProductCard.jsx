import { useLang } from '../i18n'
import SmartImg from './SmartImg'
import { PlusIcon } from './icons'

export default function ProductCard({ item, onOpen }) {
  const { t, tx, list, money } = useLang()
  const ingredients = tx(item.ingredients)
  return (
    <article className="menu-card group relative rounded-[2rem] border border-line/70 bg-white p-2.5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-surface">
        <SmartImg src={item.image} alt={tx(item.name)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute bottom-3 end-3 rounded-full border border-white/70 bg-white/95 px-4 py-2 text-sm font-extrabold text-leaf-deep shadow-md backdrop-blur">{money(item.price)}</span>
      </div>
      <div className="px-2 pb-2 pt-4">
        <h3 className="text-lg font-bold leading-snug">{tx(item.name)}</h3>
        {ingredients?.length > 0 && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{list(ingredients)}</p>
        )}
        <button
          onClick={() => onOpen({ type: 'meal', item })}
          className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-leaf after:absolute after:inset-0 after:rounded-[2rem] after:content-['']"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-mint transition group-hover:bg-leaf group-hover:text-white">
            <PlusIcon width={14} height={14} />
          </span>
          {t('details')}
        </button>
      </div>
    </article>
  )
}
