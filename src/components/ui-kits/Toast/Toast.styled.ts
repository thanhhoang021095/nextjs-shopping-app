import styled from 'styled-components'

const slideInKeyframe = `
  @-webkit-keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
`

const slideOutKeyframe = `
  @-webkit-keyframes slide-out-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
  }
  @keyframes slide-out-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
  }
`

const handleColorType = (type:string):{
  hex: string;
  rgb: string;
} => {
  switch (type) {
    case "warning":
      return {
        hex: "#f1c40f",
        rgb: "rgba(39, 174, 96, 0.5)"
      }
    case "error":
      return {
        hex: "#e74c3c",
        rgb: "rgb(231, 76, 60, 0.5)"
      }
    case "success":
      return {
        hex: "#27ae60",
        rgb: "rgb(39, 174, 96, 0.5)"
      }
    default:
      return {
        hex: "#fff",
        rgb: "transparent"
      }
  }
};

const handleAnimation = (isShow:boolean):string => {
  return isShow ? slideInKeyframe : slideOutKeyframe;
}

export const StyledToastContainer = styled.div`
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 999;
  border-radius: 10px;
  display: flex;
  padding: 1.5rem 2rem;
  min-height: 40px;
  min-width: 200px;
  width: fit-content;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  background-color: ${({type}) => handleColorType(type)["hex"]};
  box-shadow: 0 0 18px 4px rgb(61, 61, 61, 0.3);

  -webkit-animation: ${({isShow}) => isShow ? "slide-in-right" : "slide-out-right"} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: ${({isShow}) => isShow ? "slide-in-right" : "slide-out-right"} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  ${({ isShow }) => handleAnimation(isShow)}
`

export const StyledToastContent = styled.span`
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`
