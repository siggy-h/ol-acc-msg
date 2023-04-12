import React from "react";
import { Message } from "../../types";

interface Props {
    message: Message;
}
const MessageCard = ({ message }: Props) => {
    const cardBg = `${
        message?.agent?.name
            ? " bg-neutral-100 border-neutral-200"
            : " bg-sky-100 border-sky-300"
    }`;

    return (
        <li className={` mb-4 rounded p-3 ${cardBg} border mr-2`}>
            <span className="sr-only">
                {message?.agent?.name
                    ? `Agent ${message?.agent?.name}, `
                    : "Customer, "}
            </span>
            <div className="flex max-w-prose">{message.content}</div>
            {message?.agent?.name && (
                <div className="italic font-semibold pt-2" aria-hidden={true}>
                    {message?.agent?.name}
                </div>
            )}
        </li>
    );
};

export default MessageCard;
