import React from "react";

const HeadingsSizeMap = {
    h1: "text-5xl",
    h2: "text-2xl",
    h3: "text-md",
} as const;

interface Props {
    type: keyof typeof HeadingsSizeMap;
    children: string;
    /** Additional custom styles to apply to H level tag */
    defaultStyle?: string;
    id?: string;
}

const Heading = ({ type, defaultStyle, id, children }: Props) => {
    const Tag = type;
    const size = `${HeadingsSizeMap[type]} font-medium ${defaultStyle}`;

    return (
        <Tag className={`${size} text-slate`} id={id}>
            {children}
        </Tag>
    );
};

export default Heading;
