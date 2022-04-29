import React from 'react'
import styles from './MenuIcon.module.scss'

const MenuIcon = ():JSX.Element => {
    return (
        <div className={styles['menu-icon']}>
            <div className={styles['menu-icon__elm']}></div>
            <div className={styles['menu-icon__elm']}></div>
            <div className={styles['menu-icon__elm']}></div>
        </div>
    )
}

export default MenuIcon