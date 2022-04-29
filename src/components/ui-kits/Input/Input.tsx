import React, { useState, useEffect } from 'react'
import { 
    StyledInputContainer, 
    StyledInput,
    StyledLabel,
} from "./Input.styled"

interface InputProps {
    type: string;
    labelName: string;
    value: string;
    handleChange: (e?: any) => void,
}

const Input: React.FC<InputProps> = ({ type = "text", labelName = "", value = "", handleChange = () => {}}):JSX.Element => {
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        const width = document.getElementById(`label_${labelName}`).clientWidth;
        setLabelWidth(width);
    }, [])
    
    return (
        <StyledInputContainer>
            <StyledInput type={type} value={value} onChange={handleChange} textIndent={`text-indent: ${labelWidth}px;`}/>
            <StyledLabel  id={`label_${labelName}`}>{labelName}</StyledLabel>
        </StyledInputContainer>
    )
}
export default Input;