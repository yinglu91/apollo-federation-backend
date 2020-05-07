const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const fetch = require('node-fetch');

require('dotenv').config(); // for .env

const omdbAPIKey = process.env.OMDB_APIKEY;
const apiUrl = `https://www.omdbapi.com/?apikey=${omdbAPIKey}`;

const typeDefs = gql`
  type Movie @key(fields: "id") {
    id: ID!
    title: String
    poster: String
    year: String
  }

  extend type Query {
    movies(searchValue: String!): [Movie]
  }
`;

const resolvers = {
  Query: {
    movies: async (_, { searchValue }) => {
      // search word including in title
      const res = await fetch(`${apiUrl}&s=${searchValue}`);
      const json = await res.json();

      if (!json || !Array.isArray(json.Search)) {
        return [];
      }

      const movieReducer = (movie) => {
        return {
          id: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
          year: movie.Year,
        };
      };

      const result = json.Search.map((movie) => movieReducer(movie));

      return result;
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

const port = 4003;
server.listen({ port }).then(({ url }) => {
  console.log(`Movie search service ready at ${url}`);
});

/*
{
  movies (searchValue: "man") {
   title
    id
    poster
    year
  }
}
*/
