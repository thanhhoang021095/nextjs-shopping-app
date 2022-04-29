import styled from 'styled-components'

export const StyledInputContainer = styled.span`
  position: relative;
  display: inline-block;
  margin: 10px;
  box-sizing: border-box;
`

export const StyledInput = styled.input`
  position: relative;
  display: inline-block;
  min-width: 250px;
  padding: 10px 0 10px 15px;
  font-family: "Open Sans", sans;
  font-weight: 400;
  color: #000;
  background: #efefef;
  border: 0;
  border-radius: 3px;
  outline: 0;
  transition: all 0.3s ease-in-out;
  ${props => props.textIndent}

  &::-webkit-input-placeholder {
      color: #efefef;
      text-indent: 0;
      font-weight: 300;
  }

  &:focus, &:active {
    color: #ffaf40;
    text-indent: 0;
    background: #fff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &::-webkit-input-placeholder {
        color: #aaa;
    }
    + label {
      color: #fff;
      text-shadow: 0 1px 0 rgba(19, 74, 70, 0.4);
      transform: translateX(-100%);

      &:after {
          transform: translate(100%);
      }
    }
  }
`

export const StyledLabel = styled.label`
  display: inline-block;
  position: absolute;
  transform: translateX(0);
  white-space: nowrap;
  box-sizing: border-box;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 13px 15px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #000;
  text-align: left;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease-in-out, color 0.3s ease-out;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  overflow: hidden;

  &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 100%;
      bottom: 0;
      width: 100%;
      background: rgba(255, 175, 64, 0.8);
      z-index: -1;
      transform: translate(0);
      transition: all 0.3s ease-in-out;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
  }
`