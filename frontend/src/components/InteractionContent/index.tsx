import React from "react";
import { AppContext } from "../../context";
import { useQuery } from "@apollo/client";
import { GET_A_INTERACTION } from "../../client";
import { AnInteractionResponse } from "../../client/types";
import Messages from "./Messages";
import Notes from "./Notes";

const InteractionContent = () => {
    const { selectedId } = React.useContext(AppContext);

    const { loading, error, data } = useQuery<AnInteractionResponse>(
        GET_A_INTERACTION,
        {
            variables: { id: selectedId },
        }
    );

    if (loading) return <p aria-live="polite">Loading interaction </p>;

    if (!!error)
        return <p aria-live="polite">Error, unable to load interaction </p>;

    return (
        <main className="flex h-full" aria-live="polite">
            {data && (
                <>
                    <Messages messages={data.interaction.messages} />
                    <Notes notes={data.interaction.notes} />
                </>
            )}
        </main>
    );
};

export default InteractionContent;
