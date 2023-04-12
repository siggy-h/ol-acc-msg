import React from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { AppContext } from "../../context";
import { ADD_CUSTOMER_RESPONSE, GET_A_INTERACTION } from "../../client";
import { AnInteractionResponse } from "../../client/types";

import Heading from "../Heading";
import { Form } from "./Form";
import MessageCard from "./MessageCard";
import { Message } from "../../types";

interface Props {
    messages: Message[];
}

const Messages = ({ messages }: Props) => {
    const { selectedId, agent } = React.useContext(AppContext);

    const [addMessage, { loading }] = useMutation(ADD_CUSTOMER_RESPONSE, {
        update(cache, { data: { createMessage } }) {
            const result = cache.readQuery<AnInteractionResponse>({
                query: GET_A_INTERACTION,
                variables: { id: selectedId },
            });
            if (result) {
                cache.writeQuery({
                    query: GET_A_INTERACTION,
                    data: {
                        interaction: {
                            ...result.interaction,
                            messages: [
                                ...result.interaction.messages,
                                { ...createMessage, agent: { agent } },
                            ],
                        },
                    },
                });
            }
        },
        onCompleted() {
            toast("Success: Added customer reply", { type: "success" });
        },
        onError() {
            toast("Error: Failed to add customer reply", { type: "error" });
        },
    });

    const handleAddMessage = (content: string) => {
        addMessage({
            variables: {
                interactionId: selectedId,
                content,
                agentId: agent?.id,
            },
        });
    };

    return (
        <div className="flex flex-col grow mr-4 w-2/3">
            <Heading id="message-heading" type="h2" defaultStyle="pb-2">
                Messages
            </Heading>

            <ul
                className="flex flex-col grow overflow-auto mb-4 h-2/3"
                /** Adding tabIndex & a label to non-interactive element because it
                 * could be scrollable with a long list. */
                // eslint-disable-next-line
                tabIndex={0}
                aria-labelledby="message-heading"
            >
                {messages.map((m) => (
                    <MessageCard key={m.id} message={m} />
                ))}
            </ul>
            <div className="grow-0">
                <Form
                    onSubmit={handleAddMessage}
                    title="Reply to customer"
                    cta="Reply to customer"
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Messages;
