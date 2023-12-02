import { Loader2 } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950 w-screen h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-black" />
    </div>
  );
}
