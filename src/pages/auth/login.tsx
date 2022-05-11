import React, { useState } from 'react'
import styles from 'src/styles/pages/auth.module.scss'
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import storageActions from 'controllers/redux/actions/storageActions'
import { connect } from 'react-redux'
import { saveDataLocal } from 'controllers/redux/lib/reducerConfig';
import { Toast } from 'src/components/ui-kits/Toast'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReturnAuthenBtnGroupProps } from "src/components/ReturnAuthenBtnGroup"

const TestLogin = ({
  showToast,
  getUserInfo,
  getCart
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();
  const [account, setAccount] = useState('');
  const [pass, setPass] = useState('');
  const [hoverBackBtn, setHoverBackBtn] = useState({
    home: false,
    return: false
  });

  const validateLogin = (): boolean => {
    if (!account.length || !pass.length) {
      showToast('You have not filled full our form yet', "warning")
      return false;
    }
    return true;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (validateLogin()) {
        const loginData = await api.post(`${endpoint['login']}`, {
          account,
          password: pass,
        })

        if (loginData) {
          const {
            account,
            address,
            fullName,
            id,
            isActive,
            phone
          } = loginData;
          getUserInfo({
            account,
            address,
            fullName,
            id,
            isActive,
            phone
          });
          loginData.accessToken && saveDataLocal("access_token", loginData.accessToken);
          loginData.refreshToken && saveDataLocal("refresh_token", loginData.refreshToken);

          const cartData = await api.get(`${endpoint["cart"]}/${loginData.id}`);
          if (cartData) {
            getCart(cartData.cart);
            showToast('Login Success', "success");
            setTimeout(() => {
              router.back();
            }, 1500);
          }
        } else {
          showToast('Login Fail. Please check your info again', "error")
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className={styles['login-layout']}>
      <div className={styles['login-overlay']}></div>
      <div className={styles['login-container']}>
        <h2 className={styles['login-container__title']}>Login</h2>
        <div className={styles['login-container__div']}>
          <div className={styles['login-container__form--user']}>
            <input
              type="text"
              name="username"
              onChange={(event) => {
                setAccount(event.target.value)
              }}
              value={account}
              required
            />
            <label>Username</label>
          </div>

          <div className={styles['login-container__form--user']}>
            <input
              type="password"
              name="password"
              onChange={(event) => setPass(event.target.value)}
              value={pass}
              required
            />
            <label>Password</label>
          </div>

          <div className={styles['login-container__form--submit']}>
            <button onClick={handleLogin}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
            <div className={styles['login-container__form--register']}>
              <Link href="/auth/register">
                <p>I do not have an account</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Toast />

      {/* Back Home */}
      <div className={styles['back-home']}>
        <ReturnAuthenBtnGroupProps />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

const mapStateToProps = (state) => ({
  cart: state.storage.cart,
})

const mapDispatchToProps = {
  showToast: storageActions.showToast,
  getUserInfo: storageActions.getUserInfo,
  getCart: storageActions.getCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(TestLogin);