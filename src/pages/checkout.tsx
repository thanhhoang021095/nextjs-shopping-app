import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Layout from 'src/components/Layout/Layout'
import styles from 'src/styles/pages/checkout.module.scss'
import { formatCurrency } from "src/utils/common";
import storageActions from 'controllers/redux/actions/storageActions'
import { GetStaticProps } from 'next'
import { Breadcrumb } from 'src/components/ui-kits/Breadcrumb'
import { Row, Col } from 'antd';
import { Input } from 'antd';
import { Button } from 'src/components/ui-kits/Button'
import { useRouter } from 'next/router'
import { Collapse } from 'antd'
import { CheckoutStep1Form, CheckoutStep2Form } from "src/components/CheckoutForms"

const { Panel } = Collapse;

interface CheckoutProps {
  cart: any[];
  showToast: (mess: string, type: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, showToast = () => { } }): JSX.Element => {
  const router = useRouter();
  const [showStep, setShowStep] = useState(() => {
    return {
      step1: true,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false
    }
  })

  const handleChangeActivePanel = (():string => {
    for (let step in showStep) {
      if (showStep[step]) {
        return step;
      }
    }
    return "step1";
  })()

  const handleSubmitStep1 = (e: string): void => {
    if (e.length) {
      setShowStep({
        ...showStep,
        step1: false,
        step2: true,
      })
    }
  }

  const handleSubmitStep2 = (e: string): void => {
    if (e.length) {
      setShowStep({
        ...showStep,
        step1: true,
        step2: true,
      })
    }
  }
  return (
    <>
      <Layout>
        <div className={styles['checkout']}>
          <div className={styles['checkout-container']}>

            {/* Checkout Info section */}
            <Breadcrumb
              list={[
                {
                  name: 'Shopping Cart',
                  link: 'cart'
                },
                {
                  name: 'Checkout',
                  link: 'checkout'
                }
              ]}
            />
            <h1 className={styles['checkout-title']}>Checkout</h1>
            {/* Checkout Info section */}

            {/* Checkout Panel section */}
            <div className={styles['checkout-panel']}>
              <Collapse
              >
                <Panel
                  key="step1"
                  showArrow={false}
                  header={<h4 className={styles['checkout-panel__header']}>Step 1: Checkout Options</h4>}
                >
                  <CheckoutStep1Form
                    handleSubmitOption={handleSubmitStep1}
                  />
                </Panel>
              </Collapse>

              <Collapse
              >
               <Panel
                  key="step2"
                  showArrow={false}
                  header={<h4 className={styles['checkout-panel__header']}>Step 2: Account & Billing Details</h4>}
                >
                  <CheckoutStep2Form
                    handleSubmitOption={handleSubmitStep2}
                  />
                </Panel>
              </Collapse>
            </div>
            {/* Checkout Panel section */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)