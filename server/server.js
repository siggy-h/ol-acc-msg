const express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const cors = require(`cors`);
const bodyParser = require("body-parser");

let data = {
    customers: [
        {
            id: "1",
            name: "Angela Martin",
            email: "angela@customeremail.com",
        },
        {
            id: "2",
            name: "Andy Bernard",
            email: "andy@customeremail.com",
        },
    ],
    agents: [
        {
            id: "3",
            name: "Creed Bratton",
            email: "creed@dundermifflin.com",
        },
        {
            id: "4",
            name: "Kevin Malone",
            email: "kevin@dundermifflin.com",
        },
    ],
    interactions: [
        {
            id: "1",
            title: "Want printer paper",
            customerId: "2",
            messages: [
                {
                    id: "10",
                    content: "Hi how are you",
                },
                {
                    id: "11",
                    agentId: "3",
                    content:
                        "Hi there, is there anything we can do for you today",
                },
                {
                    id: "12",
                    content: "Yes please I am looking to get printer paper",
                },
            ],
            notes: [
                {
                    id: "100",
                    agentId: "3",
                    content: "This customer wants to print something I am sure",
                },
            ],
        },
        {
            id: "2",
            customerId: "1",
            title: "Looking for business card paper",
            messages: [
                {
                    id: "20",
                    content: "Good morning, I need some help please",
                },
                {
                    id: "21",
                    agentId: "4",
                    content:
                        "Good morning. Sure, I can gladly help. How can I help you",
                },
                {
                    id: "22",
                    content:
                        "My business card paper order is running late, has it been shipped?",
                },
            ],
            notes: [
                {
                    id: "200",
                    agentId: "4",
                    content:
                        "I was going to interact with this customer but I am going to go have lunch",
                },
                {
                    id: "201",
                    agentId: "4",
                    content: "I am back from lunch, I can take it from here",
                },
            ],
        },
    ],
};

var schema = buildSchema(`
    type Customer {
        id: ID!
        name: String
        email: String
    }

    type Agent {
        id: ID!
        name: String
        email: String
    }

    type Interaction {
        id: ID!
        title: String
        customer: Customer
        messages: [Message]
        notes: [Note]
    }

    type Message {
        id: ID!
        content: String
        agent: Agent
    }

    type Note {
        id: ID!
        content: String
        agent: Agent
    }

    type Query {
        customers: [Customer]
        agents: [Agent]
        interactions: [Interaction]
        interaction(id: ID!): Interaction
    }

    type Mutation {
        createMessage(interactionId: ID!, content: String!, agentId: ID!): Message
        createNote(interactionId: ID!, content: String!, agentId: ID!): Note
    }
`);

// The root provides a resolver function for each API endpoint
var root = {
    customers: () => {
        return data.customers;
    },

    agents: () => {
        return data.agents;
    },

    interactions: () => {
        const interactions = data.interactions.map((interaction) => {
            const messages = interaction.messages.map((message) => {
                return {
                    ...message,
                    agent: data.agents.find(
                        (agent) => agent.id === message.agentId
                    ),
                };
            });
            return {
                ...interaction,
                messages,
                customer: data.customers.find(
                    (customer) => customer.id === interaction.customerId
                ),
            };
        });
        return interactions;
    },
    interaction: ({ id }) => {
        const interaction = data.interactions.find(
            (interaction) => interaction.id === id
        );
        if (interaction !== undefined) {
            const messages = interaction.messages.map((message) => {
                return {
                    ...message,
                    agent: data.agents.find(
                        (agent) => agent.id === message.agentId
                    ),
                };
            });
            const notes = interaction.notes.map((note) => {
                return {
                    ...note,
                    agent: data.agents.find(
                        (agent) => agent.id === note.agentId
                    ),
                };
            });
            return {
                ...interaction,
                messages,
                notes,
                customer: data.customers.find(
                    (customer) => customer.id === interaction.customerId
                ),
            };
        }
        return null;
    },
    createMessage: ({ interactionId, content, agentId }) => {
        const interaction = data.interactions.find(
            (interaction) => interaction.id === interactionId
        );

        if (interaction !== undefined) {
            const newMessageId = Math.floor(Math.random() * Math.floor(100000));
            const message = {
                id: `${newMessageId}`,
                content,
                agentId,
            };
            interaction.messages.push(message);
            return message;
        }
        return null;
    },
    createNote: ({ interactionId, content, agentId }) => {
        const interaction = data.interactions.find(
            (interaction) => interaction.id === interactionId
        );

        if (interaction !== undefined) {
            const newNoteId = Math.floor(Math.random() * Math.floor(100000));
            const note = {
                id: `${newNoteId}`,
                content,
                agentId,
            };
            interaction.notes.push(note);
            return note;
        }
        return null;
    },
};

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql ");
