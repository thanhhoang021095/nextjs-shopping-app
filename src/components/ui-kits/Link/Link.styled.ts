import styled from 'styled-components'

export const StyledLink = styled.a`
    text-decoration: none;
    color: #fff;
    cursor: pointer;

    ${props => props.customStyle};

    &:hover {
        color: #f9ca24;
    };
      
    &:after {
        content: '';
        display: block;
        margin: auto;
        margin-top: 2px;
        height: 3px;
        width: 0px;
        background: #f9ca24;
        transition: width .5s ease, background-color .5s ease;
    };

    &:hover:after {
        width: 100%;
    }
`