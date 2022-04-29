import React, { useState } from 'react'
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import styles from 'src/styles/pages/auth.module.scss'
import Router from 'next/router'
import { Toast } from 'src/components/ui-kits/Toast'
import storageActions from 'controllers/redux/actions/storageActions'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Button } from 'src/components/ui-kits/Button'
import { Icon } from 'src/components/ui-kits/Icon'
import { saveDataLocal } from 'controllers/redux/lib/reducerConfig';

const Register = ({
  showToast,
  getUserInfo,
  getCart,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const [account, setAccount] = useState('')
  const [pass, setPass] = useState('')
  const [phone, setPhone] = useState('')
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')

  const handleRegister = () => {
    if (!account.length || !pass.length || !phone.length || !fullName.length) {
      showToast("Bạn chưa điền đủ thông tin yêu cầu", "warning")
      return;
    }
    
    api
      .post(`${endpoint['register']}`, {
        account,
        password: pass,
        fullName,
        phone,
        isActive: true,
      })
      .then((res) => {
        if (res) {
          // Save User Info Into Redux Store
          getUserInfo(res);
          // Save Cart Info Into Redux Store
          // save Token
          res.accessToken && saveDataLocal("access_token", res.accessToken);
          res.refreshToken && saveDataLocal("refresh_token", res.refreshToken);
          // back to page
          Router.push("/")
          setTimeout(() => { 
            getCartInfoFromDB(res.id);
            showToast("Đăng ký thành công", "success")
          }, 500)
        } else {
           showToast("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin", "error");
         }
      })
      .catch((err) => console.error(err))
  }

  const getCartInfoFromDB = (id:number) => {
    const token = JSON.parse(localStorage.getItem("access_token"));
    if (token) {
      api.get(`${endpoint['cart']}/${id}`, token)
      .then((res:any) => {
        if (res) {
          getCart(res.cart);
        }
      })
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
                    <button onClick={() => handleRegister()}>
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
            <Button
                handleClick={() => Router.push('/')}
                style={{ color: "#ffaf40" }}
            >   
                <Icon  
                    img="/images/icons/back.png"
                    width="16px"
                    height="16px"
                    iconStyle={`
                    filter : invert(72%) sepia(18%) saturate(1702%) hue-rotate(343deg) brightness(103%) contrast(101%); 
                    margin-right: 3px;
                    margin-bottom: 2px;
                    `}
                />
                Back Home
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  showToast: storageActions.showToast,
  getUserInfo: storageActions.getUserInfo,
  getCart: storageActions.getCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
