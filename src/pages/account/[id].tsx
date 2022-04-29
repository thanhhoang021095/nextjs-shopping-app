import React, { useState, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import IUser from 'src/interfaces/user'
import Layout from 'src/components/Layout/Layout'
import styles from 'src/styles/pages/account.module.scss'
import { connect } from 'react-redux'
import { Input } from 'src/components/ui-kits/Input'
import { Button } from 'src/components/ui-kits/Button'
import Router from 'next/router';
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import storageActions from 'controllers/redux/actions/storageActions'
import { IconButton } from 'src/components/ui-kits/IconButton'
interface AccountProps {
  userInfo: IUser;
  getUserInfo: (info: IUser) => void;
  showToast: (mess:string, type: string) => void;
}

const Account: React.FC<AccountProps> = ({ userInfo = null, getUserInfo, showToast }): JSX.Element => {
  const [account, setAccount] = useState(userInfo?.account ?? "")
  const [password, setPassword] = useState(userInfo?.password ?? "")
  const [fullName, setFullName] = useState(userInfo?.fullName ?? "")
  const [phone, setPhone] = useState(userInfo?.phone ?? "")
  const [address, setAddress] = useState(userInfo?.address ?? "")
  const [showExpandal, setShowExpandal] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  useEffect(() => {
    try {
      if (userInfo) {
        setAccount(userInfo?.account);
        setPassword(userInfo?.password);
        setFullName(userInfo?.fullName);
        setPhone(userInfo?.phone);
        setAddress(userInfo?.address);
      };
    } catch (error) {
      console.error(error)
    }
  }, [userInfo])
  
  const handleUpdateInfo = () => {
    const token:string = JSON.parse(localStorage.getItem("access_token")) ?? "";

    const updatedInfo = {
      id: userInfo.id,
      account,
      password,
      fullName,
      phone,
      address,
      isActive: userInfo.isActive
    }

    token && api.put(endpoint['user'], {
      ...updatedInfo
    }).then((res: any) => {
      getUserInfo(updatedInfo);
      Router.back();
    }).catch((err) => console.error(err))
  }

  const handleCancelUpdate = () => {
    Router.back();
  }

  const openExpandal = (showExpandal) => {
    setShowExpandal(!showExpandal)
  }

  const confirmNewPassword = () => {
    if (oldPassword !== confirmPassword && (oldPassword === newPassword || confirmPassword === newPassword) 
      || oldPassword !== password || !newPassword) {
      showToast("Update password FAIL", "error");
      return;
    }

    if (newPassword) {
      const token:string = JSON.parse(localStorage.getItem("access_token"));
      if (token) {
        const updatedPasswordInfo = {
          id: userInfo.id,
          account,
          password: newPassword,
          fullName,
          phone,
          address,
          isActive: userInfo.isActive
        }
        api.put(`${endpoint['user']}`, {
          updatedPasswordInfo
        }, token).then((res) => {
          getUserInfo(updatedPasswordInfo);
          setShowExpandal(false);
          setNewPassword("");
          setConfirmPassword("");
          setOldPassword("");
          Router.back();
          setTimeout(() => {
            showToast("Update password SUCCESS", "success");
          }, 300)
        }).catch((err) => console.error(err))
      }
    }
  }

  const cancelNewPassword = () => {
    setShowExpandal(false);
    setNewPassword("");
  }
  return (
    <>
      <Layout>
        <div className={styles['account-paper']}>
          <div className={styles['account-container']}>
            <p className={styles['account-container__title']}>User Info</p>
            <Input type="text" labelName="Account" value={account} handleChange={(e) => setAccount(e.target.value)} />
            <div className={styles['account-container__pass']}>
              <Input type="password" labelName="Password" value={password} handleChange={(e) => setPassword(e.target.value)} />
              <IconButton 
                img={`/images/icons/caret-arrow-${showExpandal ? 'up' : 'down'}.png`} 
                height="15px"
                width="15px" 
                handleClick={() => openExpandal(showExpandal)} />
            </div>

            { showExpandal && 
              <div className={styles['account-container__updatePass']}>
                <Input 
                  type="password" 
                  labelName="Old Password" 
                  value={oldPassword} 
                  handleChange={(e) => setOldPassword(e.target.value)} 
                />
                <Input 
                  type="password" 
                  labelName="Confirm Password" 
                  value={confirmPassword} 
                  handleChange={(e) => setConfirmPassword(e.target.value)}
                />
                {/* <Icon img="/images/icons/checked.png" width="10px" height="10px" /> */}
                <Input 
                  type="password" 
                  labelName="New Password" 
                  value={newPassword} 
                  handleChange={(e) => setNewPassword(e.target.value)}
                />
                <div className={styles['account-container__updatePass--btn']}>
                  <Button  style="margin-top: 1rem" handleClick={() => confirmNewPassword()}>
                      Confirm
                  </Button>
                  <Button style="margin-top: 1rem" handleClick={() => cancelNewPassword()}>
                      Ignore
                  </Button>
                </div>
              </div>
            }

            <Input type="text" labelName="Full Name" value={fullName} handleChange={(e) => setFullName(e.target.value)} />
            <Input type="text" labelName="Phone Number" value={phone} handleChange={(e) => setPhone(e.target.value)} />
            <Input type="text" labelName="Address" value={address} handleChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className={styles['account-container__btn']}>
            <Button handleClick={() => handleUpdateInfo()}>
              Update
            </Button>
            <Button handleClick={() => handleCancelUpdate()}>
              Cancel
            </Button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticPaths:GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.storage.userInfo,
})

const mapDispatchToProps = {
  getUserInfo: storageActions.getUserInfo,
  showToast: storageActions.showToast,
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);