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

  // Create sample students
  const students = ["Anshuman Kashyap", "Bansi Dadhaniya", "Chandrika Valotia"];

  for (const name of students) {
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

  console.log("Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
