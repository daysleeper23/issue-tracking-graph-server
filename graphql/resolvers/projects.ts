import { projects } from "@prisma/client";
import { getProject, getProjectsFromTeam, updateProject } from "../../services/projects";

const projectResolvers = {
  Query: {
    getAllProjectsFromTeam: async (_: any, args: { teamId: string }) => {
      return await getProjectsFromTeam(args.teamId);
    },
    getOneProject: async (_: any, args: { id: string }) => {
      return await getProject(args.id);
    }
  },
  Mutation: {
    updateProject: async (_: any, args: { projectId: string, updates: Partial<projects> }) => {
      return await updateProject(args.projectId, args.updates);
    },
  }
};

export default projectResolvers;