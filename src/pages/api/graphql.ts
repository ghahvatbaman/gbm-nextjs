import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler } from "next";
import {
  buildSchema,
  Field,
  ID,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

@ObjectType()
export class Dog {
  @Field(() => ID)
  name!: string;
}

@Resolver()
export class DogsResolver {
  @Query(() => [Dog])
  dogs(): Dog[] {
    return [{ name: "hello" }, { name: "world" }];
  }
}

const schema = await buildSchema({
  resolvers: [DogsResolver],
});

const server = new ApolloServer({ schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

const gqlHanlder: NextApiHandler = async (req, res) => {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
};
export default gqlHanlder;
