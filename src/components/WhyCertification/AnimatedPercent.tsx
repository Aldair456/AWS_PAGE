type AnimatedPercentProps = {
  value: number
  className?: string
}

export function AnimatedPercent({ value, className }: AnimatedPercentProps) {
  return (
    <span className={className}>
      {value} %
    </span>
  )
}
