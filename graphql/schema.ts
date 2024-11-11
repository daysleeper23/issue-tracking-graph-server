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
    tasks: [Task],
    team: Team
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
    sprint: String
  }

  type Query {
    tasks(teamId: String): [Task!]
    projects(teamId: String): [Project!]
    project(id: String): Project
  }

  type Mutation {
    updateTask(id: String, title: String, number: Int): Task
  }
`

module.exports = typeDefs