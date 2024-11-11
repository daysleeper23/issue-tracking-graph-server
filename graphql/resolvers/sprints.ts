import { sprints } from "@prisma/client";
import { getSprintsFromTeam, updateSprint } from "../../services/sprints";

const sprintResolvers = {
  Query: {
    getAllSprintsFromTeam: async (_: any, args: { teamId: string }) => {
      return await getSprintsFromTeam(args.teamId);
    }
  },
  Mutation: {
    updateSprint: async (_: any, args: { sprintId: string, updates: Partial<sprints> }) => {
      return await updateSprint(args.sprintId, args.updates);
    }
  }
};
export default sprintResolvers;