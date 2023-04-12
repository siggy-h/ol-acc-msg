export type Interaction = {
    id: Id;
    title: string;
    customer: Customer;
    messages: [Message];
    notes: [Note];
};

type Customer = {
    id: Id;
    name: string;
    email: string;
};

export type Message = {
    id: Id;
    content: string;
    agent?: Agent;
};

export type Note = {
    id: Id;
    agent: Agent;
    content: string;
};

export type Agent = {
    id: Id;
    name?: string;
    email?: string;
};

export type Id = string;
