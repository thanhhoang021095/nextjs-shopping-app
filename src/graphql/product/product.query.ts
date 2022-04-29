import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query Product {
    id
    name
  }
`
