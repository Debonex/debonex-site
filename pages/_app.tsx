import { AppProps } from "next/app";
import "styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="h-screen w-screen">
      <Component {...pageProps} />
    </div>
  );
};

export default App;
