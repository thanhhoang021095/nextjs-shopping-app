import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Toolbox } from './ToolBox'
import styles from './Header.module.scss'
import { MegaMenu } from './MegaMenu'
import { Row, Col } from 'antd';
import { Image } from '../ui-kits/CustomImage'
import Link from 'next/link'
import classNames from 'classnames'
import { ISubCategory } from 'src/interfaces/collection'
import { useMediaQuery } from 'react-responsive'

interface HeaderProps {
  cart?: any;
  userInfo?: any;
  subCategory: ISubCategory[];
}

const Header: React.FC<HeaderProps> = ({ subCategory = [] }): JSX.Element => {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryRefWidth, setCategoryRefWidth] = useState(0);
  const isDesktopDevice = useMediaQuery({ query: '(max-width: 1200px)' })
  const categoryRef = useRef(null);
  
  useEffect(() => {
    setCategoryList(subCategory.filter(category => category.show_type === "header"));
  }, [subCategory]);

  useEffect(() => {
    getWidthCategory();
    window.addEventListener('resize', getWidthCategory);

    return () => {
      window.removeEventListener('resize', getWidthCategory);
    }
  }, [])

  const getWidthCategory = (): void => {
    categoryRef?.current && setCategoryRefWidth(state => categoryRef.current.clientWidth);
  }

  return (
    <div className={styles["header"]}>
      <Row className={styles["header-container"]} justify="space-between" gutter={8}>
        <Col xxl={4} xl={2} lg={2} md={2} sm={2} className={styles["header-container__item"]}>
          <Link href="/">
            <div className={styles["header-container__item--logo"]}>
              <Image
                src="/images/logo/logo.png"
                width="120"
                height="40"
                alt="logo"
                style={{
                  width: isDesktopDevice ? "250px" : "100%",
                  height: isDesktopDevice ? "100px" : "100%",
                }}
              />
            </div>
          </Link>
        </Col>

        <Col
          xxl={14}
          xl={16}
          lg={16}
          md={17}
          sm={14}
          style={{
            justifyContent: "end",
          }}
          className={classNames(
            styles["header-container__item"],
          )}
        >
          <Row
            className={styles["header-category"]}
            gutter={4}
            justify="space-between"
            ref={categoryRef}
          >
            <Col
              xxl={4} xl={4} lg={4} md={3} sm={3}
              className={styles["header-category__item"]}
            >
              <MegaMenu />
            </Col>
            {categoryList.length && categoryList.map((item, idx) => (
              <Col
                xxl={item.name == "Bags & Handbags" ? 5 : 3} 
                xl={item.name == "Bags & Handbags" ? 5 : 3} 
                lg={item.name == "Bags & Handbags" ? 5 : 3} 
                md={item.name == "Bags & Handbags" ? 6 : 3} 
                sm={item.name == "Bags & Handbags" ? 6 : 3}
                key={item._id}
                className={styles["header-category__item"]}
              >
                <Link href={`/sub-category/${item.id}`}>
                  <p className={styles["header-category__item--text"]}>{item.name}</p>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xxl={6} xl={6} lg={4} md={5} sm={8} className={styles["header-container__item"]}>
          <Toolbox
            categoryWidth={categoryRefWidth}
          />
        </Col>
      </Row >
    </div >
  )
}

const mapStateToProps = (state) => ({
  cart: state.storage.cart,
  userInfo: state.storage.userInfo,
  subCategory: state.storage.subCategory,
})

export default connect(mapStateToProps, {})(Header)