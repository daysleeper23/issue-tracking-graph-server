import { prisma } from "..";

export const getUsersFromTeam = async (teamId: string) => {
  try {
    const results = await prisma.users.findMany({
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
        tasks: {
          select: {
            id: true,
            title: true
          }
        },
        teams: true
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

export const getOneUser = async (userId: string) => {
  try {
    const results = await prisma.users.findUnique({
      where: {
        id: userId
      },
      include: {
        projects: {
          select: {
            id: true,
            title: true
          }
        },
        tasks: {
          select: {
            id: true,
            title: true
          }
        },
        teams: true
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