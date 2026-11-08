import data from '../data/menu.json'

export default function Categories() {
  const photos = data.gallery

  return (
    <section data-reveal className="scroll-reveal mx-auto max-w-7xl overflow-hidden px-4 pt-16 sm:px-6" aria-hidden="true">
      <div className="category-marquee" dir="ltr">
        <div className="category-marquee__track">
          {[...photos, ...photos].map((src, index) => (
            <div
              key={index}
              className="aspect-[4/5] w-[min(58vw,17rem)] shrink-0 overflow-hidden rounded-[2rem] bg-surface sm:w-64"
            >
              <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
