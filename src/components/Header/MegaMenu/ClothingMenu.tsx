import React, { useEffect, useState } from 'react'
import { Col, Row, Dropdown } from 'antd'
import styles from './ClothingMenu.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
import { womenShop, menShop, accessories } from './CategoryItems'
import { ISubCategory } from "src/interfaces/collection";
import { connect } from 'react-redux'

interface MegaMenuProps {
  category: any[];
}

interface SubMenuProps {
  categoryData: ISubCategory[];
}

const SubMenu: React.FC<SubMenuProps> = ({ categoryData = [] }) => {
  const womenShop = categoryData[0]["subCategory"];
  const menShop = categoryData[1]["subCategory"];
  const accessories = categoryData[2]["subCategory"];

  return (
    <div className={styles["menu"]}>
      <Row className={styles["menu-row"]} justify="space-between">
        <Col xs={24} md={8} lg={8} className={styles["menu-col"]}>
          <Link href="/category/1">
            <p className={classNames("text-margin-0", styles["menu-col__title"])}>Shop Women's</p>
          </Link>
          <div className={styles["menu-col__list"]}>
            {womenShop.map((item, idx) => {
              return (
                <Link href={`/sub-category/${item.id}`} key={idx}>
                  <p className={styles["menu-col__list--link"]}>{item.name}</p>  
                </Link>
              )
            })}
          </div>
        </Col>
        <Col xs={24} md={8} lg={8} className={styles["menu-col"]}>
          <Link href="/category/2">
            <p className={classNames("text-margin-0", styles["menu-col__title"])}>Shop Men's</p>
          </Link>
          <div className={styles["menu-col__list"]}>
            {menShop.map((item, idx) => {
              return (
                <Link href={`/sub-category/${item.id}`} key={idx}>
                  <p className={styles["menu-col__list--link"]}>{item.name}</p>  
                </Link>
              )
            })}
          </div>
        </Col>
        <Col xs={24} md={8} lg={8} className={styles["menu-col"]}>
          <Link href="/category/3">
            <p className={classNames("text-margin-0", styles["menu-col__title"])}>Accessories</p>
          </Link>
          <div className={styles["menu-col__list"]}>
            {accessories.map((item, idx) => {
              return (
                <Link href={`/sub-category/${item.id}`} key={idx}>
                  <p className={styles["menu-col__list--link"]}>{item.name}</p>  
                </Link>
              )
            })}
          </div>
        </Col>
      </Row>
    </div>
  )
};

const MegaMenu: React.FC<MegaMenuProps> = ({ category = [] }): JSX.Element => {
  const [hoverLink, setHoverLink] = useState(false);
  
  return (
    <Dropdown overlay={<SubMenu categoryData={category} />}
      overlayStyle={{ position: "relative" }}
      className={styles["menu-dropdown"]}
    >
      <div>
        <Link href="/category/0">
          <div
            onMouseEnter={() => setHoverLink(true)}
            onMouseLeave={() => setHoverLink(false)}
            className={classNames(styles["menu-dropdown__link"])}
          >
            <p
              className={classNames(
                styles["menu-dropdown__link--text"],
                { [styles["hover-link"]]: hoverLink }
              )}
            >
              Clothing
            </p>
            <i
              aria-hidden
              className={classNames(
                "fas fa-angle-down",
                styles["menu-dropdown__icon"],
                { [styles["hover-link"]]: hoverLink }
              )}
            >
            </i>
          </div>
        </Link>
      </div>
    </Dropdown>

  );
}

const mapStateToProps = (state) => ({
  category: state.storage.category,
});

export default connect(mapStateToProps, {})(MegaMenu);