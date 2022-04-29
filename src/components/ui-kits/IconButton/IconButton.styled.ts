import styled from "styled-components";

export const StyledIconButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 2px;
`

export const StyledIcon = styled.img`
    ${props => props.customStyle}
`