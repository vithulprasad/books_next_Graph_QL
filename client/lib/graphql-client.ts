import { GraphQLClient } from 'graphql-request';

const endpoint =process.env.NEXT_PUBLIC_BACKEND || "" ; 

export const request = async (query:any, variables = {}) => {
  const client = new GraphQLClient(endpoint);

  try {
    const data = await client.request(query, variables);
    return data;
  } catch (error) { 
    console.error('GraphQL request error:', error);
    throw error;
  }
};