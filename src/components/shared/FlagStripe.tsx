/** Italian-flag inspired stripe: green | white | red */
export function FlagStripe({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-1.5 ${className}`} aria-hidden>
      <div className="flex-1 bg-brand-green" />
      <div className="flex-1 bg-white" />
      <div className="flex-1 bg-brand" />
    </div>
  );
}
