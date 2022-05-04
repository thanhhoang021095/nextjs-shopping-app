import '../styles/global.scss';
import '../styles/layout.scss';
import '../styles/font.scss';
import '../styles/animation.scss';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { store } from 'controllers/redux/store/configureStore';
import { useRouter } from "next/router";
import storageActions from 'controllers/redux/actions/storageActions'
import jwt_decode from "jwt-decode";
import api from 'controllers/baseApi';
import endpoint from 'src/utils/endpoints';
import dynamic from 'next/dynamic'
const CustomLoading = dynamic(() => import('src/components/Loading/Loading'));

function MyApp({ Component, pageProps }): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => {
      const loadTimer = setTimeout(() => {
        setLoading(false);
        clearTimeout(loadTimer);
      }, 1500)
    }

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    }
  }, [router]);

  useEffect(() =>  {
    // const access_token: string = JSON.parse(localStorage.getItem("access_token"));
    // if (access_token) {
    //   const decoded:any = jwt_decode(access_token);
    //   if (decoded && decoded.data && Object.keys(decoded).length) {
    //     const promise1:any = api.get(`${endpoint['user']}/${decoded.data.id}`, access_token)
    //     const promise2:any = api.get(`${endpoint['cart']}/${decoded.data.id}`, access_token)
    //     Promise.all([ promise1 , promise2 ])
    //     .then((res) => {
    //       if (res?.length) {
    //         const  { getUserInfo, getCart } = storageActions;
    //         res[0] && store.dispatch(getUserInfo(res[0]));
    //         res[1]?.cart && store.dispatch(getCart(res[1].cart));
    //       };
    //     })
    //     .catch((err) => console.error(err));
    //   }
    // } else {
    //   router.push("/auth/login");
    // }
  },[])

  return (
    <Provider store={store}>
      { loading ?  <CustomLoading /> : <Component {...pageProps} /> }
    </Provider>
  )
}

export default MyApp;
