import React from "react";
import { Id, Interaction } from "../../types";

interface Props {
    interaction: Interaction;
    onSelect: (id: Id) => void;
    selectedId?: Id;
}

const InteractionsButton = ({ interaction, onSelect, selectedId }: Props) => {
    const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSelect(interaction.id);
    };
    return (
        <button
            onClick={handleSelect}
            aria-label={interaction.title}
            className={`flex flex-col
            text-left p-3 w-full
            ${selectedId === interaction.id ? " bg-sky-200" : ""}
             hover:bg-sky-300
             focus:bg-sky-300
            `}
        >
            <>
                <span id={interaction.title} className="font-semibold flex">
                    {interaction.title}
                </span>
                <span className="block">{interaction.customer.name}</span>
                <span className="block text-clip">
                    {interaction.customer.email}
                </span>
            </>
        </button>
    );
};

export default InteractionsButton;
