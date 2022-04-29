import React from "react";
import { StyledIcon, StyledIconButton } from "./IconButton.styled";

interface IconButtonProps {
    img: string;
    width?: string;
    height?: string;
    imageStyle?: string;
    handleClick?: (e?: React.MouseEvent<HTMLElement>) => void;
    handleHoverIn?: (e?: React.MouseEvent<HTMLElement>) => void;
    handleHoverOut?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const IconButton:React.FC<IconButtonProps> = ({ 
    img = "", 
    width = "100%", 
    height = "100%", 
    imageStyle = "", 
    handleClick = () => {}, 
    handleHoverIn = () => {}, 
    handleHoverOut = () => {}, 
}):JSX.Element => {
    return (
       <StyledIconButton onClick={handleClick} onMouseEnter={(e) => handleHoverIn(e)} onMouseLeave={(e) => handleHoverOut(e)}>
        <StyledIcon src={img} width={width} height={height} customStyle={imageStyle} />
       </StyledIconButton> 
    )
}

export default IconButton;