import Header from "@/components/Header";
import { ThemeProvider } from "../context/ThemeContext";
import { LoadingProvider } from "../context/LoadingContext"
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Category from '../components/Category'
import { ToastContainer, Slide } from 'react-toastify';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <ToastContainer
          position="top-right"
          autoClose={false}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Slide}
          limit={1}
        />
        <Header />
        <Category />
        <Component {...pageProps} />
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default MyApp;
