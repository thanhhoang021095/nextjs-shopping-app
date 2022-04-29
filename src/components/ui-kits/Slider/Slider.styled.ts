import styled from 'styled-components'

export const StyledSliderContainer = styled.div` 
    width: ${props => props.sliderWidth};
    height: ${props => props.sliderHeight};
    position: relative;
`

export const StyledImageOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    background: linear-gradient(180deg, rgba(255,255,255, 0.1), rgba(0,0,0, 0.9));
    z-index: 1;
`

export const StyledQuoteContainer = styled.div`
    border: 2px dashed #f9ca24;
    position: absolute;
    width: 500px;
    height: 190px;
    bottom: 50px;
    left: 30px;
    margin: auto 0;
    z-index: 2;
    padding: 0 20px;
`

export const StyledQuoteContent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

export const StyledQuoteSymbol = styled.span`
    font-size: 4rem;
    color: #fff;
    left: 20px;
    position: absolute;
    top: 12px;
`

export const StyledQuoteAuthor = styled.span`
    color: white;
    font-family: "Lato", sans-serif;
    font-size: 1rem;
    position: absolute;
    top: 28px;
    left: 80px; 
`

export const StyledQuoteBlockQuote = styled.blockquote`
    color: white;
    font-family: "Lato", sans-serif;
    font-size: 1.5rem;
    position: absolute;
    line-height: 1.6;
    top: 60px;
    left: 20px;
`

export const StyledQuoteDivider = styled.hr`
    position: absolute;
    ${props => props.dividerStyle}
`

export const StyledSliderImage = styled.img``