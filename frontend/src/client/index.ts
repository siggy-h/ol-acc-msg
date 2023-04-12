import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const URL = "http://localhost:4000/graphql?";

export const client = new ApolloClient({
    uri: URL,
    cache: new InMemoryCache(),
});

/** QUERIES  */

export const GET_INTERACTIONS = gql`
    query {
        interactions {
            id
            title
            customer {
                name
                email
            }
        }
    }
`;

export const GET_AGENTS = gql`
    query {
        agents {
            id
            name
            email
        }
    }
`;

export const GET_A_INTERACTION = gql`
    query ($id: ID!) {
        interaction(id: $id) {
            id
            customer {
                name
            }
            messages {
                id
                content
                agent {
                    name
                }
            }
            notes {
                id
                content
                agent {
                    name
                }
            }
        }
    }
`;

export const ADD_CUSTOMER_RESPONSE = gql`
    mutation ($interactionId: ID!, $content: String!, $agentId: ID!) {
        createMessage(
            interactionId: $interactionId
            content: $content
            agentId: $agentId
        ) {
            id
            content
            agent {
                id
                name
            }
        }
    }
`;

export const ADD_NOTE = gql`
    mutation ($interactionId: ID!, $content: String!, $agentId: ID!) {
        createNote(
            interactionId: $interactionId
            content: $content
            agentId: $agentId
        ) {
            id
            content
            agent {
                id
                name
            }
        }
    }
`;
