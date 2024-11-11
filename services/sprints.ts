import { prisma } from '../index';

export const getSprintsFromTeam = async (teamId: string) => {
  try {
    const results = await prisma.sprints.findMany({
      where: {
        team: teamId
      },
      include: {
        tasks: {
          select: {
            id: true,
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