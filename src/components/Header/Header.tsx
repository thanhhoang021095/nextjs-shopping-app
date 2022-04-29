import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Toolbox } from './ToolBox'
import styles from './Header.module.scss'
import { MegaMenu } from './MegaMenu'
import { Row, Col } from 'antd';
import { Image } from '../ui-kits/CustomImage'
import Link from 'next/link'
import endpoints from 'src/utils/endpoints'
import api from 'controllers/baseApi'
import classNames from 'classnames'
import { ISubCategory } from 'src/interfaces/collection'

interface HeaderProps {
  cart?: any;
  userInfo?: any;
  subCategory: ISubCategory[];
}

const Header: React.FC<HeaderProps> = ({ subCategory = [] }): JSX.Element => {
  
  const [categoryList, setCategoryList] = useState([]);
  const [categoryRefWidth, setCategoryRefWidth] = useState(0);
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
      <Row className={styles["header-container"]} justify="space-between">
        <Col xl={4} lg={2} md={2} sm={2} className={styles["header-container__item"]}>
          <Link href="/">
            <div className={styles["header-container__item--logo"]}>
              <Image
                src="/images/logo/logo.png"
                width="120"
                height="40"
                alt="logo"
              />
            </div>
          </Link>
        </Col>

        <Col
          xl={14}
          lg={16}
          md={16}
          sm={16}
          style={{
            justifyContent: "end",
          }}
          className={classNames(
            styles["header-container__item"],
          )}
        >
          <Row
            className={styles["header-category"]}
            gutter={8}
            justify="space-between"
            ref={categoryRef}
          >
            <Col
              offset={2}
              xl={2} lg={2} md={6} sm={6}
              className={styles["header-category__item"]}
            >
              <MegaMenu />
            </Col>
            {categoryList.length && categoryList.map((item, idx) => (
              <Col
                xl={idx === 1 ? 5 : 3} lg={idx === 1 ? 5 : 3} md={4} sm={4}
                key={item.id}
                className={styles["header-category__item"]}
              >
                <Link href={`/sub-category/${item.id}`}>
                  <p className={styles["header-category__item--text"]}>{item.name}</p>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xl={6} lg={6} md={5} sm={6} className={styles["header-container__item"]}>
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