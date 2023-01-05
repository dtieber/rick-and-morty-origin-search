import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import fetch from 'cross-fetch'

export const gqlClient = new ApolloClient({
  uri: 'https://rickandmortyapi.graphcdn.app/',
  link: new HttpLink({
    uri: 'https://rickandmortyapi.graphcdn.app/graphql',
    fetch,
  }),
  cache: new InMemoryCache(),
})
