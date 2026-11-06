import { useCallback, useState } from 'react'
import { LangProvider } from './i18n'
import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Menu from './components/Menu'
import Modal from './components/Modal'
import Footer from './components/Footer'

export default function App() {
  const [selected, setSelected] = useState(null)
  const [cat, setCat] = useState('all')
  const close = useCallback(() => setSelected(null), [])

  return (
    <LangProvider>
      <Header />
      <main>
        <Hero />
        <Categories />
        <Menu cat={cat} setCat={setCat} onOpen={setSelected} />
      </main>
      <Footer />
      {selected && <Modal entry={selected} onClose={close} />}
    </LangProvider>
  )
}
