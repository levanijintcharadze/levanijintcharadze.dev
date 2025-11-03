import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <Card className={cn(
      'glass',
      hover && 'glass-hover',
      className
    )}>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  )
}