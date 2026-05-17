import Skeleton from '@/components/ui/Skeleton'

export default function CatalogLoading() {
  return (
    <div className="pt-20 lg:pt-24">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <Skeleton className="h-12 w-48" />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
