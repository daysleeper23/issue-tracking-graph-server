import { tasks } from '@prisma/client';
import { getTask, getTasksFromTeam, updateTask } from '../../services/tasks'

const taskResolvers = {
  Query: {
    getAllTasksFromTeam: async (_: any, args: { teamId: string }) => {
      return await getTasksFromTeam(args.teamId);
    },
    getOneTask: async (_: any, args: { id: string }) => {
      return await getTask(args.id);
    }
  },
  Mutation: {
    updateTask: async (_: any, args: { taskId: string, updates: Partial<tasks> }) => {
      return await updateTask(args.taskId, args.updates);
    }
  }
};

export default taskResolvers;