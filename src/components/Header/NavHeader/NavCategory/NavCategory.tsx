import React, { useState, useEffect, useRef } from 'react'
import styles from './NavCategory.module.scss'
import Link from 'next/link'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { ISubCategory, ICategory } from 'src/interfaces/collection'
import { useRouter } from 'next/router'
import { CSSTransition } from 'react-transition-group'

interface SubCategoryLinkProps {
    item: ISubCategory;
    isCollapsed: boolean;
}

interface SubCategoryItemProps {
    list: ISubCategory[];
    id: number;
    title: string;
    isCollapsed: boolean;
}
interface NavCategoryProps {
    subCategory: ISubCategory[];
    category: ICategory[];
}

const SubCategoryLink: React.FC<SubCategoryLinkProps> = ({ item, isCollapsed }): JSX.Element => {
    return (
        <Link href={`/sub-category/${item.id}`}>
            <CSSTransition
                in={isCollapsed}
                timeout={700}
                classNames="swing-menu-animate"
                unmountOnExit
            >
                <p
                    key={item.id}
                    className={classNames(styles["clothing-item"], styles["sub-list"], styles["nav-item-link"])}
                >
                    {item.name}
                </p>
            </CSSTransition>
        </Link>
    )
}

const SubCategoryItem: React.FC<SubCategoryItemProps> = ({ list, id, title, isCollapsed }): JSX.Element => {
    return (
        <>
            <Link href={`/category/${id}`}>
                <CSSTransition
                    in={isCollapsed}
                    timeout={300}
                    classNames="swing-menu-animate"
                    unmountOnExit
                >
                    <div className={classNames(styles["clothing-item"], styles["nav-item-link"])}>
                        {title}
                    </div>
                </CSSTransition>

            </Link>
            {list.map((item) => (
                <SubCategoryLink
                    item={item}
                    key={item.id}
                    isCollapsed={isCollapsed}
                />
            ))}
        </>
    )
}

const NavCategory: React.FC<NavCategoryProps> = ({ subCategory = [], category = [] }): JSX.Element => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const router = useRouter();
    const collapseBtnElm = useRef(null);

    useEffect(() => {
        setCategoryList(subCategory.filter(category => category.show_type === "header"));
    }, [subCategory]);

    const handleCollapse = (isCollapsed: boolean): void => {
        setIsCollapsed(!isCollapsed)
    }

    const handleSubmitClothingCategory = (e: React.MouseEvent<HTMLElement>): void => {
        collapseBtnElm && !collapseBtnElm.current.contains(e.target) && router.push("/category/0");
    }

    return (
        <>
            <div className={styles["nav-category-collapse"]}>
                <div
                    className={classNames(styles["nav-collapse"], styles["nav-item-link"])}
                    onClick={handleSubmitClothingCategory}
                >
                    <p className={styles["nav-collapse__title"]}>Clothing</p>
                    <button
                        className={styles["nav-collapse__button"]}
                        onClick={() => handleCollapse(isCollapsed)}
                        ref={collapseBtnElm}
                    >
                        {
                            isCollapsed ?
                                <i aria-hidden className="fas fa-chevron-up"></i>
                                :
                                <i aria-hidden className="fas fa-chevron-down"></i>
                        }
                    </button>

                </div>
                <ul className={styles["clothing-list"]}>
                    {category?.length && category.map((subList) => (
                        <SubCategoryItem
                            key={subList._id}
                            list={subList.subCategory}
                            id={subList.id}
                            title={subList.name}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </ul>
            </div>
            {categoryList.length && categoryList.map((item) => (
                <Link
                    href={`/sub-category/${item.id}`}
                    key={item._id}
                >
                    <div className={classNames(styles["nav-category-item"], styles["nav-item-link"])}>
                        {item.name}
                    </div>
                </Link>
            ))}
        </>
    )
}

const mapStateToProps = (state) => ({
    subCategory: state.storage.subCategory,
    category: state.storage.category,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(NavCategory);