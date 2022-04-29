import React, { useEffect, useState } from 'react'
import styles from './SingleCarousel.module.scss'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import classNames from 'classnames'

interface SingleCarouselProps {
    children: any;
}

const PreviousButton = ({ prev }):JSX.Element => {
    return (
        <div
            className={classNames(styles['handler-button'], styles['prev-button'])}
            onClick={() => prev()}
        >
            <i className="fas fa-chevron-left" aria-hidden></i>
        </div>
    )
}

const NextButton = ({ next }):JSX.Element => {
    return (
        <div
            className={classNames(styles['handler-button'], styles['next-button'])}
            onClick={() => next()}
        >
           <i className="fas fa-chevron-right" aria-hidden></i>
        </div>
    )
}

const SingleCarousel: React.FC<SingleCarouselProps> = ({ children }): JSX.Element => {

    return (
        <div className={styles['single-carousel-container']}>
            <Carousel
                className={styles['single-carousel-container__root']}
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                renderArrowPrev={(prev) => {
                    return (
                        <PreviousButton prev={prev} />
                    )
                }}
                renderArrowNext={(next) => {
                    return (
                        <NextButton next={next} />
                    )
                }}
            >
                {children}
            </Carousel>
        </div>
    )
}

export default SingleCarousel;