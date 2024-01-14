import { Fragment } from "react";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import { appWithTranslation } from "next-i18next";
import RTL from "components/RTL";
import MuiTheme from "theme/MuiTheme";
import OpenGraphTags from "utils/OpenGraphTags";
import { AppProvider } from "contexts/AppContext";
import SettingsProvider from "contexts/SettingContext";
import SnackbarProvider from "components/SnackbarProvider";
import { ChakraProvider } from '@chakra-ui/react'

import { useState ,useEffect } from "react";
import nextI18NextConfig from "../next-i18next.config";

import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { StateContextProvider } from '../redux/socket/context'



import "nprogress/nprogress.css";
import "simplebar/dist/simplebar.min.css";
import "../src/__server__";


import { store, persistor } from '../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
// small change
nProgress.configure({
  showSpinner: false
});
const App = ({
  Component,
  pageProps
}) => {
  const AnyComponent = Component;
  const getLayout = AnyComponent.getLayout ?? (page => page);


  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  
  }, []);
  


  return <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="React Next.js ecommerce template. Build SEO friendly Online store, delivery app and Multivendor store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <OpenGraphTags />
        <title>Bazaar - Next.js Ecommerce Template</title>
      </Head>
      {/* {!isSSR &&  */}
      <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>

            <ChakraProvider>

            <StateContextProvider>


         
      <SettingsProvider>
        <AppProvider>
          <MuiTheme>
            <SnackbarProvider>
              <RTL>{getLayout(<AnyComponent {...pageProps} />)}</RTL>
            </SnackbarProvider>
          </MuiTheme>
        </AppProvider>
      </SettingsProvider>

      <ToastContainer />



     
      </StateContextProvider>

</ChakraProvider>
      </PersistGate>
        </Provider>
{/* } */}

    </Fragment>;
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default appWithTranslation(App, nextI18NextConfig);