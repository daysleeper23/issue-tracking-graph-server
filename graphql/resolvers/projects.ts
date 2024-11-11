import { getProject, getProjectsFromTeam } from "../../services/projects";

const projectResolvers = {
  Query: {
    projects: async (_: any, args: { teamId: string }) => {
      return await getProjectsFromTeam(args.teamId);
    },
    project: async (_: any, args: { id: string }) => {
      return await getProject(args.id);
    }
  },
};

export default projectResolvers;