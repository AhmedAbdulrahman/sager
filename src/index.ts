import 'reflect-metadata'
import * as tq from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import { resolvers } from '@generated/type-graphql'
import { context } from './context'

const main = async () => {
  // Required logic for integrating with Express
  const app = express()
  const httpServer = http.createServer(app)

  const schema = await tq.buildSchema({
    resolvers,
    validate: false,
  })

  // ApolloServer initialization, plus the drain plugin.
  const server = new ApolloServer({
    schema,
    context: context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  // More required logic for integrating with Express
  await server.start()

  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/',
  })

  // Server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

main().catch((err) => {
  console.error(err)
})
