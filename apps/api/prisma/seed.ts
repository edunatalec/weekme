import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedRoles = async () => {
  const roles = [
    {
      name: 'Admin',
      description: 'Cargo de administrador',
      permissions: ['admin'],
    },
    {
      name: 'User',
      description: 'Cargo de usuário padrão',
      permissions: ['animes:view', 'seasons:view'],
    },
  ];

  for (const role of roles) {
    await prisma.role.create({
      data: {
        ...role,
        permissions: {
          connect: role.permissions.map((permission) => {
            return {
              identifier: permission,
            };
          }),
        },
      },
    });

    console.log('Role', role.name, 'created');
  }
};

const seedPermissions = async () => {
  const permissions = [
    {
      identifier: 'admin',
      name: 'Permissão suprema',
      description: 'Permissão para poder fazer tudo na aplicação',
    },
    {
      identifier: 'users:view',
      name: 'Visualizar usuário',
      description: 'Permissão para visualizar a sessão de usuários',
    },
    {
      identifier: 'users:create',
      name: 'Criar usuário',
      description: 'Permissão para criar novos usuários',
    },
    {
      identifier: 'users:update',
      name: 'Atualizar usuário',
      description: 'Permissão para atualizar usuários',
    },
    {
      identifier: 'users:delete',
      name: 'Deletar usuário',
      description: 'Permissão para deletar usuários',
    },

    {
      identifier: 'roles:view',
      name: 'Visualizar cargo',
      description: 'Permissão para visualizar a sessão de cargos',
    },
    {
      identifier: 'roles:create',
      name: 'Criar cargo',
      description: 'Permissão para criar novos cargos',
    },
    {
      identifier: 'roles:update',
      name: 'Atualizar cargo',
      description: 'Permissão para atualizar cargos',
    },
    {
      identifier: 'roles:delete',
      name: 'Deletar cargo',
      description: 'Permissão para deletar cargos',
    },

    {
      identifier: 'permissions:view',
      name: 'Visualizar permissão',
      description: 'Permissão para visualizar a sessão de permissões',
    },
    {
      identifier: 'permissions:update',
      name: 'Atualizar permissão',
      description: 'Permissão para atualizar permissões',
    },

    {
      identifier: 'animes:view',
      name: 'Visualizar anime',
      description: 'Permissão para visualizar a sessão de animes',
    },
    {
      identifier: 'animes:create',
      name: 'Criar anime',
      description: 'Permissão para criar novos animes',
    },
    {
      identifier: 'animes:update',
      name: 'Atualizar anime',
      description: 'Permissão para atualizar animes',
    },
    {
      identifier: 'animes:delete',
      name: 'Deletar anime',
      description: 'Permissão para deletar animes',
    },

    {
      identifier: 'seasons:view',
      name: 'Visualizar temporada',
      description: 'Permissão para visualizar a sessão de temporadas',
    },
    {
      identifier: 'seasons:create',
      name: 'Criar temporada',
      description: 'Permissão para criar novos temporadas',
    },
    {
      identifier: 'seasons:update',
      name: 'Atualizar temporada',
      description: 'Permissão para atualizar temporadas',
    },
    {
      identifier: 'seasons:delete',
      name: 'Deletar temporada',
      description: 'Permissão para deletar temporadas',
    },
  ];

  for (const permission of permissions) {
    await prisma.permission.create({
      data: permission,
    });

    console.log('Permission', permission.identifier, 'created');
  }
};

const main = async () => {
  try {
    await seedPermissions();
    console.log();
    await seedRoles();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
