import { useLang } from '../i18n'
import data from '../data/menu.json'
import SmartImg from './SmartImg'
import { ArrowDownIcon } from './icons'

export default function Hero() {
  const { t, lang } = useLang()
  const [img1, img2, img3] = data.hero.images
  return (
    <section id="top" className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:pt-10">
      <div className="hero-stage relative isolate grid min-h-[34rem] items-center overflow-hidden rounded-[2.5rem] bg-mint/65 px-6 py-12 sm:px-10 lg:min-h-[39rem] lg:grid-cols-12 lg:px-14">
        <div className="hero-orbit absolute -end-24 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#c4e3c9] sm:h-[38rem] sm:w-[38rem] lg:end-[9%] lg:top-[-24rem]" aria-hidden="true" />
        <div className="relative z-10 lg:col-span-5">
          <div className="rise mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-leaf-deep" style={{ '--d': '.05s' }}>
            <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />
            {t('heroTile')}
          </div>
          <h1 lang={lang} className="rise tight max-w-[10ch] text-[clamp(3.75rem,13vw,6rem)] font-extrabold leading-[.9] tracking-[-0.055em] text-leaf-deep sm:text-[clamp(4.5rem,10vw,7rem)] lg:text-[clamp(4.5rem,7vw,6.5rem)]" style={{ '--d': '.12s' }}>
            {t('heroHeadline')}<span className="text-leaf">.</span>
          </h1>
          <p className="rise mt-6 max-w-sm text-lg leading-relaxed text-muted sm:text-xl" style={{ '--d': '.25s' }}>{t('heroTag')}</p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ '--d': '.38s' }}>
            <a href="#menu" className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pe-2 ps-6 font-semibold text-paper transition hover:bg-leaf-deep">
              {t('heroCta')}
              <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf text-white transition group-hover:bg-mint group-hover:text-leaf-deep">
                <ArrowDownIcon width={18} height={18} />
              </span>
            </a>
          </div>
        </div>

        <div className="hero-food relative mt-10 min-h-[19rem] lg:col-span-7 lg:mt-0 lg:min-h-[31rem]" dir="ltr">
          <div className="hero-food__plate absolute left-1/2 top-1/2 aspect-square w-[min(74vw,25rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55 p-3 sm:w-[min(62vw,29rem)] lg:w-[min(42vw,33rem)]">
            <div className="h-full w-full overflow-hidden rounded-full shadow-[0_30px_70px_-35px_rgba(14,21,18,.45)]">
              <SmartImg src={img1} alt="" w={900} eager className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="hero-food__float absolute right-[4%] top-[8%] h-24 w-24 overflow-hidden rounded-full border-[6px] border-white shadow-xl sm:right-[8%] sm:h-32 sm:w-32 lg:right-[3%] lg:top-[6%]">
            <SmartImg src={img2} alt="" w={300} eager className="h-full w-full object-cover" />
          </div>
          <div className="hero-food__float hero-food__float--small absolute bottom-[5%] left-[5%] h-20 w-20 overflow-hidden rounded-full border-[5px] border-white shadow-xl sm:left-[12%] sm:h-28 sm:w-28 lg:bottom-[9%] lg:left-[4%]">
            <SmartImg src={img3} alt="" w={300} eager className="h-full w-full object-cover" />
          </div>
          <span className="hero-spark absolute left-[14%] top-[15%] text-4xl text-leaf" aria-hidden="true">✳</span>
          <span className="hero-spark hero-spark--second absolute bottom-[16%] right-[8%] text-3xl text-leaf" aria-hidden="true">✳</span>
        </div>
      </div>
    </section>
  )
}
