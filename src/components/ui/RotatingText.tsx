import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const sentences = [
  'Gratis og helt uforpliktende.',
  'Tilbud fra flere godkjente byråer.',
  'Du velger det beste tilbudet selv.',
  'Svar innen 2 timer på hverdager.',
  'Brukt av tusenvis i Trondheim.',
]

export default function RotatingText({ className }: { className?: string }) {
  const [index,   setIndex]   = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIndex((i) => (i + 1) % sentences.length); setVisible(true) }, 380)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className={cn('inline-block', className)}
      style={{
        transition: 'opacity 380ms ease, transform 380ms ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
      }}
    >
      {sentences[index]}
    </span>
  )
}
