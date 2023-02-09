// import Head from "next/head";
import Navbar from "../comps/Header/NavBar";
import GlobalStyle from "../styles/globalStyles";
import styled from "styled-components";
function MyApp({ Component, pageProps }) {
  const ContactCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    position: fixed;
    right: 0;
    bottom: 0;
  `;
  const ContactCard = styled.img`
    width: 200px;
    height: 200px;
  `;
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
      <ContactCardContainer>
        <h3>咨询请加vx</h3>
        <ContactCard src="/contact.jpeg" alt="contact card" />
      </ContactCardContainer>

      <GlobalStyle />
    </>
  );
}

export default MyApp;
