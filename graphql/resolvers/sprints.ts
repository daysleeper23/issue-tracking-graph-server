import { getSprintsFromTeam } from "../../services/sprints";

const sprintResolvers = {
  Query: {
    sprints: async (_: any, args: { teamId: string }) => {
      return await getSprintsFromTeam(args.teamId);
    }
  }
};
export default sprintResolvers;