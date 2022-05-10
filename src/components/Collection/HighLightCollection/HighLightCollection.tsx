import React, { useEffect, useState } from 'react'
import styles from './HighLightCollection.module.scss'
import { Row, Col } from 'antd'
import { Image } from 'src/components/ui-kits/CustomImage'
import { getDimensionImageFromUrl } from '../../../utils/common'
import classNames from 'classnames'
import api from 'controllers/baseApi'
import Link from 'next/link'

interface HighLightCollectionProps {
}


const filterCssProp = "grayscale(1) contrast(1)";

const HighLightCollection: React.FC<HighLightCollectionProps> = (): JSX.Element => {
    const [isHoverCard, setIsHoverCard] = useState(null);
    const [isHoverBox, setIsHoverBox] = useState(null);
    const [hightLightList, setHightLightList] = useState([]);
    const [imageDimension, setImageDimension] = useState({
        width: "100%",
        height: "100%"
    })

    useEffect(() => {
        api.get("highlight")
            .then((data: any) => {
                setHightLightList(data);
                setImageDimension(getDimensionImageFromUrl(data[0].image));
            })
            .catch(() => { throw new Error("Cannot find highlight data") })
    }, [])

    return (
        <div className={styles["highlight-collection"]}>
            <Row
                className={styles["highlight-collection__row"]}
                justify="space-between" align="middle" gutter={32}
            >
                {hightLightList.length && hightLightList.map(item => (
                    <Col
                        key={item._id}
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
                            <Link href={`/${item.linkHref}`}>
                                <div
                                    onMouseEnter={() => {
                                        setIsHoverCard(item.id)
                                        setIsHoverBox(item.id)
                                    }}
                                    onMouseLeave={() => {
                                        setIsHoverCard(null)
                                        setIsHoverBox(null)
                                    }}
                                    className={styles["collection-card__box"]}>
                                    <h6
                                        style={{ color: isHoverBox == item.id ? "#fff" : "" }}
                                        className={classNames("font-h6", styles["collection-card__box--title"])}
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
                            </Link>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HighLightCollection;