import React from "react";
import { client } from "../../utils/sanity-utils";
import { carouselQuery, footerQuery } from "../../utils/queries";
import { revalidateTime } from "../../utils/constants";

export default function index() {
  return <a href="mailto:iweiwu0128@gmail.com">index</a>;
}

export async function getStaticProps() {
  const pageData = await Promise.all([
    client.fetch(carouselQuery),
    client.fetch(footerQuery),
  ]);
  const [imgSrcs, footerData] = pageData;

  return {
    props: {
      imgSrcs: imgSrcs.map((data) => data.image.image.asset),
      sliderAlts: imgSrcs.map((data) => data.image.alt),
      footerData: footerData.map((data) => data),
    },
    // If webhooks isn't setup then attempt to re-generate in 5 minute intervals
    revalidate: revalidateTime,
  };
}
