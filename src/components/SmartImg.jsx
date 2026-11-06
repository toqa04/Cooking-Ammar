import { useState } from 'react'
import { UtensilsIcon } from './icons'

// If the link is a Cloudinary URL, ask Cloudinary for an optimized, resized version automatically.
export function optimize(url, w) {
  if (url && url.includes('res.cloudinary.com') && url.includes('/upload/') && !/\/upload\/[^/]*(f_|q_|w_)/.test(url)) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`)
  }
  return url
}

export default function SmartImg({ src, alt, w = 800, eager = false, className = '' }) {
  const [bad, setBad] = useState(false)
  if (!src || bad) {
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center bg-surface text-muted ${className}`}>
        <UtensilsIcon />
      </div>
    )
  }
  return (
    <img
      src={optimize(src, w)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setBad(true)}
      className={className}
    />
  )
}
