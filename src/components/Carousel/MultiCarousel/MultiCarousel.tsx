import React, { useEffect, useState } from 'react'
import styles from './MultiCarousel.module.scss'
import IProduct from 'src/interfaces/product';
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

interface MultiCarouselProps {
  data: any;
  renderProps: any;
  deviceType?: string;
}

const MultiCarousel: React.FC<MultiCarouselProps> = ({ data = [], renderProps, deviceType = "desktop" }): JSX.Element => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1300 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1300, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 501 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 501, min: 0 },
      items: 1,
    }
  };
  return (
    <div className={styles['multi-carousel-container']}>
      <Carousel
        ssr
        partialVisible
        itemClass={styles['multi-carousel-container__item']}
        deviceType={deviceType}
        keyBoardControl
        responsive={responsive}
      >
        {data.map((item, idx) => (
          <div key={item._id} style={{ height: "100%" }}>
            {renderProps(item, idx)}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MultiCarousel;