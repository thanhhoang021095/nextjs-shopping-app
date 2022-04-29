import React, { useState } from 'react'
import styles from './HighLightCollection.module.scss'
import { Row, Col } from 'antd'
import { Image } from 'src/components/ui-kits/CustomImage'
import { getDimensionImageFromUrl } from '../../../utils/common'
import classNames from 'classnames'

interface HighLightCollectionProps {
}

const collectionData = [
    {
        id: 1,
        title: "new arrivals",
        type: "man",
        image: "https://livedemo00-opencart.template-help.com/opencart_prod-24471/image/cache/catalog/banners/banner-1-533x515.jpg",
        linkHref: "https://google.com.vn"
    },
    {
        id: 2,
        title: "new collection",
        type: "woman",
        image: "https://livedemo00-opencart.template-help.com/opencart_prod-24471/image/cache/catalog/banners/banner-2-533x515.jpg",
        linkHref: "https://google.com.vn"
    },
    {
        id: 3,
        title: "new arrivals",
        type: "kids",
        image: "https://livedemo00-opencart.template-help.com/opencart_prod-24471/image/cache/catalog/banners/banner-3-533x515.jpg",
        linkHref: "https://google.com.vn"
    }
];

const imageDimension = getDimensionImageFromUrl(collectionData[0].image);

const filterCssProp = "grayscale(1) contrast(1)";

const HighLightCollection: React.FC<HighLightCollectionProps> = (): JSX.Element => {
    const [isHoverCard, setIsHoverCard] = useState(null);
    const [isHoverBox, setIsHoverBox] = useState(null);

    return (
        <div className={styles["highlight-collection"]}>
            <Row
                className={styles["highlight-collection__row"]}
                justify="space-between" align="middle" gutter={32}
            >
                {collectionData.map(item => (
                    <Col
                        key={item.id}
                        xs={24} sm={24} md={8} lg={8} xl={8}
                        className={styles["highlight-collection__row--col"]}
                    >
                        <div className={styles["collection-card"]}>
                            <div
                                onMouseEnter={() => setIsHoverCard(item.id)}
                                onMouseLeave={() => setIsHoverCard(null)}
                                className={styles["collection-card__image"]}>
                                <Image
                                    style={{ filter: isHoverCard == item.id ? filterCssProp : "" }}
                                    src={item.image}
                                    width={imageDimension.width}
                                    height={imageDimension.height}
                                    alt="collection image"
                                />
                            </div>
                            <div
                                onMouseEnter={() => {
                                    setIsHoverCard(item.id)
                                    setIsHoverBox(item.id)
                                }}
                                onMouseLeave={() => {
                                    setIsHoverCard(null)
                                    setIsHoverBox(null)
                                }}
                                className={ styles["collection-card__box"]}>
                                <h6
                                    style={{ color: isHoverBox == item.id ? "#fff" : "" }}
                                    className={classNames("font-h6",styles["collection-card__box--title"])}
                                >
                                    {item.title}
                                </h6>
                                <h3
                                    style={{ color: isHoverBox == item.id ? "#fff" : "" }}
                                    className={classNames("font-h3", styles["collection-card__box--type"])}
                                >
                                    {item.type}
                                </h3>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HighLightCollection;