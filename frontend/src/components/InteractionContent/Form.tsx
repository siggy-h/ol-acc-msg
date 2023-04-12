import React from "react";

interface Props {
    onSubmit: (content: string) => void;
    title: string;
    /** cta - Call to Action, the form's submit button text */
    cta: string;
    /** if true, will to disable submit button */
    loading: boolean;
}
const MAX_CHARS = 280;

export const Form = ({ onSubmit, title, cta, loading }: Props) => {
    const [content, setContent] = React.useState("");
    const [validationError, setValidationError] = React.useState("");
    const inputRef = React.createRef<HTMLTextAreaElement>();

    const errorMessage = {
        limitMaxChar: `Input ${MAX_CHARS} character limit reached`,
        empty: `${title} input cannot be empty`,
    };

    const isValid = (text: string) => {
        if (text.length < 1) {
            setValidationError(errorMessage["empty"]);
            inputRef.current?.focus();
            return false;
        }
        if (text.length === MAX_CHARS) {
            setValidationError(errorMessage["limitMaxChar"]);
            inputRef.current?.focus();
            return false;
        }
        setValidationError("");
        return true;
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setContent(text);
        isValid(text.trim());
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (isValid(content)) {
            onSubmit(content.trim());
            setContent("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-none flex-col">
            <label htmlFor={`${title}-input`} className="sr-only">
                <span className="font-bold">{title}</span>
            </label>
            <textarea
                id={`${title}-input`}
                ref={inputRef}
                className={`p-1 my-1 grow bg-neutral-100 border-2 hover:border-sky-500 active:border-sky-500
                border-neutral-200 rounded 
                ${validationError.length > 0 ? "border-rose-600" : ""}
                `}
                onChange={handleOnChange}
                value={content}
                maxLength={MAX_CHARS}
                rows={4}
            ></textarea>
            <div
                className="h-5 text-xs text-rose-600 italic"
                aria-live="polite"
            >
                {validationError ? validationError : ""}
            </div>
            <button
                type="submit"
                className={`py-2 rounded w-1/2 bg-sky-200
                 hover:bg-sky-300 focus:bg-sky-300 self-end	disabled:bg-neutral-200`}
                disabled={!!validationError.length || loading}
            >
                {cta}
            </button>
        </form>
    );
};
