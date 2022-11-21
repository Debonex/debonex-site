import BaseLayout from "components/layouts/BaseLayout";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import Head from "next/head";
import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";
import "styles/global.css";
import "styles/notion.scss";
import "styles/prism.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="light"
      value={{ dark: "dark-mode" }}
    >
      <Head>
        <title>Debonex Site</title>
        <meta name="title" content="Debonex Site" />
        <meta name="description" content="Debonex https://www.debonex.site" />
        <meta name="keywords" content="Debonex,Debonet" />
        <meta
          name="google-site-verification"
          content="X6TlzdocFEspcaRCb6wqWTsctce3jXc6wWoEOlDe1MM"
        />
        {/* og */}
        <meta property="og:title" content="Debonex Site" />
        <meta property="og:author" content="Debonex" />
        <meta property="og:locale" content="zh_CN" />
        <meta property="og:site_name" content="Debonex Site" />
        <meta
          property="og:image"
          content="https://www.debonex.site/favicon.png"
        />
        <meta
          property="og:url"
          content="https://www.debonex.site"
          key="og:url"
        />
        {process.env.NODE_ENV === "production" && (
          <script
            async
            defer
            data-website-id="40bcb648-75aa-4c81-9bf3-2ce121f23551"
            src="https://umami.debonex.site/umami.js"
          ></script>
        )}
      </Head>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  );
};

export default App;
