import React from 'react';
import dynamic from 'next/dynamic'
import styles from './Card.module.scss'

interface CardProps {
  onClick?(e: any): void
  buttonGroups?: React.ReactNode
  imageURL: string
  productName?: string
}

const DynamicImageComp = dynamic(() => import('../CustomImage/CustomImage'));

const Card: React.FC<CardProps> = ({imageURL, children, productName=""}):JSX.Element => {
  // const [isHoverFavIcon, setIsHoverFavIcon] = useState(false);
  return (
    <div className={styles['card-container']}>
      <div className={styles['card-media']}>
        <div className={styles['card-media__image']}>
          <DynamicImageComp src={imageURL} isHasOverlay={true} />
        </div>
        <p className={styles['card-media__name']}>{productName}</p>
        {/* <StyledCardFav>
          <IconButton 
            img={`/images/icons/${isHoverFavIcon ? 'love-full' : 'love'}.svg`}
            width="20px" height="20px"
            imageStyle={`filter: invert(82%) sepia(35%) saturate(1384%) hue-rotate(326deg) brightness(101%) contrast(101%)`} 
          />
        </StyledCardFav> */}
      </div>
      <div className={styles['card-body']}>{children}</div>
    </div>
  )
}

export default Card
