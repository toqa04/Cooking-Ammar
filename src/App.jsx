import { useCallback, useEffect, useState } from 'react'
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

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })
    const revealTargets = (node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return
      if (node.matches('[data-reveal]')) observer.observe(node)
      node.querySelectorAll('[data-reveal]').forEach((target) => observer.observe(target))
    }
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach(revealTargets))
    })

    document.documentElement.classList.add('has-scroll-reveal')
    revealTargets(document.body)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      document.documentElement.classList.remove('has-scroll-reveal')
    }
  }, [])

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
