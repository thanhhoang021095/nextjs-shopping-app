import React, { useState, useEffect } from 'react'
import styles from './NavCategory.module.scss'
import { womenShop, menShop, accessories } from '../../MegaMenu/CategoryItems'
import Link from 'next/link'
import classNames from 'classnames'
import endpoints from 'src/utils/endpoints'
import api from 'controllers/baseApi'

interface NavCategoryProps { }
interface WomenShopListProps { }
interface MenShopListProps { }
interface AccessoriesListProps { }

const WomenShopList: React.FC<WomenShopListProps> = (): JSX.Element => {
    return (
        <>
            <div className={classNames(styles["clothing-item"], styles["nav-item-link"])}>Women Shop's</div>
            {womenShop.map((item, idx) => (
                <Link href="/">
                    <li
                        key={idx}
                        className={classNames(styles["clothing-item"], styles["sub-list"], styles["nav-item-link"])}
                    >
                        {item.name}
                    </li>
                </Link>
            ))}
        </>
    )
}

const MenShopList: React.FC<MenShopListProps> = (): JSX.Element => {
    return (
        <>
            <div className={classNames(styles["clothing-item"], styles["nav-item-link"])}>Men Shop's</div>
            {menShop.map((item, idx) => (
                <li
                    key={idx}
                    className={classNames(styles["clothing-item"], styles["sub-list"], styles["nav-item-link"])}
                >
                    {item.name}
                </li>
            ))}
        </>
    )
}

const AccessoriesList: React.FC<AccessoriesListProps> = (): JSX.Element => {
    return (
        <>
            <div className={classNames(styles["clothing-item"], styles["nav-item-link"])}>Accessories</div>
            {accessories.map((item, idx) => (
                <li
                    key={idx}
                    className={classNames(styles["clothing-item"], styles["sub-list"], styles["nav-item-link"])}
                >
                    {item.name}
                </li>
            ))}
        </>
    )
}

const NavCategory: React.FC<NavCategoryProps> = (): JSX.Element => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapse = (isCollapsed: boolean): void => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <>
            <div className={styles["nav-category-collapse"]}>
                <Link href={`/category/0}`}>
                    <div className={classNames(styles["nav-collapse"], styles["nav-item-link"])}>
                        <p className={styles["nav-collapse__title"]}>Clothing</p>
                        <button
                            className={styles["nav-collapse__button"]}
                            onClick={() => handleCollapse(isCollapsed)}
                        >
                            {
                                isCollapsed ?
                                    <i aria-hidden className="fas fa-chevron-up"></i>
                                    :
                                    <i aria-hidden className="fas fa-chevron-down"></i>
                            }
                        </button>

                    </div>
                </Link>
                <ul className={styles["clothing-list"]}>
                    {isCollapsed &&
                        <>
                            <WomenShopList />
                            <MenShopList />
                            <AccessoriesList />
                        </>
                    }
                </ul>
            </div>
            <Link
                href="https://www.google.com/"
            >
                <div className={classNames(styles["nav-category-item"], styles["nav-item-link"])}>
                    Shoes
                </div>
            </Link>

        </>
    )
}

export default NavCategory