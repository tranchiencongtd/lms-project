
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string, chapterId: string } }
) {
  try {
    const user = await currentUser();
    let userId = user?.id;
    const { url } = await req.json();
    console.log("here")

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("here")

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.courseId,
        chapterId: params.chapterId
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}