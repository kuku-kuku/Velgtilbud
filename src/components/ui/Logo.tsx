interface Props {
  variant?: 'dark' | 'light'
  className?: string
}

export default function Logo({ variant = 'dark', className }: Props) {
  const src = variant === 'dark' ? '/logo-mark.svg' : '/logo-mark-white.svg'
  return (
    <img
      src={src}
      alt="Velgtilbud"
      className={className}
      draggable={false}
    />
  )
}
