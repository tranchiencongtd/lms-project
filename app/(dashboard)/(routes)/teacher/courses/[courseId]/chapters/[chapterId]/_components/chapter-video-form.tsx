"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import ReactPlayer from "react-player/youtube";
import { Pencil, PlusCircle, Video, PlayCircle } from "lucide-react";
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
  const [youtubeUrl, setYoutubeUrl] = useState(initialData.youtubeUrl || "");

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // for error UI not map
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  const hanldeTypeUploadChange = (event: any) => {
    if (event.target.value == "youtube") setIsYoutubeVideo(true);
    if (event.target.value == "uploadthing") setIsYoutubeVideo(false);
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

  const hanldeUrlYoutubeSubmit = async (event: any) => {
    event.preventDefault();
    const values = { youtubeUrl };
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
        ((!initialData.videoUrl && !isYoutubeVideo) || (!initialData.youtubeUrl && isYoutubeVideo) ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : isYoutubeVideo ? (
          <div className="relative aspect-video mt-2">
            <ReactPlayer
              height={"100%"}
              width={"100%"}
              controls
              url={initialData.youtubeUrl || ""}
            />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {(isEditing && !isYoutubeVideo) && (
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
      {(isEditing && isYoutubeVideo) && (
        <div>
          <form onSubmit={hanldeUrlYoutubeSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="red"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408z" />
                </svg>
              </div>
              <input
                value={youtubeUrl || ""}
                type="text"
                id="save"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Đường dẫn youtube"
                required
                onChange={(event) => setYoutubeUrl(event.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Video có thể mất vài phút để xử lý. Làm mới trang nếu video không xuất
          hiện.
        </div>
      )}
    </div>
  );
};
