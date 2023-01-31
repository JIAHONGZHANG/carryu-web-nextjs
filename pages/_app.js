// import Head from "next/head";
import Navbar from "../comps/Header/NavBar";
import GlobalStyle from "../styles/globalStyles";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
        />

        <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head> */}
      <Navbar />
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  );
}

export default MyApp;
