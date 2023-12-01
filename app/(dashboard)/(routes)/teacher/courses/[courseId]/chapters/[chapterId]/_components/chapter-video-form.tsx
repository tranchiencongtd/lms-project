"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import ReactPlayer from "react-player/youtube";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isYoutubeVideo, setIsYoutubeVideo] = useState(
    initialData.youtubeUrl !== null
  );

  // for error UI not map
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  const hanldeTypeUploadChange = (event : any) => {
    if(event.target.value == 'youtube') setIsYoutubeVideo(true);
    if(event.target.value == 'uploadthing') setIsYoutubeVideo(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Cập nhật thành công");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <input
              onChange={hanldeTypeUploadChange}
              checked={isYoutubeVideo}
              id="youtube"
              type="radio"
              value="youtube"
              name="typeUpload"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="youtube"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Youtube
            </label>
          </div>
          <div className="flex items-center">
            <input
              onChange={hanldeTypeUploadChange}
              checked={!isYoutubeVideo}
              id="uploadthing"
              type="radio"
              value="uploadthing"
              name="typeUpload"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="uploadthing"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              UploadThing
            </label>
          </div>
        </div>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Hủy</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Thêm một video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Chỉnh sửa video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl || !initialData.youtubeUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : isYoutubeVideo ? (
          <div className="relative aspect-video mt-2">
            <ReactPlayer
              height={"100%"}
              width={"100%"}
              controls
              url={initialData.youtubeUrl}
            />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Tải lên video của bài học này
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Video có thể mất vài phút để xử lý. Làm mới trang nếu video không
          xuất hiện.
        </div>
      )}
    </div>
  );
};
