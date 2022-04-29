import React from 'react'
import styles from  './Footer.module.scss'
import { Row, Col, Typography } from 'antd'

const { Title } = Typography;

const Footer: React.FC = () => {
  return (
      <div className={styles["footer"]}>
        <div className={styles["main-footer"]}>
          <div className={styles["footer-container"]}>
            <Row className={styles["footer-container__row"]} justify="space-between">
              <Col xs={24} sm={24} md={6} lg={6} className={styles["footer-box"]}>
                <Title level={4} className={styles["footer-box__title"]}>
                  Information
                </Title>
                <ul className={styles["footer-box__list"]}>
                  <li className={styles["footer-box__list--item"]}>
                    <p>About Us</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>Delivery Information</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>Privacy Policy</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>Terms & Conditions</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>Store Info</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>Returns</p>
                  </li>
                </ul>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <Title level={4}>
                  My Account
                </Title>
                <ul className={styles["footer-box__list"]}>
                  <li className={styles["footer-box__list--item"]}>
                    <p>My Account</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>Order History</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>Gift Certificates</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>Affiliates</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>Site Map</p>
                  </li>
                </ul>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <Title level={4}>
                  Store Info
                </Title>
                <ul className={styles["footer-box__list"]}>
                  <li className={styles["footer-box__list--item"]}>
                    <p>My Company Glasgow D04 89GR</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>Order History</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>(800) 123-4567</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>livedemo-admin@templatemonster.me</p>
                  </li>
                  <li className={styles["footer-box__list--item"]}>
                    <p>7 Days a week from 9:00 am to 7:00 pm</p>
                  </li>
                </ul>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6}>
                <Title level={4}>
                  Get Connected
                </Title>
                <ul className={styles["footer-box__list"]}>
                  <li className={styles["footer-box__list--item"]}>
                    <p>Like, share, or follow for exclusive info !</p>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
        </div>

        <div className={styles["sub-footer"]}>
          <Title level={5} className={styles["sub-footer__title"]}>Powered By Hoang-Shop © 2021</Title>
        </div>
      </div>
  )
}

export default Footer
