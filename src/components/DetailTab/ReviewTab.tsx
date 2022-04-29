import React from 'react'
import styles from './Tab.module.scss'
import IProduct from 'src/interfaces/product';

interface ReviewTabProps {
    reviews: IProduct['reviews'];
}

const ReviewTab: React.FC<ReviewTabProps> = ({ reviews = [] }): JSX.Element => {

    const formatDate = (date: any):string => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('/');
    }
     
    return (
        <div className={styles['tab-container']}>
            <table className={styles['tab-container__table']}>
                {reviews.length && reviews.map((review, idx) => (
                    <React.Fragment key={idx}>
                        <thead>
                            <tr>
                                <th className={styles['tab-container__table--head']}>{review.author}</th>
                                <th className={styles['tab-container__table--date']}>{formatDate(review.date)}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2} className={styles['tab-container__table--data']}>
                                    {review.comment}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot></tfoot>
                    </React.Fragment>
                ))}
            </table>
        </div>
    )
}

export default ReviewTab;