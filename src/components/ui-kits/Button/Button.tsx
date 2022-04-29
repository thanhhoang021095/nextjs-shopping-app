import React, { useState, useEffect } from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'
interface ButtonProps {
  children: any;
  style?: any;
  isReverse?: boolean;
  handleClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  transitionWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  handleClick = () => { },
  style = {},
  isReverse = false,
  transitionWidth = false
}: ButtonProps): JSX.Element => {
  const [isHoverBtn, setIsHoverBtn] = useState(false);
  const isTransition = isHoverBtn && transitionWidth;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    mounted &&
    <button
      onClick={handleClick}
      onMouseEnter={() => {
        if (transitionWidth) setIsHoverBtn(true)
      }}
      onMouseLeave={() => {
        if (transitionWidth) setIsHoverBtn(false)
      }}
      style={{
        backgroundColor: transitionWidth ? "transparent" : "",
        color: transitionWidth ? (isTransition ? "#FFF" : "#000") : "",
        ...style,
      }}
      className={classNames(
        styles["button"], 
        {[styles["reverse-button"]]: isReverse}
      )}
    >
      {transitionWidth && <div
        style={{
          width: isHoverBtn ? "100%" : ""
        }}
        className={styles["overlay-button"]}></div>
      }
      <div className={classNames(
        styles["button__text"], 
        { [styles["reverse-button__text"]]: isReverse }
      )}>
        {children}
      </div>
    </button>
  )
}

export default Button
