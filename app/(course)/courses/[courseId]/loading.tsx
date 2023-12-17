import { Loader2 } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="relative inset-0 flex items-center justify-center w-full h-full ">
      <Loader2 className="h-8 w-8 animate-spin text-black" />
    </div>
  );
}
