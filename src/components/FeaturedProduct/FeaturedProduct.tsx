import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import styles from './FeaturedProduct.module.scss'
import { ProductCard } from '../Product'
import { useMediaQuery } from 'react-responsive'
import api from 'controllers/baseApi'
import { ProductOptionModal } from "src/components/ui-kits/Modal"

interface FeaturedProductProps { }

const FeaturedProduct: React.FC<FeaturedProductProps> = (): JSX.Element => {
    const [data, setData] = useState([]);
    const isDesktopDevice = useMediaQuery({ query: '(max-width: 1024px)' })
    const isTabletDevice = useMediaQuery({ query: '(max-width: 991px)' })
    const isMobileDevice = useMediaQuery({ query: '(max-width: 768px)' })
    const [activeData, setActiveData] = useState(null);

    const [defaultProducts, setDefaultProducts] = useState([]);
    const [thumbProducts, setThumbProducts] = useState([]);

    useEffect(() => {
        const fetchFeatureData = async (): Promise<void> => {
            try {
                const res: any = await api.get('feature');
                if (res) {
                    setData(res[0].feature_data)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchFeatureData();
    }, []);

    useEffect(() => {
        if (data.length) {
            const thumbData = data.filter((item) => item.is_thumb);
            setThumbProducts(thumbData);
            const defaultData = data.filter((item) => !item.is_thumb);
            setDefaultProducts(defaultData);
        }
    }, [data])

    return (
        <>
            <div className={styles["feature-product"]}>
                <p className={styles["feature-product__title"]}>Featured Products</p>
                {data.length &&
                    <Row className={styles["feature-product-container"]} justify="space-between" gutter={32}>
                        {defaultProducts.length && defaultProducts.map((item, idx) => (
                            <Col
                                key={item.id}
                                xl={idx == 0 ? 10 : 6}
                                lg={idx == 0 ? 10 : 6}
                                md={12}
                                sm={24}
                                className={styles["feature-product-container__item"]}
                            >
                                <ProductCard
                                    id={item.id}
                                    imageCover={item.image_thumb}
                                    rate={item.rateStar}
                                    productName={item.name}
                                    price={item.price}
                                    isThumb={isMobileDevice}
                                    data={item}
                                />
                            </Col>
                        ))}
                        {!isTabletDevice ?
                            <Col xl={8} lg={8} className={styles["feature-product-container__sub-item"]}>
                                <div className={styles["feature-product-container__sub-item--col"]}>
                                    {thumbProducts.length && thumbProducts.map((item, idx) => (
                                        <ProductCard
                                            key={item.id}
                                            id={item.id}
                                            imageCover={item.image_thumb}
                                            rate={item.rateStar}
                                            productName={item.name}
                                            price={item.price}
                                            style={{
                                                padding: !isDesktopDevice ? "" : "2rem 0.5rem 1rem 0",
                                                marginTop: idx == thumbProducts.length - 1 ? "30px" : ""
                                            }}
                                            isThumb={item.is_thumb}
                                            data={item}
                                        />
                                    ))}
                                </div>
                            </Col>
                            :
                            <>
                                {
                                    thumbProducts.length && thumbProducts.map((item, idx) => (
                                        <Col key={item.id}
                                            md={12}
                                            sm={24}
                                            xs={24}
                                        >
                                            <ProductCard
                                                id={item.id}
                                                imageCover={item.image_thumb}
                                                rate={item.rateStar}
                                                productName={item.name}
                                                price={item.price}
                                                style={{
                                                    padding: !isDesktopDevice ? "" : "2rem 0.5rem 1rem 0",
                                                    marginTop: isMobileDevice && idx == thumbProducts.length - 1 ? "30px" : ""
                                                }}
                                                isThumb={isMobileDevice}
                                                data={item}
                                            />
                                        </Col>
                                    ))
                                }
                            </>
                        }
                    </Row>
                }
            </div>
            <ProductOptionModal />
        </>
    )
}

export default FeaturedProduct;