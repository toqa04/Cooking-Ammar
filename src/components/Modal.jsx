import { useEffect, useRef } from 'react'
import { useLang } from '../i18n'
import SmartImg from './SmartImg'
import { CheckIcon, CloseIcon } from './icons'

export default function Modal({ entry, onClose }) {
  const { t, tx, money } = useLang()
  const closeRef = useRef(null)
  const { type, item } = entry
  const isSub = type === 'subscription'
  const ingredients = tx(item.ingredients)

  useEffect(() => {
    const prev = document.activeElement
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      prev?.focus?.()
    }
  }, [onClose])

  return (
    <div className="fade fixed inset-0 z-50 flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={tx(item.name)}
        onClick={(e) => e.stopPropagation()}
        className="pop relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] bg-paper sm:rounded-[2rem] md:grid-cols-[1fr_1.05fr]"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label={t('close')}
          className="absolute end-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink shadow-md transition hover:bg-mint"
        >
          <CloseIcon />
        </button>

        <div className="p-3 md:p-4">
          <div className="aspect-square overflow-hidden rounded-[1.5rem] bg-surface md:sticky md:top-4 md:aspect-auto md:h-[calc(100%-0px)] md:min-h-[26rem]">
            <SmartImg src={item.image} alt={tx(item.name)} w={1000} eager className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8 md:ps-4">
          <h2 className="pe-12 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{tx(item.name)}</h2>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full bg-ink px-4 py-1.5 text-lg font-bold text-paper">{money(item.price)}</span>
            {isSub && <span className="text-sm text-muted">{t(item.period === 'week' ? 'perWeek' : 'perMonth')}</span>}
          </div>
          {isSub && <p className="mt-5 leading-relaxed text-muted">{tx(item.summary)}</p>}

          {isSub ? (
            <section className="mt-7">
              <h3 className="font-bold">{t('included')}</h3>
              <ul className="mt-3 space-y-3">
                {tx(item.details).map((d) => (
                  <li key={d} className="flex gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf text-white"><CheckIcon width={12} height={12} /></span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <>
              {ingredients?.length > 0 && (
                <section className="mt-7">
                  <h3 className="font-bold">{t('ingredients')}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {ingredients.map((ingredient) => (
                      <li key={ingredient} className="rounded-full bg-mint px-3.5 py-1.5 text-sm font-medium text-leaf-deep">{ingredient}</li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
