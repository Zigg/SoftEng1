
const { PrismaClient, RoleName } = require('@prisma/client');
const prisma = new PrismaClient();

// TODO: To run ts-node role-seed.ts

async function createRole(name: string) {
  try {
    const role = await prisma.role.upsert({
      where: { name: name },
      update: {},
      create: {
        name: name,
      },
    });
    console.log(`Created or updated role: ${role.name}`);
  } catch (error) {
    console.error(`Error creating or updating role ${name}:`, error);
  }
}

async function main() {
  await createRole(RoleName.ADMIN);
  await createRole(RoleName.CUSTOMER);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
