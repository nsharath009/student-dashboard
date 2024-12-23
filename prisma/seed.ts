// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create courses
  const math = await prisma.course.create({
    data: {
      name: "CBSE 9 Math",
      iconType: "math",
    },
  });

  const science = await prisma.course.create({
    data: {
      name: "CBSE 9 Science",
      iconType: "science",
    },
  });

  // Create initial students
  const studentsData = [
    "Anshuman Kashyap",
    "Bansi Dadhaniya",
    "Chandrika Valotia",
    "Devang Dave",
    "Forum Bhatt",
  ];

  for (const name of studentsData) {
    await prisma.student.create({
      data: {
        name,
        cohort: "AY 2024-25",
        class: "CBSE 9",
        courses: {
          create: [
            { course: { connect: { id: math.id } } },
            { course: { connect: { id: science.id } } },
          ],
        },
      },
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
