// app/api/students/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json();
    const { courses, ...updateData } = json;

    const student = await prisma.student.update({
      where: { id: params.id },
      data: {
        ...updateData,
        courses: {
          deleteMany: {},
          create: courses.map((courseId: string) => ({
            course: {
              connect: { id: courseId },
            },
          })),
        },
      },
      include: {
        courses: {
          include: {
            course: true,
          },
        },
      },
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Error updating student" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.student.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Error deleting student" },
      { status: 500 }
    );
  }
}
