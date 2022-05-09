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
import { Button } from 'src/components/ui-kits/Button'
import { Icon } from 'src/components/ui-kits/Icon'

const TestLogin = ({
  showToast,
  getUserInfo,
  getCart
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();
  const [account, setAccount] = useState('');
  const [pass, setPass] = useState('');

  const validateLogin = (): boolean => {
    if (!account.length || !pass.length) {
      showToast('You have not filled full our form yet', "warning")
      return false;
    }
    return true;
  }

  const getCartInfoFromDB = (id: number) => {
    const token = JSON.parse(localStorage.getItem("access_token"));
    if (token) {
      api.get(`${endpoint['cart']}/${id}`, token)
        .then((res: any) => {
          if (res) {
            getCart(res.cart);
          }
        })
    }
  }

  const handleLogin = () => {
    if (validateLogin()) {
      api.post(`${endpoint['login']}`, {
        account,
        password: pass,
      })
      .then((res) => {
        if (res) {
          api.get(`${endpoint["user"]}/${res.id}`)
          .then((res) => {
            getUserInfo(res);
          })
          .catch((err) => {
            throw Error(err);
          });

          api.get(`${endpoint["cart"]}/${res.id}`).then((res) => {
            getCart(res.cart)
          })
          .catch((err) => {
            throw Error(err);
          });

          // save Token
          res.accessToken && saveDataLocal("access_token", res.accessToken);
          res.refreshToken && saveDataLocal("refresh_token", res.refreshToken);
          
          // back to page
          showToast('Login Success', "success");
          
          setTimeout(() => {
            // getCartInfoFromDB(res.id);
            router.back();
          }, 1500);
        } else {
          showToast('Login Fail. Please check your info again', "error")
        }
      })
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
        <Button
          handleClick={() => router.back()}
          style={{ color: "#fff", background: "transparent" }}
        >
          <Icon
            img="/images/icons/back.png"
            width="14px"
            height="14px"
            iconStyle={`
                filter : invert(98%) sepia(77%) saturate(344%) hue-rotate(295deg) brightness(118%) contrast(101%);
                margin-right: 3px;
                margin-bottom: 2px;
            `}
          />
          Return
        </Button>
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