import projectResolvers from "./projects";
import taskResolvers from './tasks';

const resolvers = {
  Query: {
    ...taskResolvers.Query,
    ...projectResolvers.Query,
  },
  Mutation: {
    ...taskResolvers.Mutation,
  },
  Task: {
    project: (parent: any) => parent.projects,
    assignee: (parent: any) => parent.users,
  },
  Project: {
    lead: (parent: any) => parent.users,
    tasks: (parent: any) => parent.tasks,
    team: (parent: any) => parent.teams,
  },
};
export default resolvers