import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import { 
  StyledSliderContainer,
  StyledImageOverlay, 
  StyledSliderImage,
  StyledQuoteContainer,
  StyledQuoteContent,
  StyledQuoteSymbol,
  StyledQuoteAuthor,
  StyledQuoteBlockQuote,
  StyledQuoteDivider,
} from './Slider.styled'
import styles from './Slider.module.scss'

interface CarouselProps {
    imagesArr: string[];
}

const Slider:React.FC<CarouselProps> = ({imagesArr}):JSX.Element => {
    return (
        <div className={styles['slider-container']}>
            <div className={styles['slider-container__overlay']}></div>
            <StyledImageOverlay />
            {/* <StyledQuoteContainer>
              <StyledQuoteContent>
              <StyledQuoteSymbol> ❛❛ </StyledQuoteSymbol> 
              <StyledQuoteDivider dividerStyle="top: 50px; width: 80%; left: 75px;" />
              <StyledQuoteAuthor>Lewis Hamilton</StyledQuoteAuthor>
              <StyledQuoteBlockQuote>The way I drive, the way I handle a car, is an expression of my inner feelings.</StyledQuoteBlockQuote>
              <StyledQuoteDivider dividerStyle="top: 150px; width: 90%; left: 20px;" />
              </StyledQuoteContent>
            </StyledQuoteContainer> */}
            <Carousel className={styles['slider-container__carousel']}>
                {imagesArr.length && imagesArr.map((img, idx) => (
                  <img className={styles['slider-container__image']} key={idx} src={img} alt=""  width="100%" height="100%" />
                ))}
            </Carousel>
        </div>
    )
}

export default Slider;