
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { currentUser } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string, attachmentId: string , chapterId: string} }
) {
  try {
    const user = await currentUser();
    let userId = user?.id;

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapterOwner = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId
      }
    });

    if (!chapterOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
        chapterId: params.chapterId
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}