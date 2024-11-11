import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends({
  result: {
    tasks: {
      due: {
        // After fetching, convert the `due` field to a string if it's defined
        needs: {}, // No dependencies needed here
        compute(value: any) {
          return value !== null ? value.toString() : null;
        },
      },
    },
  },
});

const resolvers = {
  Query: {
    tasks: async (_: any, args: { teamId: string }) => {
      try {
        const results = await prisma.tasks.findMany({
          where: {
            team: args.teamId
          },
          include: {
            projects: {
              select: {
                id: true,
                title: true
              }
            },
            users: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
                onlineStatus: true
              }
            } 
          }
        });
        return results;
      } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        return null;
      } finally {
        await prisma.$disconnect();
      }
    },
    projects: async (_: any, args: { teamId: string }) => {
      try {
        const results = await prisma.projects.findMany({
          where: {
            team: args.teamId
          },
          include: {
            users: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
                onlineStatus: true
              }
            },
            teams: {
              select: {
                id: true,
                name: true
              }
            },
            tasks: {
              select: {
                id: true
              }
            },
          }
        });
        return results;
      } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        return null;
      } finally {
        await prisma.$disconnect();      
      }
    },
    project: async (_: any, args: { id: string }) => {
      try {
        const project = await prisma.projects.findUnique({
          where: { id: args.id },
          include: {
            users: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
                onlineStatus: true
              }
            },
            teams: {
              select: {
                id: true,
                name: true
              }
            },
            tasks: true,
          }
        });
        return project;
      } catch (error) {
        console.log(error)
        await prisma.$disconnect();
        return null;
      } finally {
        await prisma.$disconnect();
      }
    }
    // task: async (_: any, args: { id: string }) => {
    //   return await prisma.tasks.findUnique({
    //     where: { id: args.id },
    //     select: {
    //       id: true,
    //       title: true
    //     }
    //   });
    // },
  },
  Task: {
    project: (parent: any) => parent.projects,
    assignee: (parent: any) => parent.users,
  },
  Project: {
    lead: (parent: any) => parent.users,
    tasks: (parent: any) => parent.tasks,
    team: (parent: any) => parent.teams,
  },
  Mutation: {
    // createTask: async (_: any, args: { title: string, name: string, number: number, priority: string, status: string}) => {
    //   return await prisma.tasks.create({
    //     data: args,
    //   });
    // },
    updateTask: async (
      _: any,
      args: { id: string; title?: string; status?: number }
    ) => {
      
      
      
      try {
        const result =  await prisma.tasks.update({
          where: { id: args.id },
          data: {
            title: args.title,
            status: args.status,
          },
        });
        return result;
      } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        return null;
      } finally {
        await prisma.$disconnect();
      }
    },
    // deleteTask: async (_: any, args: { id: string }) => {
    //   return await prisma.tasks.delete({
    //     where: { id: args.id },
    //   });
    // },
  },
};

module.exports = resolvers;
