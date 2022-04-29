import React, { useState, useEffect, useRef } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from 'src/components/Layout/Layout'
import { getDimensionImageFromUrl, replaceDimensionImageFromUrl } from 'src/utils/common'
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import storageActions from "controllers/redux/actions/storageActions";
import IProduct from 'src/interfaces/product'
import IUser from 'src/interfaces/user'
import styles from 'src/styles/pages/detail.module.scss'
import classNames from 'classnames'
import { connect } from "react-redux"
import { Row, Col } from 'antd'
import { Breadcrumb } from "src/components/ui-kits/Breadcrumb"
import { Image } from 'src/components/ui-kits/CustomImage'
import { VerticalCarousel, MultiCarousel, SingleCarousel } from 'src/components/Carousel'
import { GlassMagnifier } from "react-image-magnifiers";
import { ProductInfo } from 'src/components/Product'
import { DescriptionTab, SpecificationTab, ReviewTab } from 'src/components/DetailTab'
import { ProductCard } from 'src/components/Product';
import { useMediaQuery } from 'react-responsive';
import { Toast } from "src/components/ui-kits/Toast"
import { ProductOptionModal } from "src/components/ui-kits/Modal";

interface DetailPageProps {
  cart: IProduct[];
  userInfo: IUser;
  prodData: IProduct;
  getCart: any;
  paramId: number;
}

const DetailPage: React.FC<DetailPageProps> = ({ prodData, paramId }): JSX.Element => {
  const [activeImage, setActiveImage] = useState(() => {
    return prodData?.images?.length ? prodData.images[0] : ""
  })
  const [activeTab, setActiveTab] = useState(0);
  const [relatedData, setRelatedData] = useState([]);
  const [navList] = useState(() => {
    return [
      {
        id: 0,
        title: 'description',
      },
      {
        id: 1,
        title: 'specification',
      },
      {
        id: 2,
        title: 'reviews',
      }
    ]
  });
  const changeCarousel = useMediaQuery({ query: '(max-width: 1200px)' })

  useEffect(() => {
    async function fetchRelatedData() {
      try {
        const res: any = await api.get(`product/related/${paramId}`);
        if (res) {
          setRelatedData(res?.[0]?.related_products ?? [])
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchRelatedData();
  }, [])

  useEffect(() => {
    prodData?.images?.length && setActiveImage(prodData.images[0]);
  }, [paramId])

  const getDimensionImgAfterResize = (url: string): { width: string; height: string } => {
    const resizeUrl: string = replaceDimensionImageFromUrl(url, 800, 800);
    return getDimensionImageFromUrl(resizeUrl)
  }

  return (
    <>
      <Layout>
        {prodData &&
        <div className={styles['detail']}>
          <div className={styles['detail-container']}>

            {/* ====== Breadcrumb ====== */}
            <Breadcrumb
              list={[
                {
                  name: prodData.name,
                  link: `product-detail/${prodData.id}`
                }
              ]}
            />
            {/* ====== Breadcrumb ====== */}

            {/* ====== Media ====== */}
            <div className={styles['detail-container__media']}>
              <Row className={styles['detail-content']} gutter={32}>
                <Col
                  xl={15}
                  lg={15}
                  md={15}
                  sm={24}
                  xs={24}
                >
                  <Row gutter={16}>
                    {!changeCarousel ?
                      <>
                        <Col
                          className={styles['detail-content__images']}
                          style={{
                            height: "fit-content"
                          }}
                          xl={6}
                          lg={6}
                          md={0}
                          sm={0}
                          xs={0}
                        >
                          <VerticalCarousel
                            data={prodData.images}
                            handleClick={setActiveImage}
                            activeItem={activeImage}
                            renderProps={(item) => (
                              <Image
                                src={item}
                                width={getDimensionImageFromUrl(item).width}
                                height={getDimensionImageFromUrl(item).height}
                                alt="item image"
                              />
                            )}
                          />
                        </Col>
                        <Col
                          className={styles['detail-content__cover']}
                          xl={18}
                          lg={18}
                          md={24}
                          sm={24}
                          xs={24}
                        >
                          <div className={styles['detail-content__cover--main']}
                          >
                            <GlassMagnifier
                              className={styles['detail-content__cover--glass']}
                              imageSrc={replaceDimensionImageFromUrl(activeImage, 800, 800)}
                              imageAlt="image cover"
                              magnifierBorderSize={1}
                              magnifierSize="25%"
                            />
                          </div>
                        </Col>
                      </>
                      :
                      <Col
                        className={styles['detail-content__carousel']}
                        xl={24} lg={24} md={24} sm={24} xs={24}
                      >
                        <SingleCarousel>
                          {prodData.images?.length && prodData.images.map((item, idx) => (
                            <Image
                              key={idx}
                              src={replaceDimensionImageFromUrl(item, 800, 800)}
                              width={getDimensionImgAfterResize(item).width}
                              height={getDimensionImgAfterResize(item).height}
                              alt="item image"
                            />
                          ))}
                        </SingleCarousel>
                      </Col>
                    }
                  </Row>
                </Col>


                <Col
                  className={styles['detail-content__info']}
                  xl={9}
                  lg={9}
                  md={9}
                  sm={24}
                  xs={24}
                >
                  <ProductInfo
                    name={prodData.name}
                    brand={prodData.brand}
                    productCode={prodData.product_code}
                    availability={prodData.availability}
                    price={prodData.price}
                    sizes={prodData.sizes}
                    colors={prodData.colors}
                    reviewsNumber={prodData.reviews?.length ?? 0}
                    rateStar={prodData.rateStar}
                    data={prodData}
                  />
                </Col>
              </Row>
            </div>
            {/* ====== Media ====== */}

            {/* ====== Tabs ====== */}
            <div className={styles['detail-container__tabs']}>
              <Row gutter={16} className={styles['detail-container__row']}>
                <Col xl={8} lg={6} md={24} sm={24} xs={24}>
                  <ul className={styles['detail-container__nav-tab']}>
                    {navList.map((nav) => (
                      <li key={nav.id}
                        className={classNames(
                          styles['detail-container__nav-tab--item'],
                          { [styles['detail-container__nav-tab--active']]: nav.id === activeTab }
                        )}
                        onClick={() => setActiveTab(nav.id)}
                      >
                        {nav.title}
                      </li>
                    ))}
                  </ul>
                </Col>
                <Col xl={16} lg={18} md={24} sm={24} xs={24}>
                  <div className={styles['detail-container__tab-content']}>
                    {activeTab == 0 ?
                      <DescriptionTab desc={prodData.description} />
                      : activeTab == 1 ?
                        <SpecificationTab
                          featuredBrand={prodData.featured_brand}
                          material={prodData.material}
                        />
                        :
                        <ReviewTab
                          reviews={prodData.reviews}
                        />
                    }
                  </div>
                </Col>
              </Row>
            </div>
            {/* ====== Tabs ====== */}

            {/* ====== Related Products ====== */}
            <div className={styles['detail-container__related-products']}>
              <h3 className={styles['detail-container__related-products--title']}>
                RELATED PRODUCTS
              </h3>
              <MultiCarousel
                data={relatedData}
                renderProps={item => (
                  <div className={styles["multi-carousel-item"]}>
                    <ProductCard
                      id={item.id}
                      centerMode
                      imageCover={item.image_cover}
                      rate={item.rateStar}
                      productName={item.name}
                      price={item.price}
                      isThumb={false}
                      data={item}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        }
      </Layout>

      <Toast />
      <ProductOptionModal />
    </>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  let mapId: any = []
  const res = await api.get(endpoint['product'])
  mapId = res?.length ? res.map((item) => ({
    params: { id: `${item.id}` },
  })) : [];
  return {
    paths: mapId,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id
  const prodData: any = await api.get(endpoint['product'] + '/' + id)
  return {
    props: {
      prodData: prodData ?? null,
      paramId: id
    },
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.storage.cart,
    userInfo: state.storage.userInfo,
  }
}

const mapDispatchToProps = {
  getCart: storageActions.getCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)
