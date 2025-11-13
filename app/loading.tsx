export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-foreground">Loading AI Code Explainer...</p>
        <p className="text-sm text-muted-foreground mt-2">
          Getting everything ready for you
        </p>
      </div>
    </div>
  );
}
