import React from "react";
import styles from "./MultiCarousel.module.scss";
import classNames from "classnames";

interface ButtonGroupProps {
  next?: any;
  previous?: any;
}

const ButtonGroup:React.FC<ButtonGroupProps> = ({ next, previous }):JSX.Element => {
    return (
      <div className={styles["carousel-button-group"]}>
        <button 
          className={classNames(styles['carousel-button-group__left-arrow'])} 
          onClick={() => previous()}
        >
          <i className="fas fa-chevron-left" aria-hidden></i>
        </button>
        <button 
          className={styles['carousel-button-group__right-arrow']} 
          onClick={() => next()}
        >
            <i className="fas fa-chevron-right" aria-hidden></i>
        </button>
      </div>
    );
};

export default ButtonGroup;