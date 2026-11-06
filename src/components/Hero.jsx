import { useLang } from '../i18n'
import data from '../data/menu.json'
import SmartImg from './SmartImg'
import { ArrowDownIcon } from './icons'

export default function Hero() {
  const { t } = useLang()
  const [a, b] = data.brand.name.split(' ')
  const [img1, img2, img3] = data.hero.images
  return (
    <section id="top" className="mx-auto max-w-7xl px-4 pb-4 pt-8 sm:px-6 lg:pt-14">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h1 lang="en" dir="ltr" className="tight text-[clamp(3.75rem,13vw,5.5rem)] sm:text-[clamp(4.5rem,14vw,7rem)] lg:text-[clamp(5rem,9.2vw,8.5rem)] font-extrabold leading-[.84] tracking-[-0.055em] text-start">
            <span className="rise block" style={{ '--d': '0s' }}>{a}</span>
            <span className="rise block" style={{ '--d': '.1s' }}>{b}<span className="text-leaf">.</span></span>
          </h1>
          <p className="rise mt-8 max-w-md text-xl leading-snug text-muted" style={{ '--d': '.25s' }}>{t('heroTag')}</p>
          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ '--d': '.38s' }}>
            <a href="#menu" className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pe-2 ps-6 font-semibold text-paper transition hover:bg-leaf-deep">
              {t('heroCta')}
              <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf text-white transition group-hover:bg-mint group-hover:text-leaf-deep">
                <ArrowDownIcon width={18} height={18} />
              </span>
            </a>
          </div>
        </div>

        <div className="grid aspect-[5/5.4] grid-cols-2 grid-rows-2 gap-3 sm:gap-4 lg:col-span-6">
          <div className="rise row-span-2 overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-surface" style={{ '--d': '.2s' }}>
            <SmartImg src={img1} alt="" w={900} eager className="h-full w-full object-cover" />
          </div>
          <div className="rise overflow-hidden rounded-[2rem] bg-surface" style={{ '--d': '.35s' }}>
            <SmartImg src={img2} alt="" w={600} eager className="h-full w-full object-cover" />
          </div>
          <div className="rise relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-leaf p-5 text-white sm:p-7" style={{ '--d': '.5s' }}>
            <div className="absolute end-4 top-4 h-20 w-20 overflow-hidden rounded-full ring-4 ring-white/25 bg-surface sm:h-28 sm:w-28">
              <SmartImg src={img3} alt="" w={300} eager className="h-full w-full object-cover" />
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-mint" aria-hidden="true" />
            <p className="max-w-[10ch] text-2xl font-bold leading-tight sm:text-3xl">{t('heroTile')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
