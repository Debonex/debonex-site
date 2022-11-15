import BaseLayout from "components/layouts/BaseLayout";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
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
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  );
};

export default App;
