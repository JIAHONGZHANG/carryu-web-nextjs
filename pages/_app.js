import React from "react";
import Navbar from "../comps/Header/NavBar";
import { useRouter } from "next/router";
import GlobalStyle from "../styles/globalStyles";
import useResizeObserver from "use-resize-observer";
import { client } from "../utils/sanity-utils";
import styled from "styled-components";
import WindowWidthContextProvider from "../comps/WindowWidthContextProvider";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import Footer from "../comps/Footer/Footer";
import { siteSettingsQuery } from "../utils/queries";
import { DefaultSeo } from "next-seo";
import { SiteSettingsContextProvider } from "../contexts/siteSettings";

const ContactCardContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  display: flex;
  flex-direction: column;
  text-align: center;
  position: fixed;
  right: 10px;
  bottom: 10px;
`;
const ContactCard = styled.img`
  margin-top: 10px;
  width: 200px;
  height: 200px;
  z-index: 1;
`;

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps, siteSettings }) {
  const router = useRouter();
  const { ref, width } = useResizeObserver();

  React.useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <SiteSettingsContextProvider
      value={{
        ...siteSettings,
        logoAsset: siteSettings?.logo?.asset,
      }}
    >
      <DefaultSeo
        title={siteSettings?.title || "Carry U"}
        description={siteSettings?.description || "Carry U"}
        openGraph={{
          type: "website",
          locale: "cn_CN",
          siteName: siteSettings?.title || "Carry U",
        }}
      />
      <WindowWidthContextProvider value={width}>
        <div ref={ref}>
          <Navbar />
          <Component {...pageProps} />
          <ContactCardContainer>
            <h3>咨询请加vx</h3>
            <ContactCard src="/contact.jpeg" alt="contact card" />
          </ContactCardContainer>
          <GlobalStyle />
          {pageProps?.footerData && (
            <Footer footerData={pageProps.footerData} />
          )}
          {/* <Footer footerData={pageProps?.footerData} /> */}
        </div>
      </WindowWidthContextProvider>
    </SiteSettingsContextProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const siteSettings = await client.fetch(siteSettingsQuery);
  return { siteSettings };
};

export default MyApp;
