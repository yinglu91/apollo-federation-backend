const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'astronauts', url: 'http://localhost:4001' },
    { name: 'missions', url: 'http://localhost:4002' },
    { name: 'movies', url: 'http://localhost:4003' },
    { name: 'artist', url: 'http://localhost:4004' },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

const port = 4000;
server.listen({ port }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// https://github.com/mandiwise/space-camp-federation-demo
