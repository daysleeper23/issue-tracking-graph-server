const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

import { PrismaClient } from '@prisma/client'

import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';

export const prisma = new PrismaClient().$extends({
  result: {
    tasks: {
      due: {
        // After fetching, convert the `due` field to a string if it's defined
        needs: {},
        compute(value: any) {
          // console.log('Due field value:', value);
          return value.due !== null 
            ? new Date(Number(value.due) * 1000).toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                timeZone: 'utc'
              }
            )
            : 'No due date';
        },
      },
    },
  },
});

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