import React from 'react'
import { formatCurrency } from "src/utils/common";
import CustomRating from '../Rating/Rating';
import styles from './Card.module.scss'

interface CardContentProps {
    finalPrice: number,
    price?: number,
    rating?: number,
    buttonGroups?: any,
    inStock?: boolean,
}
  
const CardContent: React.FC<CardContentProps> = ({ finalPrice, price, rating, buttonGroups, inStock }):JSX.Element => {
    return (
        <div className={styles['card-content']}>
            <div className={styles['card-content__item']}>
                <div className={styles['card-content__item--price']}>
                    { price !== finalPrice &&
                        <div className={styles['card-old-price']}>{formatCurrency(price)}</div>
                    }
                    <div className={styles['card-new-price']}>{formatCurrency(finalPrice)}</div>
                </div>
            </div>
            <div className={styles['card-content__item']}>
                Status: {inStock ? "still in stock" : "out of stock"}
            </div>
            <div className={styles['card-content__item']}>
                <div className={styles['card-content__item--rating']}>
                    <CustomRating ratingVal={rating} />
                </div>
            </div>
            <div className={styles['card-content__item']}>
                {buttonGroups && <div className={styles['card-content__item--btn']}>{buttonGroups}</div>}
            </div>
        </div>
    )
}

export default CardContent;
  