export default function ProjectDetailsLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Spacer */}
      <div className="h-16 border-b border-border/40" />

      <main className="flex-1 pb-24">
        {/* Breadcrumb Skeleton */}
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 pt-8 pb-4">
          <div className="h-4 w-48 bg-muted/60 rounded-full animate-pulse" />
        </div>

        {/* Hero Header Skeleton */}
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 pt-4 pb-12">
          <div className="space-y-4 max-w-3xl">
            <div className="h-6 w-32 bg-primary/10 rounded-full animate-pulse" />
            <div className="h-10 sm:h-12 w-4/5 bg-muted/80 rounded-xl animate-pulse" />
            <div className="h-5 sm:h-6 w-full bg-muted/60 rounded-lg animate-pulse" />
            <div className="h-5 w-3/4 bg-muted/50 rounded-lg animate-pulse" />

            <div className="pt-4 flex gap-4">
              <div className="h-11 w-36 bg-muted/80 rounded-full animate-pulse" />
              <div className="h-11 w-44 bg-muted/80 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Cover Image Skeleton */}
          <div className="mt-10 aspect-[16/9] w-full rounded-3xl bg-muted/50 border border-border/60 animate-pulse overflow-hidden" />
        </div>

        {/* Case Study 3-Card Grid Skeleton */}
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 space-y-4"
              >
                <div className="size-12 rounded-2xl bg-muted/70 animate-pulse" />
                <div className="h-6 w-32 bg-muted/80 rounded-lg animate-pulse" />
                <div className="h-4 w-48 bg-muted/40 rounded-sm animate-pulse" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full bg-muted/60 rounded-sm animate-pulse" />
                  <div className="h-4 w-5/6 bg-muted/60 rounded-sm animate-pulse" />
                  <div className="h-4 w-4/6 bg-muted/60 rounded-sm animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
