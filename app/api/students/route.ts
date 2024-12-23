import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cohort = searchParams.get("cohort");
  const className = searchParams.get("class");
  const search = searchParams.get("search");

  try {
    const where: Prisma.StudentWhereInput = {
      AND: [
        cohort ? { cohort } : {},
        className ? { class: className } : {},
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                {
                  courses: {
                    some: {
                      course: {
                        name: { contains: search, mode: "insensitive" },
                      },
                    },
                  },
                },
              ],
            }
          : {},
      ],
    };

    const students = await prisma.student.findMany({
      where,
      include: {
        courses: {
          include: {
            course: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Error fetching students" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { courses, ...studentData } = json;

    const student = await prisma.student.create({
      data: {
        ...studentData,
        courses: {
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
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Error creating student" },
      { status: 500 }
    );
  }
}
