import React from "react";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import Document, { Head, Html, Main, NextScript } from "next/document";
import createEmotionCache from "../src/createEmotionCache";
import i18nextConfig from "../next-i18next.config";
export default class Bazaar extends Document {
  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
    return <Html lang={currentLocale}>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>;
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
Bazaar.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const {
    extractCriticalToChunks
  } = createEmotionServer(cache);
  ctx.renderPage = () => originalRenderPage({
    enhanceApp: App => props => <CacheProvider value={cache}>
            <App {...props} />
          </CacheProvider>
  });
  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map(style => <style data-emotion={`${style.key} ${style.ids.join(" ")}`} key={style.key}
  // eslint-disable-next-line react/no-danger
  dangerouslySetInnerHTML={{
    __html: style.css
  }} />);
  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags]
  };
};