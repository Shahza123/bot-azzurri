import { ScrollArea } from '@/component/ui/scroll-area'
import { ReactNode } from 'react'

interface PageContainer {
  children: ReactNode
  scrollable?: boolean
}

export default function PageContainer({
  children,
  scrollable = false
}: PageContainer) {
  return (
    <>
      {scrollable ? (
        <ScrollArea>
          <div className='h-full p-4 md:px-8'>{children}</div>
        </ScrollArea>
      ) : (
        <div className='h-full p-4 md:px-8'>{children}</div>
      )}
    </>
  )
}
