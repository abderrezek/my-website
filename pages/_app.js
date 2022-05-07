import Router from "next/router";

import Navbar from "../components/Navbar";
import { ThemeProvider } from "../utils/ThemeContext";
import nprogress from "nprogress";

import "../styles/globals.css";
import "../styles/nprogress.css";

nprogress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", nprogress.start);
Router.events.on("routeChangeError", nprogress.done);
Router.events.on("routeChangeComplete", nprogress.done);

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen justify-between">
        <Navbar />

        <div className="container max-w-7xl mx-auto px-4 pb-10 mb-auto">
          <Component {...pageProps} />
        </div>

        <p className="w-4/5 mx-auto sm:mx-auto sm:w-full text-center font-semibold mb-3">
          Fabriqué avec
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block text-red-600 mx-1 h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          par Abderrezek Gallal &copy; <span>{new Date().getFullYear()}</span>
        </p>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
