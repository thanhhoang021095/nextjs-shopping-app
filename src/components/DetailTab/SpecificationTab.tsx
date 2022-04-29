import React from 'react'
import styles from './Tab.module.scss'

interface SpecificationTabProps {
    featuredBrand: string;
    material: string;
}

const SpecificationTab: React.FC<SpecificationTabProps> = ({ featuredBrand = "No Information", material = "No Information" }): JSX.Element => {
    return (
        <div className={styles['tab-container']}>
            <table className={styles['tab-container__table']}>
                <thead>
                    <tr>
                        <th colSpan={2} className={styles['tab-container__table--head']}>Product Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={styles['tab-container__table--data']}>Featured Brands</td>
                        <td className={styles['tab-container__table--data']}>{featuredBrand}</td>
                    </tr>
                    <tr>
                        <td className={styles['tab-container__table--data']}>Material</td>
                        <td className={styles['tab-container__table--data']}>{material}</td>
                    </tr>
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}

export default SpecificationTab;