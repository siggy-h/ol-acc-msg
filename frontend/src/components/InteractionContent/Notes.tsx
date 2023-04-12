import { useMutation } from "@apollo/client";
import React from "react";
import { toast } from "react-toastify";
import { ADD_NOTE, GET_A_INTERACTION } from "../../client";
import { AnInteractionResponse } from "../../client/types";
import { AppContext } from "../../context";
import { Note } from "../../types";
import Heading from "../Heading";
import { Form } from "./Form";

interface Props {
    notes: Note[];
}

const Notes = ({ notes }: Props) => {
    const { selectedId, agent } = React.useContext(AppContext);

    const [addNote, { loading }] = useMutation(ADD_NOTE, {
        update(cache, { data: { createNote } }) {
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
                            notes: [
                                ...result.interaction.notes,
                                { ...createNote, agent: { agent } },
                            ],
                        },
                    },
                });
            }
        },
        onCompleted() {
            toast("Success: Added note", { type: "success" });
        },
        onError() {
            toast("Error: Failed to add note", { type: "error" });
        },
    });

    const handleAddNote = (content: string) => {
        addNote({
            variables: {
                interactionId: selectedId,
                content,
                agentId: agent?.id,
            },
        });
    };

    return (
        <div className="pl-4 flex flex-col w-1/3">
            <Heading id="notes" type="h2" defaultStyle="pb-2 grow-0">
                Notes
            </Heading>
            <ul
                className="flex flex-col grow overflow-auto mb-4"
                /** Adding tabIndex & a label to non-interactive element because it
                 * could be scrollable with a long list. */
                // eslint-disable-next-line
                tabIndex={0}
                aria-labelledby="notes"
            >
                {notes.map((note) => (
                    <li
                        key={note.id}
                        className={`mb-4 rounded p-3 bg-amber-100 
                        max-w-prose mr-2 border border-amber-300`}
                    >
                        <div className="flex max-w-prose">{note.content}</div>
                        {note?.agent?.name && (
                            <div className="italic font-semibold pt-2">
                                <span className="sr-only">{`- agent `}</span>
                                {note?.agent?.name}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="grow-0">
                <Form
                    onSubmit={handleAddNote}
                    title="Add Note"
                    cta="Add note"
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Notes;
