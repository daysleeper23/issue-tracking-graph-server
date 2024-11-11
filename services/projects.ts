import { prisma } from "..";

export const getProjectsFromTeam = async (teamId: string) => {
  try {
    const results = await prisma.projects.findMany({
      where: {
        team: teamId
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
}

export const getProject = async (projectId: string) => {
  try {
    const project = await prisma.projects.findUnique({
      where: { id: projectId },
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