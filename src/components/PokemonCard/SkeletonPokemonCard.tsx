import { Skeleton } from '../ui/skeleton'

export function SkeletonPokemonCard() {
  return (
    <div className="mx-auto flex h-80 w-96 flex-col gap-4 rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-6 w-28" />
      </div>
      <Skeleton className="mx-auto h-[120px] w-[120px]" />
    </div>
  )
}
