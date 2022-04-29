import React, { useEffect, useState } from 'react'
import styles from './MultiCarousel.module.scss'
import IProduct from 'src/interfaces/product';
import Carousel from "react-multi-carousel";
import ButtonGroup from "./ButtonGroup";
import "react-multi-carousel/lib/styles.css";

interface MultiCarouselProps {
  data: any;
  renderProps: any;
  deviceType?: string;
}

const MultiCarousel: React.FC<MultiCarouselProps> = ({ data = [], renderProps, deviceType = "desktop" }): JSX.Element => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1550 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1550, min: 1124 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1124, min: 500 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    }
  };
  return (
    <div className={styles['multi-carousel-container']}>
      <Carousel
        ssr
        partialVisible
        itemClass="image-item"
        deviceType={deviceType}
        responsive={responsive}
      >
        {data.map((item) => (
          <div key={item.id} style={{ height: "100%" }}>
            {renderProps(item)}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MultiCarousel;