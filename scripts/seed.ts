const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Lập trình web" },
        { name: "Lập trình C" },
        { name: "Lập trình C++" },
        { name: "Lập trình C#" },
        { name: "Lập trình Java" },
        { name: "Lập trình Python" },
        { name: "Lập trình AI" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();