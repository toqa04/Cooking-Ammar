import { useLang } from '../i18n'
import data from '../data/menu.json'

export default function Header() {
  const { lang, setLang, t } = useLang()
  const opt = (code, label, aria) => (
    <button
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      aria-label={aria}
      lang={code}
      className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${lang === code ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
    >
      {label}
    </button>
  )
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="tight flex items-center gap-2 text-xl font-extrabold tracking-[-0.04em]" lang="en" dir="ltr">
          <span className="h-3 w-3 rounded-full bg-leaf" aria-hidden="true" />
          {data.brand.name}
        </a>
        <div className="flex items-center rounded-full bg-surface p-1" role="group" aria-label={t('switchLabel')}>
          {opt('en', 'EN', 'English')}
          {opt('ar', 'عربي', 'العربية')}
        </div>
      </div>
    </header>
  )
}
