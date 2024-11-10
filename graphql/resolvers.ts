import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// interface NewTask {
//   number: number
//   title: string
//   status: string
//   project?: string
//   sprint?: string
//   dueDate?: string
//   priority?: string
// };

const resolvers = {
  Query: {
    // tasksCount: async (_: any, args: { teamId: string }) => {
    //   return await prisma.tasks.findMany({
    //     where: {
    //       team: args.teamId
    //     }
    //   });
    // },
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
          }
        });
        return results;
      } catch (error) {
        console.log(error);
        return null;
      } finally {
        await prisma.$disconnect();      
      }
    },
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
  Mutation: {
    // createTask: async (_: any, args: { title: string, name: string, number: number, priority: string, status: string}) => {
    //   return await prisma.tasks.create({
    //     data: args,
    //   });
    // },
    updateTask: async (
      _: any,
      args: { id: string; title?: string; status?: string }
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
