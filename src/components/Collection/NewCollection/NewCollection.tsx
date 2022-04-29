import React, { useState } from 'react'
import { Row, Col } from 'antd'
import styles from './NewCollection.module.scss'
import { Image } from 'src/components/ui-kits/CustomImage'
import { Button } from 'src/components/ui-kits/Button'
import classNames from 'classnames'
import { useMediaQuery } from 'react-responsive'

interface NewCollectionProps {
}

const filterCssProp = "grayscale(1) contrast(1)";
const collectionData = [
    {
        id: 1,
        title: "Explore Our Newest",
        name: "COLLECTION",
        desc: "Shop from over 850 top brands & choose your own style",
        image: "/images/banner/banner-1.jpg",
        hrefButton: ""
    },
    {
        id: 2,
        title: "Dress Yourself",
        name: "BE UNIQUE",
        desc: "Discover the Essentials for This Season's Basic Slim Jeans",
        image: "/images/banner/banner-2.jpg",
        hrefButton: ""
    }
]

const NewCollection: React.FC<NewCollectionProps> = (): JSX.Element => {
    const [isHover, setIsHover] = useState(null);
    const isSmallDevice = useMediaQuery({ query: '(max-width: 991px)' })
    return (
        <div className={styles["new-collection-container"]}>
            <Row
                className={styles["new-collection-container__row"]}
                justify="space-between"
                align="middle"
                gutter={32}
            >
                {collectionData.map((item, idx) => (
                    <Col
                        style={{
                            marginTop: isSmallDevice && idx !== 0 ? "32px" : ""
                        }}
                        className={styles["new-collection-container__row--col"]}
                        xs={24}
                        sm={24}
                        md={24}
                        lg={12}
                        xl={12}
                        key={item.id}>
                        <div
                            className={styles["new-collection-card"]}
                            onMouseEnter={() => setIsHover(item.id)}
                            onMouseLeave={() => setIsHover(null)}
                        >
                            <div className={styles["new-collection-card__img"]}>
                                <Image
                                    style={{ filter: isHover == item.id ? filterCssProp : "" }}
                                    src={item.image}
                                    width="815"
                                    height="390"
                                    alt="banner collection"
                                />
                            </div>
                            <div className={styles["new-collection-card__content"]}>
                                <h6 className={classNames("font-h6", styles["new-collection-card__content--title"])}>
                                    {item.title}
                                </h6>
                                <h2 className={classNames("font-h2", styles["new-collection-card__content--name"])}>
                                    {item.name}
                                </h2>
                                <p className={classNames(styles["new-collection-card__content--desc"])}>
                                    {item.desc}
                                </p>
                                <div className={classNames(styles["new-collection-card__content--btn"])}>
                                    <Button
                                        transitionWidth
                                        style={{
                                            padding: "18px 39px",
                                            fontSize: "12px",
                                            width: "fit-content",
                                            height: "50px",
                                            fontWeight: 700,
                                            boxSizing: "border-box",
                                            textTransform: "uppercase"
                                        }}
                                    >
                                        Shop now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
export default NewCollection;