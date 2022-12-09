const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // create admin role
  await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      permissions: ['SUDO'],
    },
  });
  // create admin user
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      // password: admin
      password: '$2b$12$DMk.E1KyzIVHXl05yJDWruJDkxCfnns6BlVsIXELa2HeQnr26yLeG',
      roleId: 1,
    },
  });
  // create root category
  await prisma.storageCategory.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Root',
      parent: undefined,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
