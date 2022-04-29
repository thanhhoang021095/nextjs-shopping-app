import React, { useState, useEffect } from 'react'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import styles from './Layout.module.scss'
import storageActions from "controllers/redux/actions/storageActions"
import { connect } from 'react-redux';
import IUser from 'src/interfaces/user'
import { NavHeader } from 'src/components/Header/NavHeader'
import { useMediaQuery } from 'react-responsive'
import { ISubCategory, ICategory } from 'src/interfaces/collection'
import { Toast } from "src/components/ui-kits/Toast"

interface LayoutProps {
  children: React.ReactNode;
  customStyle?: string;
  isHomeRoute?: boolean;
  cart: any;
  userInfo: IUser;
  category: ICategory[];
  subCategory: ISubCategory[];
  getCategory: () => void;
  getSubCategory: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  getCategory = () => { },
  getSubCategory = () => { },
  category = [],
  subCategory = [],
  customStyle = "",
  isHomeRoute = false,
  cart = [],
  userInfo = null
}): JSX.Element => {
  const [mounted, setMounted] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })

  useEffect(() => {
    setMounted(true);
    getCategory();
    getSubCategory();
  }, []);

  return (
    mounted &&
    <>
      {/* {category.length && subCategory.length && */}
        <>
          {!isTabletOrMobile ?
            <Header />
            :
            <NavHeader />
          }
        </>
      {/* } */}
      <div className={styles["header-tape"]}></div>
      <div className={styles['layout-container']}>
        {children}
      </div>
      <Footer />

      <Toast />
    </>
  )
}


const mapStateToProps = (state) => ({
  cart: state.storage.cart,
  userInfo: state.storage.userInfo,
  category: state.storage.category,
  subCategory: state.storage.subCategory,
})

const mapDispatchToProps = {
  getCategory: storageActions.getCategory,
  getSubCategory: storageActions.getSubCategory,
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
