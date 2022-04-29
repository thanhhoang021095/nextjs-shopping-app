import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Layout from 'src/components/Layout/Layout'
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import styles from 'src/styles/pages/category.module.scss'
import classNames from 'classnames'
import { Breadcrumb, Row, Col, Select, Tooltip } from 'antd'
import { useMediaQuery } from 'react-responsive';
import { HomeOutlined } from '@ant-design/icons'
import parse from 'html-react-parser';
import { ProductCard } from 'src/components/Product';
import { Image } from "src/components/ui-kits/CustomImage";
import Link from "next/link";
import { connect } from "react-redux"
import { ISubCategory } from 'src/interfaces/collection'
import { ProductOptionModal } from 'src/components/ui-kits/Modal'

const { Option } = Select;

interface SubCategoryPageProps {
  subCategory: ISubCategory[];
  paramId: number;
}

const SubCategoryPage: React.FC<SubCategoryPageProps> = ({ subCategory = [], paramId = 0 }): JSX.Element => {
  const [viewType, setViewType] = useState("list");
  const [viewAmount, setViewAmount] = useState(6);
  const [productList, setProductList] = useState([]);
  const [subCateData, setSubCateData] = useState(null);

  useEffect(() => {
    subCateData?.productArr?.length && setProductList([...subCateData.productArr.slice(0, viewAmount)]);
  }, [viewAmount]);

  useEffect(() => {
    const data:ISubCategory = subCategory.find(item => item.id == paramId);
    data && setSubCateData(data);
    data?.productArr?.length && setProductList([...data.productArr.slice(0, viewAmount)]);
  }, [subCategory.length]);

  const filterProductData = (type) => {
    const sortedList = (type) => ({
      "default": [...productList].sort((a, b) => a.name.localeCompare(b.name)),
      "incName": [...productList].sort((a, b) => a.name.localeCompare(b.name)),
      "descName": [...productList].sort((a, b) => b.name.localeCompare(a.name)),
      "incPrice": [...productList].sort((a, b) => a.price - b.price),
      "descPrice": [...productList].sort((a, b) => b.price - a.price),
    })[type]
    setProductList(sortedList(type));
  }

  return (
    <Layout>
      <div className={styles['category']}>
        <div className={styles['category-content']}>
          <div className={styles['category-content__breadcrumb']}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="/">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item className={styles['category-content__breadcrumb--item']}>{subCateData?.name ?? ""}</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className={styles['category-content__description']}>
            <h2 className={classNames(styles['category-content__description--title'], "font-h2")}>
              {subCateData?.name || ""}
            </h2>
            <div className={styles['category-content__description--desc']}>
              <Row gutter={32}>
                {subCateData?.image &&
                  <Col xl={6} lg={6} md={4} sm={24} xs={24}>
                    <Image
                      src={subCateData.image}
                      width="391px"
                      height="391px"
                      alt="collection_image"
                    />
                  </Col>
                }
                <Col
                  xl={subCateData?.image ? 18 : 24}
                  lg={subCateData?.image ? 18 : 24}
                  md={subCateData?.image ? 20 : 24}
                  sm={24}
                  xs={24}
                >
                  <div>
                    {subCateData?.description?.length ? parse(subCateData?.description) : 'No description'}
                  </div>
                </Col>

              </Row>

            </div>
          </div>

          <hr className={styles['category-content__divider']}></hr>


          {/* Filter Bar */}
          <Row className={styles['category-content__filter']}>
            <Tooltip title="Grid" color={"#4d708e"}>
              <Col span={1} className={styles['category-content__filter-item']}>
                <div
                  className={styles['category-content__filter-item--icon']}
                  onClick={() => setViewType("grid")}
                >
                  <i className="fas fa-grip-horizontal" aria-hidden></i>
                </div>
              </Col>
            </Tooltip>

            <Tooltip title="List" color={"#4d708e"}>
              <Col span={1} className={styles['category-content__filter-item']}>
                <div
                  className={styles['category-content__filter-item--icon']}
                  onClick={() => setViewType("list")}
                >
                  <i className="fas fa-th-list" aria-hidden></i>
                </div>
              </Col>
            </Tooltip>

            <Col span={8} className={styles['category-content__filter-item']}>
              <Select
                defaultValue="default"
                onChange={filterProductData}
                style={{ width: "100%", textAlign: "left" }}
                bordered={false}
                dropdownStyle={{ textAlign: "left" }}
              >
                <Option value="default">Default</Option>
                <Option value="incName">Name (A - Z)</Option>
                <Option value="descName">Name (Z - A)</Option>
                <Option value="incPrice">Price (Low &gt; High)</Option>
                <Option value="descPrice">Price (High &gt; Low)</Option>
              </Select>
            </Col>

            {/* <Tooltip title="Compare" color={"#4d708e"}>
              <Col span={1} className={styles['category-content__filter-item']}>
                <div
                  className={styles['category-content__filter-item--icon']}
                  onClick={() => console.log('compare')}
                >
                  <i className="fas fa-exchange-alt" aria-hidden></i>
                </div>
              </Col>
            </Tooltip> */}

            <Col
              span={12}
              className={styles['category-content__filter-item']}
            >
              Show
            </Col>
            <Col span={2} className={styles['category-content__filter-item']}>
              <Select
                defaultValue={6}
                style={{ width: "100%", textAlign: "left" }}
                bordered={false}
                dropdownStyle={{ textAlign: "left" }}
                onChange={(value) => setViewAmount(value)}
              >
                <Option value={6}>6</Option>
                <Option value={25}>25</Option>
              </Select>
            </Col>
          </Row>
          {/* Filter Bar */}

          {viewType === "list" ?
            productList.length && productList.map((product, idx) => (
              <Row key={`${product.id}_${idx}`} gutter={32}>
                <Col span={24}>
                  <ProductCard
                    id={product.id}
                    imageCover={product.image_cover}
                    rate={product.rateStar}
                    productName={product.name}
                    price={product.price}
                    isThumb={false}
                    description={product.description}
                    showMode="horizontal"
                    data={product}
                  />
                </Col>
              </Row>
            ))
            :
            <div>
              <Row gutter={32}>
                {productList.length && productList.map((product, idx) => (
                  <Col
                    span={6}
                    key={product.id + "_" + idx}
                    style={{
                      marginBottom: "32px"
                    }}
                  >
                    <ProductCard
                      id={product.id}
                      imageCover={product.image_cover}
                      style={{
                        textAlign: "left",
                        paddingBottom: "45%"
                      }}
                      rate={product.rateStar}
                      productName={product.name}
                      price={product.price}
                      isThumb={false}
                      {...product}

                    />
                  </Col>
                ))}
              </Row>
            </div>
          }
        </div>
      </div>
      <ProductOptionModal />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id = 0 } = params;
  return {
    props: {
      paramId: id
    },
  }
}

const mapStateToProps = state => ({
  subCategory: state.storage.subCategory
})

export default connect(mapStateToProps,{})(SubCategoryPage);