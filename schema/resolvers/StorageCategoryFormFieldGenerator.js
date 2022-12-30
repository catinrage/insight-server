module.exports = {
  StorageCategoryFormFieldGenerator: {
    category: async (scope, args, { prisma }) => {
      const category = await prisma.storageCategoryFormFieldGenerator
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .category();
      return category;
    },
    field: async (scope, args, { prisma }) => {
      const field = await prisma.storageCategoryFormFieldGenerator
        .findUnique({
          where: {
            id: scope.id,
          },
        })
        .field();
      return field;
    },
  },
  StorageCategoryFormFieldGeneratorMutationResponse: {
    __resolveType(object, context, info) {
      if (object.fieldId) {
        return 'StorageCategoryFormFieldGenerator';
      }
      return 'Error';
    },
  },
  Query: {
    GetStorageCategoryFormFieldGenerator: async (scope, args, { prisma }) => {
      const generator =
        await prisma.storageCategoryFormFieldGenerator.findUnique({
          where: {
            id: args.id,
          },
        });
      return generator;
    },
    ListStorageCategoryFormFieldGenerators: async (scope, args, { prisma }) => {
      const generators =
        await prisma.storageCategoryFormFieldGenerator.findMany({
          orderBy: {
            updatedAt: 'desc',
          },
        });
      return generators;
    },
  },
  Mutation: {
    CreateStorageCategoryFormFieldGenerator: async (_, args, { prisma }) => {
      try {
        const StorageCategoryFormFieldGenerator =
          await prisma.storageCategoryFormFieldGenerator.upsert({
            where: {
              categoryId_fieldId: {
                categoryId: args.input.categoryId,
                fieldId: args.input.fieldId,
              },
            },
            update: { ...args.input },
            create: {
              ...args.input,
            },
          });
        return StorageCategoryFormFieldGenerator;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    UpdateStorageCategoryFormFieldGenerator: async (_, args, { prisma }) => {
      try {
        const StorageCategoryFormFieldGeneratorTemp =
          await prisma.storageCategoryFormFieldGenerator.findUnique({
            where: {
              id: args.id,
            },
          });
        const StorageCategoryFormFieldGenerator =
          await prisma.storageCategoryFormFieldGenerator.update({
            where: {
              id: args.id,
            },
            data: {
              ...args.input,
            },
          });
        return StorageCategoryFormFieldGenerator;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
    DeleteStorageCategoryFormFieldGenerator: async (_, args, { prisma }) => {
      try {
        const StorageCategoryFormFieldGenerator =
          await prisma.storageCategoryFormFieldGenerator.delete({
            where: {
              id: args.id,
            },
          });
        return StorageCategoryFormFieldGenerator;
      } catch ({ code }) {
        return {
          code,
        };
      }
    },
  },
};
