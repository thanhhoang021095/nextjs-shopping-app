import React, { useState } from 'react'
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import styles from 'src/styles/pages/auth.module.scss'
import { useRouter } from 'next/router'
import { Toast } from 'src/components/ui-kits/Toast'
import storageActions from 'controllers/redux/actions/storageActions'
import { connect } from 'react-redux'
import Link from 'next/link'
import { saveDataLocal } from 'controllers/redux/lib/reducerConfig';
import { ReturnAuthenBtnGroupProps } from "src/components/ReturnAuthenBtnGroup"

const Register = ({
  showToast,
  getUserInfo,
  getCart,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();
  const [account, setAccount] = useState('');
  const [pass, setPass] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');

  const validateRegister = (): boolean => {
    if (!account.length || !pass.length || !phone.length || !fullName.length) {
      showToast('You have not filled full our form yet', "warning")
      return false;
    }
    return true;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (validateRegister()) {
        const registerData = await api.post(`${endpoint['register']}`, {
          account,
          password: pass,
          fullName,
          phone,
          isActive: true,
        });

        if (registerData) {
          getUserInfo(registerData);

          // Save Token
          registerData.accessToken && saveDataLocal("access_token", registerData.accessToken);
          registerData.refreshToken && saveDataLocal("refresh_token", registerData.refreshToken);

          const cartData = await api.get(`${endpoint["cart"]}/${registerData.id}`);
          if (cartData) {
            getCart(cartData.cart);
            showToast("Register Success", "success");
            setTimeout(() => {
              router.push("/");
            }, 1500)
          }
        } else {
          showToast("Register Fail. Username or password is invalid", "error");
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
        <h2 className={styles['login-container__title']}>Register</h2>
        <form className={styles['login-container__form']}>
          <div className={styles['login-container__form--user']}>
            <input
              name="username"
              onChange={(event) => {
                setAccount(event.target.value)
              }}
              value={account}
              type="text"
              className={styles.signUpInput}
              required
            />
            <label>Username</label>
          </div>

          <div className={styles['login-container__form--user']}>
            <input
              name="password"
              type="password"
              value={pass}
              onChange={(event) => setPass(event.target.value)}
              required
            />
            <label>Password</label>
          </div>

          <div className={styles['login-container__form--user']}>
            <input
              name="fullName"
              type="text"
              onChange={(event) => setFullName(event.target.value)}
              value={fullName}
              required
            />
            <label>Full Name</label>
          </div>

          <div className={styles['login-container__form--user']}>
            <input
              name="phone"
              type="text"
              required
              onChange={(event) => setPhone(event.target.value)}
              value={phone}
            />
            <label>Phone Number</label>
          </div>

          <div className={styles['login-container__form--user']}>
            <input
              name="address"
              onChange={(event) => setAddress(event.target.value)}
              type="text"
              required={true}
              value={address}
            />
            <label>Address</label>
          </div>

          <div className={styles['login-container__form--submit']}>
            <button onClick={handleRegister}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Complete
            </button>

            <div className={styles['register-link']}>
              <Link href="/auth/login">
                <a href="~">I already have an account</a>
              </Link>
            </div>
          </div>
        </form>

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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  showToast: storageActions.showToast,
  getUserInfo: storageActions.getUserInfo,
  getCart: storageActions.getCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
