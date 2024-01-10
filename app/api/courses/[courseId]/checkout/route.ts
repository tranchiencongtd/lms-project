
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Bạn đã mua khoá học này rồi", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Không tìm thấy khoá học", { status: 404 });
    }

    // TODO: Create method to payment online
    // HERE WE NOT PAYMENT
    let return_url = "";
    try {
      await db.purchase.create({
        data: {
          courseId: params.courseId,
          userId: user.id,
        },
      });

      return_url = `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}?success=1`;
    } catch (error) {
      return_url = `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}?canceled=1`;
    }

    return NextResponse.json({ url: return_url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
