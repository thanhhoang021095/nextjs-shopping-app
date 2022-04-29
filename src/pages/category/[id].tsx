import React, { useState, useMemo, useEffect } from 'react'
import { GetStaticProps, GetServerSideProps } from 'next'
import Layout from 'src/components/Layout/Layout'
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import styles from 'src/styles/pages/category.module.scss'
import classNames from 'classnames'
import { Breadcrumb, Row, Col } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { HomeOutlined } from '@ant-design/icons'
import parse from 'html-react-parser'
import { Image } from "src/components/ui-kits/CustomImage"
import Link from "next/link"
import { connect } from "react-redux"
import { ICategory } from 'src/interfaces/collection'

const defaultDescription = `<p>Fashion has always been so temporary and uncertain. 
You can’t keep up with it. 
This social phenomenon is very whimsical, thus we as the consumers always try to stay in touch with all the latest fashion tendencies. Obviously there is nothing wrong about it because fashion satisfies our willingness to be attractive. And also fashion is the detector of prosperity and social rank. So, our natural desire to wear fashionable clothes has many reasons such as historical, social and others. Therefore being fashionable costs a lot of money. But nowadays fashion is not such unavailable as it was a couple of centuries ago. We are lucky to have an opportunity to buy qualitative, fashionable and affordable clothes.</p>
<br /><p>So, with the great pleasure we are offering you our goods, and we are sure that only our choices of garments will suit you best. Our product is universal because it suits different customers with different demands. We assure you it is really important, it shows that our good has such capacity as flexibility. And it is good for you because as we all know people change their claims with the course of time, and our good will be actual for a long time. The main reason of buying our clothes is the unique combination of fair price, extraordinary style and perfect quality. Here you can find garments of all sizes, colors, styles and fabrics.</p><br />
<p>It will suit you best of all. Because we all live in the time of total consuming of uncountable goods and services, and this has become the main reason for the rapid growth of a so-called culture of consumption in our society.
So, this circumstance forced all leading successful companies to explore all needs and wishes of different groups of potential clients very deeply. 
And that is why we are offering you the result of great market and technological research – our magnificent product. Our employees put in great efforts to make this commodity. Our good was made up by best experts with the help of most advanced technologies, and it gives us right to consider this product to be a premium one.</p>`

interface CategoryPageProps {
  paramId: number;
  category: ICategory[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ paramId = 0, category = [] }): JSX.Element => {
  const [refineData, setRefineData] = useState([]);
  const [cateData, setCateData] = useState(null);

  useEffect(() => {
    let mapData = [];
    if (paramId == 0) {
      mapData = category.map(r => {
        const { image, name, id } = r;
        return {
          id,
          name,
          image
        }
      })
      setRefineData(mapData);
    } else {
      const data: any = category.find(item => item.id == paramId);
      mapData = data?.subCategory.map(r => {
        const { image, name, id } = r;
        return {
          id,
          name,
          image
        }
      }) ?? [];
      setRefineData(mapData);
      setCateData(data);
    }
  }, [category.length]);

  return (
    <Layout>
      <div className={styles['category']}>
        <div className={styles['category-content']}>
          <div className={styles['category-content__breadcrumb']}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="/">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item className={styles['category-content__breadcrumb--item']}>{cateData?.name || 'Clothing'}</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className={styles['category-content__description']}>
            <h2 className={classNames(styles['category-content__description--title'], "font-h2")}>
              {cateData?.name || 'Clothing'}
            </h2>
            <div className={styles['category-content__description--desc']}>
              <Row gutter={32}>
                {cateData?.image &&
                  <Col xl={6} lg={6} md={4} sm={24} xs={24}>
                    <Image
                      src={cateData.image}
                      width="391px"
                      height="391px"
                      alt="collection_image"
                    />
                  </Col>

                }
                <Col
                  xl={cateData?.image ? 18 : 24}
                  lg={cateData?.image ? 18 : 24}
                  md={cateData?.image ? 20 : 24}
                  sm={24}
                  xs={24}
                >
                  <div>
                    {parse(cateData?.description || defaultDescription)}
                  </div>
                </Col>
              </Row>
            </div>
          </div>


          <hr className={styles['category-content__divider']}></hr>

          <div className={styles['category-content__define']}>
            <h3>REFINE SEARCH</h3>
            <Row justify="start" gutter={32}>
              {refineData.length && refineData.map((elm, idx) => (
                <Col span={6} key={idx}>
                  <Link href={`/${paramId == 0 ? 'category' : 'sub-category'}/${elm.id}`}>
                    <div className={styles['category-content__thumb']}>
                      <div className={styles['category-content__thumb--image']}>
                        <Image
                          src={elm.image}
                          width="391px"
                          height="391px"
                          alt="collection image"
                        />
                      </div>
                      <p className={styles['category-content__thumb--name']}>{elm.name}</p>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  return {
    props: {
      paramId: id
    },
  }
}

const mapStateToProps = (state) => ({
  category: state.storage.category
})

export default connect(mapStateToProps, {})(CategoryPage);