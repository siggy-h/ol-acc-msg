import { useQuery } from "@apollo/client";
import React from "react";
import { GET_INTERACTIONS } from "../../client";
import { InteractionsResponse } from "../../client/types";
import { AppContext } from "../../context";
import { Id } from "../../types";
import Heading from "../Heading";
import InteractionsButton from "./interactionButton";

interface Props {
    onSelect: (id: Id) => void;
    selectedId?: Id;
}

const Interactions = ({ onSelect }: Props) => {
    const { selectedId } = React.useContext(AppContext);
    const { loading, error, data } =
        useQuery<InteractionsResponse>(GET_INTERACTIONS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <nav
            aria-labelledby="interactions"
            className="border-r pt-4 flex-none w-2/12 min-w-min"
        >
            <Heading
                type="h2"
                defaultStyle="text-center pb-2"
                id="interactions"
            >
                Interactions
            </Heading>
            {data && (
                <ul>
                    {data.interactions.map((i) => (
                        <li
                            key={i.id}
                            className="flex border-t border-sky-300 last:border-b"
                        >
                            <InteractionsButton
                                interaction={i}
                                onSelect={onSelect}
                                selectedId={selectedId}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Interactions;
