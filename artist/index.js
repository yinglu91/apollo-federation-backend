const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const ArtistAPI = require("./datasources/artist");

// Apollo Server will automatically add the artistAPI 
// to our resolvers' context so we can easily call them.

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
  dataSources: () => ({
    artistAPI: new ArtistAPI(),
  }),
});

const port = 4004;
server.listen({ port }).then(({ url }) => {
  console.log(`Artist search service ready at ${url}`);
});

/*
query {
  artist(name: "Whitney Houston") {
    id
    name
    image
    followers
    tracks {
      id
      name
      image
      previewUrl
    }
  }
}
*/
