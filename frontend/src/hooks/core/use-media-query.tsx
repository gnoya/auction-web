import { useEffect, useState } from 'react'

const tailwindBreakpoints = {
  'sm': '(min-width: 640px)',
  'md': '(min-width: 768px)',
  'lg': '(min-width: 1024px)',
  'xl': '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
}

type TailwindBreakpoints = keyof typeof tailwindBreakpoints

export function useMediaQuery(query: TailwindBreakpoints): boolean {
  const [matches, setMatches] = useState(
    window.matchMedia(tailwindBreakpoints[query]).matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(tailwindBreakpoints[query])
    const updateMatches = () => setMatches(mediaQuery.matches)

    updateMatches()
    mediaQuery.addEventListener('change', updateMatches)

    return () => mediaQuery.removeEventListener('change', updateMatches)
  }, [query])

  return matches
}
