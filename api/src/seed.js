require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // Create admin
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      passwordHash: await bcrypt.hash("AdminPass123", 10),
      role: "admin",
    },
  });

  // Create patient
  await prisma.user.upsert({
    where: { email: "patient@example.com" },
    update: {},
    create: {
      name: "Patient",
      email: "patient@example.com",
      passwordHash: await bcrypt.hash("PatientPass123", 10),
      role: "patient",
    },
  });

  // Seed slots
  const now = new Date();
  for (let d = 0; d < 7; d++) {
    for (let h = 9; h < 17; h++) {
      for (let m = 0; m < 60; m += 30) {
        const start = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + d,
          h,
          m
        );
        const end = new Date(start.getTime() + 30 * 60000);
        try {
          await prisma.slot.create({ data: { startAt: start, endAt: end } });
        } catch {
          
        }
      }
    }
  }

  console.log("✅ Seeded admin, patient, and slots!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
