export default function DividerOr() {
  return (
    <div className="relative w-full h-10 my-4">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-foreground/20" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-4 bg-background text-center">
        <span className="text-foreground/50 uppercase text-sm font-semibold">
          Or
        </span>
      </div>
    </div>
  );
}
