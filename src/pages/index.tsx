import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import withApollo from '../utils/withApollo'
// import { useQuery } from '@apollo/react-hooks'
// import { GET_PRODUCTS } from '../graphql/product/product.query'
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import api from "../../controllers/baseApi";
import endpoint from "../utils/endpoints";
import { useRouter } from 'next/router'
import styles from '../styles/pages/home.module.scss'
import dynamic from 'next/dynamic'
import { Image } from 'src/components/ui-kits/CustomImage'
import { Button } from '../components/ui-kits/Button'
import { SingleCarousel } from 'src/components/Carousel'
import { useMediaQuery } from 'react-responsive'
import { SearchInput } from 'src/components/Header/SearchInput';

// dynamic import
const Carousel = dynamic(() => import("../components/Carousel/CustomCarousel/CustomCarousel"))
const HighLightCollection = dynamic(() => import("../components/Collection/HighLightCollection/HighLightCollection"))
const FeaturedProduct = dynamic(() => import("../components/FeaturedProduct/FeaturedProduct"))
const NewCollection = dynamic(() => import("../components/Collection/NewCollection/NewCollection"))

interface HomeProps {
}

const Home: React.FC<HomeProps> = ({
}): JSX.Element => {
  const [carouselData, setCarouselData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const Router = useRouter();
  const isLargeDevice = useMediaQuery({ query: '(min-width: 768px)' });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res: any = await api.get(endpoint['banner']);
        if (res) {
          setCarouselData(res);
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchData();
  }, [])

  return (
    <>
      <Layout isHomeRoute={Router.pathname === "/" || Router.pathname === "/home"}>
        <div className={styles['home-body']}>
          {!isLargeDevice ?
            <>
              <SearchInput 
                isSearching={isSearching}
                setIsSearching={setIsSearching}
                style={{ 
                  position: "relative",
                  margin: "40px 0",
                  zIndex: 99
                }}
              />
              <SingleCarousel>
                {carouselData.length && carouselData.map((item, idx) => (
                  <div className={styles['small-carousel-item']} key={`${item.id}_${idx}`}>
                    <div className={styles['small-carousel-item__image']}>
                      <Image
                        src={item.image}
                        width="605"
                        height="800"
                        alt={`image ${item.id}`}
                      />
                    </div>
                    <div className={styles['small-carousel-item__info']}>
                      <div className={styles['small-carousel-item__content']}>
                        <h5 className={styles['small-carousel-item__content--name']}>
                          {item.name}
                        </h5>
                        <h4 className={styles['small-carousel-item__content--intro']}>
                          {item.intro}
                        </h4>
                        <p className={styles['small-carousel-item__content--desc']}>
                          {item.description}
                        </p>
                        <Button
                          transitionWidth
                          style={{
                            padding: "20px 35px",
                            fontSize: "12px",
                            fontWeight: "600",
                            height: "50px",
                            boxSizing: "border-box",
                            textTransform: "uppercase"
                          }}>
                          Shop now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </SingleCarousel>
            </>
            :
            <Carousel
              data={carouselData}
              renderProps={(item, idx) => (
                <div key={`${item.id}_${idx} `}>
                  <div className={styles['carousel-container']}>
                    <div className={styles['carousel-container__image']}>
                      <Image
                        src={item.image}
                        width="605"
                        height="800"
                        alt={`image ${item.id}`}
                      />
                    </div>
                    <div className={styles['carousel-container__content']}>
                      <h5 className={styles['carousel-container__content--name']}>
                        {item.name}
                      </h5>
                      <h2 className={styles['carousel-container__content--intro']}>
                        {item.intro}
                      </h2>
                      <p className={styles['carousel-container__content--desc']}>
                        {item.description}
                      </p>
                      <Button
                        transitionWidth
                        style={{
                          padding: "20px 35px",
                          fontSize: "12px",
                          fontWeight: "600",
                          height: "50px",
                          boxSizing: "border-box",
                          textTransform: "uppercase"
                        }}>
                        Shop now
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            >
            </Carousel>
          }
          <div className={styles['home-body__product']}>
            <HighLightCollection />
            <FeaturedProduct />
            <NewCollection />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default withApollo({ ssr: true })(Home);