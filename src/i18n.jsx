import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const dict = {
  en: {
    heroHeadline: "Let's eat",
    heroTag: 'Fresh meals, made with care.',
    heroTile: 'Fresh, every single day.',
    browse: 'Shop by category',
    heroCta: 'Explore the menu',
    orderNow: 'Order on WhatsApp',
    menuTitle: 'The menu',
    menuSub: 'Browse by category, search by ingredient, or see everything at once.',
    searchPlaceholder: 'Search meals or ingredients',
    all: 'All',
    subscriptions: 'Subscriptions',
    items: 'items',
    noResultsTitle: 'Nothing matches your search',
    noResultsText: 'Try another word, or clear the search to see the full menu.',
    clearSearch: 'Clear search',
    details: 'View details',
    close: 'Close',
    ingredients: 'Ingredients',
    nutrition: 'Nutrition per serving',
    cal: 'Cal',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    included: "What's included",
    perWeek: 'per week',
    perMonth: 'per month',
    per15Days: 'per 15 days',
    currency: 'JOD',
    contact: 'Contact',
    follow: 'Follow us',
    rights: 'All rights reserved.',
    switchTo: 'العربية',
    switchLabel: 'Switch to Arabic',
  },
  ar: {
    heroHeadline: 'يلا ناكل',
    heroTag: 'وجبات طازجة ومحضّرة بعناية.',
    heroTile: 'طازج، كل يوم.',
    browse: 'تسوّق حسب الصنف',
    heroCta: 'تصفّح القائمة',
    orderNow: 'اطلب عبر واتساب',
    menuTitle: 'القائمة',
    menuSub: 'تصفّح حسب الصنف، أو ابحث بالمكوّنات، أو شاهد كل شيء دفعة واحدة.',
    searchPlaceholder: 'ابحث عن وجبة أو مكوّن',
    all: 'الكل',
    subscriptions: 'الاشتراكات',
    items: 'صنف',
    noResultsTitle: 'لا توجد نتائج مطابقة',
    noResultsText: 'جرّب كلمة أخرى، أو امسح البحث لعرض القائمة كاملة.',
    clearSearch: 'مسح البحث',
    details: 'عرض التفاصيل',
    close: 'إغلاق',
    ingredients: 'المكوّنات',
    nutrition: 'القيم الغذائية للحصة',
    cal: 'سعرة',
    protein: 'بروتين',
    carbs: 'كارب',
    fat: 'دهون',
    included: 'ماذا يشمل الاشتراك',
    perWeek: 'أسبوعيًا',
    perMonth: 'شهريًا',
    per15Days: 'لكل 15 يومًا',
    currency: 'د.أ',
    contact: 'تواصل معنا',
    follow: 'تابعنا',
    rights: 'جميع الحقوق محفوظة.',
    switchTo: 'English',
    switchLabel: 'التبديل إلى الإنجليزية',
  },
}

const Ctx = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'ar' } catch { return 'ar' }
  })
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    document.title = 'Cooking Ammar'
    try { localStorage.setItem('lang', lang) } catch { /* ignore */ }
  }, [lang, dir])

  const value = useMemo(() => ({
    lang, dir, setLang,
    t: (k) => dict[lang][k] ?? k,
    tx: (o) => (o ? (o[lang] ?? o.en ?? '') : ''),
    list: (arr) => (arr || []).join(lang === 'ar' ? '، ' : ', '),
    money: (n) => {
      const v = Number(n).toFixed(2)
      return lang === 'ar' ? `${v} ${dict.ar.currency}` : `${dict.en.currency} ${v}`
    },
  }), [lang, dir])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
