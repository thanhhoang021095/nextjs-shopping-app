import React from 'react'
import styles from './Tab.module.scss'
import IProduct from 'src/interfaces/product'
import parse from 'html-react-parser';

interface DescriptionTabProps {
    desc: IProduct['description'];
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ desc = "" }): JSX.Element => {
   return (
       <div className={styles['tab-container']}>
           {desc.length ? parse(desc) : 'No description'}
       </div>
   )
}

export default DescriptionTab;