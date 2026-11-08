import { useMemo, useState } from 'react'
import { useLang } from '../i18n'
import data from '../data/menu.json'
import ProductCard from './ProductCard'
import SubscriptionCard from './SubscriptionCard'
import { SearchIcon, CloseIcon } from './icons'

const norm = (s) => s.toLowerCase().trim()
const haystack = (item) =>
  norm([
    item.name.en, item.name.ar,
    ...(item.ingredients?.en || []), ...(item.ingredients?.ar || []),
    ...(item.details?.en || []), ...(item.details?.ar || []),
  ].join(' '))

export default function Menu({ cat, setCat, onOpen }) {
  const { t, tx } = useLang()
  const [query, setQuery] = useState('')

  const categoryGroups = useMemo(
    () => data.categories.map((category) => ({
      id: category.id,
      title: tx(category.name),
      type: 'meal',
      items: data.products.filter((product) => product.category === category.id),
    })),
    [tx],
  )

  const tabs = useMemo(() => [
    { id: 'all', label: t('all') },
    ...categoryGroups.map(({ id, title }) => ({ id, label: title })),
    ...(data.subscriptions.length ? [{ id: 'subscriptions', label: t('subscriptions') }] : []),
  ], [categoryGroups, t])

  const groups = useMemo(() => {
    const q = norm(query)
    const match = (i) => !q || haystack(i).includes(q)
    const all = [
      ...categoryGroups.map((group) => ({ ...group, items: group.items.filter(match) })),
      ...(data.subscriptions.length
        ? [{ id: 'subscriptions', title: t('subscriptions'), type: 'subscription', items: data.subscriptions.filter(match) }]
        : []),
    ]
    return all.filter((g) => (cat === 'all' || g.id === cat) && g.items.length > 0)
  }, [cat, categoryGroups, query, t])

  return (
    <section id="menu" className="scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <span data-reveal className="scroll-reveal mb-3 inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-bold text-leaf-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden="true" />
          {t('heroTile')}
        </span>
        <h2 data-reveal className="scroll-reveal text-4xl font-extrabold tracking-tight text-leaf-deep sm:text-5xl">{t('menuTitle')}</h2>
        <p data-reveal className="scroll-reveal mt-3 max-w-xl text-muted" style={{ '--reveal-delay': '.08s' }}>{t('menuSub')}</p>
      </div>

      <div className="sticky top-16 z-20 mt-8 border-y border-line/70 bg-paper/90 shadow-[0_8px_24px_-22px_rgba(14,21,18,.5)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6">
          <nav aria-label={t('menuTitle')} className="no-scrollbar flex flex-nowrap gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCat(tab.id)}
                aria-pressed={cat === tab.id}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  cat === tab.id
                    ? 'border-leaf bg-leaf text-white shadow-sm shadow-leaf/20'
                    : 'border-line bg-white/80 text-ink hover:border-leaf/40 hover:bg-mint/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <label className="relative block w-full lg:w-80">
            <span className="sr-only">{t('searchPlaceholder')}</span>
            <SearchIcon className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted" width={18} height={18} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-full border border-line bg-white py-2.5 ps-11 pe-10 text-sm outline-none transition placeholder:text-muted focus:border-leaf"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label={t('clearSearch')} className="absolute end-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink">
                <CloseIcon width={16} height={16} />
              </button>
            )}
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:px-6">
        {groups.map((g) => (
          <div key={g.id} className="menu-group">
            <div data-reveal className="scroll-reveal mb-5 flex items-center gap-3">
              <span className="h-7 w-1 rounded-full bg-leaf" aria-hidden="true" />
              <h3 className="text-2xl font-extrabold">{g.title}</h3>
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">{g.items.length} {t('items')}</span>
            </div>
            <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {g.items.map((item) =>
                g.type === 'meal'
                  ? <ProductCard key={item.id} item={item} onOpen={onOpen} />
                  : <SubscriptionCard key={item.id} item={item} onOpen={onOpen} />,
              )}
            </div>
          </div>
        ))}

        {groups.length === 0 && (
          <div className="mx-auto flex max-w-lg flex-col items-center rounded-[2rem] border border-line/70 bg-white/80 px-6 py-10 text-center shadow-[0_20px_60px_-48px_rgba(10,61,39,.45)] sm:py-12">
            <div className="empty-chef mb-5 grid h-36 w-36 place-items-center rounded-full bg-mint/60" aria-hidden="true">
              <img
                className="empty-chef__image h-28 w-28 object-contain"
                src="https://emojicdn.elk.sh/%F0%9F%A7%91%E2%80%8D%F0%9F%8D%B3?style=google"
                alt=""
                width="128"
                height="128"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="text-xl font-bold text-leaf-deep">{t('noResultsTitle')}</h3>
            <p className="mt-2 max-w-sm text-muted">{t('noResultsText')}</p>
            <button onClick={() => setQuery('')} className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-leaf-deep">
              {t('clearSearch')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
