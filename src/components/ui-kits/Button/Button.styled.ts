import styled from 'styled-components'

export const StyledButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width};
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: none;
  font-size: 1rem;
  line-height: 1.5;
  z-index: 1;
  color: #000;
  transition: color 0.2s ease-in-out, background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  outline: none;

  ${props => props.outLine === "none" ?
    `background : transparent`
    :
    'box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
  };
  
  ${props => props.customStyle};

  &:hover {
    color: #f9ca24;
  }

  &:not(:disabled):not(.disabled) {
    cursor: pointer;
  }

  ${props => props.outLine !== "none" &&
    `&:after {
      position: absolute;
      content: "";
      width: 100%;
      height: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      background-color: rgba(0, 0, 0, 1);
      transition: all 0.3s ease;
    }`
  }

  &:hover:after {
    height: 100%;
`

export const StyledQuantityButtonGroup = styled.div`
    display: flex;
    jusify-content: space-around;
    align-items: center;
`

export const StyledQuantityButtonValue = styled.span`
    padding: 0 1rem;
    font-size: 1rem;
    font-weight: bold;
`