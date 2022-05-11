import React from "react";

interface IconProps {
    width: string;
    height: string;
    style?: Record<string, any>;
    source: any;
}

const Icon: React.FC<IconProps> = ({
    width = "100%",
    height = "100%",
    source,
    style = {}
}): JSX.Element => {
    return (
        <img
            src={source}
            style={{
                width,
                height,
                ...style
            }}
        />
    )
}

export default Icon;