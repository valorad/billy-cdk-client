import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const isProdMode = (process.env.NODE_ENV.toLowerCase() === "production");

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: (isProdMode ? "/gql": "http://localhost:5000/gql"),
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});