import { sprints } from '@prisma/client';
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

export const updateSprint = async (
  sprintId: string,
  updates: Partial<sprints>
) => {
  try {
    const result = await prisma.sprints.update({
      where: {
        id: sprintId
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