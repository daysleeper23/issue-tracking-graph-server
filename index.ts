const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

import { PrismaClient } from '@prisma/client'

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }: { url: string }) => {
  console.log(`Server ready at ${url}`)
}).catch((e: Error) => {
  throw e;
}).finally(async () => {
  await prisma.$disconnect();
});