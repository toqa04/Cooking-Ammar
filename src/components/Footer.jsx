import { useLang } from '../i18n'
import config from '../config'
import data from '../data/menu.json'

export default function Footer() {
  const { t, tx } = useLang()
  const links = [
    config.whatsapp && { href: `https://chat.whatsapp.com/JoHJue06WPzI4QqJe0yubd?mode=gi_t`, label: 'WhatsApp' },
    config.instagram && { href: `https://instagram.com/${config.instagram}`, label: 'Instagram' },
  ].filter(Boolean)
  return (
    <footer data-reveal className="scroll-reveal on-dark mt-10 overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-16 sm:px-6 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <div lang="en" dir="ltr" className="tight text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl">{data.brand.name}<span className="text-leaf">.</span></div>
          <p className="mt-4 max-w-xs text-paper/65">{t('heroTag')}</p>
        </div>
        <div>
          <h4 className="font-bold">{t('contact')}</h4>
          <ul className="mt-3 space-y-2 text-paper/70">
            {config.phone && <li dir="ltr" className="text-start">{config.phone}</li>}
            {config.location && <li>{tx(config.location)}</li>}
          </ul>
        </div>
        <div>
          <h4 className="font-bold">{t('follow')}</h4>
          <ul className="mt-3 space-y-2">
            {links.map((l) => (
              <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer" className="text-paper/70 underline-offset-4 hover:text-white hover:underline">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10 py-5 text-center text-sm text-paper/50">
        © {new Date().getFullYear()} <span lang="en">{data.brand.name}</span>. {t('rights')}
      </div>
    </footer>
  )
}
