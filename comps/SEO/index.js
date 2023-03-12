import React, { useContext } from "react";
import { NextSeo } from "next-seo";
import SiteSettingsContext from "../../contexts/siteSettings";

const SEO = ({ title, description }) => {
  const siteSettingsContext = useContext(SiteSettingsContext);

  return (
    <NextSeo
      title={`${title} | ${siteSettingsContext.title}`}
      description={description || siteSettingsContext.description || ""}
    />
  );
};

export default SEO;
