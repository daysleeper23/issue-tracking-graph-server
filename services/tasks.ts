import { prisma } from "..";
import { tasks } from '@prisma/client';

export const getTasksFromTeam = async (teamId: string) => {
  // console.log('get tasks for team:', teamId);
  try {
    const results = await prisma.tasks.findMany({
      where: {
        team: teamId
      },
      include: {
        projects: {
          select: {
            id: true,
            title: true
          }
        },
        sprints: {
          select: {
            id: true,
            name: true
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
};

export const getTask = async (taskId: string) => {
  // console.log('get tasks for team:', teamId);
  try {
    const results = await prisma.tasks.findUnique({
      where: {
        id: taskId
      },
      include: {
        projects: {
          select: {
            id: true,
            title: true
          }
        },
        sprints: {
          select: {
            id: true,
            name: true
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
};

export const updateTask = async (
  taskId: string,
  updates: Partial<tasks>
) => {
  try {
    const result = await prisma.tasks.update({
      where: {
        id: taskId
      },
      data: updates
    });
    return result;
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return null;
  } finally {
    await prisma.$disconnect();
  }
}