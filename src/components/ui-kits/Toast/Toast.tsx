import React from 'react'
import { connect } from 'react-redux'
import { StyledToastContainer, StyledToastContent } from './Toast.styled'
interface ToastProps {
  toastInfo?: {
    message: string;
    type: string;
  };
}

const Toast: React.FC<ToastProps> = ({ toastInfo = {} }): JSX.Element => {
  const { message = "", type = "" } = toastInfo;
  
  return (
    message.length ?
    <StyledToastContainer type={type} isShow={message.length > 0}>
      <StyledToastContent>{message}</StyledToastContent>
    </StyledToastContainer>
    : <></>
  )
}

const mapStateToProps = (state) => ({
  toastInfo: state.storage.toastInfo,
})

export default connect(mapStateToProps,{})(Toast)
