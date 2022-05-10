import React, { useState, useEffect } from 'react'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import styles from './Layout.module.scss'
import storageActions from "controllers/redux/actions/storageActions"
import { connect } from 'react-redux';
import { NavHeader } from 'src/components/Header/NavHeader'
import { useMediaQuery } from 'react-responsive'
import { Toast } from "src/components/ui-kits/Toast"
import { SearchInput } from 'src/components/Header/SearchInput'

interface LayoutProps {
  children: React.ReactNode;
  customStyle?: string;
  isHomeRoute?: boolean;
  getCategory: () => void;
  getSubCategory: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  getCategory = () => { },
  getSubCategory = () => { },
  isHomeRoute = false,
}): JSX.Element => {
  const [mounted, setMounted] = useState(false);
  const isLargeDevice = useMediaQuery({ query: '(min-width: 768px)' });

  useEffect(() => {
    setMounted(true);
    getCategory();
    getSubCategory();
  }, []);

  return (
    mounted &&
    <>
      {!isLargeDevice ?
        <NavHeader />
        :
        <>
          <Header />
          <div className={styles["header-tape"]}></div>
        </>
      }
      <div className={styles['layout-container']}>
        {!isLargeDevice &&
          <SearchInput
            style={{
              position: "relative",
              margin: "2rem 0",
              with: "100%",
              zIndex: 999,
              paddingLeft: "2rem",
              paddingRight: "2rem",
            }}
          />
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);