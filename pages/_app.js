import Navbar from "../comps/Header/NavBar";
import GlobalStyle from "../styles/globalStyles";
import useResizeObserver from "use-resize-observer";
import styled from "styled-components/macro";
import { urlFor } from "../utils/sanity-utils";
import WindowWidthContextProvider from "./WindowWidthContextProvider";
import Carousel from "../comps/Carousel/Carousel";
import { CarouselContextProvider } from "../comps/Carousel/CarouselContext";
import Footer from "../comps/Footer/Footer";
function MyApp({ Component, pageProps }) {
  const carouselValue = {
    sliderImageSrcs: pageProps.imgSrcs.map((imgSrc) => urlFor(imgSrc).url()),
    sliderAlts: pageProps.sliderAlts,
  };
  const { ref, width } = useResizeObserver();
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
    z-index: 1;
  `;
  return (
    <>
      <WindowWidthContextProvider value={width}>
        <div ref={ref}>
          <Navbar />
          <CarouselContextProvider value={carouselValue}>
            <Carousel />
          </CarouselContextProvider>
          <Component {...pageProps} />
          <ContactCardContainer>
            <h3>咨询请加vx</h3>
            <ContactCard src="/contact.jpeg" alt="contact card" />
          </ContactCardContainer>
          <GlobalStyle />
          <Footer footerData={pageProps.footerData} />
        </div>
      </WindowWidthContextProvider>
    </>
  );
}

export default MyApp;

// MyApp.getInitialProps = async (appContext) => {
//   const appData = await Promise.all([
//     client.fetch(carouselQuery),
//     client.fetch(sampleQuery),
//     client.fetch(eduVideoQuery),
//     client.fetch(immVideoQuery),
//     client.fetch(getPostsQuery(0, 4)),
//     client.fetch(footerQuery),
//   ]);
//   const appProps = await App.getInitialProps(appContext);
//   return {
//     ...appProps,
//     imgSrcs: appData[0].map((data) => data.image.image.asset),
//     sliderAlts: appData[0].map((data) => data.image.alt),
//     sampleData: appData[1].map((data) => data),
//     eduVideoData: appData[2],
//     immVideoData: appData[3],
//     postsData: appData[4].map((data) => data),
//     footerData: appData[5].map((data) => data),
//   };
// };

// NOTE: getStaticProps can only be exported from a page. You cannot export it from non-page files, _app, _document, or _error. One of the reasons for this restriction is that React needs to have all the required data before the page is rendered. Also, you must use export getStaticProps as a standalone function — it will not work if you add getStaticProps as a property of the page component.
// export async function getStaticProps(appContext) {
//   const homeData = await Promise.all([
//     client.fetch(carouselQuery),
//     client.fetch(sampleQuery),
//     client.fetch(eduVideoQuery),
//     client.fetch(immVideoQuery),
//     client.fetch(getPostsQuery(0, 4)),
//     client.fetch(footerQuery),
//   ]);
//   const appProps = await App.getInitialProps(appContext);
//   return {
//     props: {
//       ...appProps,
//       imgSrcs: homeData[0].map((data) => data.image.image.asset),
//       sliderAlts: homeData[0].map((data) => data.image.alt),
//       sampleData: homeData[1].map((data) => data),
//       eduVideoData: homeData[2],
//       immVideoData: homeData[3],
//       postsData: homeData[4].map((data) => data),
//       footerData: homeData[5].map((data) => data),
//     },
//     // If webhooks isn't setup then attempt to re-generate in 5 minute intervals
//     revalidate: 300,
//   };
// }
