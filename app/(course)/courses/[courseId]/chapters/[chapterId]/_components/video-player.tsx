"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import ReactPlayer from "react-player";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  urlYoutube: string;
}

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
  urlYoutube,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  // for error UI not map
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Quá trình học đã được cập nhật updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
        //   {/* <Loader2 className="h-8 w-8 animate-spin text-black" /> */}
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">Bài này chưa được mở</p>
        </div>
      )}
      {!isLocked && urlYoutube ? (
        <div className="relative aspect-video mt-2">
          <ReactPlayer
            height={"100%"}
            width={"100%"}
            controls
            url={urlYoutube || ""}
            onEnded={onEnd}
            playing={true}
            onReady={() => setIsReady(true)}
          />
        </div>
      ) : (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId || ""}
        />
      )}
    </div>
  );
};
