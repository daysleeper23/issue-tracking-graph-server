const typeDefs = `
  type Team {
    id: ID!,
    name: String!
  }

  type User {
    id: ID!,
    name: String!,
    avatarUrl: String!,
    onlineStatus: String!,
    created_at: String,
    updated_at: String
  }

  type Project {
    id: ID!,
    title: String!,
    priority: String!,
    status: String!,
    lead: User,
    start: String,
    end: String,
    team: Team
    tasks: [Task],
  }

  input UpdateProjectInput {
    title: String
    priority: String
    status: String
    lead: String
    start: String
    end: String
    project: String
    sprint: String
  }

  type Sprint {
    id: ID!,
    name: String!,
    description: String,
    status: String!,
    start: String!,
    end: String!,
    tasks: [Task],
  }

  input UpdateSprintInput {
    name: String
    description: String
    status: String
    start: String
    end: String
  }

  type Task {
    id: ID!,
    number: Int!,
    title: String!,
    due: String,
    priority: Int!,
    status: Int!,
    estimate: Int,
    created_at: String,
    updated_at: String,
    project: Project,
    assignee: User,
    sprint: Sprint,
  }

  input UpdateTaskInput {
    title: String
    due: String
    priority: Int
    status: String
    estimate: Int
    assignee: String
    project: String
    sprint: String
  }

  type Query {
    getAllTasksFromTeam(teamId: String): [Task!]
    getOneTask(id: String): Task

    getAllProjectsFromTeam(teamId: String): [Project!]
    getOneProject(id: String): Project

    getAllSprintsFromTeam(teamId: String): [Sprint!]
    updateSprint(sprintId: String, updates: UpdateSprintInput): Sprint
  }

  type Mutation {
    updateTask(taskId: String, updates: UpdateTaskInput): Task
    updateProject(projectId: String, updates: UpdateProjectInput): Project
    updateSprint(sprintId: String, updates: UpdateSprintInput): Sprint
  }
`

export default typeDefs;