import React, { ReactEventHandler, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import IUser from 'src/interfaces/user'
import Layout from 'src/components/Layout/Layout'
import styles from 'src/styles/pages/cart.module.scss'
import { sumPrice } from "src/utils/common";
import QuantityButton from "src/components/ui-kits/Button/QuantityButton";
import storageActions from 'controllers/redux/actions/storageActions'
import { GetStaticProps } from 'next'
import { Breadcrumb } from 'src/components/ui-kits/Breadcrumb'
import { Table, Space, Row, Col, Input } from 'antd';
import { Image } from 'src/components/ui-kits/CustomImage'
import { Button } from 'src/components/ui-kits/Button'
import { useRouter } from 'next/router'

interface CartProps {
  cart: any[];
  showToast: (mess:string, type:string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, showToast = () => {} }): JSX.Element => {
  const [cartData, setCartData] = useState([]);
  const [couponText, setCouponText] = useState("");
  const router = useRouter();

  useEffect(() => {
    setCartData(cart);
  }, [cart]);

  const getRowDataTable = (keyNum: number, cart: any[]) => {    
    return cart.find((prod, index) => index == keyNum);
  }

  const handleChangeCoupon = (e): void => {
    e.preventDefault();
    setCouponText(e.target.value)
  }

  const handleApplyCoupon = ():void => {
    // check + show toast
    // showToast(`Your cart is empty. Please get some items`, "error");
  }
  
  const handleCheckout = ():void => {
    if (cart.length) {
      router.push("/checkout");
      return;
    }
    showToast(`Your cart is empty. Please get some items`, "error");
    return;
  }

  const cartColumnData: any[] = [
    {
      title: <strong>IMAGE</strong>,
      dataIndex: 'image',
      align: "center",
      key: 'image',
      render: imgSrc => <Image src={imgSrc} width="80" height="80" style={{
        width: "80px",
        height: "80px"
      }} />,
    },
    {
      title: <strong>PRODUCT NAME</strong>,
      key: 'name',
      render: (info) => {
        const data: any = getRowDataTable(info.key, cart);
        if (data) {
          return (
            <div>
              <p>{data.name}</p>
              <p>Model: {data.product_code}, Size: {data.size.name}, Color: {data.color.name}</p>
            </div>
          )
        }
      }
    },
    {
      title: <strong>QUANTITY</strong>,
      key: 'quantity',
      align: "center",
      render: (item) => {
        if (item) {
          return (
            <Space size="middle">
              <QuantityButton productId={item.id} quantity={item.quantity}/>
            </Space>
          )
        }
      },
    },
    {
      title: <strong>UNIT PRICE</strong>,
      dataIndex: 'price',
      align: "right",
      key: 'price',
      render: price => <p>${price}</p>,
    },
    {
      title: <strong>TOTAL</strong>,
      align: "right",
      key: 'price',
      render: (item) => {        
        const dataTotal: any = getRowDataTable(item.key, cart);
        if (dataTotal) {
          return (
            <p>${dataTotal.price * dataTotal.quantity}</p>
          )
        }
      }
    },
  ];

  const cartRowData:any[] = cartData.length ? cartData.map((item, idx) => {
    return {
      key: idx,
      id: item.id,
      image: item.image_cover,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      color: item.color,
      size: item.size,
    }
  }) : [];


  const cartColumnSummary:any[] = [
    {
      title: <strong>SUB TOTAL</strong>,
      dataIndex: 'sub-total',
      align: "right",
      key: 'sub-total',
    },
    {
      title: <strong>SUB VALUE</strong>,
      dataIndex: 'sub-value',
      align: "right",
      key: 'sub-value',
    },
  ];

  const cartRowSummary:any[] = [
    {
      key: "sub-total",
      "sub-total": <strong>Sub-Total:</strong>,
      "sub-value": '$' + sumPrice(cartRowData),
    },
    {
      key: "sub-discount",
      "sub-total":  <strong>Discount (%):</strong>,
      "sub-value": "0",
    },
    {
      key: "sub-vat",
      "sub-total":  <strong>VAT (10%):</strong>,
      "sub-value": '$' + sumPrice(cartRowData) * 10 / 100,
    },
    {
      key: "total",
      "sub-total":  <strong>Total:</strong>,
      "sub-value": '$' + (sumPrice(cartRowData) + sumPrice(cartRowData) * 10 / 100),
    },
  ]
  return (
    <>
      <Layout>
        <div className={styles['cart']}>
          <div className={styles['cart-container']}>

            {/* Cart Info section */}
            <Breadcrumb list={[{ name: 'Shopping Cart', link: 'cart' }]} />
            <h1 className={styles['cart-title']}>Shopping Cart</h1>
            <div className={styles['cart-content']}>
              {cartData.length ? (
                <div className={styles['cart-content__table']}>
                  <Table 
                    bordered 
                    columns={cartColumnData} 
                    dataSource={cartRowData} 
                    pagination={false}
                    scroll={{ x: 700 }}
                  />
                </div>
              ) : (
                <div>Giỏ hàng hiện tại đang trống</div>
              )}
            </div>
            {/* Cart Info section */}

            {/* Promotion section */}
            <div className={styles['cart-promotion']}>
              <h2>What would you like to do next?</h2>
              <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
              <div className={styles['cart-promotion__panel']}>
                <div className={styles['cart-promotion__heading']}>
                  <h4 className={styles['cart-promotion__heading--label']}>
                    Use Coupon Code
                  </h4>
                </div>
                <div className={styles['cart-promotion__coupon']}>
                  <p className={styles['cart-promotion__coupon--title']}>Enter your coupon here</p>
                  <Row className={styles['cart-promotion__coupon--body']} justify="space-between">
                    <Col
                      xs={24} sm={14} md={14} lg={18} xl={19}
                      style={{ padding: "16px 0"}}
                    >
                      <Input
                        size="large"
                        style={{
                          width: "100%",
                          background: "#f5f5f5"
                        }}
                        onChange={handleChangeCoupon}
                        value={couponText}
                        placeholder="Enter your coupon here"
                      />
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={4} xl={3}>
                      <Button
                        handleClick={handleApplyCoupon}
                        style={{
                          width: "100%",
                        }}
                      >
                        APPLY COUPON
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            {/* Promotion section */}

            {/* Promotion section */}
            <div className={styles['cart-summary']}>
              <Row className={styles['cart-summary__wrapper']}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Table 
                    bordered
                    columns={cartColumnSummary} 
                    dataSource={cartRowSummary}
                    showHeader={false}
                    pagination={false}
                  />
                </Col>      
              </Row>
            </div>
            {/* Promotion section */}

            {/* Button section */}
            <div className={styles['cart-action']}>
              <Button
                handleClick={() => router.back()}
                isReverse
                style={{
                  padding: "10px 16px"
                }}
              >
                CONTINUE SHOPPING
              </Button>
              <Button
                handleClick={handleCheckout}
                style={{
                  padding: "10px 16px"
                }}
              >
                CHECKOUT
              </Button>
            </div>
            {/* Button section */}

          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
};

const mapStateToProps = (state) => ({
  cart: state.storage.cart,
  userInfo: state.storage.userInfo,
});


const mapDispatchToProps = {
  showToast: storageActions.showToast
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)