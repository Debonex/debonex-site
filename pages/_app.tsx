import { AppProps } from "next/app";
import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";
import "styles/global.css";
import "styles/notion.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="h-screen w-screen">
      <Component {...pageProps} />
    </div>
  );
};

export default App;
