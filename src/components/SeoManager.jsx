import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useData } from '../context/DataContext'

const upsertMeta = (selector, attrs) => {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value))
    document.head.appendChild(tag)
    return tag
  }
  Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value))
  return tag
}

export default function SeoManager() {
  const { personalInfo } = useData()
  const location = useLocation()

  useEffect(() => {
    const baseTitle = personalInfo.seoTitle || `${personalInfo.name || 'Portfolio'} | ${personalInfo.title || 'Developer'}`
    const titles = {
      '/': baseTitle,
      '/about': `About | ${baseTitle}`,
      '/experience': `Experience | ${baseTitle}`,
      '/projects': `Projects | ${baseTitle}`,
      '/skills': `Skills | ${baseTitle}`,
      '/blog': `Blog | ${baseTitle}`,
      '/contact': `Contact | ${baseTitle}`,
    }

    document.title = titles[location.pathname] || baseTitle

    const description = personalInfo.seoDescription || personalInfo.summary || 'Portfolio website'
    const keywords = personalInfo.seoKeywords || `${personalInfo.name || ''}, ${personalInfo.title || ''}`.trim()
    const ogImage = personalInfo.ogImage || personalInfo.profileImage || ''

    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: document.title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    if (ogImage) {
      upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage })
    }
  }, [location.pathname, personalInfo])

  return null
}
