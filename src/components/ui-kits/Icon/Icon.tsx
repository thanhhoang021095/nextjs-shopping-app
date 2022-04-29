import React from "react";
import { StyledIcon } from "./Icon.styled";

interface IconProps {
    img: string;
    width?: string;
    height?: string;
    iconStyle?: string;
}

const Icon:React.FC<IconProps> = ({ 
    img = "", 
    width = "100%", 
    height = "100%", 
    iconStyle = "", 
}):JSX.Element => {
    return (
        <StyledIcon src={img} width={width} height={height} customStyle={iconStyle} />
    )
}

export default Icon;