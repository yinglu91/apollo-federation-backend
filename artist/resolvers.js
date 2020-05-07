// don't have to write a resolver for a field if the parent object has a property with the same name.

const resolvers = {
  Query: {
    artist: (_, { name }, { dataSources }) =>
      dataSources.artistAPI.getArtistByName({
        artistName: name,
      }),
  },

  Artist: {
    tracks: (artist, _, { dataSources }) =>
      dataSources.artistAPI.getTracksByArtistId({
        artistId: artist.id,
      }),
  },
};

module.exports = resolvers;

/*
Resolvers provide the instructions for turning a GraphQL operation (a query, mutation, or subscription) into data. They either return the same type of data we specify in our schema or a promise for that data.

keeping your resolvers thin as a best practice, which allows you to safely refactor without worrying about breaking your API.

Resolver functions accept four arguments:

fieldName: (parent, args, context, info) => data;

parent: An object that contains the result returned from the resolver on the parent type
args: An object that contains the arguments passed to the field
context: An object shared by all resolvers in a GraphQL operation. We use the context to  contain per-request state such as authentication information and access our data sources.
info: Information about the execution state of the operation which should only be used in advanced cases
*/
