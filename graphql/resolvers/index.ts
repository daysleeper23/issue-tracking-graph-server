import projectResolvers from "./projects";
import sprintResolvers from "./sprints";
import taskResolvers from './tasks';

const resolvers = {
  Query: {
    ...taskResolvers.Query,
    ...projectResolvers.Query,
    ...sprintResolvers.Query,
  },
  Mutation: {
    ...taskResolvers.Mutation,
    ...projectResolvers.Mutation,
  },
  Task: {
    project: (parent: any) => parent.projects,
    assignee: (parent: any) => parent.users,
    sprint: (parent: any) => parent.sprints,
  },
  Project: {
    lead: (parent: any) => parent.users,
    tasks: (parent: any) => parent.tasks,
    team: (parent: any) => parent.teams,
  },
};
export default resolvers