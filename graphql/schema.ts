const typeDefs = `
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
    priority: String,
    status: String!,
    lead: User,
    start: String,
    end: String
  }

  type Task {
    id: ID!,
    number: Int!,
    title: String!,
    dueDate: String,
    priority: String!,
    status: String!,
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
  }

  type Mutation {
    updateTask(id: String, title: String, number: Int): Task
  }
`

module.exports = typeDefs