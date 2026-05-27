interface Props {
  variant?: 'dark' | 'light'
  full?: boolean
  className?: string
}

export default function Logo({ variant = 'dark', full = false, className }: Props) {
  const src = full
    ? variant === 'light' ? '/logo-white.svg' : '/logo.svg'
    : variant === 'light' ? '/logo-mark-white.svg' : '/logo-mark.svg'
  return (
    <img
      src={src}
      alt="Velgtilbud"
      className={className}
      draggable={false}
    />
  )
}
